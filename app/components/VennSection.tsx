"use client";

import React from "react";
import Image from "next/image";

interface VennSectionProps {
  onBookCall?: () => void;
}

export default function VennSection({ onBookCall }: VennSectionProps) {
  const handleAction = () => {
    if (onBookCall) {
      onBookCall();
    } else {
      window.location.href = "mailto:zaib7@example.com?subject=Book%20a%20call%20with%20Zaib";
    }
  };

  return (
    <section id="venn" className="p-8 sm:p-14 border-b border-neutral-800/80 bg-black flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* 4-Circle Venn Diagram Container */}
      <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
        {/* SVG Venn Diagram Outline */}
        <svg
          viewBox="0 0 540 540"
          className="w-full h-full select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top Circle */}
          <circle
            cx="270"
            cy="198"
            r="145"
            stroke="currentColor"
            strokeWidth="1"
            className="text-neutral-800"
          />

          {/* Bottom Circle */}
          <circle
            cx="270"
            cy="342"
            r="145"
            stroke="currentColor"
            strokeWidth="1"
            className="text-neutral-800"
          />

          {/* Left Circle */}
          <circle
            cx="198"
            cy="270"
            r="145"
            stroke="currentColor"
            strokeWidth="1"
            className="text-neutral-800"
          />

          {/* Right Circle */}
          <circle
            cx="342"
            cy="270"
            r="145"
            stroke="currentColor"
            strokeWidth="1"
            className="text-neutral-800"
          />

          {/* Top Label */}
          <text
            x="270"
            y="120"
            textAnchor="middle"
            fill="#a3a3a3"
            fontSize="13.5"
            fontWeight="400"
            fontFamily="system-ui, -apple-system, sans-serif"
            className="select-none tracking-tight"
          >
            Design Systems &amp; Engineering
          </text>

          {/* Left Label */}
          <text
            x="110"
            y="274"
            textAnchor="middle"
            fill="#a3a3a3"
            fontSize="13.5"
            fontWeight="400"
            fontFamily="system-ui, -apple-system, sans-serif"
            className="select-none tracking-tight"
          >
            Design Engineering
          </text>

          {/* Right Label */}
          <text
            x="430"
            y="274"
            textAnchor="middle"
            fill="#a3a3a3"
            fontSize="13.5"
            fontWeight="400"
            fontFamily="system-ui, -apple-system, sans-serif"
            className="select-none tracking-tight"
          >
            Product Strategy
          </text>

          {/* Bottom Label */}
          <text
            x="270"
            y="422"
            textAnchor="middle"
            fill="#a3a3a3"
            fontSize="13.5"
            fontWeight="400"
            fontFamily="system-ui, -apple-system, sans-serif"
            className="select-none tracking-tight"
          >
            UI/UX Design &amp; Research
          </text>
        </svg>

        {/* Center Intersecting Avatar */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-neutral-700/80 p-0.5 bg-neutral-900 overflow-hidden shadow-2xl pointer-events-auto transition-transform duration-300 hover:scale-105">
            <Image
              src="/avatar.jpeg"
              alt="Zaib Avatar"
              fill
              sizes="80px"
              className="object-cover rounded-full"
              priority
            />
          </div>
        </div>
      </div>

      {/* Text below diagram */}
      <p className="text-sm sm:text-base text-neutral-300 font-normal tracking-tight mt-8 mb-5">
        Interested in working together? Let&apos;s connect.
      </p>

      {/* Resume link button */}
      <a
        href="/Zaib_UI-UX_Designer_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onBookCall}
        className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-700/80 hover:border-neutral-500 hover:bg-neutral-800 text-white text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95 cursor-pointer group"
      >
        <span className="w-5 h-5 rounded-full overflow-hidden border border-neutral-600 relative flex-shrink-0">
          <Image
            src="/avatar.jpeg"
            alt="Zaib avatar icon"
            fill
            className="object-cover"
          />
        </span>
        <span>View Resume</span>
      </a>
    </section>
  );
}
