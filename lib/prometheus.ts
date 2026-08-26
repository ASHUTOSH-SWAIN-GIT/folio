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
} as const;

type PrometheusPayload = {
  status: string;
  data?: { result?: Array<{ value?: [number, string] }> };
};

export async function getMetricsSnapshot() {
  const baseUrl = process.env.PROMETHEUS_BASE_URL?.replace(/\/$/, "");
  const token = process.env.PROMETHEUS_API_TOKEN;
  if (!baseUrl || !token) throw new Error("Prometheus access is not configured");

  const entries = await Promise.all(
    Object.entries(queries).map(async ([key, query]) => {
      const url = new URL("/api/v1/query", baseUrl);
      url.searchParams.set("query", query);

      try {
        const response = await fetch(url, {
          cache: "no-store",
          headers: { Authorization: `Bearer ${token}` },
          signal: AbortSignal.timeout(6000),
        });
        if (!response.ok) return [key, null] as const;

        const payload = (await response.json()) as PrometheusPayload;
        const raw = payload.data?.result?.[0]?.value?.[1];
        const value = raw === undefined ? null : Number(raw);
        return [key, Number.isFinite(value) ? value : null] as const;
      } catch {
        return [key, null] as const;
      }
    }),
  );

  return Object.fromEntries(entries);
}
