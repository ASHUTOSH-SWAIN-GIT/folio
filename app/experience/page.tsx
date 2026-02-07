import { experience } from "@/lib/data";

export const metadata = {
  title: "Experience | My Portfolio",
  description: "My professional experience and roles.",
};

export default function ExperiencePage() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4 pb-8">
        <p className="text-xs uppercase tracking-[0.45em] text-[color:var(--subtle)]">Work</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">Experience</h1>
      </section>

      <div className="flex flex-col gap-6">
        {experience.map((item) => (
          <div
            key={`${item.company}-${item.role}`}
            className="flex flex-col gap-4 rounded-2xl bg-[color:var(--surface)] p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={`${item.company} logo`}
                    className="h-12 w-12 rounded-full bg-[color:var(--background)] object-contain"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-[color:var(--background)]" />
                )}
                <div>
                  <p className="text-lg font-semibold text-[color:var(--foreground)]">{item.company}</p>
                  <p className="text-sm text-[color:var(--muted)]">{item.role}</p>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--subtle)]">{item.timeframe}</p>
            </div>
            <p className="text-sm text-[color:var(--muted)]">{item.focus}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
