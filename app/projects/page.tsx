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
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
      </section>

      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <div 
            key={project.title} 
            className="group flex flex-col gap-3 p-6 border border-gray-800 rounded-xl hover:border-gray-700 hover:bg-white/5 transition-all"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-white group-hover:text-mocha-mauve transition-colors flex items-center gap-2">
                {project.title}
              </h3>
            </div>
            
            <p className="text-gray-400 leading-relaxed">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-2 mb-2">
              {project.tags.map(tag => (
                <TechBadge key={tag} tag={tag} />
              ))}
            </div>

            <div className="flex gap-4 mt-2">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Github size={16} /> Source
              </a>
              
              {/* @ts-ignore - demo is optional */}
              {project.demo && (
                <a 
                  // @ts-ignore
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
