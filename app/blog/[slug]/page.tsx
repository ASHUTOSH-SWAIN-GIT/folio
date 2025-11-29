import { blogs } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Correct type definition for Next.js App Router dynamic pages
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: `${post.title} | My Portfolio`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="flex flex-col gap-8">
      <Link 
        href="/blog" 
        className="text-sm text-gray-500 hover:text-white flex items-center gap-2 transition-colors mb-4"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>
      
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 font-mono">
          <time>{post.date}</time>
          <span>•</span>
          <span>5 min read</span>
        </div>
      </header>
      
      <div className="prose prose-invert prose-gray max-w-none">
        <p className="text-lg text-gray-300 leading-relaxed">
          {post.excerpt}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <h2>The Main Concept</h2>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <blockquote>
          "Simplicity is the ultimate sophistication."
        </blockquote>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
          <code>{`// Example code block
function hello() {
  console.log("Hello, world!");
}`}</code>
        </pre>
      </div>
    </article>
  );
}

