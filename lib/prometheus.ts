import "server-only";

const queries = {
  portfolioUp: 'up{job="folio"}',
  prometheusUp: 'up{job="prometheus"}',
  nodeExporterUp: 'up{job="node-exporter"}',
  cpuUsage: '100 - (avg(rate(node_cpu_seconds_total{job="node-exporter",mode="idle"}[5m])) * 100)',
  memoryUsage:
    '100 * (1 - (node_memory_MemAvailable_bytes{job="node-exporter"} / node_memory_MemTotal_bytes{job="node-exporter"}))',
  diskUsage:
    '100 * (1 - (node_filesystem_avail_bytes{job="node-exporter",mountpoint="/",fstype!="rootfs"} / node_filesystem_size_bytes{job="node-exporter",mountpoint="/",fstype!="rootfs"}))',
  portfolioMemory: 'folio_process_resident_memory_bytes{job="folio"}',
  portfolioUptime: 'folio_process_uptime_seconds{job="folio"}',
  analyticsUp: 'up{job="analytics-collector"}',
  visits24h: 'sum(increase(folio_analytics_visits_total[24h]))',
  visits7d: 'sum(increase(folio_analytics_visits_total[7d]))',
  pageViews24h: 'sum(increase(folio_analytics_pageviews_total[24h]))',
  bounceRate:
    '100 * (1 - (sum(increase(folio_analytics_engaged_visits_total[24h])) / clamp_min(sum(increase(folio_analytics_visits_total[24h])), 1)))',
} as const;

type PrometheusResult = {
  metric?: Record<string, string>;
  value?: [number, string];
};

type PrometheusPayload = {
  status: string;
  data?: { result?: PrometheusResult[] };
};

async function queryPrometheus(baseUrl: string, token: string, query: string) {
  const url = new URL("/api/v1/query", baseUrl);
  url.searchParams.set("query", query);
  const response = await fetch(url, {
    cache: "no-store",
    headers: { Authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) return null;
  const payload = (await response.json()) as PrometheusPayload;
  return payload.data?.result?.[0] ?? null;
}

export async function getMetricsSnapshot() {
  const baseUrl = process.env.PROMETHEUS_BASE_URL?.replace(/\/$/, "");
  const token = process.env.PROMETHEUS_API_TOKEN;
  if (!baseUrl || !token) throw new Error("Prometheus access is not configured");

  const entries = await Promise.all(
    Object.entries(queries).map(async ([key, query]) => {
      try {
        const result = await queryPrometheus(baseUrl, token, query);
        const raw = result?.value?.[1];
        const value = raw === undefined ? null : Number(raw);
        return [key, Number.isFinite(value) ? value : null] as const;
      } catch {
        return [key, null] as const;
      }
    }),
  );

  const values: Record<string, number | string | null> = Object.fromEntries(entries);

  try {
    const topRoute = await queryPrometheus(
      baseUrl,
      token,
      "topk(1, sum by (path) (increase(folio_analytics_pageviews_total[24h])))",
    );
    values.topRoute = topRoute?.metric?.path ?? null;
    const routeViews = topRoute?.value?.[1];
    values.topRouteViews = routeViews === undefined ? null : Number(routeViews);
  } catch {
    values.topRoute = null;
    values.topRouteViews = null;
  }

  return values;
}
