import type { Metadata } from "next";
import MetricsDashboard from "@/components/MetricsDashboard";

export const metadata: Metadata = {
  title: "Observability | lowkeydev",
  description: "Live infrastructure and portfolio metrics backed by Prometheus.",
};

export default function ObservabilityPage() {
  return (
    <main className="pb-20">
      <header className="mb-12">
        <p className="mb-3 font-mono text-xs uppercase text-accent">Observability</p>
        <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">System pulse</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
          A small, live view of the infrastructure behind this site. Metrics are collected by Prometheus from
          the portfolio and its EC2 host.
        </p>
      </header>
      <MetricsDashboard />
    </main>
  );
}
