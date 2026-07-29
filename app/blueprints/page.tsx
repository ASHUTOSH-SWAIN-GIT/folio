"use client";

import { useState } from "react";
import { X } from "lucide-react";

const blueprints = [
  {
    title: "Zookeeper Paper",
    description: "Architecture notes on Apache ZooKeeper — leader election, watches, and the ZAB protocol.",
    image: "/images/blueprint-zookeeper.png",
  },
  {
    title: "Casper (Initial Thought)",
    description: "Early design sketch for Casper — AI-driven infra governance with sandbox validation and audit trails.",
    image: "/images/blueprint-casper.png",
  },
  {
    title: "Sharding vs Partitioning",
    description: "Diagram breaking down horizontal vs vertical sharding, partitioning trade-offs, and ZooKeeper's role in metadata.",
    image: "/images/blueprint-sharding.png",
  },
];

export default function BlueprintsPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
          Blueprints
        </h1>
        <p className="text-sm text-[color:var(--muted)]">
          System architecture sketches and design thinking, drawn in Excalidraw.
        </p>
      </section>

      <div className="flex flex-col border-t border-hairline">
        {blueprints.map((bp, i) => (
          <button
            key={bp.title}
            onClick={() => setActive(i)}
            className="group flex flex-col gap-2 border-b border-hairline py-5 text-left w-full"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h2 className="text-base font-medium text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">
                {bp.title}
              </h2>
              <span className="font-mono text-xs text-[color:var(--subtle)] shrink-0">
                excalidraw
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[color:var(--muted)]">
              {bp.description}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Scrollable image at native resolution — no upscaling */}
          <div
            className="overflow-auto rounded-lg"
            style={{ maxWidth: "95vw", maxHeight: "90vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blueprints[active].image}
              alt={blueprints[active].title}
              style={{ display: "block", imageRendering: "auto" }}
            />
          </div>

          <p className="mt-3 text-center text-sm text-white/50">
            {blueprints[active].title} · scroll to explore
          </p>
        </div>
      )}
    </div>
  );
}
