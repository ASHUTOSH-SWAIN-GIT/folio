package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sort"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
)

type event struct {
	Type string `json:"type"`
	Path string `json:"path"`
}

var visits atomic.Uint64
var engaged atomic.Uint64
var pageviews atomic.Uint64
var pageviewsByPath = struct {
	sync.RWMutex
	values map[string]uint64
}{values: make(map[string]uint64)}

func eventHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var payload event
	decoder := json.NewDecoder(http.MaxBytesReader(w, r.Body, 2048))
	if decoder.Decode(&payload) != nil || !strings.HasPrefix(payload.Path, "/") || len(payload.Path) > 160 {
		http.Error(w, "invalid event", http.StatusBadRequest)
		return
	}

	switch payload.Type {
	case "visit":
		visits.Add(1)
	case "engaged":
		engaged.Add(1)
	case "pageview":
		pageviews.Add(1)
		pageviewsByPath.Lock()
		pageviewsByPath.values[payload.Path]++
		pageviewsByPath.Unlock()
	default:
		http.Error(w, "invalid event", http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func metricLine(name string, value uint64) string {
	return name + " " + strconv.FormatUint(value, 10) + "\n"
}

func escapeLabel(value string) string {
	value = strings.ReplaceAll(value, "\\", "\\\\")
	value = strings.ReplaceAll(value, "\"", "\\\"")
	return strings.ReplaceAll(value, "\n", "\\n")
}

func metricsHandler(w http.ResponseWriter, _ *http.Request) {
	w.Header().Set("Content-Type", "text/plain; version=0.0.4; charset=utf-8")
	fmt.Fprint(w, "# HELP folio_analytics_visits_total Browser sessions started.\n# TYPE folio_analytics_visits_total counter\n")
	fmt.Fprint(w, metricLine("folio_analytics_visits_total", visits.Load()))
	fmt.Fprint(w, "# HELP folio_analytics_engaged_visits_total Sessions active for at least ten seconds.\n# TYPE folio_analytics_engaged_visits_total counter\n")
	fmt.Fprint(w, metricLine("folio_analytics_engaged_visits_total", engaged.Load()))
	fmt.Fprint(w, "# HELP folio_analytics_pageviews_total Portfolio page views.\n# TYPE folio_analytics_pageviews_total counter\n")

	pageviewsByPath.RLock()
	paths := make([]string, 0, len(pageviewsByPath.values))
	for path := range pageviewsByPath.values {
		paths = append(paths, path)
	}
	sort.Strings(paths)
	for _, path := range paths {
		fmt.Fprintf(w, "folio_analytics_pageviews_total{path=\"%s\"} %d\n", escapeLabel(path), pageviewsByPath.values[path])
	}
	pageviewsByPath.RUnlock()

	if len(paths) == 0 {
		fmt.Fprint(w, "folio_analytics_pageviews_total{path=\"unknown\"} 0\n")
	}
}

func main() {
	http.HandleFunc("/event", eventHandler)
	http.HandleFunc("/metrics", metricsHandler)
	log.Println("analytics collector listening on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
