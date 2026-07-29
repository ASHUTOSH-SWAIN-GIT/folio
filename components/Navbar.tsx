"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "work" },
  { href: "/blog", label: "writing" },
  { href: "/blueprints", label: "blueprints" },
  { href: "/voiceovers", label: "voiceovers" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 -mx-6 sm:-mx-8 mb-10 border-b border-hairline bg-[color:var(--background)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 sm:px-8 py-5">
        <Link
          href="/"
          className="text-sm font-medium text-[color:var(--foreground)] hover:text-[color:var(--accent)] transition-colors"
          onClick={() => setOpen(false)}
        >
          lowkeydev
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-5 text-sm text-[color:var(--subtle)]">
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

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-[color:var(--subtle)] hover:text-[color:var(--foreground)] transition-colors"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="sm:hidden border-t border-hairline px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[color:var(--subtle)] hover:text-[color:var(--foreground)] transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
