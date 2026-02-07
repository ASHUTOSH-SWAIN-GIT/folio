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
      <section className="flex flex-col gap-4 pb-8">
        <p className="text-xs uppercase tracking-[0.45em] text-[color:var(--subtle)]">Work</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Projects</h1>
      </section>

      <div className="grid grid-cols-1 gap-6">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group flex h-full flex-col gap-5 rounded-3xl bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <h3 className="text-2xl font-semibold group-hover:text-[color:var(--accent)] transition-colors">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                    {project.status}
                  </span>
                )}
              </div>
              <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--subtle)]">{project.year}</span>
            </div>

            <p className="text-[color:var(--muted)] leading-relaxed group-hover:text-[color:var(--foreground)] transition-colors">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TechBadge key={tag} tag={tag} />
              ))}
            </div>

            <div className="mt-auto flex flex-wrap gap-3 pt-1">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
              >
                <Github size={16} /> Source
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black transition-colors hover:bg-black hover:text-white"
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
