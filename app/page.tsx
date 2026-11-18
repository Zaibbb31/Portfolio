"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Sun01Icon,
  Moon01Icon,
  Mail01Icon,
  File01Icon,
  Copy01Icon,
  CheckmarkBadge01Icon,
  GithubIcon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import GitHubContributions from "./components/GitHubContributions";
import Footer from "./components/Footer";
import SkillsSection from "./components/SkillsSection";
import VennSection from "./components/VennSection";
import Lightfall from "./components/Lightfall";
import DogMascot from "./components/DogMascot";
import { PROJECTS } from "./data/projects";

interface ExperienceItem {
  company: string;
  role: string;
  type?: string;
  period: string;
  logo?: string;
  logoSvg?: React.ReactNode;
  points?: string[];
}

function renderFormattedPoint(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

const EXPERIENCES: ExperienceItem[] = [
  {
    company: "AMA Legal Solutions",
    role: "UX/UI Designer",
    period: "Sept 2025 - Present",
    logo: "/AMA.svg",
    points: [
      "Designed **AMA Connect** (pro bono legal aid app) and complex legal-tech SaaS platforms (**LegalRecovery** and **WillDrafting**), architecting **case management**, **real-time tracking**, and consultation workflows.",
      "Led **end-to-end UI/UX design** across web and mobile products—driving user research, user flows, wireframes, **high-fidelity prototypes**, and responsive interfaces.",
      "Designed and developed **responsive web experiences**, directly translating Figma design systems into functional, accessible front-end interfaces.",
      "Architected and deployed **10+ custom Shopify stores**, delivering tailored storefronts, conversion-focused UI, and optimized e-commerce user journeys.",
      "Created multi-channel **digital marketing creatives**, brand campaigns, and promotional assets, generating **12,000+ additional page views** and expanding digital presence.",
    ],
  },
  {
    company: "DroDro",
    role: "UX/UI Designer",
    period: "April 2025 - Aug 2025",
    logo: "/drodro-primary-logo.png",
    points: [
      "Owned the **end-to-end UX/UI design lifecycle from scratch** for both the website and mobile app, leading research, user flows, wireframes, interactive prototypes, and production UI with complete **design ownership**.",
      "Designed intuitive **two-sided marketplace experiences** connecting clients with creative professionals for weddings and events, including streamlined **vendor onboarding** for photographers, videographers, and cinematographers.",
      "Established **scalable design patterns** and a **unified visual design system** across web and mobile platforms, ensuring brand consistency, high usability, and seamless developer handoff.",
    ],
  },
];

export default function Home() {
  const [projectCategory, setProjectCategory] = useState<"ui-screens" | "case-study">("ui-screens");
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

  const [emailCopied, setEmailCopied] = useState(false);
  const [heroEmailCopied, setHeroEmailCopied] = useState(false);

  const handleCopyEmail = (isHero = false) => {
    playClickSound();
    try {
      if (navigator?.clipboard) {
        navigator.clipboard.writeText("zaib.work31@gmail.com");
      }
    } catch {}
    if (isHero) {
      setHeroEmailCopied(true);
      setTimeout(() => setHeroEmailCopied(false), 2000);
    } else {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const composeEmail = () => handleCopyEmail(false);

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
        handleCopyEmail(true);
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
    { title: "The Mess. (Creative Archive)", category: "Archive", href: "/the-mess" },
    { title: "View Resume (PDF)", category: "Document", href: "/Zaib_UI-UX_Designer_Resume copy.pdf", isExternal: true },
    { title: "Send Email (zaib.work31@gmail.com)", category: "Contact", href: "mailto:zaib.work31@gmail.com" },
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
              href="/the-mess"
              onClick={playClickSound}
              className="text-neutral-400 hover:text-white transition-colors text-xs"
            >
              The Mess.
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
        <section className="pt-10 sm:pt-12 pb-6 sm:pb-8 px-6 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-neutral-800/80">
          
          {/* Left Column: Avatar + status toggle underneath */}
          <div className="flex flex-col items-center sm:items-start flex-shrink-0">
            {/* Square avatar with rounded corners + Animated Dog Mascot */}
            <div className="relative">
              <DogMascot />
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
              
              {/* View resume */}
              <a
                href="/Zaib_UI-UX_Designer_Resume copy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClickSound}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-all duration-150 shadow-sm active:scale-95 cursor-pointer"
              >
                <HugeiconsIcon icon={File01Icon} size={15} className="text-black" />
                <span>View resume</span>
              </a>

              {/* Send an email (Click to copy email) */}
              <button
                type="button"
                onClick={() => handleCopyEmail(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-semibold transition-all duration-150 shadow-sm active:scale-95 cursor-pointer group"
                title="Click to copy email address"
              >
                <HugeiconsIcon icon={Mail01Icon} size={15} className="text-white" />
                <span>{heroEmailCopied ? "Email copied!" : "Send an email"}</span>
                {heroEmailCopied ? (
                  <HugeiconsIcon icon={CheckmarkBadge01Icon} size={14} className="text-emerald-400 animate-in fade-in duration-150" />
                ) : (
                  <HugeiconsIcon icon={Copy01Icon} size={14} className="text-neutral-400 group-hover:text-white transition-colors" />
                )}
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
              href="/Zaib_UI-UX_Designer_Resume copy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClickSound}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 active:scale-95"
            >
              <HugeiconsIcon icon={File01Icon} size={14} className="text-neutral-400" />
              <span>Resume</span>
            </a>

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

            {/* Email CTA with Copy Icon */}
            <button
              type="button"
              onClick={() => handleCopyEmail(false)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 text-white text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer group"
              title="Click to copy email address"
            >
              <HugeiconsIcon icon={Mail01Icon} size={14} className="text-neutral-400 group-hover:text-neutral-300 transition-colors" />
              <span>zaib.work31@gmail.com</span>
              <span className="flex items-center pl-1 text-neutral-400 group-hover:text-white transition-colors">
                {emailCopied ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-mono animate-in fade-in duration-150">
                    <HugeiconsIcon icon={CheckmarkBadge01Icon} size={13} className="text-emerald-400" />
                    <span>Copied!</span>
                  </span>
                ) : (
                  <HugeiconsIcon icon={Copy01Icon} size={13} className="text-neutral-500 group-hover:text-neutral-300 transition-colors" />
                )}
              </span>
            </button>

          </div>
        </section>

        {/* 6. EXPERIENCE SECTION - Directly below Connect, matching screenshot */}
        <section id="experience" className="p-6 sm:p-8 border-b border-neutral-800/80">
          <h2 className="text-base sm:text-lg font-medium text-white mb-5">
            Experience
          </h2>

          <div className="flex flex-col gap-6 sm:gap-7">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={idx}
                className="flex flex-col py-0.5 group"
              >
                {/* Header row: Company Logo Box + Company Name & Role + Period */}
                <div className="flex items-start sm:items-center justify-between gap-3">
                  {/* Left: Logo + Info */}
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
                  <span className="text-xs sm:text-[13px] text-neutral-500 font-normal whitespace-nowrap text-right pt-0.5 sm:pt-0">
                    {exp.period}
                  </span>
                </div>

                {/* Pointers / Bullet Points describing contributions & role */}
                {exp.points && exp.points.length > 0 && (
                  <ul className="mt-3 pl-3 sm:pl-[54px] flex flex-col gap-2 list-none">
                    {exp.points.map((point, pIdx) => (
                      <li
                        key={pIdx}
                        className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 flex-shrink-0 mt-1.5" />
                        <span>{renderFormattedPoint(point)}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
          {/* Main Heading & Filter Pills */}
          <div className="flex flex-col gap-3 mb-6">
            <h2 className="text-base sm:text-lg font-medium text-white">
              Projects
            </h2>

            {/* Filter Pills: UI Screens & Case Study */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setProjectCategory("ui-screens");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                  projectCategory === "ui-screens"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800/80"
                }`}
                aria-pressed={projectCategory === "ui-screens"}
              >
                <span>UI Screens</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setProjectCategory("case-study");
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                  projectCategory === "case-study"
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-neutral-800/80"
                }`}
                aria-pressed={projectCategory === "case-study"}
              >
                <span>Case Study</span>
              </button>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {(
              (projectCategory === "case-study"
                ? [
                    {
                      id: "lexora",
                      title: "Lexora",
                      description: "End-to-end legal support for banking, loan settlement, trademark, cyber law, and compliance, redesigned into a seamless mobile experience.",
                      image: "/lexora/Lexora Legal App Promo.png",
                      tags: [
                        "LegalTech",
                        "UI/UX Design",
                        "Mobile App",
                        "Case Study",
                      ],
                      buttonLabel: "Case Study",
                    },
                    {
                      id: "paytm-rewards",
                      title: "Paytm Rewards",
                      description: "Turning generic scratch cards into goal-oriented rewards that users actually care to earn through choice architecture.",
                      image: "/paytm/paytm-upi-hero.jpg",
                      tags: [
                        "Fintech",
                        "Product Strategy",
                        "UX Research",
                        "Gamification",
                      ],
                      buttonLabel: "Case Study",
                    },
                    {
                      id: "doconline-mobile-app",
                      title: "DocOnline Mobile App",
                      description: "A modern healthcare experience redesigned to simplify appointments, health tracking, medical access, and symptom discovery.",
                      image: "/P1.svg",
                      codeUrl: "https://github.com/Zaibbb31",
                      tags: [
                        "Assessment for Freelance Proposal",
                        "Healthcare",
                        "UI/UX",
                        "Mobile App",
                      ],
                      buttonLabel: "Case Study",
                    },
                  ]
                : [
                    {
                      id: "schooldash",
                      title: "SchoolDash",
                      description: "A comprehensive K-12 school management ecosystem streamlining admissions, attendance, exams, and communication across Admin, Teacher, and Student portals.",
                      image: "/Emmanuel Mission School Login Workspace.png",
                      liveUrl: "https://emmanuelmission.vercel.app/",
                      codeUrl: "https://github.com/Zaibbb31",
                      tags: ["EdTech", "UI/UX", "System Design"],
                      buttonLabel: "View Screens",
                    },
                    {
                      id: "ux-teardowns",
                      title: "UX Teardowns & Redesigns",
                      description: "Systematic UX audits and iterative screen redesigns for leading consumer apps (Gmail, Instagram, IRCTC, Paytm, WhatsApp, Airtel, Spotify).",
                      image: "/P3.svg",
                      codeUrl: "https://github.com/Zaibbb31",
                      tags: ["UI/UX", "Teardowns", "Systems"],
                      buttonLabel: "View Screens",
                    },
                    {
                      id: "settlr",
                      title: "Settlr",
                      description: "Helping people take control of their debt through clear loan insights, financial education, and accessible legal support.",
                      image: "/Settlr.png",
                      behanceUrl: "https://www.behance.net/gallery/257455215/Settlr",
                      codeUrl: "https://github.com/Zaibbb31",
                      tags: ["Figma", "Fintech", "UX Research"],
                      buttonLabel: "View Screens",
                    },
                    {
                      id: "zero-friction-lab",
                      title: "Zero Friction Lab",
                      description: "Digital systems and AI automation studio engineering custom intelligence workflows and high-converting web architecture.",
                      image: "/Cinematic AI Workspace Website Mockup.png",
                      liveUrl: "https://www.zerofrictionlab.com/",
                      codeUrl: "https://github.com/Zaibbb31",
                      tags: ["AI Automation", "Product Design", "Systems"],
                      buttonLabel: "View Screens",
                    },
                  ]
              ) as Array<{
                id: string;
                title: string;
                description: string;
                image: string;
                tags: string[];
                buttonLabel?: string;
                liveUrl?: string;
                behanceUrl?: string;
                codeUrl?: string;
              }>
            ).map((project) => (
              <div
                key={project.id}
                className="flex flex-col rounded-xl bg-transparent transition-all duration-200 group"
              >
                {/* Preview Image Box - Clickable link to slug page */}
                <Link
                  href={`/projects/${project.id}`}
                  onClick={playClickSound}
                  className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-neutral-800 bg-[#09090b] mb-3.5 flex items-center justify-center group-hover:border-neutral-600 transition-colors cursor-pointer"
                  aria-label={`View ${project.title}`}
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

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/projects/${project.id}`}
                      onClick={playClickSound}
                      className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition-all duration-150 active:scale-95 cursor-pointer"
                    >
                      <span>{project.buttonLabel || "View Screens"}</span>
                    </Link>
                    {project.behanceUrl && (
                      <a
                        href={project.behanceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClickSound}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-all duration-150 active:scale-95 shadow-sm cursor-pointer"
                      >
                        <span>Behance</span>
                        <span className="text-[11px] font-mono leading-none">↗</span>
                      </a>
                    )}
                    {project.liveUrl && project.liveUrl.startsWith("http") && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClickSound}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-all duration-150 active:scale-95 shadow-sm cursor-pointer"
                      >
                        <span>Live Site</span>
                        <span className="text-[11px] font-mono leading-none">↗</span>
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
                  {project.tags.map((tag, tagIdx) => {
                    const isProposal = tag.toLowerCase().includes("assessment") || tag.toLowerCase().includes("proposal");
                    return (
                      <span
                        key={tagIdx}
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] select-none transition-colors ${
                          isProposal
                            ? "bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-medium"
                            : "bg-neutral-900/90 border border-neutral-800 text-neutral-300"
                        }`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
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
