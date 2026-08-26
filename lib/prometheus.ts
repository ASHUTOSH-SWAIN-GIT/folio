const queries = {
  portfolioUp: 'up{job="folio"}',
  prometheusUp: 'up{job="prometheus"}',
  nodeExporterUp: 'up{job="node-exporter"}',
  cpuUsage:
    '100 - (avg(rate(node_cpu_seconds_total{job="node-exporter",mode="idle"}[5m])) * 100)',
  memoryUsage:
    '100 * (1 - (node_memory_MemAvailable_bytes{job="node-exporter"} / node_memory_MemTotal_bytes{job="node-exporter"}))',
  scrapeRate: 'rate(folio_metrics_scrapes_total[5m]) * 60',
} as const;

export type MetricKey = keyof typeof queries;

type PrometheusResponse = {
  status: "success" | "error";
  data?: {
    result?: Array<{ value?: [number, string] }>;
  };
};

export async function getObservabilitySnapshot() {
  const baseUrl = process.env.PROMETHEUS_BASE_URL?.replace(/\/$/, "");

  if (!baseUrl) {
    return { configured: false, values: null };
  }

  const entries = await Promise.all(
    Object.entries(queries).map(async ([key, query]) => {
      try {
        const url = new URL("/api/v1/query", baseUrl);
        url.searchParams.set("query", query);

        const response = await fetch(url, {
          cache: "no-store",
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) return [key, null] as const;

        const payload = (await response.json()) as PrometheusResponse;
        const rawValue = payload.data?.result?.[0]?.value?.[1];
        const value = rawValue === undefined ? null : Number(rawValue);

        return [key, Number.isFinite(value) ? value : null] as const;
      } catch {
        return [key, null] as const;
      }
    }),
  );

  return {
    configured: true,
    values: Object.fromEntries(entries) as Record<MetricKey, number | null>,
  };
}
