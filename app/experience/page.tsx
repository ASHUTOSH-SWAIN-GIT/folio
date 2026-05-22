import { experience } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Work",
  description: "Where I've worked.",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
          Work
        </h1>
      </section>

      <div className="flex flex-col border-t border-hairline">
        {experience.map((item) => {
          const inner = (
            <div className="group flex flex-col gap-2 border-b border-hairline py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-medium text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">
                  {item.company}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-[color:var(--subtle)]">
                    {item.timeframe}
                  </span>
                  {item.link && (
                    <ArrowUpRight
                      size={14}
                      className="text-[color:var(--subtle)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]"
                    />
                  )}
                </div>
              </div>
              <p className="text-sm text-[color:var(--muted)]">{item.role}</p>
              <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                {item.focus}
              </p>
            </div>
          );

          return item.link ? (
            <a
              key={`${item.company}-${item.role}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {inner}
            </a>
          ) : (
            <div key={`${item.company}-${item.role}`}>{inner}</div>
          );
        })}
      </div>
    </div>
  );
}
