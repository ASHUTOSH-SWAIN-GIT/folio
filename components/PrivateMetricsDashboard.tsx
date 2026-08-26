"use client";

import { Activity, Cpu, Database, Eye, Footprints, HardDrive, LogOut, MemoryStick, Radio, RefreshCw, Route, Server } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Values = Record<string, number | string | null>;
type Snapshot = { values: Values; checkedAt: string };

const targets = [
  ["portfolioUp", "Portfolio", Radio],
  ["prometheusUp", "Prometheus", Database],
  ["nodeExporterUp", "Node exporter", Server],
  ["analyticsUp", "Analytics collector", Activity],
] as const;

function numeric(value: number | string | null | undefined) {
  return typeof value === "number" ? value : null;
}

function formatPercent(value: number | string | null | undefined) {
  const number = numeric(value);
  return number == null ? "--" : `${number.toFixed(1)}%`;
}

function formatCount(value: number | string | null | undefined) {
  const number = numeric(value);
  return number == null ? "--" : Math.round(number).toLocaleString();
}

function formatBytes(value: number | string | null | undefined) {
  const number = numeric(value);
  if (number == null) return "--";
  return `${(number / 1024 / 1024).toFixed(1)} MB`;
}

function formatDuration(value: number | string | null | undefined) {
  const number = numeric(value);
  if (number == null) return "--";
  if (number < 60) return `${Math.round(number)} sec`;
  return `${Math.round(number / 60)} min`;
}

function formatRoute(value: number | string | null | undefined) {
  return typeof value === "string" ? value : "--";
}

export default function PrivateMetricsDashboard() {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/metrics-dashboard", { cache: "no-store" });
      if (response.status === 401) {
        router.refresh();
        return;
      }
      if (!response.ok) throw new Error();
      setSnapshot((await response.json()) as Snapshot);
      setError("");
    } catch {
      setError("Prometheus is not reachable from the dashboard API.");
    } finally {
      setRefreshing(false);
    }
  }, [router]);

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(refresh, 30_000);
    return () => window.clearInterval(interval);
  }, [refresh]);

  async function logout() {
    await fetch("/api/metrics-auth", { method: "DELETE" });
    router.refresh();
  }

  const values = snapshot?.values;
  const cards = [
    ["CPU", formatPercent(values?.cpuUsage), "5 minute average", Cpu],
    ["Memory", formatPercent(values?.memoryUsage), "EC2 memory used", MemoryStick],
    ["Disk", formatPercent(values?.diskUsage), "root filesystem used", HardDrive],
    ["App memory", formatBytes(values?.portfolioMemory), "Vercel process RSS", Activity],
    ["App uptime", formatDuration(values?.portfolioUptime), "current Vercel instance", Radio],
  ] as const;
  const trafficCards = [
    ["Visits", formatCount(values?.visits24h), "last 24 hours", Footprints],
    ["Page views", formatCount(values?.pageViews24h), "last 24 hours", Eye],
    ["Bounce rate", formatPercent(values?.bounceRate), "left before 10 seconds", Activity],
    ["7 day visits", formatCount(values?.visits7d), "rolling seven days", Radio],
    ["Top route", formatRoute(values?.topRoute), `${formatCount(values?.topRouteViews)} views today`, Route],
  ] as const;

  return (
    <div className="pb-20">
      <header className="mb-10 border-b border-hairline pb-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs uppercase text-accent">Private observability</p>
            <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">System pulse</h1>
            <p className="mt-3 text-sm text-muted">Prometheus snapshots from the portfolio and EC2 host.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => void refresh()}
              className="grid h-9 w-9 place-items-center border border-hairline text-subtle hover:text-[color:var(--foreground)]"
              title="Refresh metrics"
              aria-label="Refresh metrics"
            >
              <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => void logout()}
              className="grid h-9 w-9 place-items-center border border-hairline text-subtle hover:text-[color:var(--foreground)]"
              title="Sign out"
              aria-label="Sign out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
        <p className="mt-6 font-mono text-xs text-subtle">
          {snapshot ? `sampled ${new Date(snapshot.checkedAt).toLocaleTimeString()}` : "waiting for Prometheus"}
        </p>
      </header>

      {error && <p className="mb-8 border-l-2 border-[color:var(--accent)] pl-4 text-sm text-accent">{error}</p>}

      <section aria-labelledby="traffic-heading" className="mb-10">
        <p id="traffic-heading" className="mb-3 font-mono text-xs uppercase text-subtle">Portfolio traffic</p>
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-[color:var(--hairline)] sm:grid-cols-3">
          {trafficCards.map(([label, value, detail, Icon]) => (
            <div key={label} className="min-h-40 bg-[color:var(--background)] p-5">
              <Icon size={17} className="mb-7 text-accent" />
              <p className="break-all font-mono text-2xl tabular-nums">{value}</p>
              <p className="mt-1 text-xs text-subtle">{label}</p>
              <p className="mt-4 text-xs leading-5 text-faint">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="target-health">
        <p id="target-health" className="mb-3 font-mono text-xs uppercase text-subtle">Target health</p>
        <div className="divide-y divide-hairline border-y border-hairline">
          {targets.map(([key, label, Icon]) => {
            const value = values?.[key];
            const up = value === 1;
            return (
              <div key={key} className="flex items-center justify-between py-4">
                <span className="flex items-center gap-3 text-sm"><Icon size={16} className="text-subtle" />{label}</span>
                <span className={`font-mono text-xs ${up ? "text-emerald-700" : "text-subtle"}`}>
                  {value == null ? "no data" : up ? "up" : "down"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-[color:var(--hairline)] sm:grid-cols-3">
        {cards.map(([label, value, detail, Icon]) => (
          <div key={label} className="min-h-40 bg-[color:var(--background)] p-5">
            <Icon size={17} className="mb-7 text-accent" />
            <p className="font-mono text-2xl tabular-nums">{value}</p>
            <p className="mt-1 text-xs text-subtle">{label}</p>
            <p className="mt-4 text-xs leading-5 text-faint">{detail}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
