import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between py-10 mb-14">
      <Link href="/" className="text-lg font-display tracking-tight text-[color:var(--foreground)] hover:text-[color:var(--accent-strong)] transition-colors">
        LowKeyDev
      </Link>
      <div className="flex items-center gap-5 text-xs uppercase tracking-[0.25em] text-[color:var(--subtle)]">
        <Link href="/" className="hover:text-[color:var(--foreground)] transition-colors">
          Home
        </Link>
        <Link href="/experience" className="hover:text-[color:var(--foreground)] transition-colors">
          Experience
        </Link>
        <Link href="/projects" className="hover:text-[color:var(--foreground)] transition-colors">
          Projects
        </Link>
        <Link href="/blog" className="hover:text-[color:var(--foreground)] transition-colors">
          Blog
        </Link>
      </div>
    </nav>
  );
}
