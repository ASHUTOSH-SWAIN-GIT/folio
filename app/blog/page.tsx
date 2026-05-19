import { blogs } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Writing",
  description: "Essays on systems, infra and what I'm reading.",
};

export default function Blog() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
          Writing
        </h1>
      </section>

      <div className="flex flex-col border-t border-hairline">
        {blogs.map((post) => (
          <a
            key={post.slug}
            href={post.link || `/blog/${post.slug}`}
            target={post.link ? "_blank" : undefined}
            rel={post.link ? "noopener noreferrer" : undefined}
            className="group flex flex-col gap-2 border-b border-hairline py-5"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-base font-medium text-[color:var(--foreground)] transition-colors group-hover:text-[color:var(--accent)]">
                {post.title}
              </h2>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs text-[color:var(--subtle)]">
                  {post.date}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-[color:var(--subtle)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--accent)]"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[color:var(--muted)]">
              {post.excerpt}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
