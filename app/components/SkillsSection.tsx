"use client";

import React from "react";

export default function SkillsSection() {
  const skills: string[] = [
    "Figma",
    "Antigravity",
    "Spline",
    "Jitter",
    "Miro",
    "HTML",
    "CSS",
    "Javascript",
    "Tailwind CSS",
    "Reactjs",
    "NextJS",
    "Github",
    "Shadcn UI",
    "Framer",
    "Shopify",
  ];

  return (
    <section id="skills" className="p-6 sm:p-8 border-b border-neutral-800/80 bg-black">
      <h2 className="text-base sm:text-lg font-medium text-white mb-6">
        Skills
      </h2>

      {/* Badges container - text-only pill badges without logos */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-normal transition-all duration-150 select-none shadow-sm cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
