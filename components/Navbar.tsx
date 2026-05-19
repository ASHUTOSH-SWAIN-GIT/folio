import Link from "next/link";

const links = [
  { href: "/", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "work" },
  { href: "/blog", label: "writing" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-8 sm:py-10 mb-10">
      <Link
        href="/"
        className="text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--accent)] transition-colors"
      >
        lowkeydev
      </Link>
      <div className="flex items-center gap-5 sm:gap-6 text-sm text-[color:var(--subtle)]">
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
    </nav>
  );
}
