import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <a
      href={project.demo || project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-2 border-b border-hairline py-5 transition-colors"
    >
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-2.5">
          <h3 className="text-base font-medium text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">
            {project.title}
          </h3>
          {project.status && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--subtle)]">
              {project.status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-[color:var(--subtle)] tabular-nums">
            {project.year}
          </span>
          <ArrowUpRight
            size={14}
            className="text-[color:var(--subtle)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]"
          />
        </div>
      </div>
      <p className="text-sm leading-relaxed text-[color:var(--muted)]">
        {project.description}
      </p>
      <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[11px] text-[color:var(--subtle)]">
        {project.tags.map((tag, i) => (
          <span key={tag} className="inline-flex items-center gap-2">
            {i > 0 && <span className="text-[color:var(--faint)]">·</span>}
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
