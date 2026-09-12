import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pt-16 sm:pt-24">
      <section className="flex flex-col gap-5">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[color:var(--foreground)]">
          Ashutosh Swain
        </h1>
      </section>

      <section className="flex flex-col gap-4 text-[15px] leading-7 text-[color:var(--muted)]">
        <p>
          I&apos;m a software engineer focused on backend and systems work,
          primarily in Go. I&apos;m drawn to the layer of software most users
          never see: databases, distributed systems, protocols, and the
          infrastructure that keeps everything running.
        </p>
        <p>
          Beyond the systems work, what I care about most is shipping things
          people genuinely use. Every project here is open source, mistakes
          and all.
        </p>
        <p>
          Wanna talk more about my work?{" "}
          <a
            href="https://calendly.com/ashuswain9876/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[color:var(--foreground)] underline decoration-2 decoration-[color:var(--accent)] underline-offset-4 transition-colors hover:text-[color:var(--accent)]"
          >
            Book a meet
          </a>
          .
        </p>
      </section>

      <SocialLinks />
    </div>
  );
}
