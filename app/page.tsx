import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects, blogs } from "@/lib/data";
import TechBadge from "@/components/TechBadge";
import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  const recentProjects = projects.slice(0, 2);
  const recentBlogs = blogs.slice(0, 2);

  return (
    <div className="flex flex-col gap-20">
      <section className="flex flex-col gap-7 pb-12">
        <p className="text-xs uppercase tracking-[0.45em] text-[color:var(--subtle)]">Software Engineer</p>
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl sm:text-6xl font-semibold leading-tight">Ashutosh Swain</h1>
          <p className="text-muted leading-relaxed max-w-2xl">
            Computer Science undergrad focused on building reliable, thoughtful software. I ship clean interfaces, build systems, and learn in public.
          </p>
        </div>
        <SocialLinks />
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--subtle)]">Selected Projects</h2>
          <Link href="/projects" className="text-xs text-[color:var(--subtle)] hover:text-[color:var(--foreground)] flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {recentProjects.map((project) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-4 rounded-3xl bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-semibold group-hover:text-[color:var(--accent)] transition-colors">
                  {project.title}
                </h3>
                {project.status && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent-strong)]">
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--subtle)]">{project.year}</p>
              <p className="text-sm text-[color:var(--muted)] group-hover:text-[color:var(--foreground)] transition-colors">
                {project.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <TechBadge key={tag} tag={tag} />
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end pb-3">
          <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-[color:var(--subtle)]">Writing</h2>
          <Link href="/blog" className="text-xs text-[color:var(--subtle)] hover:text-[color:var(--foreground)] flex items-center gap-1 transition-colors">
            Read all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex flex-col">
          {recentBlogs.map((post) => (
            <a
              key={post.slug}
              href={post.link || `/blog/${post.slug}`}
              target={post.link ? "_blank" : undefined}
              rel={post.link ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-2 py-6 transition-colors"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold group-hover:text-[color:var(--accent)] transition-colors">
                  {post.title}
                </h3>
              </div>
              <p className="text-sm text-[color:var(--muted)] group-hover:text-[color:var(--foreground)] transition-colors">
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
