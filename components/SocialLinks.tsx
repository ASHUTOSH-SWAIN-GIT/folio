"use client";

import { useState } from "react";
import { SiX, SiGithub, SiGmail } from "react-icons/si";
import { FileText } from "lucide-react";

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
        className="text-gray-400 hover:text-mocha-mauve transition-colors relative group"
        aria-label="Twitter"
        title="Twitter"
      >
        <SiX size={24} />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Twitter
        </span>
      </a>
      <a 
        href="https://github.com/ASHUTOSH-SWAIN-GIT" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-mocha-mauve transition-colors relative group"
        aria-label="GitHub"
        title="GitHub"
      >
        <SiGithub size={24} />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          GitHub
        </span>
      </a>
      <button
        onClick={handleCopy}
        className="text-gray-400 hover:text-mocha-mauve transition-colors relative cursor-pointer group"
        aria-label="Copy Email"
        title="Mail"
      >
        <SiGmail size={24} />
        {copied ? (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg border border-gray-700">
            Copied!
          </span>
        ) : (
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Mail
          </span>
        )}
      </button>
      <a 
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-mocha-mauve transition-colors relative group"
        aria-label="Resume"
        title="Resume"
      >
        <FileText size={24} />
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded shadow-lg border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Resume
        </span>
      </a>
    </div>
  );
}

