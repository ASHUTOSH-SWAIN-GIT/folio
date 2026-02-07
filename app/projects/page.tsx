import { projects } from "@/lib/data";
import { Github, ExternalLink } from "lucide-react";
import TechBadge from "@/components/TechBadge";

export const metadata = {
  title: "Projects | My Portfolio",
  description: "A selection of my recent work.",
};

export default function Projects() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-5 pb-6">
        <p className="text-[11px] uppercase tracking-[0.5em] text-[color:var(--subtle)]">Work</p>
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[color:var(--foreground)]">
            Selected Projects
          </h1>
          <p className="max-w-2xl text-sm text-[color:var(--muted)]">
            A focused set of systems and product builds. Each project prioritizes reliability, clarity, and
            precise execution.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[color:var(--surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -right-12 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute bottom-0 left-8 h-24 w-24 rounded-full bg-[color:var(--accent)]/10 blur-3xl" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5">
                  <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">
                    {project.title}
                  </h3>
                  {project.status && (
                    <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                      {project.status}
                    </span>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-[0.35em] text-[color:var(--subtle)]">
                  {project.year}
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[color:var(--muted)] transition-colors group-hover:text-[color:var(--foreground)]">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TechBadge key={tag} tag={tag} />
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3 border-t border-white/10 pt-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-sm text-white transition-colors hover:border-white/40 hover:bg-white hover:text-black"
              >
                <Github size={16} /> Source
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white px-4 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
