import SocialLinks from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pt-16 sm:pt-24">
      <section className="flex flex-col gap-5">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[color:var(--foreground)]">
          Ashutosh Swain
        </h1>
        <p className="text-base text-[color:var(--subtle)]">
          Software engineer · Bhubaneswar, India
        </p>
      </section>

      <section className="flex flex-col gap-4 text-[15px] leading-7 text-[color:var(--muted)]">
        <p>
          I&apos;m a computer science undergrad who likes building the
          unglamorous parts of software — protocols, storage engines,
          schedulers, and the boring infrastructure that holds everything up.
        </p>
        <p>
          Most days I&apos;m writing Go. Currently a software engineering
          intern at{" "}
          <a
            href="https://www.commenda.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--foreground)] underline decoration-[color:var(--hairline-strong)] underline-offset-4 hover:text-[color:var(--accent)] hover:decoration-[color:var(--accent)] transition-colors"
          >
            Commenda
          </a>
          , working on reliability and backend systems. Outside of work I read
          systems papers and port the ideas into small repos to see how they
          actually behave under load.
        </p>
        <p>I learn in public — repos open, mistakes included.</p>
      </section>

      <SocialLinks />
    </div>
  );
}
