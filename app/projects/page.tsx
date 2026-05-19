import { projects } from "@/lib/data";
import ProjectRow from "@/components/ProjectRow";

export const metadata = {
  title: "Projects",
  description: "Things I've built.",
};

export default function Projects() {
  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-3">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
          Projects
        </h1>
      </section>

      <div className="flex flex-col border-t border-hairline">
        {projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
