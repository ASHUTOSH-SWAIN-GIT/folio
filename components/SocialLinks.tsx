"use client";

import { useState } from "react";

export default function SocialLinks() {
  const [copied, setCopied] = useState(false);
  const email = "ashutoshswain7383@gmail.com";

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-[color:var(--subtle)]">
      <a
        href="https://x.com/LowKeyDevs"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[color:var(--foreground)] transition-colors"
      >
        X
      </a>
      <span className="text-[color:var(--border)]">•</span>
      <a
        href="https://github.com/ASHUTOSH-SWAIN-GIT"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[color:var(--foreground)] transition-colors"
      >
        GitHub
      </a>
      <span className="text-[color:var(--border)]">•</span>
      <button
        onClick={handleCopy}
        className="hover:text-[color:var(--foreground)] transition-colors"
        aria-label="Copy Email"
      >
        {copied ? "Email Copied" : "Email"}
      </button>
      <span className="text-[color:var(--border)]">•</span>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[color:var(--foreground)] transition-colors"
      >
        Resume
      </a>
    </div>
  );
}
