import { blogs } from "@/lib/data";

export const metadata = {
  title: "Blog | My Portfolio",
  description: "Thoughts on software development and design.",
};

export default function Blog() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4 pb-8">
        <p className="text-xs uppercase tracking-[0.45em] text-[color:var(--subtle)]">Writing</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Blog</h1>
      </section>

      <div className="flex flex-col">
        {blogs.map((post) => (
          <a 
            key={post.slug} 
            href={post.link || `/blog/${post.slug}`}
            target={post.link ? "_blank" : undefined}
            rel={post.link ? "noopener noreferrer" : undefined}
            className="group flex flex-col gap-2 py-6 transition-colors"
          >
            <div className="flex justify-between items-baseline">
              <h2 className="text-lg font-semibold group-hover:text-[color:var(--accent)] transition-colors">
                {post.title}
              </h2>
            </div>
            <p className="text-[color:var(--muted)] leading-relaxed group-hover:text-[color:var(--foreground)] transition-colors">
              {post.excerpt}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
