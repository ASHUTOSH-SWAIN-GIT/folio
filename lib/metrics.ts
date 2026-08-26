const startedAt = Date.now();

type MetricsState = {
  scrapes: number;
};

const globalForMetrics = globalThis as typeof globalThis & {
  folioMetrics?: MetricsState;
};

const state = globalForMetrics.folioMetrics ?? { scrapes: 0 };
globalForMetrics.folioMetrics = state;

function metric(name: string, help: string, type: "counter" | "gauge", value: number) {
  return [`# HELP ${name} ${help}`, `# TYPE ${name} ${type}`, `${name} ${value}`];
}

export function collectMetrics() {
  state.scrapes += 1;

  const memory = process.memoryUsage();
  const uptimeSeconds = (Date.now() - startedAt) / 1000;

  return [
    ...metric(
      "folio_metrics_scrapes_total",
      "Total number of Prometheus scrapes served by this process.",
      "counter",
      state.scrapes,
    ),
    ...metric(
      "folio_process_uptime_seconds",
      "Uptime of the current portfolio server process in seconds.",
      "gauge",
      uptimeSeconds,
    ),
    ...metric(
      "folio_process_resident_memory_bytes",
      "Resident memory used by the current portfolio server process.",
      "gauge",
      memory.rss,
    ),
    ...metric(
      "folio_process_heap_used_bytes",
      "JavaScript heap used by the current portfolio server process.",
      "gauge",
      memory.heapUsed,
    ),
    "# HELP folio_build_info Static information about the portfolio build.",
    "# TYPE folio_build_info gauge",
    'folio_build_info{service_name="folio",instrumentation="prometheus"} 1',
    "",
  ].join("\n");
}
