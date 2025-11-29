import { blogs } from "@/lib/data";

export const metadata = {
  title: "Blog | My Portfolio",
  description: "Thoughts on software development and design.",
};

export default function Blog() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      </section>

      <div className="flex flex-col gap-8">
        {blogs.map((post) => (
          <a 
            key={post.slug} 
            href={post.link || `/blog/${post.slug}`}
            target={post.link ? "_blank" : undefined}
            rel={post.link ? "noopener noreferrer" : undefined}
            className="group flex flex-col gap-2"
          >
            <div className="flex justify-between items-baseline">
              <h2 className="text-lg font-semibold group-hover:text-mocha-mauve transition-colors">
                {post.title}
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {post.excerpt}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

