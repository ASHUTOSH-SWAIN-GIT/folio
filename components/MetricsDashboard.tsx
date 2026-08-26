"use client";

import { Activity, Cpu, Database, MemoryStick, Radio, Server } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Snapshot = {
  configured: boolean;
  checkedAt: string;
  values: {
    portfolioUp: number | null;
    prometheusUp: number | null;
    nodeExporterUp: number | null;
    cpuUsage: number | null;
    memoryUsage: number | null;
    scrapeRate: number | null;
  } | null;
};

const statusItems = [
  { key: "portfolioUp", label: "Portfolio", icon: Radio },
  { key: "prometheusUp", label: "Prometheus", icon: Database },
  { key: "nodeExporterUp", label: "Node exporter", icon: Server },
] as const;

function percentage(value: number | null | undefined) {
  return value == null ? "--" : `${value.toFixed(1)}%`;
}

export default function MetricsDashboard() {
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/api/observability", { cache: "no-store" });
      setSnapshot((await response.json()) as Snapshot);
    } catch {
      setSnapshot(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(refresh, 30_000);
    return () => window.clearInterval(interval);
  }, [refresh]);

  const values = snapshot?.values;
  const connected = Boolean(snapshot?.configured && values);

  return (
    <div className="space-y-10">
      <section className="border-y border-hairline py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className={`h-2.5 w-2.5 rounded-full ${connected ? "bg-emerald-700" : "bg-[color:var(--subtle)]"}`}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-medium">
                {loading ? "Contacting Prometheus" : connected ? "Telemetry connected" : "Telemetry unavailable"}
              </p>
              <p className="font-mono text-xs text-subtle">
                {snapshot?.checkedAt
                  ? `checked ${new Date(snapshot.checkedAt).toLocaleTimeString()}`
                  : "waiting for the first sample"}
              </p>
            </div>
          </div>
          <Activity size={19} className="text-accent" aria-hidden="true" />
        </div>
      </section>

      <section aria-labelledby="services-heading">
        <p id="services-heading" className="mb-4 font-mono text-xs uppercase text-subtle">
          Target health
        </p>
        <div className="divide-y divide-hairline border-y border-hairline">
          {statusItems.map(({ key, label, icon: Icon }) => {
            const up = values?.[key] === 1;
            return (
              <div key={key} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <Icon size={17} className="text-subtle" aria-hidden="true" />
                  <span className="text-sm">{label}</span>
                </div>
                <span className={`font-mono text-xs ${up ? "text-emerald-700" : "text-subtle"}`}>
                  {values?.[key] == null ? "no data" : up ? "up" : "down"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-px overflow-hidden border border-hairline bg-[color:var(--hairline)] sm:grid-cols-3">
        <div className="bg-[color:var(--background)] p-5">
          <Cpu size={18} className="mb-6 text-accent" aria-hidden="true" />
          <p className="font-mono text-3xl tabular-nums">{percentage(values?.cpuUsage)}</p>
          <p className="mt-1 text-xs text-subtle">EC2 CPU, 5 min</p>
        </div>
        <div className="bg-[color:var(--background)] p-5">
          <MemoryStick size={18} className="mb-6 text-accent" aria-hidden="true" />
          <p className="font-mono text-3xl tabular-nums">{percentage(values?.memoryUsage)}</p>
          <p className="mt-1 text-xs text-subtle">EC2 memory used</p>
        </div>
        <div className="bg-[color:var(--background)] p-5">
          <Radio size={18} className="mb-6 text-accent" aria-hidden="true" />
          <p className="font-mono text-3xl tabular-nums">
            {values?.scrapeRate == null ? "--" : values.scrapeRate.toFixed(1)}
          </p>
          <p className="mt-1 text-xs text-subtle">scrapes per minute</p>
        </div>
      </section>

      {!snapshot?.configured && !loading && (
        <p className="border-l-2 border-[color:var(--accent)] pl-4 text-sm leading-6 text-muted">
          Set <span className="font-mono text-xs text-[color:var(--foreground)]">PROMETHEUS_BASE_URL</span> on
          the server to connect this page to Prometheus.
        </p>
      )}
    </div>
  );
}
