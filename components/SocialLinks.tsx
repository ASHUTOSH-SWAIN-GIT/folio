"use client";

import { useState } from "react";
import { SiX, SiGithub, SiGmail } from "react-icons/si";

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
    <div className="flex items-center gap-4">
      <a 
        href="https://x.com/LowKeyDevs" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-mocha-mauve transition-colors"
        aria-label="Twitter"
      >
        <SiX size={24} />
      </a>
      <a 
        href="https://github.com/ASHUTOSH-SWAIN-GIT" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-mocha-mauve transition-colors"
        aria-label="GitHub"
      >
        <SiGithub size={24} />
      </a>
      <button
        onClick={handleCopy}
        className="text-gray-400 hover:text-mocha-mauve transition-colors relative cursor-pointer"
        aria-label="Copy Email"
        title="Click to copy email"
      >
        <SiGmail size={24} />
        {copied && (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg border border-gray-700 animate-fade-in">
            Copied!
          </span>
        )}
      </button>
    </div>
  );
}

