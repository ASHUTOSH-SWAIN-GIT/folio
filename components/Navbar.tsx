import Link from "next/link";

const links = [
  { href: "/", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "work" },
  { href: "/blog", label: "writing" },
  { href: "/papershelf", label: "papershelf" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 -mx-6 sm:-mx-8 mb-10 border-b border-hairline bg-[color:var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 sm:px-8 py-5">
        <Link
          href="/"
          className="text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--accent)] transition-colors"
        >
          lowkeydev
        </Link>
        <div className="flex items-center gap-4 sm:gap-5 text-sm text-[color:var(--subtle)]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-[color:var(--foreground)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
