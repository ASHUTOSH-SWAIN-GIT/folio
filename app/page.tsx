import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiX, SiGithub, SiGmail } from "react-icons/si";
import { projects, blogs } from "@/lib/data";
import TechBadge from "@/components/TechBadge";

export default function Home() {
  const recentProjects = projects.slice(0, 2);
  const recentBlogs = blogs.slice(0, 2);

  return (
    <div className="flex flex-col gap-16">
      <section className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">hey, i'm Ashutosh</h1>
        <p className="text-gray-400 leading-relaxed max-w-lg">
          Computer Science undergrad passionate about building, breaking, and learning through code. Always exploring new technologies and eager to tackle new challenges.
        </p>
        <div className="flex items-center gap-4">
           <a 
            href="https://x.com/LowKeyDevs" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-mocha-mauve transition-colors"
            aria-label="Twitter"
          >
            <SiX size={24} />
          </a>
          <a 
            href="https://github.com/ASHUTOSH-SWAIN-GIT" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-mocha-mauve transition-colors"
            aria-label="GitHub"
          >
            <SiGithub size={24} />
          </a>
          <a 
            href="mailto:ashutoshswain7383@gmail.com" 
            className="text-gray-400 hover:text-mocha-mauve transition-colors"
            aria-label="Email"
          >
            <SiGmail size={24} />
          </a>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-semibold">Projects</h2>
          <Link href="/projects" className="text-sm text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {recentProjects.map((project) => (
            <a 
              key={project.title} 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 -mx-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-medium group-hover:text-mocha-mauve transition-colors">
                  {project.title}
                </h3>
              </div>
              <p className="text-sm text-gray-400 mb-3">{project.description}</p>
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <TechBadge key={tag} tag={tag} />
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-semibold">Blogs</h2>
          <Link href="/blog" className="text-sm text-gray-500 hover:text-white flex items-center gap-1 transition-colors">
            Read all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          {recentBlogs.map((post) => (
            <a 
              key={post.slug} 
              href={post.link || `/blog/${post.slug}`}
              target={post.link ? "_blank" : undefined}
              rel={post.link ? "noopener noreferrer" : undefined}
              className="group flex flex-col gap-1 p-4 -mx-4 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium group-hover:text-mocha-mauve transition-colors">
                  {post.title}
                </h3>
              </div>
              <p className="text-sm text-gray-400">
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
