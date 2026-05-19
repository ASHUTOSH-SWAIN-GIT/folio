import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/lib/data";

export default function ProjectRow({ project }: { project: Project }) {
  const primaryHref = project.demo || project.link;

  return (
    <div className="group flex flex-col gap-2 border-b border-hairline py-5">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-2.5">
          <a
            href={primaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-medium text-[color:var(--foreground)] hover:text-[color:var(--accent)] transition-colors"
          >
            {project.title}
          </a>
          {project.status && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--subtle)]">
              {project.status}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-xs text-[color:var(--subtle)] tabular-nums">
            {project.year}
          </span>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source`}
            title="Source"
            className="text-[color:var(--subtle)] transition-colors hover:text-[color:var(--accent)]"
          >
            <FaGithub size={15} />
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              title="Live site"
              className="text-[color:var(--subtle)] transition-colors hover:text-[color:var(--accent)]"
            >
              <ArrowUpRight size={15} />
            </a>
          )}
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
    </div>
  );
}
