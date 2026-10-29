"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Sun01Icon,
  Moon01Icon,
  Video01Icon,
  Mail01Icon,
  File01Icon,
  SentIcon,
  GithubIcon,
  Linkedin01Icon,
  NewTwitterIcon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import GitHubContributions from "./components/GitHubContributions";
import Footer from "./components/Footer";
import SkillsSection from "./components/SkillsSection";
import VennSection from "./components/VennSection";
import Lightfall from "./components/Lightfall";
import { PROJECTS } from "./data/projects";

const PRIMARY_SKILLS = [
  "UX Design",
  "UI Design",
  "Product Design",
  "Design Systems",
  "Front-End Development",
  "Workshops",
  "Design Sprint",
  "Interaction Design",
  "User Testing",
  "Usability Testing",
  "UX Research",
  "Leadership",
  "Mentoring",
  "No-Code",
];

const ADDITIONAL_SKILLS = [
  "Figma",
  "Design Tokens",
  "Framer",
  "Wireframing",
  "React.js",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Prototyping",
  "Information Architecture",
  "A/B Testing",
  "Micro-interactions",
];

interface ExperienceItem {
  company: string;
  role: string;
  type?: string;
  period: string;
  logo?: string;
  logoSvg?: React.ReactNode;
}

const EXPERIENCES: ExperienceItem[] = [
  
  {
    company: "AMA Legal Solutions",
    role: "UX/UI Designer",
    period: "Sept 2025 - Present",
    logo: "/AMA.svg",
  },
  {
    company: "DroDro",
    role: "UX/UI Designer",
    period: "April 2025 - Aug 2025",
    logo: "/drodro-primary-logo.png",
  },
];

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showMoreSkills, setShowMoreSkills] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hiToast, setHiToast] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Synthesized mechanical click sound with Web Audio API
  const playClickSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.035);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch {
      // Audio not supported or blocked
    }
  };

  const handleSoundToggle = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      setTimeout(() => {
        try {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(0.1, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.05);
        } catch {}
      }, 50);
    }
  };

  const composeEmail = () => {
    playClickSound();
    window.location.href = "mailto:zaib7@example.com?subject=Hello%20Zaib%20-%20Project%20Inquiry";
  };

  // Sync isDarkMode with document.documentElement
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Keyboard shortcut listener for Cmd+K and 'C' to compose email
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        if (event.key === "Escape") {
          setSearchOpen(false);
        }
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((prev) => !prev);
        return;
      }

      if (event.key === "c" || event.key === "C") {
        event.preventDefault();
        composeEmail();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [soundEnabled]);

  // Focus input when search modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [searchOpen]);

  interface SearchResultItem {
    title: string;
    category: string;
    href: string;
    isExternal?: boolean;
  }

  // Search filter options
  const searchResults: SearchResultItem[] = [
    { title: "About Section", category: "Section", href: "#about" },
    { title: "Connect & Socials", category: "Section", href: "#connect" },
    { title: "Experience", category: "Section", href: "#experience" },
    { title: "Activity", category: "Section", href: "#activity" },
    { title: "Featured Projects", category: "Section", href: "#projects" },
    { title: "View Resume (PDF)", category: "Document", href: "/Zaib_UI-UX_Designer_Resume.pdf", isExternal: true },
    { title: "Send Email (zaib7@example.com)", category: "Contact", href: "mailto:zaib7@example.com" },
    ...PROJECTS.map((p) => ({
      title: p.title,
      category: `Project (${p.category})`,
      href: `/projects/${p.id}`,
    })),
  ].filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`relative min-h-screen w-full transition-colors duration-300 selection:bg-neutral-800 selection:text-white ${
        isDarkMode ? "bg-[#000000] text-[#ededed]" : "bg-[#ffffff] text-[#09090b]"
      }`}
    >
      {/* MAIN CONTAINER: exact max-w-4xl with borders matching screenshot */}
      <main
        className={`w-full max-w-4xl mx-auto border-x transition-colors duration-300 relative min-h-screen ${
          isDarkMode ? "border-neutral-800/80 bg-[#000000]" : "border-neutral-200 bg-[#ffffff]"
        }`}
      >
        {/* 1. TOP HEADER / NAVBAR (Flush within container borders) */}
        <header
          className={`sticky top-0 z-40 w-full px-5 sm:px-8 py-3 flex items-center justify-between border-b backdrop-blur-md select-none transition-colors duration-300 ${
            isDarkMode
              ? "border-neutral-800/80 bg-[#000000]/90"
              : "border-neutral-200 bg-[#ffffff]/90"
          }`}
        >
          {/* Logo brand on left */}
          <Link
            href="/"
            onClick={playClickSound}
            className="flex items-center select-none group"
            aria-label="Home"
          >
            <div className="relative h-7 sm:h-8 w-14 sm:w-16 flex items-center">
              <Image
                src={isDarkMode ? "/logoblack.svg" : "/Logowhite.svg"}
                alt="Zaib Logo"
                width={64}
                height={33}
                className="object-contain h-6 sm:h-7 w-auto transition-transform duration-200 group-hover:scale-105"
                priority
              />
            </div>
          </Link>

          {/* Right action & navigation items */}
          <div className="flex items-center gap-3 sm:gap-5 text-xs">
            <Link
              href="#projects"
              onClick={playClickSound}
              className="text-neutral-400 hover:text-white transition-colors text-xs"
            >
              Projects
            </Link>
            <Link
              href="#connect"
              onClick={playClickSound}
              className="text-neutral-400 hover:text-white transition-colors text-xs"
            >
              Contact
            </Link>

            {/* Search ⌘K Pill Button */}
            <button
              type="button"
              onClick={() => {
                playClickSound();
                setSearchOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer text-xs"
            >
              <HugeiconsIcon icon={Search01Icon} size={14} className="text-neutral-400" />
              <span>Search</span>
             
            </button>

           
          </div>
        </header>

        {/* 2. LIGHTFALL HERO BANNER */}
        <section
          aria-label="Hero background banner"
          className="w-full h-36 sm:h-44 border-b border-neutral-800/80 relative overflow-hidden bg-neutral-950/40"
        >
          <Lightfall
            colors={["#0002ff"]}
            backgroundColor="#000000"
            speed={0.3}
            streakCount={14}
            streakWidth={0.8}
            twinkle={0.3}
            backgroundGlow={0.1}
            headGlow={0.6}
            bloom={0.35}
            mouseInteraction
            holdToWarp
            intro
            streakLength={1.2}
            density={0.6}
            glow={1}
            depth={0.5}
            zoom={3}
            mouseStrength={0.4}
            mouseRadius={0.45}
            lens={0.5}
            fade={0}
            lightMode={false}
          />
        </section>

        {/* 3. HERO PROFILE SECTION - Avatar + Info + CTA buttons */}
        <section className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-neutral-800/80">
          
          {/* Left Column: Avatar + status toggle underneath */}
          <div className="flex flex-col items-center sm:items-start flex-shrink-0">
            {/* Square avatar with rounded corners */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-neutral-700/60 bg-[#121215] shadow-lg group">
              <Image
                src="/avatar.jpeg"
                alt="Zaib portrait"
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-300"
                priority
              />
            </div>

          
          </div>

          {/* Right Column: Name, Titles & CTA Actions */}
          <div className="flex flex-col items-start justify-center flex-1">
            <h1 className="text-2xl sm:text-[28px] font-semibold text-white tracking-tight leading-tight">
              Zaib
            </h1>
            
            <p className="text-sm sm:text-[15px] text-neutral-400 font-normal mt-1 leading-snug">
              Product &amp; UI/UX Designer
            </p>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5 leading-snug">
              Creative Developer &amp; Growth
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2.5 mt-4 sm:mt-5">
              
              {/* Book a call */}
              <a
                href="mailto:zaib7@example.com?subject=Book%20a%20Call%20-%20Project%20Discussion"
                onClick={playClickSound}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black text-xs font-semibold transition-all duration-150 shadow-sm active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={Video01Icon} size={15} className="text-black" />
                <span>Book a call</span>
              </a>

              {/* Send an email */}
              <button
                type="button"
                onClick={composeEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs font-semibold transition-all duration-150 shadow-sm active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={Mail01Icon} size={15} className="text-white" />
                <span>Send an email</span>
              </button>

            </div>
          </div>

        </section>

        {/* 4. ABOUT SECTION - Exact bullet points & typography */}
        <section id="about" className="p-6 sm:p-8 border-b border-neutral-800/80">
          <h2 className="text-base sm:text-lg font-medium text-white mb-4">
            About
          </h2>

          <ul className="space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-neutral-300 font-normal">
            <li className="flex items-start gap-2.5">
              <span className="text-neutral-500 select-none mt-0.5">•</span>
              <span>
                I&apos;m Zaib, a UI/UX &amp; Product Designer with <span className="text-white font-bold">1.5+ years of experience</span>, crafting intuitive digital experiences with a strong focus on visual precision and usability.
              </span>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="text-neutral-500 select-none mt-0.5">•</span>
              <span>
                I transform complex user needs into intuitive experiences through user research, information architecture, wireframing, prototyping, and thoughtful interaction design.
              </span>
            </li>

            <li className="flex items-start gap-2.5">
              <span className="text-neutral-500 select-none mt-0.5">•</span>
              <span>
                I design and build end-to-end products using{" "}
                <span className="underline underline-offset-4 decoration-neutral-500 font-medium text-white">
                  Figma, React, Next.js, and TypeScript
                </span>
                , turning complex ideas into clean, responsive interfaces.
              </span>
            </li>
          </ul>
        </section>

        {/* 5. CONNECT SECTION - Exact horizontal pill buttons */}
        <section id="connect" className="p-6 sm:p-8 border-b border-neutral-800/80">
          <h2 className="text-base sm:text-lg font-medium text-white mb-4">
            Connect
          </h2>

          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            
            {/* Resume button */}
            <a
              href="/Zaib_UI-UX_Designer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 active:scale-95"
            >
              <HugeiconsIcon icon={File01Icon} size={14} className="text-neutral-400" />
              <span>Resume</span>
            </a>

            {/* Contact button */}
            <button
              type="button"
              onClick={composeEmail}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <HugeiconsIcon icon={SentIcon} size={14} className="text-neutral-400" />
              <span>Contact</span>
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/Zaibbb31"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 active:scale-95"
            >
              <HugeiconsIcon icon={GithubIcon} size={14} className="text-neutral-400" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/zaib-ba7086379"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 active:scale-95"
            >
              <HugeiconsIcon icon={Linkedin01Icon} size={14} className="text-neutral-400" />
              <span>LinkedIn</span>
            </a>

            {/* X (Twitter) */}
            <a
              href="https://x.com/Mzaib181"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 active:scale-95"
            >
              <HugeiconsIcon icon={NewTwitterIcon} size={14} className="text-neutral-400" />
              <span>X (Twitter)</span>
            </a>

            {/* Email */}
            <button
              type="button"
              onClick={composeEmail}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <HugeiconsIcon icon={Mail01Icon} size={14} className="text-neutral-400" />
              <span>Email</span>
            </button>

          </div>
        </section>

        {/* 6. EXPERIENCE SECTION - Directly below Connect, matching screenshot */}
        <section id="experience" className="p-6 sm:p-8 border-b border-neutral-800/80">
          <h2 className="text-base sm:text-lg font-medium text-white mb-5">
            Experience
          </h2>

          <div className="flex flex-col gap-4">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 py-1"
              >
                {/* Left: Company Logo Box + Company Name & Role */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white border border-neutral-200/20 overflow-hidden flex items-center justify-center flex-shrink-0 p-1.5 shadow-sm">
                    {exp.logo ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      exp.logoSvg || (
                        <span className="text-black font-bold text-sm">
                          {exp.company.charAt(0)}
                        </span>
                      )
                    )}
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight">
                      {exp.company}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-400 font-normal mt-0.5">
                      {exp.role} {exp.type && `• ${exp.type}`}
                    </p>
                  </div>
                </div>

                {/* Right: Date */}
                <span className="text-xs sm:text-[13px] text-neutral-500 font-normal whitespace-nowrap text-right">
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. ACTIVITY SECTION - Directly below Experience, matching screenshot */}
        <section id="activity" className="p-6 sm:p-8 border-b border-neutral-800/80">
          <h2 className="text-base sm:text-lg font-medium text-white mb-6">
            Activity
          </h2>

          <div className="w-full flex justify-center">
            <GitHubContributions variant="minimal" />
          </div>
        </section>

        {/* 8. PROJECTS SECTION - Matching Screenshot Image 1 */}
        <section id="projects" className="p-6 sm:p-8 border-b border-neutral-800/80 bg-black">
          <h2 className="text-base sm:text-lg font-medium text-white mb-6">
            Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {[
              {
                id: "settlr",
                title: "Settlr",
                description: "Smart expense splitting and automated payment settlement platform designed for groups and teams.",
                image: "/projects/settlr.svg",
                liveUrl: "https://settlr.app",
                codeUrl: "https://github.com/Zaibbb31",
                tags: [
                  {
                    name: "Next.js",
                    icon: (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm3.5 13.5l-4.5-6.5v6.5H9.5V8.5h1.5l4.5 6.5V8.5h1.5v7z"/>
                      </svg>
                    ),
                  },
                  {
                    name: "TypeScript",
                    icon: (
                      <span className="w-3 h-3 rounded-[2px] bg-[#3178c6] text-white font-bold text-[8px] flex items-center justify-center leading-none">
                        TS
                      </span>
                    ),
                  },
                  {
                    name: "FinTech",
                    icon: (
                      <span className="w-3 h-3 rounded-[2px] bg-[#10b981] text-white font-bold text-[8px] flex items-center justify-center leading-none">
                        $
                      </span>
                    ),
                  },
                  {
                    name: "TailwindCSS",
                    icon: (
                      <svg className="w-3 h-3 text-[#38bdf8]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 6c-3 0-5 1.5-6 4.5 1.2-1.5 2.5-2 4-1.7 1 .2 1.7 1 2.5 1.8C13.8 11.8 15.2 13 18 13c3 0 5-1.5 6-4.5-1.2 1.5-2.5 2-4 1.7-1-.2-1.7-1-2.5-1.8C16.2 7.2 14.8 6 12 6z"/>
                      </svg>
                    ),
                  },
                ],
              },
            ].map((project) => (
              <div
                key={project.id}
                className="flex flex-col rounded-xl bg-transparent transition-all duration-200 group"
              >
                {/* Preview Image Box - Clickable link to slug page */}
                <Link
                  href={`/projects/${project.id}`}
                  onClick={playClickSound}
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-neutral-800 bg-[#09090b] mb-3.5 flex items-center justify-center group-hover:border-neutral-600 transition-colors cursor-pointer"
                  aria-label={`View ${project.title} case study`}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 450px"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </Link>

                {/* Title & Action Buttons */}
                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/projects/${project.id}`}
                    onClick={playClickSound}
                    className="hover:text-neutral-300 transition-colors group/title"
                  >
                    <h3 className="text-base sm:text-lg font-normal font-instrument text-white tracking-tight group-hover/title:underline underline-offset-4">
                      {project.title}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/projects/${project.id}`}
                      onClick={playClickSound}
                      className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 text-neutral-300 hover:text-white text-[11px] font-medium transition-all active:scale-95"
                    >
                      Case Study
                    </Link>
                    {project.liveUrl && project.liveUrl.startsWith("http") && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClickSound}
                        className="inline-flex items-center justify-center px-2 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white text-[11px] font-medium transition-all active:scale-95"
                      >
                        Live
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClickSound}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white text-[11px] font-medium transition-all active:scale-95"
                      >
                        <HugeiconsIcon icon={GithubIcon} size={11} className="text-neutral-400 group-hover:text-white" />
                        <span>Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Short description */}
                <Link
                  href={`/projects/${project.id}`}
                  onClick={playClickSound}
                  className="text-xs text-neutral-400 hover:text-neutral-300 font-normal line-clamp-1 mt-1.5 transition-colors"
                >
                  {project.description}
                </Link>

                {/* Tech stack badge pills */}
                <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-900/90 border border-neutral-800 text-[11px] text-neutral-300 select-none"
                    >
                      {tag.icon}
                      <span>{tag.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Centered See all projects button */}
          <div className="flex justify-center mt-8">
            <a
              href="#projects"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-neutral-100 hover:bg-white text-neutral-900 text-xs font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <span>See all projects</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
              />
            </a>
          </div>
        </section>

        {/* 9. SKILLS SECTION - Matching Screenshot Image 2 */}
        <SkillsSection />

        {/* 10. VENN DIAGRAM SECTION - Matching Screenshot Image 3 */}
        <VennSection onBookCall={composeEmail} />

        {/* 11. FOOTER SECTION - Matching Screenshot Image 4 */}
        <Footer />

      </main>

      {/* COMMAND PALETTE MODAL (CMD+K SEARCH) */}
      {searchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-[#0e0e12] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input bar */}
            <div className="flex items-center px-4 py-3 border-b border-neutral-800 gap-3">
              <HugeiconsIcon icon={Search01Icon} size={16} className="text-neutral-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none"
              />
              <kbd className="text-[10px] font-mono bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-400 border border-neutral-700/60">
                ESC
              </kbd>
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-neutral-900">
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    onClick={() => {
                      playClickSound();
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-neutral-800/70 transition-colors text-xs group cursor-pointer"
                  >
                    <span className="text-neutral-200 group-hover:text-white font-medium">
                      {item.title}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 group-hover:text-neutral-400">
                      {item.category}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-neutral-500">
                  No matching results found for &ldquo;{searchQuery}&rdquo;
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
