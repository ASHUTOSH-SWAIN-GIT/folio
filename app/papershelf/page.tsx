import { papers } from "@/lib/papers";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Papershelf",
  description: "Papers I'm reading.",
};

export default function PapershelfPage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
          Papershelf
        </h1>
      </section>

      {papers.length === 0 ? (
        <div className="border-t border-hairline py-10">
          <p className="text-sm text-[color:var(--subtle)]">
            Updating shortly.
          </p>
        </div>
      ) : (
        <div className="flex flex-col border-t border-hairline">
          {papers.map((paper) => (
            <a
              key={paper.title}
              href={paper.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-2 border-b border-hairline py-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-base font-medium text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">
                  {paper.title}
                </h2>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-mono text-xs text-[color:var(--subtle)]">
                    {paper.year}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className="text-[color:var(--subtle)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]"
                  />
                </div>
              </div>
              <p className="text-sm text-[color:var(--muted)]">
                {paper.authors}
              </p>
              {paper.note && (
                <p className="text-sm leading-relaxed text-[color:var(--muted)]">
                  {paper.note}
                </p>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
