"use client";

import { useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { FileText, Mail, Check } from "lucide-react";

const iconLinks = [
  {
    label: "GitHub",
    href: "https://github.com/ASHUTOSH-SWAIN-GIT",
    Icon: FaGithub,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/LowKeyDevs",
    Icon: FaXTwitter,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    Icon: FileText,
  },
];

export default function SocialLinks() {
  const [copied, setCopied] = useState(false);
  const email = "ashutoshswain7383@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex items-center gap-2">
      {iconLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-[color:var(--muted)] transition-all duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:-translate-y-0.5"
        >
          <Icon size={16} />
        </a>
      ))}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Email copied" : "Copy email address"}
        title={copied ? "Copied!" : email}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-hairline text-[color:var(--muted)] transition-all duration-200 hover:border-[color:var(--accent)] hover:text-[color:var(--accent)] hover:-translate-y-0.5"
      >
        {copied ? <Check size={16} /> : <Mail size={16} />}
      </button>
    </div>
  );
}
