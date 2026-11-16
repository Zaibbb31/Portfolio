"use client";

import React, { useState } from "react";

interface CopyEmailButtonProps {
  className?: string;
  email?: string;
  label?: string;
}

export default function CopyEmailButton({
  className = "",
  email = "zaib.work31@gmail.com",
  label = "Send an email",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    try {
      if (navigator?.clipboard) {
        navigator.clipboard.writeText(email);
      }
    } catch {
      // Fallback
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={
        className ||
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs sm:text-sm font-semibold transition-all duration-150 shadow-sm active:scale-95 cursor-pointer group"
      }
      title="Click to copy email address"
      aria-label={`Copy email address ${email}`}
    >
      <svg
        className="w-4 h-4 fill-none stroke-current text-white flex-shrink-0"
        viewBox="0 0 24 24"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
      <span>{copied ? "Email copied!" : label}</span>
      {copied ? (
        <svg
          className="w-3.5 h-3.5 text-emerald-400 transition-all flex-shrink-0 fill-none stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-200 transition-colors flex-shrink-0 fill-none stroke-current"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
}
