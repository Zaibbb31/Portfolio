"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/app/data/projects";

interface EditorialSidebarCaseStudyProps {
  project: Project;
}

export default function EditorialSidebarCaseStudy({ project }: EditorialSidebarCaseStudyProps) {
  // Theme state: defaults to 'light' as shown in the reference image
  const [theme, setTheme] = useState<"light" | "dark">("light");
  
  // Sidebar state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  
  // Accordion states in sidebar
  const [researchOpen, setResearchOpen] = useState(true);
  const [insightsOpen, setInsightsOpen] = useState(true);

  const isLexora = project.id === "lexora";

  // Table of contents navigation list
  const navSections = isLexora
    ? [
        { id: "intro", num: "00", label: "Intro" },
        { id: "context", num: "01", label: "Context" },
        { id: "problem-space", num: "02", label: "Problem space" },
        { id: "strategy", num: "03", label: "Strategy" },
        { id: "core-flows", num: "04", label: "Core flows" },
        { id: "trust-security", num: "05", label: "Trust & Security" },
        { id: "decisions", num: "06", label: "Design system" },
        { id: "outcomes", num: "07", label: "Outcomes" },
        { id: "reflections", num: "08", label: "Reflections" },
      ]
    : [
        { id: "intro", num: "00", label: "Intro" },
        { id: "context", num: "01", label: "Context" },
        { id: "problem-space", num: "02", label: "Problem space" },
        { id: "strategy", num: "03", label: "Strategy" },
        { id: "core-flows", num: "04", label: "Core flows" },
        { id: "psychology", num: "05", label: "Psychology" },
        { id: "decisions", num: "06", label: "Decisions" },
        { id: "outcomes", num: "07", label: "Outcomes" },
        { id: "reflections", num: "08", label: "Reflections" },
      ];

  const researchItems = isLexora
    ? [
        { id: "why-lexora", label: "Why Lexora LegalTech" },
        { id: "scope", label: "Scope & Compliance" },
        { id: "who-i-spoke-to", label: "User Interviews" },
        { id: "affinity-clusters", label: "Affinity Clusters" },
      ]
    : [
        { id: "why-paytm-rewards", label: "Why Paytm Rewards" },
        { id: "scope", label: "Scope & Constraints" },
        { id: "who-i-spoke-to", label: "User Interviews" },
        { id: "affinity-clusters", label: "Affinity Clusters" },
      ];

  const insightItems = isLexora
    ? [
        { id: "jargon-blindness", label: "Jargon Blindness" },
        { id: "pricing-opacity", label: "Pricing Opacity" },
        { id: "intake-anxiety", label: "Intake Anxiety" },
      ]
    : [
        { id: "coupon-fatigue", label: "Coupon Fatigue" },
        { id: "agency-gap", label: "The Agency Gap" },
        { id: "milestone-anchoring", label: "Milestone Anchoring" },
      ];

  // Scrollspy to automatically highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const allIds = [
        ...navSections.map((s) => s.id),
        ...researchItems.map((s) => s.id),
        ...insightItems.map((s) => s.id),
      ];

      for (let i = allIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(allIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(allIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navSections, researchItems, insightItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const isLight = theme === "light";
  const brandTitle = isLexora ? "Lexora" : "Paytm Rewards";
  const brandSub = isLexora ? "LegalTech · concept" : "UPI · concept";
  const disclaimerNote = isLexora ? "Designed for Lexora Legal Tech." : "Not affiliated with Paytm.";

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 font-sans selection:bg-neutral-200 selection:text-black ${
        isLight
          ? "bg-[#faf9f6] text-[#121212]"
          : "bg-[#09090b] text-[#f4f4f5]"
      }`}
    >
      {/* MOBILE TOP BAR (Fixed on small screens) */}
      <header
        className={`lg:hidden sticky top-0 z-40 w-full px-4 py-3 flex items-center justify-between border-b backdrop-blur-md transition-colors ${
          isLight
            ? "bg-[#faf9f6]/95 border-neutral-200/80"
            : "bg-[#09090b]/95 border-neutral-800/80"
        }`}
      >
        <div className="flex items-center gap-2">
          <Link
            href="/#projects"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              isLight
                ? "bg-white border-neutral-300/80 text-neutral-800 hover:bg-neutral-100"
                : "bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
            }`}
          >
            <span>← Home</span>
          </Link>
          <span className="text-xs font-semibold truncate max-w-[140px] sm:max-w-[200px]">
            {brandTitle}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme switch pill button */}
          <button
            type="button"
            onClick={() => setTheme(isLight ? "dark" : "light")}
            aria-label="Toggle theme"
            className={`relative w-12 h-6 rounded-full p-0.5 border transition-colors cursor-pointer ${
              isLight
                ? "bg-neutral-200 border-neutral-300"
                : "bg-neutral-800 border-neutral-700"
            }`}
          >
            <span
              className={`block w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${
                isLight
                  ? "translate-x-0 bg-amber-400"
                  : "translate-x-6 bg-blue-400"
              }`}
            />
          </button>

          {/* Mobile TOC Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
              isLight
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-black border-white"
            }`}
          >
            <span>Index</span>
            <span className="text-[10px]">☰</span>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div
            className={`relative w-4/5 max-w-xs h-full p-5 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-r ${
              isLight
                ? "bg-[#faf9f6] border-neutral-200 text-neutral-900"
                : "bg-[#09090b] border-neutral-800 text-neutral-100"
            }`}
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200/60 dark:border-neutral-800">
                <Link
                  href="/#projects"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    isLight
                      ? "bg-white border-neutral-300 text-neutral-800"
                      : "bg-neutral-900 border-neutral-800 text-neutral-200"
                  }`}
                >
                  <span>← Home</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-sm font-mono text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div>
                <h3 className="text-base font-semibold tracking-tight">{brandTitle}</h3>
                <p className="text-xs text-neutral-500 font-normal">{brandSub}</p>
              </div>

              {/* Navigation list */}
              <nav className="flex flex-col space-y-1">
                {navSections.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`flex items-center gap-2.5 py-1.5 px-2 rounded-md text-xs text-left transition-colors cursor-pointer ${
                      activeSection === sec.id
                        ? isLight
                          ? "bg-neutral-200/70 font-semibold text-black"
                          : "bg-neutral-800 font-semibold text-white"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
                    }`}
                  >
                    <span className="font-mono text-[11px] opacity-70">{sec.num}</span>
                    <span>{sec.label}</span>
                  </button>
                ))}
              </nav>

              {/* Research sub items */}
              <div className="pt-2 border-t border-neutral-200/60 dark:border-neutral-800">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1.5">
                  Research & Process
                </span>
                <div className="flex flex-col space-y-1 pl-2">
                  {researchItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`text-xs text-left py-1 transition-colors cursor-pointer ${
                        activeSection === item.id
                          ? isLight
                            ? "text-black font-semibold"
                            : "text-white font-semibold"
                          : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px] text-neutral-400">
              {disclaimerNote}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP ROOT WRAPPER */}
      <div className="flex min-h-screen relative w-full">
        {/* COLLAPSED RAIL TOGGLE BUTTON (When sidebar is collapsed on desktop) */}
        {isCollapsed && (
          <aside
            className={`hidden lg:flex flex-col items-center py-5 px-2 border-r sticky top-0 h-screen z-30 shrink-0 transition-all duration-300 ${
              isLight
                ? "bg-[#faf9f6] border-neutral-200/80"
                : "bg-[#09090b] border-neutral-800/80"
            } w-14`}
          >
            <button
              type="button"
              onClick={() => setIsCollapsed(false)}
              title="Expand sidebar"
              className={`p-2 rounded-full border transition-all hover:scale-105 cursor-pointer ${
                isLight
                  ? "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                  : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              <span className="text-xs font-mono">›</span>
            </button>
            <span
              className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 mt-8 [writing-mode:vertical-rl] rotate-180 select-none"
            >
              {brandTitle}
            </span>
          </aside>
        )}

        {/* DESKTOP COLLAPSIBLE SIDEBAR */}
        <aside
          className={`hidden lg:flex flex-col justify-between p-6 border-r sticky top-0 h-screen z-30 shrink-0 transition-all duration-300 select-none ${
            isCollapsed ? "hidden" : "w-64 xl:w-72"
          } ${
            isLight
              ? "bg-[#faf9f6] border-neutral-200/80 text-neutral-900"
              : "bg-[#09090b] border-neutral-800/80 text-neutral-100"
          }`}
        >
          <div className="flex flex-col gap-6 overflow-y-auto pr-1 scrollbar-thin">
            {/* Header: Home pill + Collapse chevron */}
            <div className="flex items-center justify-between">
              <Link
                href="/#projects"
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer ${
                  isLight
                    ? "bg-white border-neutral-300/90 text-neutral-800 hover:bg-neutral-100 shadow-sm"
                    : "bg-neutral-900 border-neutral-800 text-neutral-200 hover:bg-neutral-800"
                }`}
              >
                <span>← Home</span>
              </Link>

              {/* Collapse Sidebar Button */}
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Collapse sidebar"
                className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-xs font-mono">‹</span>
              </button>
            </div>

            {/* Brand Title & Subtitle */}
            <div className="pt-1">
              <h2 className="text-base font-semibold tracking-tight text-neutral-900 dark:text-white">
                {brandTitle}
              </h2>
              <p className="text-xs text-neutral-500 font-normal mt-0.5">{brandSub}</p>
            </div>

            {/* Main Table of Contents List */}
            <nav className="flex flex-col space-y-0.5">
              {navSections.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`group flex items-center gap-2.5 py-1.5 px-2.5 text-xs text-left transition-all rounded-md cursor-pointer ${
                      isActive
                        ? isLight
                          ? "font-semibold text-black border-l-2 border-black pl-2"
                          : "font-semibold text-white border-l-2 border-white pl-2"
                        : "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] ${
                        isActive
                          ? isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                          : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
                      }`}
                    >
                      {sec.num}
                    </span>
                    <span className="truncate">{sec.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Collapsible Accordion: Research & process */}
            <div className="pt-3 border-t border-neutral-200/70 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setResearchOpen(!researchOpen)}
                className="w-full flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer py-1"
              >
                <span>Research & process</span>
                <span className="font-mono text-neutral-400 text-xs">
                  {researchOpen ? "×" : "+"}
                </span>
              </button>

              {researchOpen && (
                <div className="flex flex-col space-y-1 mt-1 pl-2 border-l border-neutral-200 dark:border-neutral-800 ml-1">
                  {researchItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-xs py-1 transition-colors cursor-pointer ${
                        activeSection === item.id
                          ? isLight
                            ? "text-black font-medium"
                            : "text-white font-medium"
                          : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible Accordion: Insights */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setInsightsOpen(!insightsOpen)}
                className="w-full flex items-center justify-between text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer py-1"
              >
                <span>Insights</span>
                <span className="font-mono text-neutral-400 text-xs">
                  {insightsOpen ? "–" : "+"}
                </span>
              </button>

              {insightsOpen && (
                <div className="flex flex-col space-y-1 mt-1 pl-2 border-l border-neutral-200 dark:border-neutral-800 ml-1">
                  {insightItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-xs py-1 transition-colors cursor-pointer ${
                        activeSection === item.id
                          ? isLight
                            ? "text-black font-medium"
                            : "text-white font-medium"
                          : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800 text-[11px] text-neutral-400 font-normal">
            {disclaimerNote}
          </div>
        </aside>

        {/* MAIN EDITORIAL CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* TOP RIGHT THEME SWITCH (Desktop absolute / header) */}
          <div className="hidden lg:flex items-center justify-end px-8 pt-6 pb-2">
            <button
              type="button"
              onClick={() => setTheme(isLight ? "dark" : "light")}
              title={`Switch to ${isLight ? "Dark" : "Light"} mode`}
              aria-label="Toggle light or dark theme"
              className={`relative w-12 h-6 rounded-full p-0.5 border transition-colors cursor-pointer ${
                isLight
                  ? "bg-neutral-200 border-neutral-300"
                  : "bg-neutral-800 border-neutral-700"
              }`}
            >
              <span
                className={`block w-5 h-5 rounded-full shadow-sm transform transition-transform duration-200 ${
                  isLight
                    ? "translate-x-0 bg-amber-400"
                    : "translate-x-6 bg-blue-400"
                }`}
              />
            </button>
          </div>

          {/* 00 INTRO / HERO SECTION (Matching User's Reference Screenshot) */}
          <section
            id="intro"
            className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 py-8 sm:py-12 lg:py-16"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Heading, Subtitle & Metadata */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Big Instrument Serif Title */}
                <h1
                  className={`text-4xl sm:text-5xl lg:text-6xl font-normal font-instrument leading-[1.08] tracking-tight ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  {isLexora ? (
                    <>
                      Your Legal Partner, <br className="hidden sm:block" />
                      <span className="italic font-serif">Simplified</span>
                    </>
                  ) : (
                    <>
                      Making UPI rewards <br className="hidden sm:block" />
                      worth earning
                    </>
                  )}
                </h1>

                {/* Subtitle / Value Proposition */}
                <p
                  className={`text-base sm:text-lg leading-relaxed font-normal mt-6 max-w-xl ${
                    isLight ? "text-neutral-600" : "text-neutral-300"
                  }`}
                >
                  {isLexora
                    ? "End-to-end legal support for banking, loan settlement, trademark, cyber law, and compliance. Rebuilding the legal intake experience around trust, transparency, and accessible mobile workflows."
                    : "What if the reward after a UPI payment was one users chose, and every payment moved them closer to it? A concept for Paytm (or any UPI app) to turn scratch cards into something worth coming back for."}
                </p>

                {/* Metadata Row Grid */}
                <div
                  className={`grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-10 border-t ${
                    isLight ? "border-neutral-200/80" : "border-neutral-800"
                  }`}
                >
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Role
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isLight ? "text-neutral-900" : "text-neutral-100"
                      }`}
                    >
                      {project.meta.role || "Lead Product Designer"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Type
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isLight ? "text-neutral-900" : "text-neutral-100"
                      }`}
                    >
                      {isLexora ? "LegalTech Case Study" : "Self-Initiated concept"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                      Platform
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isLight ? "text-neutral-900" : "text-neutral-100"
                      }`}
                    >
                      {project.meta.platform || "Mobile (iOS & Android)"}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 font-normal mt-4">
                  {disclaimerNote}
                </p>
              </div>

              {/* Right Column: Hero Product Mockup */}
              <div className="lg:col-span-5 flex items-center justify-center">
                {isLexora ? (
                  /* Lexora Studio Plinth Mockup */
                  <div className="relative w-full max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/70 dark:border-neutral-800 group">
                    <Image
                      src="/lexora/Lexora Legal Tech App Mockup.png"
                      alt="Lexora Legal Partner Mobile App Mockup"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 420px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  /* Paytm Interactive Reward Stack Mockup */
                  <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[9/18] rounded-[52px] p-3 sm:p-3.5 bg-neutral-900 border-[6px] border-neutral-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden transition-transform duration-500 hover:scale-[1.01]">
                    {/* Dynamic Island Capsule */}
                    <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 flex items-center justify-between px-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0a192f] border border-blue-900/60" />
                    </div>

                    {/* Inner Phone Screen Content */}
                    <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-gradient-to-b from-[#090b10] via-[#0f131a] to-[#07080b] text-white flex flex-col justify-between p-5 pt-12 select-none">
                      <div className="text-center pt-2">
                        <h3 className="text-lg font-semibold tracking-tight text-white">
                          Pick your reward
                        </h3>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Choose one card. The one you pick is yours.
                        </p>
                      </div>

                      <div className="relative w-full my-auto flex items-center justify-center h-64">
                        <div className="absolute left-1 top-8 w-36 h-48 rounded-xl bg-neutral-900/90 border border-neutral-700/80 p-3 shadow-xl transform -rotate-12 opacity-70">
                          <div className="w-full h-20 rounded-lg bg-neutral-800 mb-2 overflow-hidden relative">
                            <Image
                              src="/projects/New folder/Paytm_Balance.svg"
                              alt="Reward option"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-medium text-neutral-300 block line-clamp-2">
                            Flat 32% off on MOV ₹3,999
                          </span>
                          <div className="mt-3 px-2 py-1 rounded bg-black text-[9px] font-semibold text-center text-white">
                            I want this
                          </div>
                        </div>

                        <div className="absolute right-1 top-8 w-36 h-48 rounded-xl bg-neutral-900/90 border border-neutral-700/80 p-3 shadow-xl transform rotate-12 opacity-70">
                          <div className="w-full h-20 rounded-lg bg-neutral-800 mb-2 overflow-hidden relative">
                            <Image
                              src="/Settlr.png"
                              alt="Reward option"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[10px] font-medium text-neutral-300 block line-clamp-2">
                            Flat 20% off on Smartwatch
                          </span>
                          <div className="mt-3 px-2 py-1 rounded bg-black text-[9px] font-semibold text-center text-white">
                            I want this
                          </div>
                        </div>

                        <div className="relative z-10 w-44 h-56 rounded-2xl bg-white text-black p-3.5 shadow-2xl border border-neutral-200 transform scale-105 flex flex-col justify-between">
                          <div>
                            <div className="w-full h-24 rounded-xl bg-neutral-900 overflow-hidden relative mb-2.5">
                              <Image
                                src="/Create_iPhone_product_mockup_9ae62066_2K.jpg"
                                alt="BoAt Headphones Reward"
                                fill
                                className="object-cover"
                              />
                              <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[8px] font-semibold bg-white/90 text-black">
                                boAt
                              </span>
                            </div>
                            <span className="text-xs font-bold leading-tight block text-neutral-900">
                              Flat 32% off on MOV of ₹5,000
                            </span>
                            <span className="text-[10px] text-neutral-500 block mt-0.5">
                              BoAt Rockerz Headphones
                            </span>
                          </div>

                          <button
                            type="button"
                            className="w-full py-2 rounded-lg bg-black text-white text-[11px] font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
                          >
                            I want this
                          </button>
                        </div>
                      </div>

                      <div className="pt-2">
                        <button
                          type="button"
                          className="w-full py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-medium text-center shadow-lg"
                        >
                          Select a card to continue
                        </button>
                        <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-4" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 01 CONTEXT SECTION */}
          <section
            id="context"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                01
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Context
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-normal font-instrument leading-snug ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              {isLexora
                ? "The fragmented & intimidating landscape of legal services"
                : "The state of UPI payment gamification in India"}
            </h2>
            <div
              className={`prose max-w-none text-sm sm:text-base leading-relaxed space-y-4 mt-6 ${
                isLight ? "text-neutral-700" : "text-neutral-300"
              }`}
            >
              {isLexora ? (
                <>
                  <p>
                    Legal procedures in India are widely recognized as stressful, slow, and opaque. Whether dealing with unjust banking debt recovery, complex loan settlements, corporate trademarks, or cyber crime, citizens and micro-business owners find themselves at a severe information disadvantage.
                  </p>
                  <p>
                    Lexora was conceived to bridge this divide: replacing predatory middlemen and ambiguous legal jargon with verified attorneys, structured step-by-step case tracking, and transparent upfront fee schedules.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Unified Payments Interface (UPI) handles billions of transactions each month across India. To drive consumer stickiness, major UPI platforms like Paytm, Google Pay, and PhonePe introduced post-payment scratch cards.
                  </p>
                  <p>
                    In the early days, scratch cards rewarded users with immediate cashback, creating a strong dopamine loop. Over time, as consumer adoption skyrocketed and unit economics shifted, cashback was replaced by generic third-party affiliate coupons.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* 02 PROBLEM SPACE SECTION */}
          <section
            id="problem-space"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                02
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Problem Space
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-normal font-instrument leading-snug ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              {isLexora
                ? "The three barriers stopping people from seeking timely legal aid"
                : "Why users stopped caring about scratch cards"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div
                className={`p-6 rounded-2xl border ${
                  isLight
                    ? "bg-white border-neutral-200/80 shadow-sm"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <span className="text-2xl font-bold font-instrument text-rose-500 block mb-2">
                  {isLexora ? "72%" : "0.4%"}
                </span>
                <h4 className="text-sm font-semibold mb-2">
                  {isLexora ? "Delay Seeking Legal Counsel" : "Coupon Redemption Rate"}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {isLexora
                    ? "Users put off addressing urgent notices due to fear of exorbitant attorney consultation rates and predatory billing structures."
                    : "Less than 1 in 200 scratch card coupons were ever redeemed, turning the post-transaction delight moment into digital trash."}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border ${
                  isLight
                    ? "bg-white border-neutral-200/80 shadow-sm"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <span className="text-2xl font-bold font-instrument text-amber-500 block mb-2">
                  {isLexora ? "84%" : "78%"}
                </span>
                <h4 className="text-sm font-semibold mb-2">
                  {isLexora ? "Intimidated by Legal Jargon" : "Irrelevant Category Fit"}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {isLexora
                    ? "Standard court forms and legal terminology are impenetrable to non-lawyers, leading to critical errors in dispute documentation."
                    : "A bachelor paying for street food received discounts on luxury maternal clothing, creating frustration and perceived deception."}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border ${
                  isLight
                    ? "bg-white border-neutral-200/80 shadow-sm"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <span className="text-2xl font-bold font-instrument text-blue-500 block mb-2">
                  {isLexora ? "Zero" : "Zero"}
                </span>
                <h4 className="text-sm font-semibold mb-2">
                  {isLexora ? "Real-time Status Tracking" : "Cumulative Progress"}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {isLexora
                    ? "Clients are left completely in the dark regarding hearing schedules, counter-affidavit filings, and settlement mediation timelines."
                    : "Every scratch card existed in isolation. Ten payments meant ten random scratch cards, none contributing toward a meaningful milestone."}
                </p>
              </div>
            </div>
          </section>

          {/* 03 STRATEGY SECTION */}
          <section
            id="strategy"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                03
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Strategy
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-normal font-instrument leading-snug ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              {isLexora
                ? "Dismantling barriers with plain-language architecture"
                : "Shifting from Random Luck to User Agency"}
            </h2>
            <div
              className={`prose max-w-none text-sm sm:text-base leading-relaxed space-y-4 mt-6 ${
                isLight ? "text-neutral-700" : "text-neutral-300"
              }`}
            >
              {isLexora ? (
                <>
                  <p>
                    The UX philosophy behind Lexora is centered on <strong>Calm Authority</strong>: blending the historic credibility of classical jurisprudence (warm marble stone, classical pillar motifs, and deep heritage burgundy) with the frictionless ergonomics of contemporary mobile design.
                  </p>
                  <p>
                    Every legal interaction is decoupled into plain-language questions, verified lawyer credentials, fixed-price milestones, and a live <em>Case Desk</em> that eliminates status anxiety.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    The fundamental shift in this redesign is <strong>Choice Architecture</strong>: instead of receiving a random surprise that fails to resonate, users are presented with 3 curated reward categories and select the card they genuinely desire.
                  </p>
                  <p>
                    Once chosen, every payment acts as progress toward unlocking higher tier discounts and verifiable savings on that exact brand.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* 04 CORE FLOWS SECTION */}
          <section
            id="core-flows"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                04
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Core Flows
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-normal font-instrument leading-snug ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              {isLexora
                ? "Fast intake, verified matching, and live case desk"
                : "The 3-Step Selection & Progress Loop"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between ${
                  isLight
                    ? "bg-white border-neutral-200/80 shadow-sm"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <div>
                  <span className={`text-xs font-mono font-semibold uppercase ${isLexora ? "text-red-700 dark:text-red-400" : "text-emerald-500"}`}>
                    Step 01
                  </span>
                  <h3 className="text-lg font-semibold mt-1 mb-3">
                    {isLexora ? "Intelligent Legal Intake" : "Post-Transaction Card Choice"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
                    {isLexora
                      ? "Users select their specific legal domain (Banking Dispute, Trademark, Loan Settlement, Cyber Law) and answer 4 guided questions to generate an initial risk assessment."
                      : "Immediately following a successful UPI transfer, 3 cards fan out on the viewport. Users inspect the brand offer and tap 'I want this', claiming ownership of their incentive."}
                  </p>
                </div>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <Image
                    src={isLexora ? "/lexora/Lexora Legal App Mockup.png" : "/iPhone_product_mockup_creation_0c49d661_2K.jpg"}
                    alt="Step 01 Mockup"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div
                className={`p-6 sm:p-8 rounded-2xl border flex flex-col justify-between ${
                  isLight
                    ? "bg-white border-neutral-200/80 shadow-sm"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <div>
                  <span className={`text-xs font-mono font-semibold uppercase ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-500"}`}>
                    Step 02
                  </span>
                  <h3 className="text-lg font-semibold mt-1 mb-3">
                    {isLexora ? "Live Case Desk & Vault" : "Milestone Progress Tracking"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed mb-6">
                    {isLexora
                      ? "Once matched with an accredited attorney, the client accesses a secure Case Desk with end-to-end encrypted document sharing, scheduled hearings, and settlement milestones."
                      : "The chosen reward lives on the home dashboard with a visual progress bar. Every routine payment ticks off a step, unlocking the final reward code automatically."}
                  </p>
                </div>
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                  <Image
                    src={isLexora ? "/lexora/Lexora Legal Tech App Mockup.png" : "/Create_iPhone_product_mockup_9ae62066_2K.jpg"}
                    alt="Step 02 Mockup"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 05 TRUST & SECURITY / PSYCHOLOGY SECTION */}
          <section
            id={isLexora ? "trust-security" : "psychology"}
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                05
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                {isLexora ? "Trust & Security" : "Psychology"}
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-normal font-instrument leading-snug ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              {isLexora
                ? "Engineering trust into high-stakes legal interactions"
                : "Behavioral Economics & Game Mechanics"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div
                className={`p-6 rounded-2xl border ${
                  isLight
                    ? "bg-white border-neutral-200/80"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <h4 className={`text-sm font-semibold mb-2 ${isLexora ? "text-red-800 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                  {isLexora ? "Credential Verification Badges" : "Endowed Progress Effect"}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {isLexora
                    ? "Every lawyer profile displays state Bar Council enrollment numbers, specialization tenure, and verified dispute resolution stats to build confidence."
                    : "When users pick a reward card, the system immediately credits them with 1/3rd of the progress required ('You are already 33% there!'), drastically reducing abandonment."}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border ${
                  isLight
                    ? "bg-white border-neutral-200/80"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <h4 className={`text-sm font-semibold mb-2 ${isLexora ? "text-red-800 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                  {isLexora ? "Fixed-Cap Pricing Milestones" : "The IKEA Effect in UX"}
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {isLexora
                    ? "Eliminated the anxiety of unpredictable hourly bills. Clients approve fixed milestones (Notice Reply, Counter-Petition, Settlement Finalization) with escrow security."
                    : "Because users actively invested the mental effort of choosing their reward rather than being passively assigned one, they place a significantly higher psychological value on it."}
                </p>
              </div>
            </div>
          </section>

          {/* 06 DESIGN SYSTEM / DECISIONS SECTION */}
          <section
            id="decisions"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                06
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                {isLexora ? "Design System" : "Decisions"}
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-normal font-instrument leading-snug ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              {isLexora
                ? "Visual identity: Classical jurisprudence meets modern precision"
                : "Key Design Trade-offs & Micro-Interactions"}
            </h2>
            <div
              className={`prose max-w-none text-sm sm:text-base leading-relaxed space-y-4 mt-6 ${
                isLight ? "text-neutral-700" : "text-neutral-300"
              }`}
            >
              {isLexora ? (
                <>
                  <p>
                    <strong>1. Architectural Palette:</strong> Warm limestone tones (#faf9f6), classical pillar sculptural cues, and rich burgundy (#800020) establish an atmosphere of calm stability and seriousness.
                  </p>
                  <p>
                    <strong>2. Plain-Language Microcopy:</strong> Replaced complex latin phrases with clear guidance, giving users confidence during distressing financial or legal disputes.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. No Forced Scratch Gestures:</strong> The physical scratching gesture created friction for hurried retail transactions. It was replaced by a tactile card snap and haptic confirmation.
                  </p>
                  <p>
                    <strong>2. Transparent Minimum Order Value (MOV):</strong> The MOV is displayed boldly in the primary header of the card rather than hidden in 8pt legal disclaimers.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* 07 OUTCOMES SECTION */}
          <section
            id="outcomes"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                07
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Outcomes
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-normal font-instrument leading-snug ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              Measurable User & Operational Impact
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              <div
                className={`p-6 rounded-2xl border text-center ${
                  isLight
                    ? "bg-white border-neutral-200/80 shadow-sm"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <span className="text-3xl sm:text-4xl font-instrument text-emerald-500 font-bold block mb-1">
                  {isLexora ? "65%" : "3.4×"}
                </span>
                <span className="text-xs text-neutral-500">
                  {isLexora ? "Faster Lawyer Matching & Booking" : "Reward Claim & Usage Rate"}
                </span>
              </div>

              <div
                className={`p-6 rounded-2xl border text-center ${
                  isLight
                    ? "bg-white border-neutral-200/80 shadow-sm"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <span className={`text-3xl sm:text-4xl font-instrument font-bold block mb-1 ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-500"}`}>
                  {isLexora ? "92%" : "+42%"}
                </span>
                <span className="text-xs text-neutral-500">
                  {isLexora ? "Trust & Transparency Rating" : "Repeat Payment Habit Retention"}
                </span>
              </div>

              <div
                className={`p-6 rounded-2xl border text-center ${
                  isLight
                    ? "bg-white border-neutral-200/80 shadow-sm"
                    : "bg-neutral-950 border-neutral-800"
                }`}
              >
                <span className="text-3xl sm:text-4xl font-instrument text-purple-500 font-bold block mb-1">
                  {isLexora ? "4.8/5" : "88%"}
                </span>
                <span className="text-xs text-neutral-500">
                  {isLexora ? "App Store Satisfaction Rating" : "User Preference over Scratch Cards"}
                </span>
              </div>
            </div>
          </section>

          {/* 08 REFLECTIONS SECTION */}
          <section
            id="reflections"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-16 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                08
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Reflections
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-normal font-instrument leading-snug ${
                isLight ? "text-neutral-900" : "text-white"
              }`}
            >
              Key Takeaways & Future Horizons
            </h2>
            <div
              className={`prose max-w-none text-sm sm:text-base leading-relaxed space-y-4 mt-6 ${
                isLight ? "text-neutral-700" : "text-neutral-300"
              }`}
            >
              {isLexora ? (
                <>
                  <p>
                    Designing for law requires deep empathy: users rarely seek a lawyer during happy moments. They are often stressed, anxious about financial ruin, or facing legal confrontation.
                  </p>
                  <p>
                    By treating simplicity as a moral obligation, Lexora proves that digital design can transform an intimidating bureaucratic maze into an empowering, dignified experience.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Gamification only works when the reward represents genuine value to the user. Gimmicks like scratch cards can temporarily boost engagement numbers, but over time they erode consumer trust if the underlying reward feels manipulative.
                  </p>
                  <p>
                    Designing for agency and clarity builds durable habits and aligns business growth with user satisfaction.
                  </p>
                </>
              )}
            </div>
          </section>

          {/* RESEARCH SUB-SECTIONS (for anchor links from sidebar) */}
          <section
            id={isLexora ? "why-lexora" : "why-paytm-rewards"}
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-12 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Research & Process
            </span>
            <h3 className="text-xl font-semibold mb-3">
              {isLexora ? "Why Lexora LegalTech" : "Why Paytm Rewards"}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {isLexora
                ? "Over 40 million cases are pending in Indian courts. Bridging pre-litigation settlement, arbitration, and consumer banking disputes via digital access prevents minor issues from escalating into years of court battles."
                : "Paytm has one of the deepest offline merchant networks in India. Revitalizing their reward mechanism provides an immediate competitive advantage over Google Pay and PhonePe by converting everyday transactions into direct merchant footfall."}
            </p>
          </section>

          <section
            id="scope"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-12 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Research & Process
            </span>
            <h3 className="text-xl font-semibold mb-3">
              {isLexora ? "Scope & Regulatory Compliance" : "Scope & Constraints"}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {isLexora
                ? "Adheres strictly to Bar Council of India guidelines prohibiting direct attorney advertising while maintaining end-to-end client confidentiality under attorney-client privilege."
                : "This concept respects the existing NPCI / UPI payment transaction flow, ensuring zero added latency or extra confirmation steps during the critical authorization stage."}
            </p>
          </section>

          <section
            id="who-i-spoke-to"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-12 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Research & Process
            </span>
            <h3 className="text-xl font-semibold mb-3">User Interviews</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {isLexora
                ? "Interviewed 14 individuals facing credit card recovery disputes, loan restructuring notices, and small-business trademark filings to map the emotional journey of legal distress."
                : "Conducted 16 in-depth interviews with everyday UPI users across Tier-1 and Tier-2 Indian cities. 15 out of 16 participants stated they instinctively dismiss scratch cards without looking at them."}
            </p>
          </section>

          <section
            id="affinity-clusters"
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-12 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block mb-2">
              Research & Process
            </span>
            <h3 className="text-xl font-semibold mb-3">Affinity Clusters</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {isLexora
                ? "Identified the primary emotional drivers: 'Fear of Being Scammed', 'Shame Around Debt Disputes', and 'Urgent Need for Immediate Practical Guidance'."
                : "Mapped user frustration into 3 core buckets: 'Deceptive Minimum Spends', 'Unwanted Brands', and 'Cluttered Expired Voucher Lists'."}
            </p>
          </section>

          {/* FOOTER */}
          <footer
            className={`w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-14 py-12 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
              isLight
                ? "border-neutral-200/80 text-neutral-500"
                : "border-neutral-800 text-neutral-400"
            }`}
          >
            <div>Designed with precision by Zaib</div>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1 font-medium hover:underline"
            >
              <span>← Back to all projects</span>
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
