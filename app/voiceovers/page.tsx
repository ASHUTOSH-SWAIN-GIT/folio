import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Voiceovers",
  description: "Recorded walkthroughs of things I've built.",
};

type Voiceover = {
  title: string;
  description: string;
  duration?: string;
  link: string;
};

const voiceovers: Voiceover[] = [
  {
    title: "Stream Processing Engine",
    description:
      "Walkthrough of the engine — why stream processing exists, Kafka partitions to readers, source, router, the stateless and stateful worker stages, sinks, and backpressure.",
    duration: "11 min",
    link: "https://drive.google.com/drive/u/1/folders/1tFdPwr-3XI1lG5HwfzvGBV9vTRBz3tvC",
  },
  {
    title: "Designing Reddit",
    description:
      "System design walkthrough of Reddit — how posts, feeds, votes and comments fit together, and the tradeoffs behind each piece.",
    link: "https://drive.google.com/drive/folders/15T1PUaVVosUGLCtJWYKJWAHWTa8F7YaX?usp=sharing",
  },
];

export default function VoiceoversPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
          Voiceovers
        </h1>
        <p className="text-sm text-[color:var(--muted)]">
          Recorded walkthroughs where I explain things I&apos;ve built.
        </p>
      </section>

      {voiceovers.length === 0 ? (
        <div className="border-t border-hairline py-10">
          <p className="text-sm text-[color:var(--subtle)]">Updating shortly.</p>
        </div>
      ) : (
        <div className="flex flex-col border-t border-hairline">
          {voiceovers.map((vo) => (
            <a
              key={vo.title}
              href={vo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 border-b border-hairline py-5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-base font-medium text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">
                  {vo.title}
                </h2>
                <div className="flex items-center gap-2 shrink-0">
                  {vo.duration && (
                    <span className="font-mono text-xs text-[color:var(--subtle)]">
                      {vo.duration}
                    </span>
                  )}
                  <ArrowUpRight
                    size={14}
                    className="text-[color:var(--subtle)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]"
                  />
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                {vo.description}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
