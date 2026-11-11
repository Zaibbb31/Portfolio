"use client";

import React from "react";

interface SkillCategory {
  number: string;
  title: string;
  badge?: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: "01",
    title: "AI & Generative Tools",
    
    skills: [
      "ChatGPT",
      "Claude",
      "Google AI Studio",
      "Gemini",
      "Midjourney",
      "Nano Banana",
      "Cursor",
      "Antigravity",
    ],
  },
  {
    number: "02",
    title: "UI/UX & Product Design",
    skills: [
      "Figma",
      "Design Systems",
      "Auto Layout",
      "Variables & Tokens",
      "UX Research",
      "Wireframing",
      "Prototyping",
      "SaaS Dashboard Design",
    ],
  },
  {
    number: "03",
    title: "Creative Frontend Development",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
    ],
  },
  {
    number: "04",
    title: "Motion & Creative Development",
    skills: [
      "GSAP",
      "Framer Motion",
      "Lenis",
      "ScrollTrigger",
      "Spline",
      "Three.js",
      "Lottie",
      "WebGL",
    ],
  },
  {
    number: "05",
    title: "AI-Powered Workflow & Deployment",
    skills: [
      "Vibe Coding",
      "Prompt Engineering",
      "AI-Assisted Development",
      "Git & GitHub",
      "Vercel",
      "API Integration",
      "Automation",
      "MCP",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="p-6 sm:p-8 border-b border-neutral-800/80 bg-black">
      {/* Section Master Heading */}
      <h2 className="text-base sm:text-lg font-medium text-white mb-6">
        Skills &amp; Tech Stack
      </h2>

      {/* Categorized Skills Grid */}
      <div className="flex flex-col gap-6 sm:gap-7">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.number} className="flex flex-col gap-3">
            {/* Category Subheading Row */}
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight">
                {cat.number}. {cat.title}
              </h3>
              {cat.badge && (
                <span className="px-2.5 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium tracking-wide bg-neutral-900 border border-neutral-800 text-neutral-400">
                  {cat.badge}
                </span>
              )}
            </div>

            {/* Badges container - monochrome reduced roundness pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg bg-neutral-900/90 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/80 text-neutral-300 hover:text-white text-xs font-normal transition-all duration-150 select-none shadow-sm cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
