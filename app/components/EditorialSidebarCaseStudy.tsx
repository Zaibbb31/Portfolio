"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import { Project } from "@/app/data/projects";

interface EditorialSidebarCaseStudyProps {
  project: Project;
}

export default function EditorialSidebarCaseStudy({ project }: EditorialSidebarCaseStudyProps) {
  // Pure dark mode matching homepage #000000 aesthetic
  const isLight = false;
  
  // Sidebar state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");
  
  // Accordion states in sidebar
  const [researchOpen, setResearchOpen] = useState(true);
  const [insightsOpen, setInsightsOpen] = useState(true);

  // Storyboard scroll ref
  const storyboardRef = useRef<HTMLDivElement>(null);
  const scrollStoryboard = (direction: "left" | "right") => {
    if (storyboardRef.current) {
      const scrollAmount = storyboardRef.current.clientWidth * 0.8;
      storyboardRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Paytm Section 02 Storyboard interactive state
  const [showPaytmStoryAnnotations, setShowPaytmStoryAnnotations] = useState(true);
  const paytmStoryContainerRef = useRef<HTMLDivElement>(null);
  const sixPanelStoryboardRef = useRef<HTMLDivElement>(null);
  const strategyCarouselRef = useRef<HTMLDivElement>(null);

  const handleReplayPaytmStory = () => {
    if (paytmStoryContainerRef.current) {
      paytmStoryContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  // Established user flow interactive state
  const [showEstablishedAnnotations, setShowEstablishedAnnotations] = useState(true);
  const [activeEstablishedStep, setActiveEstablishedStep] = useState(0);
  const establishedFlowContainerRef = useRef<HTMLDivElement>(null);

  const scrollToEstablishedStep = (index: number) => {
    setActiveEstablishedStep(index);
    if (establishedFlowContainerRef.current) {
      const cards = establishedFlowContainerRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  // Returning user flow interactive state
  const [showReturningAnnotations, setShowReturningAnnotations] = useState(true);
  const [activeReturningStep, setActiveReturningStep] = useState(0);
  const returningFlowContainerRef = useRef<HTMLDivElement>(null);

  const scrollToReturningStep = (index: number) => {
    setActiveReturningStep(index);
    if (returningFlowContainerRef.current) {
      const cards = returningFlowContainerRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  // Core user flows interactive state
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const flowContainerRef = useRef<HTMLDivElement>(null);
  const flow1ContainerRef = useRef<HTMLDivElement>(null);
  const flow2ContainerRef = useRef<HTMLDivElement>(null);

  const scrollFlow = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = ref.current.clientWidth * 0.75;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToFlowStep = (index: number) => {
    setActiveFlowStep(index);
    if (flowContainerRef.current) {
      const cards = flowContainerRef.current.children;
      if (cards[index]) {
        (cards[index] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handleFlowScroll = () => {
    if (!flowContainerRef.current) return;
    const container = flowContainerRef.current;
    const cards = Array.from(container.children) as HTMLElement[];
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestIndex = idx;
      }
    });
    if (closestIndex !== activeFlowStep && closestDistance < 220) {
      setActiveFlowStep(closestIndex);
    }
  };

  const isLexora = project.id === "lexora";

  // Table of contents navigation list
  const navSections = [
    { id: "intro", num: "00", label: "Intro" },
    { id: "problem-space", num: "02", label: "Problem space" },
    { id: "strategy", num: "03", label: isLexora ? "Product strategy & vision" : "Strategy" },
    { id: "core-flows", num: "04", label: "Core flows" },
    { id: "psychology", num: "05", label: "Module breakdown & psychology" },
    { id: "outcomes", num: "06", label: "Outcomes" },
  ];

  // Scrollspy to automatically highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const allIds = navSections.map((s) => s.id);

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
  }, [navSections]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const brandTitle = isLexora ? "Lexora" : "Paytm Rewards";
  const brandSub = isLexora ? "LegalTech · concept" : "UPI · concept";
  const disclaimerNote = isLexora
    ? "Inspired by a personal connection to the legal world."
    : "Not affiliated with Paytm.";

  return (
    <div className="min-h-screen w-full font-sans bg-[#000000] text-[#ededed] selection:bg-neutral-800 selection:text-white">
      {/* 1. TOP HEADER / NAVBAR (Exact same design and structure as home page) */}
      <header className="sticky top-0 z-40 w-full px-5 sm:px-8 py-3 flex items-center justify-between border-b backdrop-blur-md select-none transition-colors duration-300 border-neutral-800/80 bg-[#000000]/90">
        {/* Logo brand on left */}
        <Link
          href="/"
          className="flex items-center select-none group"
          aria-label="Home"
        >
          <div className="relative h-7 sm:h-8 w-14 sm:w-16 flex items-center">
            <Image
              src="/logoblack.svg"
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
            href="/#projects"
            className="text-neutral-400 hover:text-white transition-colors text-xs"
          >
            Projects
          </Link>
          <Link
            href="/the-mess"
            className="text-neutral-400 hover:text-white transition-colors text-xs"
          >
            The Mess.
          </Link>
          <Link
            href="/#connect"
            className="text-neutral-400 hover:text-white transition-colors text-xs"
          >
            Contact
          </Link>

          {/* Search ⌘K Pill Button */}
          <Link
            href="/#projects"
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer text-xs"
          >
            <HugeiconsIcon icon={Search01Icon} size={14} className="text-neutral-400" />
            <span>Search</span>
          </Link>

          {/* Mobile TOC Drawer Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition-colors text-xs cursor-pointer"
            aria-label="Open Table of Contents"
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
              "bg-[#000000] border-neutral-800 text-[#ededed]"
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


            </div>

            <div className="pt-4 border-t border-neutral-200/60 dark:border-neutral-800 text-[11px] text-neutral-400">
              {disclaimerNote}
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP ROOT WRAPPER */}
      <div className="flex min-h-screen relative w-full">
        {/* DESKTOP SIDEBAR (EXPANDED OR FULLY COLLAPSED TO NUMBERS RAIL) */}
        <aside
          className={`hidden lg:flex flex-col justify-between border-r sticky top-[53px] h-[calc(100vh-53px)] z-30 shrink-0 transition-all duration-300 select-none ${
            isCollapsed ? "w-14 xl:w-16 px-2 py-4 items-center" : "w-64 xl:w-72 p-6"
          } ${
            isLight
              ? "bg-[#faf9f6] border-neutral-200/80 text-neutral-900"
              : "bg-[#09090b] border-neutral-800/80 text-neutral-100"
          }`}
        >
          {isCollapsed ? (
            /* COLLAPSED VIEW: Expand button at top, clickable section numbers in middle, home link at bottom */
            <>
              {/* Top: Expand Button */}
              <div className="flex flex-col items-center gap-2 w-full shrink-0">
                <button
                  type="button"
                  onClick={() => setIsCollapsed(false)}
                  title="Expand sidebar"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                    isLight
                      ? "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100 hover:text-black shadow-2xs"
                      : "bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
                  aria-label="Expand sidebar"
                >
                  <span className="text-xs font-mono font-bold">›</span>
                </button>
                <div className="w-5 h-px bg-neutral-800 my-1" />
              </div>

              {/* Middle: Clickable Section Numbers */}
              <nav className="flex flex-col items-center gap-2.5 my-auto w-full py-2">
                {navSections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => scrollToSection(sec.id)}
                      title={`${sec.num} · ${sec.label}`}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs transition-all cursor-pointer ${
                        isActive
                          ? isLight
                            ? "bg-neutral-200 text-black font-bold shadow-2xs"
                            : isLexora
                            ? "bg-red-500/20 border border-red-500/50 text-red-400 font-bold shadow-[0_0_12px_rgba(239,68,68,0.3)]"
                            : "bg-blue-500/20 border border-blue-500/50 text-blue-400 font-bold shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                          : "text-neutral-500 hover:text-neutral-200 hover:bg-neutral-800/60"
                      }`}
                    >
                      <span>{sec.num}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Bottom: Back to Projects Link */}
              <div className="shrink-0 flex flex-col items-center pt-2">
                <Link
                  href="/#projects"
                  title="Back to Projects"
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isLight
                      ? "text-neutral-500 hover:text-black hover:bg-neutral-100"
                      : "text-neutral-500 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <span className="text-xs font-mono">←</span>
                </Link>
              </div>
            </>
          ) : (
            /* EXPANDED VIEW: Home pill + Collapse button, Brand info, TOC list with labels, and disclaimer */
            <>
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
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer`}
                    aria-label="Collapse sidebar"
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
              </div>

              {/* Footer note */}
              <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800 text-[11px] text-neutral-400 font-normal">
                {disclaimerNote}
              </div>
            </>
          )}
        </aside>

        {/* MAIN EDITORIAL CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0">
          

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
                    "A better way to experience legal help."
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
                    ? "Finding legal answers shouldn't be intimidating. Lexora gives people a space to ask questions freely, learn from shared experiences, and track cases without chasing updates — making legal support accessible, transparent, and human."
                    : "What if the reward after a UPI payment was one users chose, and every payment moved them closer to it? A concept for Paytm (or any UPI app) to turn scratch cards into something worth coming back for."}
                </p>

                {/* Metadata Row Grid */}
                <div
                  className={`grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 mt-6 sm:mt-10 border-t ${
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
                      {isLexora
                        ? "Product Designer & UX Researcher"
                        : project.meta.role || "Lead Product Designer"}
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
                      {isLexora
                        ? "LegalTech · Product Design Case Study"
                        : "Self-initiated concept"}
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
                      {isLexora
                        ? "Mobile App (iOS & Android)"
                        : project.meta.platform || "Mobile (iOS & Android)"}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-neutral-400 italic font-normal mt-4">
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
                  /* Paytm Exact UI Screen with iPhone Mockup (Matching user's reference image) */
                  <div className="relative w-full max-w-[260px] sm:max-w-[285px] aspect-[9/18.5] flex items-center justify-center select-none group">
                    {/* Realistic iPhone Titanium Outer Chassis */}
                    <div className="relative w-full h-full rounded-[46px] sm:rounded-[50px] p-[2.5px] bg-gradient-to-b from-[#e2e8f0] via-[#cbd5e1] to-[#94a3b8] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)]">
                      {/* Left Side Buttons: Action Button, Volume Up, Volume Down */}
                      <div className="absolute -left-[4.5px] top-20 w-[3px] h-5 bg-[#94a3b8] rounded-l-xs border-y border-l border-neutral-400/80 shadow-xs" />
                      <div className="absolute -left-[4.5px] top-28 w-[3px] h-9 bg-[#94a3b8] rounded-l-xs border-y border-l border-neutral-400/80 shadow-xs" />
                      <div className="absolute -left-[4.5px] top-40 w-[3px] h-9 bg-[#94a3b8] rounded-l-xs border-y border-l border-neutral-400/80 shadow-xs" />

                      {/* Right Side Button: Power / Lock */}
                      <div className="absolute -right-[4.5px] top-26 w-[3px] h-13 bg-[#94a3b8] rounded-r-xs border-y border-r border-neutral-400/80 shadow-xs" />

                      {/* Inner Black Bezel Frame */}
                      <div className="relative w-full h-full rounded-[43px] sm:rounded-[47px] p-[6px] sm:p-[7px] bg-black">
                        {/* Phone Screen Glass with Exact Paytm Soft Mint Gradient */}
                        <div className="relative w-full h-full rounded-[37px] sm:rounded-[41px] overflow-hidden bg-gradient-to-b from-[#ebf8fa] via-[#e2f5f8] to-[#f4fcfe] flex flex-col justify-between">
                          {/* Gentle circular background radial glow behind success badge */}
                          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-40 h-40 bg-white/70 rounded-full blur-2xl pointer-events-none" />

                          {/* Top Status Bar: 9:41, Dynamic Island, Signal / Wifi / Battery */}
                          <div className="relative z-20 w-full pt-2.5 px-5 sm:px-6 flex items-center justify-between text-neutral-900">
                            {/* Time: 9:41 */}
                            <span className="text-[11px] sm:text-[12px] font-semibold tracking-tight text-neutral-900 font-sans">
                              9:41
                            </span>

                            {/* Dynamic Island Capsule */}
                            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-22 sm:w-24 h-5.5 sm:h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-xs">
                              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                              <div className="w-2 h-2 rounded-full bg-[#0a192f] border border-blue-900/60" />
                            </div>

                            {/* Status Icons: Signal, Wifi, Battery */}
                            <div className="flex items-center gap-1.5 text-neutral-900">
                              {/* Cellular Signal Bars */}
                              <svg className="w-3 h-2.5 fill-current" viewBox="0 0 16 12">
                                <rect x="1" y="9" width="2" height="3" rx="0.5" />
                                <rect x="5" y="6" width="2" height="6" rx="0.5" />
                                <rect x="9" y="3" width="2" height="9" rx="0.5" />
                                <rect x="13" y="0" width="2" height="12" rx="0.5" />
                              </svg>

                              {/* Wifi Icon */}
                              <svg className="w-3 h-2.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24" strokeLinecap="round">
                                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                                <circle cx="12" cy="20" r="1" fill="currentColor" />
                              </svg>

                              {/* Battery Icon with Fill */}
                              <div className="w-4.5 h-2.5 rounded-[3.5px] border border-neutral-900 p-[1.5px] flex items-center relative">
                                <div className="w-full h-full bg-neutral-900 rounded-[1px]" />
                                <div className="absolute -right-1 top-0.5 w-0.5 h-1 bg-neutral-900 rounded-r-xs" />
                              </div>
                            </div>
                          </div>

                          {/* Middle Section: Paytm Wordmark Logo, Green Checkmark, ₹500, Paid to Fresh Basket Kirana */}
                          <div className="relative z-10 flex flex-col items-center justify-center text-center px-3 my-auto pt-1">
                            {/* Official Paytm Brand Logo */}
                            <div className="mb-5 sm:mb-6">
                              <span className="text-xl sm:text-[22px] font-black tracking-tight select-none font-sans">
                                <span className="text-[#002970]">Pay</span>
                                <span className="text-[#00b9f5]">tm</span>
                              </span>
                            </div>

                            {/* Circular Green Checkmark Badge */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#20bf6b] flex items-center justify-center shadow-lg shadow-emerald-500/25 mb-3 sm:mb-4 transition-transform duration-300 group-hover:scale-105">
                              <svg
                                className="w-7 h-7 sm:w-8 sm:h-8 text-white stroke-white stroke-[3.2]"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>

                            {/* Payment Amount: ₹500 */}
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans">
                              ₹500
                            </h2>

                            {/* Recipient Details: Paid to Fresh Basket Kirana */}
                            <p className="text-[11px] sm:text-xs font-semibold text-neutral-800 mt-1.5 font-sans tracking-tight">
                              Paid to Fresh Basket Kirana
                            </p>

                            {/* Timestamp & UPI Reference */}
                            <p className="text-[9.5px] sm:text-[10px] text-neutral-500 mt-1 font-medium font-sans tracking-tight">
                              21 Aug, 08:00 PM · UPI Ref 63788203851
                            </p>
                          </div>

                          {/* Bottom Section: Floating Reward Card Pill & Home Indicator */}
                          <div className="relative z-10 w-full flex flex-col items-center pb-2 px-3">
                            {/* Floating Reward Card Pill: 🎁 You won a reward card */}
                            <div className="w-full max-w-[200px] sm:max-w-[215px] py-2 px-3 rounded-full bg-[#fef3c7] border border-[#fde68a] shadow-xs flex items-center justify-center gap-1.5 mb-5 sm:mb-6 transition-all duration-300 hover:bg-[#fef08a] cursor-pointer">
                              <span className="text-xs leading-none" role="img" aria-label="gift">
                                🎁
                              </span>
                              <span className="text-[10px] sm:text-[11px] font-semibold text-[#78350f] tracking-tight font-sans">
                                You won a reward card
                              </span>
                            </div>

                            {/* Home Indicator Bar */}
                            <div className="w-24 sm:w-28 h-1 bg-black/80 rounded-full mx-auto mb-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>



          {/* 02 PROBLEM SPACE SECTION (01 for Lexora) */}
          <section
            id="problem-space"
            className={`w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            {isLexora ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-semibold text-red-700 dark:text-red-400">
                    02
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Problem Space
                  </span>
                </div>

                {/* Main Instrument Serif Heading */}
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument leading-tight ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  The problem space
                </h2>

                {/* Side-by-side Product Goal & User Problem Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-8">
                  {/* Product goal card */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-sm"
                        : "bg-[#0b0f19] border-neutral-800"
                    }`}
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                      Product Goal
                    </span>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isLight ? "text-neutral-800" : "text-neutral-200"
                      }`}
                    >
                      Make legal guidance approachable by letting users ask questions freely, learn from community experiences, and stay informed throughout their journey.
                    </p>
                  </div>

                  {/* User problem card */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-sm"
                        : "bg-[#0b0f19] border-neutral-800"
                    }`}
                  >
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                      User problem
                    </span>
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${
                        isLight ? "text-neutral-800" : "text-neutral-200"
                      }`}
                    >
                      People hesitate to seek legal help due to high costs and jargon. When they do take services, tracking documents and communication is fragmented and stressful.
                    </p>
                  </div>
                </div>

                {/* Storyboard Header */}
                <div className="mt-12 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium">
                    User Journey Storyboard
                  </span>
                </div>

                {/* Storyboard Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {/* LEXORA CARD 1 */}
                  <div className="flex flex-col">
                    <div
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative border transition-colors ${
                        isLight
                          ? "border-neutral-200/90 bg-white shadow-xs"
                          : "border-neutral-800 bg-neutral-900"
                      }`}
                    >
                      <Image
                        src="/lexora/storyboard/01-question-comes-up.png"
                        alt="01 — A question comes up"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        01 — A question comes up
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Faces a legal question but hesitates to consult a lawyer due to uncertainty and costs.
                      </p>
                    </div>
                  </div>

                  {/* LEXORA CARD 2 */}
                  <div className="flex flex-col">
                    <div
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative border transition-colors ${
                        isLight
                          ? "border-neutral-200/90 bg-white shadow-xs"
                          : "border-neutral-800 bg-neutral-900"
                      }`}
                    >
                      <Image
                        src="/lexora/storyboard/02-finding-help.png"
                        alt="02 — Finding the right help isn't easy"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        02 — Finding the right help isn't easy
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Searching online brings dense jargon, while booking consultations feels intimidating.
                      </p>
                    </div>
                  </div>

                  {/* LEXORA CARD 3 */}
                  <div className="flex flex-col">
                    <div
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative border transition-colors ${
                        isLight
                          ? "border-neutral-200/90 bg-white shadow-xs"
                          : "border-neutral-800 bg-neutral-900"
                      }`}
                    >
                      <Image
                        src="/lexora/storyboard/03-uncertainty-remains.png"
                        alt="03 — Uncertainty remains"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        03 — Even after hiring a lawyer, uncertainty remains
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Once he seeks legal services, he still struggles to get document updates, communicate with his lawyer, and understand what's happening next.
                      </p>
                    </div>
                  </div>

                  {/* LEXORA CARD 4 */}
                  <div className="flex flex-col">
                    <div
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative border transition-colors ${
                        isLight
                          ? "border-neutral-200/90 bg-white shadow-xs"
                          : "border-neutral-800 bg-neutral-900"
                      }`}
                    >
                      <Image
                        src="/lexora/storyboard/04-support-feels-simpler.png"
                        alt="04 — Support feels simpler"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        04 — Legal support needs to feel simpler
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        A centralized space to ask questions, consult verified lawyers, and track case progress.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Paytm Exact Matching Storyboard from User Screenshots */
              <div>
                {/* Section Header with Controls */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 sm:mb-10">
                  <div>
                    <h2
                      className={`text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument leading-tight ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      Random rewards <br className="hidden sm:block" />
                      make users stop caring.
                    </h2>
                    <p
                      className={`text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mt-3 sm:mt-4 ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      Most UPI apps work the same way, so rewards are one of the few ways to stand out.
                      Paytm gives a scratch card after some eligible payments, but the reward is random and
                      often irrelevant. After enough misses, people stop opening the cards.
                    </p>
                  </div>

                  {/* Top-Right Controls: Annotations Toggle & Replay Button */}
                  <div className="flex items-center gap-3 shrink-0 self-start lg:self-center mt-2 lg:mt-0">
                    {/* Annotations Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPaytmStoryAnnotations(!showPaytmStoryAnnotations)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                        showPaytmStoryAnnotations
                          ? isLight
                            ? "bg-blue-50 border-blue-400 text-blue-700 shadow-2xs"
                            : "bg-[#0f172a] border-blue-500/60 text-blue-300 shadow-sm"
                          : isLight
                          ? "bg-neutral-100 border-neutral-300 text-neutral-500 hover:text-neutral-800"
                          : "bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      {/* Pill toggle switch */}
                      <span
                        className={`w-7 h-4 rounded-full p-0.5 flex items-center transition-colors ${
                          showPaytmStoryAnnotations
                            ? "bg-blue-500 justify-end"
                            : isLight ? "bg-neutral-300 justify-start" : "bg-neutral-700 justify-start"
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                      </span>
                      <span>Annotations</span>
                    </button>

                    {/* Replay Button */}
                    <button
                      type="button"
                      onClick={handleReplayPaytmStory}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                        isLight
                          ? "border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 shadow-2xs"
                          : "border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white"
                      }`}
                    >
                      <span className="text-xs">↺</span>
                      <span>Replay</span>
                    </button>

                    {/* Arrow navigation buttons */}
                    <div className="flex items-center gap-1.5 ml-1">
                      <button
                        type="button"
                        onClick={() => scrollFlow(paytmStoryContainerRef, "left")}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isLight
                            ? "border-neutral-300 hover:bg-neutral-100 text-neutral-700 active:scale-95"
                            : "border-neutral-700 hover:bg-neutral-800 text-neutral-300 active:scale-95"
                        }`}
                        aria-label="Previous card"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="15 18 9 12 15 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollFlow(paytmStoryContainerRef, "right")}
                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                          isLight
                            ? "border-neutral-300 hover:bg-neutral-100 text-neutral-700 active:scale-95"
                            : "border-neutral-700 hover:bg-neutral-800 text-neutral-300 active:scale-95"
                        }`}
                        aria-label="Next card"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5-Card Storyboard Continuous Carousel */}
                <div
                  ref={paytmStoryContainerRef}
                  className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Card 1: Shriram pays */}
                  <div className="w-[280px] sm:w-[320px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-6 flex flex-col items-center justify-center border transition-all ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Floating White Profile Card */}
                      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-xl w-[190px] sm:w-[210px] flex flex-col items-center text-center border border-neutral-100">
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden relative shadow-md border-2 border-white mb-3">
                          <Image
                            src="/paytm/shriram_avatar.png"
                            alt="Shriram Kumar"
                            fill
                            className="object-cover"
                            sizes="72px"
                          />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-neutral-900 leading-tight">
                          Shriram Kumar
                        </h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5">
                          Pays via Paytm UPI
                        </p>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        Shriram pays
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        A regular Paytm UPI user pays ₹500 at a kirana store.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: He gets a scratch card */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Left: iPhone Mockup */}
                      <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#e8f6f8] flex flex-col justify-between text-neutral-900">
                          {/* Status Bar + Dynamic Island */}
                          <div className="pt-2 px-3 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-800 z-10 shrink-0">
                            <span>9:41</span>
                            <div className="w-13 h-3 bg-black rounded-full" />
                            <div className="flex items-center gap-1 text-[8px]">
                              <span>📶</span>
                              <span>⚡</span>
                            </div>
                          </div>

                          {/* Paytm App Header Bar */}
                          <div className="px-3 pt-1 flex items-center justify-between shrink-0">
                            <span className="text-xs text-neutral-700 font-bold">←</span>
                            <div className="flex items-center tracking-tight">
                              <span className="font-extrabold text-[#002970] text-[11px]">Pay</span>
                              <span className="font-bold text-[#00b9f5] text-[11px]">tm</span>
                            </div>
                            <span className="text-xs text-neutral-700 font-bold">⋮</span>
                          </div>

                          {/* Recipient Details & Payment info */}
                          <div className="px-3 pt-1.5 text-center shrink-0">
                            <p className="text-[10px] font-bold text-neutral-900 leading-tight">Sumit Kumar Yadav</p>
                            <p className="text-[7.5px] text-neutral-500 leading-tight">UPI ID: q45289534@ybl</p>
                            
                            <div className="flex items-center justify-center gap-1 my-1">
                              <span className="text-base sm:text-lg font-extrabold text-neutral-900">₹500</span>
                              <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[7px] font-bold">✓</span>
                            </div>
                            <p className="text-[6.5px] text-neutral-500">21 Aug, 08:00 PM • Ref. No: 63788203851</p>

                            {/* 3 Action Buttons */}
                            <div className="flex items-center justify-center gap-1 mt-1.5">
                              <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">Check Balance</span>
                              <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">Pay Again</span>
                              <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">&lt; Share</span>
                            </div>
                          </div>

                          {/* Cyan separator line */}
                          <div className="w-full h-0.5 bg-[#00b9f5] mt-1.5 shrink-0" />

                          {/* Bottom Sheet Scratch & Win Card */}
                          <div className="relative flex-1 bg-gradient-to-b from-[#f2fafd] to-white p-2.5 flex flex-col items-center justify-center overflow-hidden">
                            {/* Sunburst rays effect */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,rgba(255,160,0,0.6)_10%,transparent_70%)]" />

                            {/* Red Scratch Card */}
                            <div className="relative w-full max-w-[145px] aspect-[4/5] rounded-xl bg-gradient-to-b from-[#d9222a] to-[#990f14] shadow-md border border-red-400/40 p-2.5 flex flex-col items-center justify-center text-center text-white">
                              <span className="bg-white/90 text-neutral-800 text-[6.5px] font-bold px-2 py-0.5 rounded-full mb-3 shadow-xs">
                                Congratulations
                              </span>
                              <span className="text-xs sm:text-sm font-black tracking-wide leading-tight uppercase text-white drop-shadow-sm">
                                SCRATCH &amp; WIN
                              </span>
                            </div>
                          </div>

                          {/* Bottom Nav Bar with Dark Blue Pill */}
                          <div className="pb-1.5 px-3 shrink-0">
                            <div className="bg-[#002970] text-white rounded-full py-1 px-3 flex items-center justify-around text-[7.5px] font-medium shadow-md">
                              <span className="flex items-center gap-0.5 text-[#00b9f5] font-semibold">⌂ Home</span>
                              <span>⚏ Scan</span>
                              <span>🎁 Cashback</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Annotation */}
                      <div
                        className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                          showPaytmStoryAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        {/* Connecting dotted line with arrowhead */}
                        <div className="flex items-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                          <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                        </div>
                        {/* Annotation text */}
                        <div className="leading-tight">
                          <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                            Uncertain value
                          </h5>
                          <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                            What's inside stays hidden until it's scratched
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        He gets a scratch card
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Its value stays hidden until he scratches it, with no guarantee it's something he wants. That alone is reason enough not to redeem it.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: He scratches it */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Left: iPhone Mockup */}
                      <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#e8f6f8] flex flex-col justify-between text-neutral-900">
                          {/* Status Bar + Dynamic Island */}
                          <div className="pt-2 px-3 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-800 z-10 shrink-0">
                            <span>9:41</span>
                            <div className="w-13 h-3 bg-black rounded-full" />
                            <div className="flex items-center gap-1 text-[8px]">
                              <span>📶</span>
                              <span>⚡</span>
                            </div>
                          </div>

                          {/* Paytm App Header Bar */}
                          <div className="px-3 pt-1 flex items-center justify-between shrink-0">
                            <span className="text-xs text-neutral-700 font-bold">←</span>
                            <div className="flex items-center tracking-tight">
                              <span className="font-extrabold text-[#002970] text-[11px]">Pay</span>
                              <span className="font-bold text-[#00b9f5] text-[11px]">tm</span>
                            </div>
                            <span className="text-xs text-neutral-700 font-bold">⋮</span>
                          </div>

                          {/* Compact User Row */}
                          <div className="px-3 pt-1 flex items-center justify-between shrink-0">
                            <div>
                              <p className="text-[9.5px] font-bold text-neutral-900 leading-tight">Sumit Kumar Yadav</p>
                              <p className="text-[7.5px] text-neutral-500 leading-tight">UPI ID: q45289534@ybl</p>
                            </div>
                            <div className="flex items-center gap-1 bg-white/80 px-1.5 py-0.5 rounded-full border border-neutral-200">
                              <span className="text-[10px] font-extrabold text-neutral-900">₹500</span>
                              <span className="w-3 h-3 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[6px] font-bold">✓</span>
                            </div>
                          </div>

                          {/* Your Rewards Bar with Coin Badges */}
                          <div className="mx-2.5 mt-1 px-2 py-1 bg-white/90 rounded-lg border border-neutral-200 flex items-center justify-between text-[7.5px] shrink-0">
                            <span className="font-bold text-neutral-800">Your Rewards</span>
                            <div className="flex items-center gap-1.5 font-bold">
                              <span className="flex items-center gap-0.5 text-amber-600">🟡 12</span>
                              <span className="flex items-center gap-0.5 text-slate-500">⚪ 12</span>
                              <span className="flex items-center gap-0.5 text-amber-800">🟠 6</span>
                            </div>
                          </div>

                          {/* Red Scratch Card with Subtitle */}
                          <div className="px-2.5 py-1.5 flex flex-col items-center shrink-0">
                            <div className="w-full max-w-[145px] aspect-[4/4.5] rounded-xl bg-gradient-to-b from-[#d9222a] to-[#990f14] shadow-md border border-red-400/40 p-2.5 flex flex-col items-center justify-center text-center text-white">
                              <span className="bg-white/90 text-neutral-800 text-[6.5px] font-bold px-2 py-0.5 rounded-full mb-2 shadow-xs">
                                Congratulations
                              </span>
                              <span className="text-xs sm:text-sm font-black tracking-wide leading-tight uppercase text-white drop-shadow-sm">
                                SCRATCH &amp; WIN
                              </span>
                              <span className="text-[7.5px] text-white/80 mt-1 font-medium">
                                Scratch the card to reveal
                              </span>
                            </div>
                          </div>

                          {/* Paytm Postpaid Banner */}
                          <div className="mx-2.5 mb-1 p-1.5 bg-white/95 rounded-lg border border-sky-200 flex items-center justify-between shrink-0">
                            <div className="text-left">
                              <span className="text-[6.5px] font-bold text-sky-600 uppercase block">Paytm Postpaid</span>
                              <p className="text-[7.5px] font-extrabold text-neutral-900 leading-tight">Get credit up to ₹60,000 instantly</p>
                              <span className="inline-block bg-[#002970] text-white text-[6px] font-bold px-1.5 py-0.5 rounded mt-0.5">Activate Now</span>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-sky-400 bg-sky-50 flex items-center justify-center text-[7px] text-sky-700 font-bold shrink-0">
                              ₹
                            </div>
                          </div>

                          {/* Bottom Nav Bar */}
                          <div className="pb-1.5 px-3 shrink-0">
                            <div className="bg-[#002970] text-white rounded-full py-1 px-3 flex items-center justify-around text-[7.5px] font-medium shadow-md">
                              <span className="flex items-center gap-0.5 text-[#00b9f5] font-semibold">⌂ Home</span>
                              <span>⚏ Scan</span>
                              <span>🎁 Cashback</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Annotation */}
                      <div
                        className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                          showPaytmStoryAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        {/* Connecting dotted line with arrowhead */}
                        <div className="flex items-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                          <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                        </div>
                        {/* Annotation text */}
                        <div className="leading-tight">
                          <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                            No control
                          </h5>
                          <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                            Nothing he does changes what he gets
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        He scratches it
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        The reward is random. Nothing he does changes it.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: It doesn't suit him */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Left: iPhone Mockup */}
                      <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#e8f6f8] flex flex-col justify-between text-neutral-900">
                          {/* Status Bar + Dynamic Island */}
                          <div className="pt-2 px-3 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-800 z-10 shrink-0">
                            <span>9:41</span>
                            <div className="w-13 h-3 bg-black rounded-full" />
                            <div className="flex items-center gap-1 text-[8px]">
                              <span>📶</span>
                              <span>⚡</span>
                            </div>
                          </div>

                          {/* Paytm App Header Bar */}
                          <div className="px-3 pt-1 flex items-center justify-between shrink-0">
                            <span className="text-xs text-neutral-700 font-bold">←</span>
                            <div className="flex items-center tracking-tight">
                              <span className="font-extrabold text-[#002970] text-[11px]">Pay</span>
                              <span className="font-bold text-[#00b9f5] text-[11px]">tm</span>
                            </div>
                            <span className="text-xs text-neutral-700 font-bold">⋮</span>
                          </div>

                          {/* Compact User Row */}
                          <div className="px-3 pt-1 flex items-center justify-between shrink-0">
                            <div>
                              <p className="text-[9.5px] font-bold text-neutral-900 leading-tight">Sumit Kumar Yadav</p>
                              <p className="text-[7.5px] text-neutral-500 leading-tight">UPI ID: q45289534@ybl</p>
                            </div>
                            <div className="flex items-center gap-1 bg-white/80 px-1.5 py-0.5 rounded-full border border-neutral-200">
                              <span className="text-[10px] font-extrabold text-neutral-900">₹500</span>
                              <span className="w-3 h-3 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[6px] font-bold">✓</span>
                            </div>
                          </div>

                          {/* Your Rewards Bar */}
                          <div className="mx-2.5 mt-1 px-2 py-1 bg-white/90 rounded-lg border border-neutral-200 flex items-center justify-between text-[7.5px] shrink-0">
                            <span className="font-bold text-neutral-800">Your Rewards</span>
                            <div className="flex items-center gap-1.5 font-bold">
                              <span className="flex items-center gap-0.5 text-amber-600">🟡 12</span>
                              <span className="flex items-center gap-0.5 text-slate-500">⚪ 12</span>
                              <span className="flex items-center gap-0.5 text-amber-800">🟠 6</span>
                            </div>
                          </div>

                          {/* Revealed Coupon Card (Surrounded by dashed border) */}
                          <div className="px-2 py-1 flex flex-col items-center shrink-0">
                            <div className="w-full max-w-[155px] rounded-xl border border-dashed border-cyan-500/80 p-1 bg-white/60 shadow-sm">
                              {/* Gold coin header */}
                              <div className="bg-[#fef3c7] text-[#92400e] text-[6.5px] font-bold py-0.5 px-2 rounded-t-md flex items-center justify-center gap-1">
                                <span>🟡</span> You won 1 Gold Coin
                              </div>

                              {/* GIVA coupon body */}
                              <div className="bg-white p-1.5 rounded-b-md border border-neutral-200 flex flex-col">
                                <div className="flex items-center gap-1 mb-1">
                                  <div className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center text-[5.5px] font-serif font-black">
                                    GIVA
                                  </div>
                                </div>
                                <div className="w-full h-11 relative rounded overflow-hidden bg-neutral-100 mb-1">
                                  <Image
                                    src="/paytm/giva_jewellery.png"
                                    alt="GIVA jewellery"
                                    fill
                                    className="object-cover"
                                    sizes="140px"
                                  />
                                </div>
                                <span className="text-[6px] font-bold text-neutral-500 uppercase">GIVA</span>
                                <p className="text-[7.5px] font-bold text-neutral-900 leading-tight">
                                  Flat 32% off on MOV of ₹3,999
                                </p>
                                <button type="button" className="bg-black text-white text-[6.5px] font-bold py-0.5 rounded-full mt-1 text-center w-full">
                                  View Details
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Paytm Postpaid Banner */}
                          <div className="mx-2.5 mb-1 p-1.5 bg-white/95 rounded-lg border border-sky-200 flex items-center justify-between shrink-0">
                            <div className="text-left">
                              <span className="text-[6.5px] font-bold text-sky-600 uppercase block">Paytm Postpaid</span>
                              <p className="text-[7.5px] font-extrabold text-neutral-900 leading-tight">Get credit up to ₹60,000 instantly</p>
                              <span className="inline-block bg-[#002970] text-white text-[6px] font-bold px-1.5 py-0.5 rounded mt-0.5">Activate Now</span>
                            </div>
                            <div className="w-6 h-6 rounded-full border-2 border-sky-400 bg-sky-50 flex items-center justify-center text-[7px] text-sky-700 font-bold shrink-0">
                              ₹
                            </div>
                          </div>

                          {/* Bottom Nav Bar */}
                          <div className="pb-1.5 px-3 shrink-0">
                            <div className="bg-[#002970] text-white rounded-full py-1 px-3 flex items-center justify-around text-[7.5px] font-medium shadow-md">
                              <span className="flex items-center gap-0.5 text-[#00b9f5] font-semibold">⌂ Home</span>
                              <span>⚏ Scan</span>
                              <span>🎁 Cashback</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Annotation */}
                      <div
                        className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                          showPaytmStoryAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        {/* Connecting dotted line with arrowhead */}
                        <div className="flex items-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                          <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                        </div>
                        {/* Annotation text */}
                        <div className="leading-tight">
                          <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                            Irrelevant
                          </h5>
                          <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                            A brand he doesn't shop with, and a ₹3,999 minimum
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        It doesn't suit him
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        A jewellery coupon with a ₹3,999 minimum, from a brand he doesn't shop with.
                      </p>
                    </div>
                  </div>

                  {/* Card 5: He closes the card */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-5 sm:p-6 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Left: Dashed Frame with White Card */}
                      <div className="rounded-2xl border-2 border-dashed border-indigo-400/50 p-2 sm:p-3 shrink-0">
                        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xl w-[185px] sm:w-[210px] text-left border border-neutral-100 flex flex-col justify-between">
                          <div>
                            <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider text-rose-600 uppercase block mb-1.5">
                              WHAT USERS END UP WITH
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug mb-3.5">
                              A random coupon they'll probably never use
                            </h4>
                          </div>

                          <div className="bg-neutral-100/90 rounded-lg p-2 sm:p-2.5 border border-neutral-200/60 mt-auto">
                            <p className="text-[10px] sm:text-[11px] text-neutral-600 font-medium leading-snug">
                              Next time, the card goes unopened.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Annotation */}
                      <div
                        className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                          showPaytmStoryAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        {/* Connecting dotted line with arrowhead */}
                        <div className="flex items-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                          <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                        </div>
                        {/* Annotation text */}
                        <div className="leading-tight">
                          <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                            Ignored
                          </h5>
                          <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                            After enough misses, the next card goes unopened
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        He closes the card
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Next time, he has no particular reason to choose Paytm.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 02.B THE PROBLEM SPACE (Business Goal, User Problem & 6-Panel Storyboard) */}
                <div className="mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-neutral-800/80">
                  {/* Heading */}
                  <h3
                    className={`text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument leading-tight mb-8 sm:mb-10 ${
                      isLight ? "text-neutral-900" : "text-white"
                    }`}
                  >
                    The problem space
                  </h3>

                  {/* Side-by-side Business Goal & User Problem Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-8 sm:mb-10">
                    {/* Business goal card */}
                    <div
                      className={`p-6 sm:p-7 rounded-2xl border transition-colors ${
                        isLight
                          ? "bg-white border-neutral-200/90 shadow-sm"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                        Business goal
                      </span>
                      <p
                        className={`text-sm sm:text-base leading-relaxed ${
                          isLight ? "text-neutral-800" : "text-neutral-200"
                        }`}
                      >
                        Bring users back to make their next payment with Paytm UPI, and build a lasting preference for the app.
                      </p>
                    </div>

                    {/* User problem card */}
                    <div
                      className={`p-6 sm:p-7 rounded-2xl border transition-colors ${
                        isLight
                          ? "bg-white border-neutral-200/90 shadow-sm"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2 font-medium">
                        User problem
                      </span>
                      <p
                        className={`text-sm sm:text-base leading-relaxed ${
                          isLight ? "text-neutral-800" : "text-neutral-200"
                        }`}
                      >
                        Users get rewards they can't use, with no say in what they receive. So they have little reason to open the next card, or to choose Paytm next time.
                      </p>
                    </div>
                  </div>

                  {/* Subtle centered scroll arrows */}
                  <div className="flex items-center justify-center gap-3 mb-5">
                    <button
                      type="button"
                      onClick={() => scrollFlow(sixPanelStoryboardRef, "left")}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        isLight
                          ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                          : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                      }`}
                      aria-label="Previous storyboard panel"
                    >
                      <span className="text-xs select-none">‹</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollFlow(sixPanelStoryboardRef, "right")}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        isLight
                          ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                          : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                      }`}
                      aria-label="Next storyboard panel"
                    >
                      <span className="text-xs select-none">›</span>
                    </button>
                  </div>

                  {/* 6-Panel Storyboard Continuous Carousel */}
                  <div
                    ref={sixPanelStoryboardRef}
                    className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {/* Panel 1 */}
                    <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                        <Image
                          src="/paytm/storyboard/1.webp"
                          alt="Panel 1 - Shriram at kirana"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 190px, 240px"
                        />
                      </div>
                      <div className="mt-3 space-y-1">
                        <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>1</span>
                        <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Shriram is a regular at his local kirana. He pays with whichever UPI app he opens first.
                        </p>
                      </div>
                    </div>

                    {/* Panel 2 */}
                    <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                        <Image
                          src="/paytm/storyboard/2.webp"
                          alt="Panel 2 - ₹500 payment"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 190px, 240px"
                        />
                      </div>
                      <div className="mt-3 space-y-1">
                        <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>2</span>
                        <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          ₹500 for the week's groceries. Quick and easy, like always.
                        </p>
                      </div>
                    </div>

                    {/* Panel 3 */}
                    <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                        <Image
                          src="/paytm/storyboard/3.webp"
                          alt="Panel 3 - Scratch card pops up"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 190px, 240px"
                        />
                      </div>
                      <div className="mt-3 space-y-1">
                        <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>3</span>
                        <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          A scratch card pops up after the payment. He's excited and starts scratching.
                        </p>
                      </div>
                    </div>

                    {/* Panel 4 */}
                    <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                        <Image
                          src="/paytm/storyboard/4.webp"
                          alt="Panel 4 - Irrelevant jewellery coupon"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 190px, 240px"
                        />
                      </div>
                      <div className="mt-3 space-y-1">
                        <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>4</span>
                        <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          He gets a reward card of no use: 32% off jewellery, irrelevant to him.
                        </p>
                      </div>
                    </div>

                    {/* Panel 5 */}
                    <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                        <Image
                          src="/paytm/storyboard/5.webp"
                          alt="Panel 5 - Swipes it away"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 190px, 240px"
                        />
                      </div>
                      <div className="mt-3 space-y-1">
                        <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>5</span>
                        <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          A few payments later, the cards keep missing. This time he swipes it away without opening it.
                        </p>
                      </div>
                    </div>

                    {/* Panel 6 */}
                    <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                        <Image
                          src="/paytm/storyboard/6.webp"
                          alt="Panel 6 - No reason to prefer Paytm"
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 190px, 240px"
                        />
                      </div>
                      <div className="mt-3 space-y-1">
                        <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>6</span>
                        <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          No reason to prefer Paytm, so he picks another UPI app. The reward construct gave him nothing to come back for.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 03 STRATEGY & VISION SECTION */}
          <section
            id="strategy"
            className={`w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 border-t ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            {isLexora ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-semibold text-red-700 dark:text-red-400">
                    03
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Product Strategy & Vision
                  </span>
                </div>

                {/* Instrument Serif Title */}
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument leading-tight ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Product strategy and vision
                </h2>

                {/* 3-Step Strategy Progression Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-8 relative">
                  {/* Card 1 */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors relative flex flex-col justify-between ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-sm"
                        : "bg-[#0b0f19] border-neutral-800"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Ask
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLight
                              ? "bg-neutral-100 text-neutral-600 border border-neutral-200"
                              : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                          }`}
                        >
                          Accessibility
                        </span>
                      </div>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        A free, welcoming space to ask legal questions without intimidation or upfront fees.
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors relative flex flex-col justify-between ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-sm"
                        : "bg-[#0b0f19] border-neutral-800"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Learn
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLight
                              ? "bg-neutral-100 text-neutral-600 border border-neutral-200"
                              : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                          }`}
                        >
                          Community
                        </span>
                      </div>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Explore public queries and learn from real situations and verified answers shared by others.
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors relative flex flex-col justify-between ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-sm"
                        : "bg-[#0b0f19] border-neutral-800"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Manage
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLight
                              ? "bg-neutral-100 text-neutral-600 border border-neutral-200"
                              : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                          }`}
                        >
                          Transparency
                        </span>
                      </div>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        A central workspace to access documents, message your lawyer, and follow timeline updates.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vision Storyboard Grid */}
                <div className="mt-12 mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium">
                    The Connected Experience
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {/* LEXORA VISION 1 */}
                  <div className="flex flex-col">
                    <div
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative border transition-colors ${
                        isLight ? "border-neutral-200/90 bg-white shadow-xs" : "border-neutral-800 bg-neutral-900"
                      }`}
                    >
                      <Image
                        src="/lexora/strategy/01-ask.png"
                        alt="01 · Ask"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        01 · Ask
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Has an everyday legal question but doesn't know whom to approach or if it warrants fees.
                      </p>
                      <span className={`text-[11px] font-medium pt-1 ${isLight ? "text-amber-800/90" : "text-amber-400/90"}`}>
                        Before: No approachable place to start.
                      </span>
                    </div>
                  </div>

                  {/* LEXORA VISION 2 */}
                  <div className="flex flex-col">
                    <div
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative border transition-colors ${
                        isLight ? "border-neutral-200/90 bg-white shadow-xs" : "border-neutral-800 bg-neutral-900"
                      }`}
                    >
                      <Image
                        src="/lexora/strategy/02-learn.png"
                        alt="02 · Learn"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        02 · Learn
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Ask Lexora lets users post questions and discover real answers from verified community queries.
                      </p>
                      <span className={`text-[11px] font-medium pt-1 ${isLight ? "text-emerald-700" : "text-emerald-400"}`}>
                        Solution: A shared space for legal questions and learning.
                      </span>
                    </div>
                  </div>

                  {/* LEXORA VISION 3 */}
                  <div className="flex flex-col">
                    <div
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative border transition-colors ${
                        isLight ? "border-neutral-200/90 bg-white shadow-xs" : "border-neutral-800 bg-neutral-900"
                      }`}
                    >
                      <Image
                        src="/lexora/strategy/03-connect.png"
                        alt="03 · Connect"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        03 · Connect
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Clients communicate directly with their assigned lawyer through a dedicated case channel.
                      </p>
                      <span className={`text-[11px] font-medium pt-1 ${isLight ? "text-emerald-700" : "text-emerald-400"}`}>
                        Solution: Direct lawyer communication through Case Desk.
                      </span>
                    </div>
                  </div>

                  {/* LEXORA VISION 4 */}
                  <div className="flex flex-col">
                    <div
                      className={`w-full aspect-[4/3] rounded-xl overflow-hidden relative border transition-colors ${
                        isLight ? "border-neutral-200/90 bg-white shadow-xs" : "border-neutral-800 bg-neutral-900"
                      }`}
                    >
                      <Image
                        src="/lexora/strategy/04-stay-in-control.png"
                        alt="04 · Stay in control"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4
                        className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        04 · Stay in control
                      </h4>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Access all case documents and live status milestones in one place without chasing updates.
                      </p>
                      <span className={`text-[11px] font-medium pt-1 ${isLight ? "text-emerald-700" : "text-emerald-400"}`}>
                        Solution: A centralized case management experience.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Strategic Design Philosophy Callout Box */}
                <div
                  className={`mt-10 p-6 sm:p-8 rounded-2xl border-l-4 transition-colors ${
                    isLight
                      ? "bg-amber-50/50 border-red-700/80 text-neutral-800"
                      : "bg-neutral-900/70 border-red-500 text-neutral-200"
                  }`}
                >
                  <p className="text-sm sm:text-base font-semibold leading-relaxed">
                    "Legal help shouldn't end with just finding a lawyer. People deserve to stay informed, supported, and in control throughout their journey."
                  </p>
                  <p
                    className={`text-xs sm:text-[13px] mt-3 leading-relaxed ${
                      isLight ? "text-neutral-600" : "text-neutral-400"
                    }`}
                  >
                    Lexora connects two experiences: an open community to discover answers freely, and a dedicated Case Desk for active clients — bringing clarity from the first question to case resolution.
                  </p>
                </div>
              </>
            ) : (
              /* Paytm Exact Matching Strategy Section from User Screenshots */
              <div>
                {/* Heading */}
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument leading-tight mb-8 sm:mb-10 ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  Product strategy and vision
                </h2>

                {/* 3 Progression Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 relative mb-8 sm:mb-10">
                  {/* Card 1: Choose */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors relative flex flex-col justify-between ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-sm"
                        : "bg-[#0b0e17] border-[#1c2230]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Choose
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLight
                              ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                              : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                          }`}
                        >
                          Onboarding
                        </span>
                      </div>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        After an eligible payment, users pick a reward that's ready to claim.
                      </p>
                    </div>

                    {/* Desktop connector arrow */}
                    <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-neutral-500 text-sm select-none">
                      →
                    </div>
                  </div>

                  {/* Card 2: Build */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border transition-colors relative flex flex-col justify-between ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-sm"
                        : "bg-[#0b0e17] border-[#1c2230]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Build
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLight
                              ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                              : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                          }`}
                        >
                          Activation
                        </span>
                      </div>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Once they understand the experience, they can work towards a chosen reward over multiple payments.
                      </p>
                    </div>

                    {/* Desktop connector arrow */}
                    <div className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 text-neutral-500 text-sm select-none">
                      →
                    </div>
                  </div>

                  {/* Card 3: Play (Dashed Border) */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl border-2 border-dashed transition-colors relative flex flex-col justify-between ${
                      isLight
                        ? "bg-white/80 border-neutral-300 shadow-sm"
                        : "bg-[#0b0e17]/80 border-neutral-700"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2.5 flex-wrap">
                        <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Play
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLight
                              ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                              : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                          }`}
                        >
                          Power user
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-dashed ${
                            isLight
                              ? "border-neutral-300 text-neutral-600"
                              : "border-neutral-600 text-neutral-400"
                          }`}
                        >
                          Later
                        </span>
                      </div>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Test category choice and variation in progress, not a random reward.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subtle Centered Scroll Arrows */}
                <div className="flex items-center justify-center gap-3 mb-5">
                  <button
                    type="button"
                    onClick={() => scrollFlow(strategyCarouselRef, "left")}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isLight
                        ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                        : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                    }`}
                    aria-label="Previous strategy panel"
                  >
                    <span className="text-xs select-none">‹</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollFlow(strategyCarouselRef, "right")}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                      isLight
                        ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                        : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                    }`}
                    aria-label="Next strategy panel"
                  >
                    <span className="text-xs select-none">›</span>
                  </button>
                </div>

                {/* 6-Panel Strategy Storyboard Carousel */}
                <div
                  ref={strategyCarouselRef}
                  className="flex items-stretch gap-4 sm:gap-5 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Panel 1 */}
                  <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                      <Image
                        src="/paytm/strategy/strategy-1.webp"
                        alt="1 · Choose"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 190px, 240px"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>1 · Choose</span>
                      <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        After paying at the kirana, Shriram picks the reward he actually wants: headphones.
                      </p>
                    </div>
                  </div>

                  {/* Panel 2 */}
                  <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                      <Image
                        src="/paytm/strategy/strategy-2.webp"
                        alt="2 · Choose"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 190px, 240px"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>2 · Choose</span>
                      <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        The headphones arrive. He chose them, so he uses them and enjoys them.
                      </p>
                    </div>
                  </div>

                  {/* Panel 3 */}
                  <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                      <Image
                        src="/paytm/strategy/strategy-3.webp"
                        alt="3 · Build"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 190px, 240px"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>3 · Build</span>
                      <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Next time, a reward unlocks over more than one payment. The first payment gets it partway.
                      </p>
                    </div>
                  </div>

                  {/* Panel 4 */}
                  <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                      <Image
                        src="/paytm/strategy/strategy-4.webp"
                        alt="4 · Build"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 190px, 240px"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>4 · Build</span>
                      <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        He pays at the café with Paytm too. Each payment brings the reward closer, and paying with Paytm becomes a habit.
                      </p>
                    </div>
                  </div>

                  {/* Panel 5 */}
                  <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                      <Image
                        src="/paytm/strategy/strategy-5.webp"
                        alt="5 · Play"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 190px, 240px"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>5 · Play</span>
                      <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        As a regular, everyday payments keep moving him towards the next reward.
                      </p>
                    </div>
                  </div>

                  {/* Panel 6 */}
                  <div className="w-[190px] sm:w-[220px] lg:w-[240px] shrink-0 snap-start flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-blue-900/30 bg-white shadow-sm">
                      <Image
                        src="/paytm/strategy/strategy-6.webp"
                        alt="6 · Play"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 190px, 240px"
                      />
                    </div>
                    <div className="mt-3 space-y-1">
                      <span className={`text-xs font-bold block ${isLight ? "text-neutral-900" : "text-white"}`}>6 · Play</span>
                      <p className={`text-xs sm:text-[12.5px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        He picks categories and rewards freely. Only the progress is set by the app, by payment type and amount.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Closing Design Philosophy Callout with Cyan Accent Line */}
                <div className="mt-8 sm:mt-12 pt-2">
                  <div className="pl-4 sm:pl-5 border-l-2 border-cyan-400 py-0.5 max-w-3xl space-y-3">
                    <p
                      className={`text-xs sm:text-sm lg:text-base leading-relaxed font-medium ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      I'd earn the right to add complexity. First, make the reward clear and let people choose it. If a controlled test shows a clear, repeatable improvement in repeat payments and D7/D14 retention, I'd test visible progress. Only after that would I explore categories.
                    </p>
                    <p
                      className={`text-xs sm:text-[13px] leading-relaxed ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      Onboarding is the early period of use, not one payment. Users get time to understand the simple version first.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 04 CORE FLOWS SECTION */}
          <section
            id="core-flows"
            className={`w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 border-t transition-colors ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            {/* Main Header with Right-Side Arrow Controls */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-8 sm:mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-mono font-semibold ${isLexora ? "text-red-700 dark:text-red-400" : "text-blue-600 dark:text-blue-400"}`}>
                    04
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    Core User Flows
                  </span>
                </div>
                <h2
                  className={`text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument leading-tight tracking-tight ${
                    isLight ? "text-neutral-900" : "text-white"
                  }`}
                >
                  {isLexora ? "Core user flows" : "The 3-Step Selection & Progress Loop"}
                </h2>
                <p
                  className={`text-xs sm:text-sm mt-2 sm:mt-3 font-mono uppercase tracking-wider ${
                    isLight ? "text-neutral-500" : "text-neutral-400"
                  }`}
                >
                  {isLexora
                    ? "Primary experience · Case management & community legal support"
                    : "Choice architecture · From payment success to goal redemption"}
                </p>
              </div>

              {/* Left / Right Arrow Navigation Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => scrollFlow(flowContainerRef, "left")}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all ${
                    isLight
                      ? "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 text-neutral-800 active:scale-95 shadow-2xs cursor-pointer"
                      : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800 text-neutral-200 active:scale-95 cursor-pointer"
                  }`}
                  aria-label="Previous screens"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollFlow(flowContainerRef, "right")}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all ${
                    isLight
                      ? "border-neutral-300 hover:border-neutral-400 hover:bg-neutral-100 text-neutral-800 active:scale-95 shadow-2xs cursor-pointer"
                      : "border-neutral-700 hover:border-neutral-600 hover:bg-neutral-800 text-neutral-200 active:scale-95 cursor-pointer"
                  }`}
                  aria-label="Next screens"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

{isLexora ? (
              <>
            {/* Sub-header Flow Overview Pill */}
            <div className={`p-4 sm:p-5 rounded-2xl border mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
              isLight ? "bg-neutral-50/80 border-neutral-200/90 text-neutral-800" : "bg-[#10141d]/80 border-[#1c2230] text-neutral-200"
            }`}>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-red-700 dark:text-red-400">
                  Two Connected Experiences
                </span>
                <p className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                  <strong className={isLight ? "text-neutral-900" : "text-white"}>Ask Community</strong>: Open forum to raise questions freely and learn from real queries. · <strong className={isLight ? "text-neutral-900" : "text-white"}>Case Management</strong>: Dedicated workspace for active clients to track milestones and talk to counsel.
                </p>
              </div>
            </div>

            {/* Continuous Horizontal Flow Carousel with all 3 Screen Images + Outcomes */}
            <div
              ref={flowContainerRef}
              className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Card 1: Screen 1 — Ask community (Untitled design (2).png) */}
              <div
                className={`w-[310px] sm:w-[370px] lg:w-[400px] shrink-0 snap-center rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between border transition-all duration-300 ${
                  isLight
                    ? "bg-white border-neutral-200/90 shadow-xs"
                    : "bg-[#0f121a] border-[#1c2230]"
                }`}
              >
                <div className="flex items-center justify-between gap-2.5 sm:gap-3 relative min-h-[385px] sm:min-h-[440px]">
                  {/* Phone Mockup Frame */}
                  <div className="relative w-[175px] sm:w-[215px] lg:w-[225px] h-[385px] sm:h-[440px] rounded-[26px] sm:rounded-[30px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 sm:border-[3px] border-[#292f40] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col">
                    <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-900">
                      <Image
                        src="/lexora/flows/01-ask-community.png"
                        alt="Screen 1 — Ask community"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 175px, 225px"
                      />
                    </div>
                  </div>

                  {/* Annotations Column for Ask Community */}
                  <div className="flex-1 min-w-[105px] sm:min-w-[125px] flex flex-col justify-around py-2 sm:py-3 space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Open access
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Explore questions shared by other users.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Everyday concerns
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Loans, property, and fraud situations.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Learn from others
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Find answers to similar problems.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Ask freely
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Raise queries without fear or upfront fees.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className={`mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t ${isLight ? "border-neutral-100" : "border-[#1c2230]"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      Community
                    </span>
                    <h4 className={`text-xs sm:text-[13px] font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                      Screen 1 — Ask community
                    </h4>
                  </div>
                  <p className={`text-[10.5px] sm:text-[11px] mt-0.5 leading-snug ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    Users explore real questions, discover answers to similar challenges, and get reliable direction.
                  </p>
                </div>
              </div>

              {/* Card 2: Screen 2 — Case Desk (Untitled design (3).png) */}
              <div
                className={`w-[310px] sm:w-[370px] lg:w-[400px] shrink-0 snap-center rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between border transition-all duration-300 ${
                  isLight
                    ? "bg-white border-neutral-200/90 shadow-xs"
                    : "bg-[#0f121a] border-[#1c2230]"
                }`}
              >
                <div className="flex items-center justify-between gap-2.5 sm:gap-3 relative min-h-[385px] sm:min-h-[440px]">
                  {/* Phone Mockup Frame */}
                  <div className="relative w-[175px] sm:w-[215px] lg:w-[225px] h-[385px] sm:h-[440px] rounded-[26px] sm:rounded-[30px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 sm:border-[3px] border-[#292f40] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col">
                    <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-900">
                      <Image
                        src="/lexora/flows/02-case-desk.png"
                        alt="Screen 2 — Case Desk"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 175px, 225px"
                      />
                    </div>
                  </div>

                  {/* Annotations Column for Case Desk */}
                  <div className="flex-1 min-w-[105px] sm:min-w-[125px] flex flex-col justify-around py-3 space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          One workspace
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          All case information in one reliable place.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Quick essentials
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Files, lawyer messaging, and case log.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Clear overview
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Immediate awareness of active cases.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className={`mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t ${isLight ? "border-neutral-100" : "border-[#1c2230]"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      Case Desk
                    </span>
                    <h4 className={`text-xs sm:text-[13px] font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                      Screen 2 — Case Desk
                    </h4>
                  </div>
                  <p className={`text-[10.5px] sm:text-[11px] mt-0.5 leading-snug ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    Access case documents, updates, and direct lawyer communication without juggling scattered apps.
                  </p>
                </div>
              </div>

              {/* Card 3: Screen 3 — Case Status History (Untitled design (4).png) */}
              <div
                className={`w-[310px] sm:w-[370px] lg:w-[400px] shrink-0 snap-center rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between border transition-all duration-300 ${
                  isLight
                    ? "bg-white border-neutral-200/90 shadow-xs"
                    : "bg-[#0f121a] border-[#1c2230]"
                }`}
              >
                <div className="flex items-center justify-between gap-2.5 sm:gap-3 relative min-h-[385px] sm:min-h-[440px]">
                  {/* Phone Mockup Frame */}
                  <div className="relative w-[175px] sm:w-[215px] lg:w-[225px] h-[385px] sm:h-[440px] rounded-[26px] sm:rounded-[30px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 sm:border-[3px] border-[#292f40] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col">
                    <div className="relative w-full h-full rounded-[20px] sm:rounded-[24px] overflow-hidden bg-neutral-900">
                      <Image
                        src="/lexora/flows/03-case-status-history.png"
                        alt="Screen 3 — Case Status History"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 175px, 225px"
                      />
                    </div>
                  </div>

                  {/* Annotations Column for Case Status History */}
                  <div className="flex-1 min-w-[105px] sm:min-w-[125px] flex flex-col justify-around py-2 sm:py-3 space-y-2 sm:space-y-3">
                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Know where you stand
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Current case stage is clearly highlighted.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Visual timeline
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Clear milestones from filing to resolution.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          No uncertainty
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          See completed, ongoing, and next stages.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                      <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                      <div className="leading-tight">
                        <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Live updates
                        </p>
                        <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Instant notifications on milestone shifts.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Caption */}
                <div className={`mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t ${isLight ? "border-neutral-100" : "border-[#1c2230]"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                      Timeline
                    </span>
                    <h4 className={`text-xs sm:text-[13px] font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                      Screen 3 — Case Status History
                    </h4>
                  </div>
                  <p className={`text-[10.5px] sm:text-[11px] mt-0.5 leading-snug ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    Users follow progress through a structured timeline from submission to final resolution.
                  </p>
                </div>
              </div>

              {/* Card 4: Flow 01 Outcome Card (Case management) */}
              <div
                className={`w-[310px] sm:w-[370px] lg:w-[400px] shrink-0 snap-center rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between border transition-all duration-300 ${
                  isLight
                    ? "bg-white border-emerald-500/80 ring-2 ring-emerald-200/80 shadow-md"
                    : "bg-[#0f121a] border-emerald-500/80 ring-2 ring-emerald-950/60 shadow-lg shadow-black/40"
                }`}
              >
                <div className="w-full max-w-[270px] mx-auto h-[385px] sm:h-[440px] bg-white rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 shadow-xl border border-neutral-200 flex flex-col justify-between text-neutral-900">
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-widest text-emerald-700 uppercase">
                      CASE MANAGEMENT OUTCOME
                    </span>
                    <h4 className="text-sm sm:text-base font-bold leading-tight mt-1 mb-4 sm:mb-5 text-neutral-900">
                      Managing an ongoing case
                    </h4>

                    {/* Checklist */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-2 sm:gap-2.5">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">Transparency</p>
                          <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">Users know where their case stands.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-2.5">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">Accessibility</p>
                          <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">Documents & lawyer in one tap.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-2.5">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">Confidence</p>
                          <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">Control replaces guesswork.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-100/90 border border-neutral-200 rounded-xl p-2.5 sm:p-3 text-center mt-auto">
                    <p className="text-[9.5px] sm:text-[10px] text-neutral-700 font-medium leading-snug">
                      More visibility, fewer follow-up calls, and greater confidence throughout.
                    </p>
                  </div>
                </div>

                <div className={`mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t ${isLight ? "border-neutral-100" : "border-[#1c2230]"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Outcome
                    </span>
                    <h4 className="text-xs sm:text-[13px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Case Management Outcome
                    </h4>
                  </div>
                  <p className={`text-[10.5px] sm:text-[11px] mt-0.5 leading-snug ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    Fewer manual follow-ups and complete certainty across the client journey.
                  </p>
                </div>
              </div>

              {/* Card 5: Flow 02 Outcome Card (Ask Community) */}
              <div
                className={`w-[310px] sm:w-[370px] lg:w-[400px] shrink-0 snap-center rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between border transition-all duration-300 ${
                  isLight
                    ? "bg-white border-emerald-500/80 ring-2 ring-emerald-200/80 shadow-md"
                    : "bg-[#0f121a] border-emerald-500/80 ring-2 ring-emerald-950/60 shadow-lg shadow-black/40"
                }`}
              >
                <div className="w-full max-w-[270px] mx-auto h-[385px] sm:h-[440px] bg-white rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 shadow-xl border border-neutral-200 flex flex-col justify-between text-neutral-900">
                  <div>
                    <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-widest text-emerald-700 uppercase">
                      COMMUNITY OUTCOME
                    </span>
                    <h4 className="text-sm sm:text-base font-bold leading-tight mt-1 mb-4 sm:mb-5 text-neutral-900">
                      Asking legal questions freely
                    </h4>

                    {/* Checklist */}
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-2 sm:gap-2.5">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">Accessibility</p>
                          <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">Easy to ask without hesitation.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-2.5">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">Shared learning</p>
                          <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">Learn from real community queries.</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-2.5">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">Engagement</p>
                          <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">A helpful, growing knowledge base.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-100/90 border border-neutral-200 rounded-xl p-2.5 sm:p-3 text-center mt-auto">
                    <p className="text-[9.5px] sm:text-[10px] text-neutral-700 font-medium leading-snug">
                      Legal knowledge becomes accessible through authentic community answers.
                    </p>
                  </div>
                </div>

                <div className={`mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t ${isLight ? "border-neutral-100" : "border-[#1c2230]"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Outcome
                    </span>
                    <h4 className="text-xs sm:text-[13px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Community Outcome
                    </h4>
                  </div>
                  <p className={`text-[10.5px] sm:text-[11px] mt-0.5 leading-snug ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    Users don't just ask questions; they learn from shared experiences.
                  </p>
                </div>
              </div>
            </div>
              </>
            ) : (
              /* Paytm Exact Core User Flows Matching User Screenshot */
              <div>
                {/* Flow 1 Header: First-time user (Onboarding) */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 sm:mb-10">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                        First-time user
                      </h3>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          isLight
                            ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                            : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}
                      >
                        Onboarding
                      </span>
                    </div>
                    <p
                      className={`text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      One eligible payment, choose a card, and the reward they chose is unlocked and ready to claim.
                    </p>
                  </div>

                  {/* Top-Right Controls: Annotations Toggle & Replay */}
                  <div className="flex items-center gap-3 shrink-0 self-start lg:self-center mt-2 lg:mt-0">
                    {/* Annotations Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowAnnotations(!showAnnotations)}
                      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                        showAnnotations
                          ? isLight
                            ? "bg-blue-50 border-blue-400 text-blue-700 shadow-2xs"
                            : "bg-[#0f172a] border-blue-500/60 text-blue-300 shadow-sm"
                          : isLight
                          ? "bg-neutral-100 border-neutral-300 text-neutral-500 hover:text-neutral-800"
                          : "bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-neutral-200"
                      }`}
                    >
                      <span
                        className={`w-7 h-4 rounded-full p-0.5 flex items-center transition-colors ${
                          showAnnotations
                            ? "bg-blue-500 justify-end"
                            : isLight ? "bg-neutral-300 justify-start" : "bg-neutral-700 justify-start"
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                      </span>
                      <span>Annotations</span>
                    </button>

                    {/* Replay Button */}
                    <button
                      type="button"
                      onClick={() => scrollToFlowStep(0)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                        isLight
                          ? "border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 shadow-2xs"
                          : "border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white"
                      }`}
                    >
                      <span className="text-xs">↺</span>
                      <span>Replay</span>
                    </button>
                  </div>
                </div>

                {/* 5-Card Continuous Flow Carousel */}
                <div
                  ref={flowContainerRef}
                  className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Card 1: He's told he can choose */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Left: iPhone Mockup */}
                      <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#e8f6f8] flex flex-col justify-between text-neutral-900">
                          {/* Status Bar + Dynamic Island */}
                          <div className="pt-2 px-3 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-800 z-10 shrink-0">
                            <span>9:41</span>
                            <div className="w-13 h-3 bg-black rounded-full" />
                            <div className="flex items-center gap-1 text-[8px]">
                              <span>📶</span>
                              <span>⚡</span>
                            </div>
                          </div>

                          {/* Paytm App Header Bar */}
                          <div className="px-3 pt-1 flex items-center justify-between shrink-0">
                            <span className="text-xs text-neutral-700 font-bold">←</span>
                            <div className="flex items-center tracking-tight">
                              <span className="font-extrabold text-[#002970] text-[11px]">Pay</span>
                              <span className="font-bold text-[#00b9f5] text-[11px]">tm</span>
                            </div>
                            <span className="text-xs text-neutral-700 font-bold">⋮</span>
                          </div>

                          {/* Recipient Details & Payment info */}
                          <div className="px-3 pt-1 text-center shrink-0">
                            <p className="text-[10px] font-bold text-neutral-900 leading-tight">Sumit Kumar Yadav</p>
                            <p className="text-[7.5px] text-neutral-500 leading-tight">UPI ID: q45289534@ybl</p>
                            
                            <div className="flex items-center justify-center gap-1 my-1">
                              <span className="text-base sm:text-lg font-extrabold text-neutral-900">₹500</span>
                              <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[7px] font-bold">✓</span>
                            </div>
                            <p className="text-[6.5px] text-neutral-500">21 Aug, 08:00 PM • Ref. No: 63788203851</p>

                            {/* 3 Action Buttons */}
                            <div className="flex items-center justify-center gap-1 mt-1">
                              <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">Check Balance</span>
                              <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">Pay Again</span>
                              <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">&lt; Share</span>
                            </div>
                          </div>

                          {/* Cyan separator line */}
                          <div className="w-full h-0.5 bg-[#00b9f5] mt-1 shrink-0" />

                          {/* Bottom Sheet: Reward Card Selection Banner */}
                          <div className="relative flex-1 bg-gradient-to-b from-[#fffbeb] to-white p-2 flex flex-col items-center justify-center overflow-hidden">
                            <div className="w-full max-w-[155px] rounded-xl bg-white/95 border border-amber-200 p-2 shadow-sm text-center flex flex-col items-center">
                              <span className="text-[6.5px] font-mono font-bold tracking-wider text-amber-800 uppercase">
                                YOU WON A
                              </span>
                              <h4 className="text-[11px] font-extrabold text-neutral-900 leading-tight mt-0.5">
                                Reward Card
                              </h4>
                              <p className="text-[6.5px] text-neutral-500 mt-0.5">
                                1 of 1 at your choice · Instant reward
                              </p>

                              {/* Fanned Cards Graphic */}
                              <div className="relative w-full h-15 my-1 flex items-center justify-center">
                                <div className="absolute w-12 h-13 rounded-lg bg-gradient-to-b from-[#d9222a] to-[#990f14] shadow-sm transform -rotate-12 -translate-x-3.5 border border-red-400/40" />
                                <div className="absolute w-12 h-13 rounded-lg bg-gradient-to-b from-[#d9222a] to-[#990f14] shadow-sm transform rotate-12 translate-x-3.5 border border-red-400/40" />
                                <div className="relative z-10 w-14 h-14 rounded-lg bg-gradient-to-b from-[#e03131] to-[#b01c1c] shadow-md border border-amber-400/60 p-1 flex flex-col items-center justify-center text-center text-white">
                                  <span className="text-[6px] font-mono font-bold uppercase tracking-wider text-amber-200">SELECT</span>
                                  <span className="text-[8px] font-black uppercase text-white">CARD</span>
                                </div>
                              </div>

                              {/* Select Reward Button */}
                              <div className="bg-[#00b9f5] text-white text-[7px] font-bold py-1 px-2.5 rounded-full w-full text-center shadow-xs">
                                Select the reward you want
                              </div>
                            </div>
                          </div>

                          {/* Bottom Nav Bar */}
                          <div className="pb-1.5 px-3 shrink-0">
                            <div className="bg-[#002970] text-white rounded-full py-1 px-3 flex items-center justify-around text-[7.5px] font-medium shadow-md">
                              <span className="flex items-center gap-0.5 text-[#00b9f5] font-semibold">⌂ Home</span>
                              <span>⚏ Scan</span>
                              <span>🎁 Cashback</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Annotation */}
                      <div
                        className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                          showAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="flex items-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                          <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                        </div>
                        <div className="leading-tight">
                          <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                            Choice up front
                          </h5>
                          <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                            Tell users they get to pick the reward
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        He's told he can choose
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        The receipt says up front that he gets to pick the reward.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Real offers, side by side */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Left: iPhone Mockup */}
                      <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#0d111a] flex flex-col justify-between text-white p-2">
                          {/* Status Bar + Dynamic Island */}
                          <div className="pt-1 px-1 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-300 z-10 shrink-0">
                            <span>9:41</span>
                            <div className="w-13 h-3 bg-black rounded-full" />
                            <div className="flex items-center gap-1 text-[8px]">
                              <span>📶</span>
                              <span>⚡</span>
                            </div>
                          </div>

                          {/* Close button + Header */}
                          <div className="pt-1 px-1 flex items-center justify-between shrink-0">
                            <span className="text-neutral-400 text-xs">✕</span>
                          </div>

                          <div className="text-center shrink-0 -mt-1">
                            <h4 className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                              Pick your reward
                            </h4>
                            <p className="text-[7.5px] text-neutral-400 mt-0.5">
                              Choose one card. The one you pick is yours.
                            </p>
                          </div>

                          {/* Reward Cards Carousel inside Phone */}
                          <div className="relative flex items-center justify-center my-auto overflow-hidden">
                            {/* Center active card: boAt Rockerz */}
                            <div className="w-[135px] bg-white rounded-xl p-2 text-neutral-900 shadow-xl border border-neutral-200 relative z-10 flex flex-col">
                              <div className="flex items-center gap-1 mb-1">
                                <div className="w-3.5 h-3.5 rounded-full border border-neutral-300 flex items-center justify-center text-[5px] font-bold text-red-600">
                                  boAt
                                </div>
                              </div>
                              <div className="w-full h-13 relative rounded overflow-hidden bg-neutral-100 mb-1">
                                <Image
                                  src="/paytm/boat_headphones.png"
                                  alt="boAt Rockerz"
                                  fill
                                  className="object-cover"
                                  sizes="135px"
                                />
                              </div>
                              <span className="text-[6px] font-bold text-neutral-500 uppercase">boAt</span>
                              <p className="text-[7.5px] font-bold text-neutral-900 leading-tight">
                                Flat 32% off on MOV of ₹5,000
                              </p>
                              <div className="bg-black text-white text-[7px] font-semibold py-1 rounded-md text-center mt-1.5">
                                I want this
                              </div>
                            </div>

                            {/* Peeking Next Card on Right */}
                            <div className="absolute -right-16 w-[70px] h-[115px] bg-white/20 rounded-xl border border-neutral-700/60 p-1 backdrop-blur-xs opacity-60" />
                          </div>

                          {/* Carousel dots & chevrons */}
                          <div className="flex items-center justify-center gap-1.5 text-[7px] text-neutral-400 shrink-0">
                            <span>‹</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                            <span>›</span>
                          </div>

                          {/* Terms first & Continue button */}
                          <div className="mt-1 pt-1 text-center shrink-0">
                            <span className="text-[6.5px] text-neutral-400 underline block mb-1">
                              *View terms for boAt
                            </span>
                            <div className="border border-dashed border-neutral-700 text-neutral-500 rounded-full py-1 text-[7px] font-medium w-full text-center">
                              Select a card to continue
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Annotations Column (2 callouts) */}
                      <div
                        className={`flex-1 min-w-[110px] sm:min-w-[130px] flex flex-col justify-around h-[360px] py-2 transition-opacity duration-300 ${
                          showAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        {/* Annotation 1: One clear ask */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="flex items-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                            <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                          </div>
                          <div className="leading-tight">
                            <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              One clear ask
                            </h5>
                            <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Choose a card. Nothing else.
                            </p>
                          </div>
                        </div>

                        {/* Annotation 2: Terms first */}
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="flex items-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                            <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                          </div>
                          <div className="leading-tight">
                            <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Terms first
                            </h5>
                            <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Visible before confirming
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        Real offers, side by side
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Each card shows the product and the exact offer.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: He picks one */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Left: iPhone Mockup */}
                      <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#0d111a] flex flex-col justify-between text-white p-2">
                          {/* Status Bar + Dynamic Island */}
                          <div className="pt-1 px-1 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-300 z-10 shrink-0">
                            <span>9:41</span>
                            <div className="w-13 h-3 bg-black rounded-full" />
                            <div className="flex items-center gap-1 text-[8px]">
                              <span>📶</span>
                              <span>⚡</span>
                            </div>
                          </div>

                          {/* Close button */}
                          <div className="pt-1 px-1 flex items-center justify-between shrink-0">
                            <span className="text-neutral-400 text-xs">✕</span>
                          </div>

                          <div className="text-center shrink-0 -mt-1">
                            <h4 className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                              Pick your reward
                            </h4>
                            <p className="text-[7.5px] text-neutral-400 mt-0.5">
                              Choose one card. The one you pick is yours.
                            </p>
                          </div>

                          {/* Selected Card with Gold Highlight */}
                          <div className="relative flex items-center justify-center my-auto overflow-hidden">
                            <div className="w-[135px] bg-white rounded-xl p-2 text-neutral-900 shadow-xl border-2 border-amber-400 relative z-10 flex flex-col ring-2 ring-amber-400/40">
                              <div className="flex items-center gap-1 mb-1">
                                <div className="w-3.5 h-3.5 rounded-full border border-neutral-300 flex items-center justify-center text-[5px] font-bold text-red-600">
                                  boAt
                                </div>
                              </div>
                              <div className="w-full h-13 relative rounded overflow-hidden bg-neutral-100 mb-1">
                                <Image
                                  src="/paytm/boat_headphones.png"
                                  alt="boAt Rockerz"
                                  fill
                                  className="object-cover"
                                  sizes="135px"
                                />
                              </div>
                              <span className="text-[6px] font-bold text-neutral-500 uppercase">boAt</span>
                              <p className="text-[7.5px] font-bold text-neutral-900 leading-tight">
                                Flat 32% off on MOV of ₹5,000
                              </p>
                              <div className="bg-[#f59e0b] text-neutral-950 text-[7px] font-bold py-1 rounded-md text-center mt-1.5 flex items-center justify-center gap-1">
                                <span>✓</span> Selected
                              </div>
                            </div>
                          </div>

                          {/* Carousel dots */}
                          <div className="flex items-center justify-center gap-1.5 text-[7px] text-neutral-400 shrink-0">
                            <span>‹</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                            <span>›</span>
                          </div>

                          {/* Terms link & Confirm Button */}
                          <div className="mt-1 pt-1 text-center shrink-0">
                            <span className="text-[6.5px] text-neutral-400 underline block mb-1">
                              *View terms for boAt
                            </span>
                            <div className="bg-[#f59e0b] text-neutral-950 font-bold rounded-full py-1 text-[7.5px] w-full text-center shadow-md">
                              Confirm boAt voucher
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Annotation */}
                      <div
                        className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                          showAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="flex items-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                          <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                        </div>
                        <div className="leading-tight">
                          <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                            Offer visible
                          </h5>
                          <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                            Product and offer shown before picking
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        He picks one
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        The button names the brand he's confirming.
                      </p>
                    </div>
                  </div>

                  {/* Card 4: Unlocked, ready to claim */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Left: iPhone Mockup */}
                      <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                        <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-[#1d4ed8] via-[#2563eb] to-[#1e40af] flex flex-col justify-between text-white p-2">
                          {/* Radial rays overlay */}
                          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.8)_10%,transparent_70%)]" />

                          {/* Status Bar + Dynamic Island */}
                          <div className="pt-1 px-1 flex items-center justify-between text-[8px] font-sans font-semibold text-white/90 z-10 shrink-0">
                            <span>9:41</span>
                            <div className="w-13 h-3 bg-black rounded-full" />
                            <div className="flex items-center gap-1 text-[8px]">
                              <span>📶</span>
                              <span>⚡</span>
                            </div>
                          </div>

                          {/* Close button + coin badge */}
                          <div className="pt-1 px-1 flex items-center justify-between shrink-0 relative z-10">
                            <span className="text-white/80 text-xs">✕</span>
                            <span className="bg-[#fef3c7] text-[#78350f] text-[6px] font-bold py-0.5 px-2 rounded-full shadow-xs">
                              🟡 You won 10% offer coins
                            </span>
                            <span className="w-3" />
                          </div>

                          {/* White Coupon Card */}
                          <div className="w-[130px] bg-white rounded-xl p-2 text-neutral-900 shadow-xl border border-neutral-200 mx-auto my-1 relative z-10 flex flex-col">
                            <div className="w-full h-11 relative rounded overflow-hidden bg-neutral-100 mb-1">
                              <Image
                                src="/paytm/boat_headphones.png"
                                alt="boAt Rockerz"
                                fill
                                className="object-cover"
                                sizes="130px"
                              />
                            </div>
                            <span className="text-[5.5px] font-bold text-neutral-500 uppercase">boAt</span>
                            <p className="text-[7px] font-bold text-neutral-900 leading-tight">
                              Flat 32% off on MOV of ₹5,000
                            </p>
                          </div>

                          {/* Guaranteed Reward Banner */}
                          <div className="w-[145px] mx-auto border border-dashed border-blue-300/60 rounded-xl p-2 text-center relative z-10 my-auto bg-blue-900/30 backdrop-blur-2xs">
                            <span className="text-[5.5px] font-mono font-bold tracking-widest text-blue-200 uppercase block">
                              YOUR PICK, GUARANTEED
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight my-0.5 drop-shadow-sm">
                              32% off
                            </h3>
                            <p className="text-[6.5px] font-semibold text-blue-100 leading-tight">
                              Save up to ₹1,600 on boAt headphones
                            </p>
                            <p className="text-[5.5px] text-blue-200/70 mt-0.5">
                              On orders above ₹5,000 · Valid 30 days after claim
                            </p>
                          </div>

                          {/* Claim Reward Button */}
                          <div className="mt-auto pt-1 relative z-10 shrink-0">
                            <div className="bg-[#f59e0b] text-neutral-950 font-bold rounded-full py-1.5 text-[8px] w-full text-center shadow-lg">
                              Claim reward
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Annotation */}
                      <div
                        className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                          showAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="flex items-center shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                          <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                        </div>
                        <div className="leading-tight">
                          <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                            No surprises
                          </h5>
                          <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                            The exact reward they picked
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        Unlocked, ready to claim
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        The reward he chose, after one eligible payment.
                      </p>
                    </div>
                  </div>

                  {/* Card 5: Outcome */}
                  <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                    {/* Top frame */}
                    <div
                      className={`h-[450px] sm:h-[480px] rounded-3xl p-5 sm:p-6 flex items-center justify-center border transition-all relative overflow-hidden ${
                        isLight
                          ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                          : "bg-[#0b0e17] border-[#1c2230]"
                      }`}
                    >
                      {/* Floating White Outcome Card */}
                      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl w-[210px] sm:w-[230px] text-left border border-neutral-100 flex flex-col justify-between">
                        <div>
                          <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider text-emerald-600 uppercase block mb-1.5">
                            WHAT USERS END UP WITH
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug mb-3.5">
                            The reward they picked, ready to claim
                          </h4>

                          {/* Checklist */}
                          <div className="space-y-2.5 my-2">
                            <div className="flex items-start gap-1.5">
                              <span className="text-emerald-600 text-xs font-bold shrink-0 mt-0.5">✓</span>
                              <div>
                                <span className="text-[10px] sm:text-[10.5px] font-bold text-neutral-900 block leading-tight">Chosen</span>
                                <p className="text-[8.5px] sm:text-[9px] text-neutral-500 leading-tight">The exact reward they picked, ready to claim.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <span className="text-emerald-600 text-xs font-bold shrink-0 mt-0.5">✓</span>
                              <div>
                                <span className="text-[10px] sm:text-[10.5px] font-bold text-neutral-900 block leading-tight">Relevant</span>
                                <p className="text-[8.5px] sm:text-[9px] text-neutral-500 leading-tight">Something they wanted, so it gets used.</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-1.5">
                              <span className="text-emerald-600 text-xs font-bold shrink-0 mt-0.5">✓</span>
                              <div>
                                <span className="text-[10px] sm:text-[10.5px] font-bold text-neutral-900 block leading-tight">Clear</span>
                                <p className="text-[8.5px] sm:text-[9px] text-neutral-500 leading-tight">Value and terms were visible before they started.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-neutral-100/90 rounded-lg p-2.5 border border-neutral-200/60 mt-3">
                          <p className="text-[9.5px] sm:text-[10px] text-neutral-600 font-medium leading-snug">
                            A reward they wanted is more likely to be redeemed.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className="mt-3.5 space-y-1">
                      <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                        Outcome
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        A reward he chose is one he's more likely to use.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step Progress / Timeline Bar */}
                <div className="mt-6 pt-6 border-t border-neutral-800/80 flex items-center justify-between gap-2 max-w-4xl mx-auto">
                  <button
                    type="button"
                    onClick={() => scrollFlow(flowContainerRef, "left")}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isLight
                        ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                        : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                    }`}
                    aria-label="Previous step"
                  >
                    <span className="text-xs select-none">‹</span>
                  </button>

                  {/* Horizontal Timeline Track */}
                  <div className="flex-1 flex items-center justify-between px-2 sm:px-6 relative">
                    <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-800 -z-0" />
                    
                    {["Card won", "Browse", "Select", "Claim", "Outcome"].map((step, idx) => (
                      <button
                        key={step}
                        type="button"
                        onClick={() => scrollToFlowStep(idx)}
                        className="flex flex-col items-center gap-1.5 relative z-10 cursor-pointer group"
                      >
                        <div
                          className={`w-3 h-3 rounded-full border-2 transition-all ${
                            activeFlowStep === idx
                              ? "bg-blue-500 border-white ring-2 ring-blue-500/50 scale-125"
                              : "bg-[#11131a] border-neutral-600 group-hover:border-neutral-400"
                          }`}
                        />
                        <span
                          className={`text-[10px] sm:text-[11px] font-mono tracking-tight transition-colors ${
                            activeFlowStep === idx
                              ? "text-blue-400 font-bold"
                              : "text-neutral-500 group-hover:text-neutral-300"
                          }`}
                        >
                          {step}
                        </span>
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => scrollFlow(flowContainerRef, "right")}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isLight
                        ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                        : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                    }`}
                    aria-label="Next step"
                  >
                    <span className="text-xs select-none">›</span>
                  </button>
                </div>

                {/* Flow 2: Returning user (Activation) Complete Sequence */}
                <div className="mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-neutral-800/80">
                  {/* Header Row with Controls */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 sm:mb-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Returning user
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isLight
                              ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                              : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                          }`}
                        >
                          Activation
                        </span>
                      </div>
                      <p
                        className={`text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Choose a new reward. The first payment starts progress; the next one completes it. The two-payment split is an example.
                      </p>
                    </div>

                    {/* Top-Right Controls */}
                    <div className="flex items-center gap-3 shrink-0 self-start lg:self-center mt-2 lg:mt-0">
                      {/* Annotations Toggle */}
                      <button
                        type="button"
                        onClick={() => setShowReturningAnnotations(!showReturningAnnotations)}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                          showReturningAnnotations
                            ? isLight
                              ? "bg-blue-50 border-blue-400 text-blue-700 shadow-2xs"
                              : "bg-[#0f172a] border-blue-500/60 text-blue-300 shadow-sm"
                            : isLight
                            ? "bg-neutral-100 border-neutral-300 text-neutral-500 hover:text-neutral-800"
                            : "bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-neutral-200"
                        }`}
                      >
                        <span
                          className={`w-7 h-4 rounded-full p-0.5 flex items-center transition-colors ${
                            showReturningAnnotations
                              ? "bg-blue-500 justify-end"
                              : isLight ? "bg-neutral-300 justify-start" : "bg-neutral-700 justify-start"
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full bg-white shadow-xs" />
                        </span>
                        <span>Annotations</span>
                      </button>

                      {/* Replay Button */}
                      <button
                        type="button"
                        onClick={() => scrollToReturningStep(0)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                          isLight
                            ? "border-neutral-300 bg-white hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 shadow-2xs"
                            : "border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white"
                        }`}
                      >
                        <span className="text-xs">↺</span>
                        <span>Replay</span>
                      </button>
                    </div>
                  </div>

                  {/* 7-Card Continuous Flow Carousel */}
                  <div
                    ref={returningFlowContainerRef}
                    className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {/* Card 1: Payment 1 starts progress */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* Phone Mockup */}
                        <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                          <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#e8f6f8] flex flex-col justify-between text-neutral-900">
                            {/* Status Bar */}
                            <div className="pt-2 px-3 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-800 z-10 shrink-0">
                              <span>9:41</span>
                              <div className="w-13 h-3 bg-black rounded-full" />
                              <div className="flex items-center gap-1 text-[8px]">
                                <span>📶</span>
                                <span>⚡</span>
                              </div>
                            </div>

                            {/* Header */}
                            <div className="px-3 pt-1 flex items-center justify-between shrink-0">
                              <span className="text-xs text-neutral-700 font-bold">←</span>
                              <div className="flex items-center tracking-tight">
                                <span className="font-extrabold text-[#002970] text-[11px]">Pay</span>
                                <span className="font-bold text-[#00b9f5] text-[11px]">tm</span>
                              </div>
                              <span className="text-xs text-neutral-700 font-bold">⋮</span>
                            </div>

                            {/* Payment Info */}
                            <div className="px-3 pt-1 text-center shrink-0">
                              <p className="text-[10px] font-bold text-neutral-900 leading-tight">Fresh Basket Kirana</p>
                              <p className="text-[7.5px] text-neutral-500 leading-tight">UPI ID: freshbasket@ybl</p>
                              <div className="flex items-center justify-center gap-1 my-1">
                                <span className="text-base sm:text-lg font-extrabold text-neutral-900">₹500</span>
                                <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[7px] font-bold">✓</span>
                              </div>
                              <p className="text-[6.5px] text-neutral-500">21 Aug, 08:00 PM • Ref. No: 63788203851</p>

                              <div className="flex items-center justify-center gap-1 mt-1">
                                <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">Check Balance</span>
                                <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">Pay Again</span>
                                <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">&lt; Share</span>
                              </div>
                            </div>

                            <div className="w-full h-0.5 bg-[#00b9f5] mt-1 shrink-0" />

                            {/* Bottom Sheet: Half way to reward card */}
                            <div className="relative flex-1 bg-gradient-to-b from-[#fffbeb] to-white p-2 flex flex-col items-center justify-center overflow-hidden">
                              <div className="w-full max-w-[155px] rounded-xl bg-white/95 border border-amber-200 p-2 shadow-sm text-center flex flex-col items-center">
                                <span className="text-[6.5px] font-mono font-bold tracking-wider text-amber-800 uppercase">
                                  YOU'RE HALF WAY TO A
                                </span>
                                <h4 className="text-[11px] font-extrabold text-neutral-900 leading-tight mt-0.5">
                                  Reward Card
                                </h4>
                                <p className="text-[6.5px] text-neutral-500 mt-0.5">
                                  1 of 2 payments complete · Unlock next payment
                                </p>

                                {/* Fanned cards */}
                                <div className="relative w-full h-15 my-1 flex items-center justify-center">
                                  <div className="absolute w-12 h-13 rounded-lg bg-gradient-to-b from-[#d9222a] to-[#990f14] shadow-sm transform -rotate-12 -translate-x-3.5 border border-red-400/40" />
                                  <div className="absolute w-12 h-13 rounded-lg bg-gradient-to-b from-[#d9222a] to-[#990f14] shadow-sm transform rotate-12 translate-x-3.5 border border-red-400/40" />
                                  <div className="relative z-10 w-14 h-14 rounded-lg bg-gradient-to-b from-[#e03131] to-[#b01c1c] shadow-md border border-amber-400/60 p-1 flex flex-col items-center justify-center text-center text-white">
                                    <span className="text-[6px] font-mono font-bold uppercase tracking-wider text-amber-200">SELECT</span>
                                    <span className="text-[8px] font-black uppercase text-white">CARD</span>
                                  </div>
                                </div>

                                <div className="bg-[#00b9f5] text-white text-[7px] font-bold py-1 px-2.5 rounded-full w-full text-center shadow-xs">
                                  Pick the reward you want
                                </div>
                              </div>
                            </div>

                            {/* Bottom Nav */}
                            <div className="pb-1.5 px-3 shrink-0">
                              <div className="bg-[#002970] text-white rounded-full py-1 px-3 flex items-center justify-around text-[7.5px] font-medium shadow-md">
                                <span className="flex items-center gap-0.5 text-[#00b9f5] font-semibold">⌂ Home</span>
                                <span>⚏ Scan</span>
                                <span>🎁 Cashback</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Annotation */}
                        <div
                          className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                            showReturningAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="flex items-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                            <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                          </div>
                          <div className="leading-tight">
                            <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Progress started
                            </h5>
                            <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Half a card, and what the rest needs.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div className="mt-3.5 space-y-1">
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Payment 1 starts progress
                        </h4>
                        <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          He's told one more payment completes the reward.
                        </p>
                      </div>
                    </div>

                    {/* Card 2: He chooses the next reward */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-center border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* Phone Mockup */}
                        <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                          <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#0d111a] flex flex-col justify-between text-white p-2">
                            <div className="pt-1 px-1 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-300 z-10 shrink-0">
                              <span>9:41</span>
                              <div className="w-13 h-3 bg-black rounded-full" />
                              <div className="flex items-center gap-1 text-[8px]">
                                <span>📶</span>
                                <span>⚡</span>
                              </div>
                            </div>

                            <div className="pt-1 px-1 flex items-center justify-between shrink-0">
                              <span className="text-neutral-400 text-xs">✕</span>
                            </div>

                            <div className="text-center shrink-0 -mt-1">
                              <h4 className="text-xs sm:text-[13px] font-bold text-white leading-tight">
                                Pick your reward
                              </h4>
                              <p className="text-[7.5px] text-neutral-400 mt-0.5">
                                It's half-unlocked already. One more payment completes it.
                              </p>
                            </div>

                            {/* GIVA Reward Card in Center */}
                            <div className="relative flex items-center justify-center my-auto overflow-hidden">
                              <div className="w-[135px] bg-white rounded-xl p-2 text-neutral-900 shadow-xl border border-neutral-200 relative z-10 flex flex-col">
                                <div className="flex items-center gap-1 mb-1">
                                  <div className="w-3.5 h-3.5 rounded-full border border-neutral-300 flex items-center justify-center text-[5px] font-serif font-black">
                                    GIVA
                                  </div>
                                </div>
                                <div className="w-full h-13 relative rounded overflow-hidden bg-neutral-100 mb-1">
                                  <Image
                                    src="/paytm/giva_jewellery.png"
                                    alt="GIVA Jewellery"
                                    fill
                                    className="object-cover"
                                    sizes="135px"
                                  />
                                </div>
                                <span className="text-[6px] font-bold text-neutral-500 uppercase">GIVA</span>
                                <p className="text-[7.5px] font-bold text-neutral-900 leading-tight">
                                  Flat 32% off on MOV of ₹3,999
                                </p>
                                <div className="bg-black text-white text-[7px] font-semibold py-1 rounded-md text-center mt-1.5">
                                  I want this
                                </div>
                              </div>

                              <div className="absolute -right-16 w-[70px] h-[115px] bg-white/20 rounded-xl border border-neutral-700/60 p-1 backdrop-blur-xs opacity-60" />
                            </div>

                            <div className="flex items-center justify-center gap-1.5 text-[7px] text-neutral-400 shrink-0">
                              <span>‹</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                              <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                              <span>›</span>
                            </div>

                            <div className="mt-1 pt-1 text-center shrink-0">
                              <span className="text-[6.5px] text-neutral-400 underline block mb-1">
                                *View terms for GIVA
                              </span>
                              <div className="border border-dashed border-neutral-700 text-neutral-500 rounded-full py-1 text-[7px] font-medium w-full text-center">
                                Select a card to continue
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div className="mt-3.5 space-y-1">
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          He chooses the next reward
                        </h4>
                        <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          The same picker, with the payments needed shown up front.
                        </p>
                      </div>
                    </div>

                    {/* Card 3: 1 of 2 payments */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* Phone Mockup */}
                        <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                          <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-[#1d4ed8] via-[#2563eb] to-[#1e40af] flex flex-col justify-between text-white p-2">
                            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.8)_10%,transparent_70%)]" />

                            <div className="pt-1 px-1 flex items-center justify-between text-[8px] font-sans font-semibold text-white/90 z-10 shrink-0">
                              <span>9:41</span>
                              <div className="w-13 h-3 bg-black rounded-full" />
                              <div className="flex items-center gap-1 text-[8px]">
                                <span>📶</span>
                                <span>⚡</span>
                              </div>
                            </div>

                            <div className="pt-1 px-1 flex items-center justify-between shrink-0 relative z-10">
                              <span className="text-white/80 text-xs">✕</span>
                            </div>

                            {/* Half-locked Card */}
                            <div className="w-[135px] bg-white rounded-xl p-2 text-neutral-900 shadow-xl border border-neutral-200 mx-auto my-1 relative z-10 flex flex-col">
                              <div className="w-full h-11 relative rounded overflow-hidden bg-neutral-100 mb-1">
                                <Image
                                  src="/paytm/giva_jewellery.png"
                                  alt="GIVA Jewellery"
                                  fill
                                  className="object-cover"
                                  sizes="135px"
                                />
                                <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-2xs flex items-center justify-center">
                                  <span className="text-[10px]">🔒</span>
                                </div>
                              </div>
                              <span className="text-[5.5px] font-bold text-neutral-500 uppercase">GIVA</span>
                              <p className="text-[7px] font-bold text-neutral-900 leading-tight">
                                Flat 32% off on MOV of ₹3,999
                              </p>
                              <div className="flex items-center gap-1 mt-1 text-[6px] text-amber-700 font-semibold bg-amber-50 px-1 py-0.5 rounded">
                                <span>⏳</span> 1 of 2 payments
                              </div>
                            </div>

                            {/* 50% Banner */}
                            <div className="w-[145px] mx-auto border border-dashed border-blue-300/60 rounded-xl p-2 text-center relative z-10 my-auto bg-blue-900/30 backdrop-blur-2xs">
                              <span className="text-[5.5px] font-mono font-bold tracking-widest text-amber-300 uppercase block">
                                HALF UNLOCKED
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight my-0.5 drop-shadow-sm">
                                50%
                              </h3>
                              <p className="text-[6.5px] font-semibold text-blue-100 leading-tight">
                                1 more payment unlocks 32% off on orders above ₹3,999 at GIVA
                              </p>
                              <p className="text-[5.5px] text-blue-200/70 mt-0.5">
                                Every eligible payment counts · Valid 30 days
                              </p>
                            </div>

                            <div className="mt-auto pt-1 relative z-10 shrink-0">
                              <div className="bg-[#f59e0b] text-neutral-950 font-bold rounded-full py-1.5 text-[8px] w-full text-center shadow-lg">
                                Go to Home
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Annotation */}
                        <div
                          className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                            showReturningAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="flex items-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                            <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                          </div>
                          <div className="leading-tight">
                            <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Locked half
                            </h5>
                            <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Stays grey until the next payment
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div className="mt-3.5 space-y-1">
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          1 of 2 payments
                        </h4>
                        <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Progress is visible straight away; the locked half stays grey.
                        </p>
                      </div>
                    </div>

                    {/* Card 4: A reminder on Home */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* Phone Mockup: Paytm Home Screen */}
                        <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                          <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#f4f7fb] flex flex-col justify-between text-neutral-900">
                            {/* Status Bar */}
                            <div className="pt-2 px-3 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-800 z-10 shrink-0">
                              <span>9:41</span>
                              <div className="w-13 h-3 bg-black rounded-full" />
                              <div className="flex items-center gap-1 text-[8px]">
                                <span>📶</span>
                                <span>⚡</span>
                              </div>
                            </div>

                            {/* Home Header */}
                            <div className="px-2.5 pt-1 flex items-center justify-between shrink-0">
                              <div className="flex items-center gap-1.5">
                                <div className="w-6 h-6 rounded-full overflow-hidden relative border border-neutral-300">
                                  <Image src="/paytm/shriram_avatar.png" alt="Shriram" fill className="object-cover" />
                                </div>
                                <div className="leading-tight">
                                  <p className="text-[8.5px] font-bold text-neutral-900">Shriram Kumar</p>
                                  <p className="text-[6.5px] text-neutral-500">UPI ID: shriramkumar@paytm</p>
                                </div>
                              </div>
                              <span className="text-[10px] text-neutral-600">🔔</span>
                            </div>

                            {/* Search bar */}
                            <div className="mx-2.5 my-1 bg-white border border-neutral-200 rounded-lg px-2 py-0.5 text-[7px] text-neutral-400 flex items-center gap-1">
                              <span>🔍</span> Search by name, number or UPI ID
                            </div>

                            {/* Quick action grid */}
                            <div className="grid grid-cols-4 gap-1 px-2.5 my-1 text-center">
                              {["Scan QR", "To Mobile", "To Bank", "UPI Apps"].map((action) => (
                                <div key={action} className="bg-white rounded-lg p-1 border border-neutral-200/80 shadow-2xs flex flex-col items-center">
                                  <div className="w-4 h-4 rounded bg-[#002970] text-white flex items-center justify-center text-[7px] mb-0.5">⚏</div>
                                  <span className="text-[5.5px] font-medium text-neutral-700">{action}</span>
                                </div>
                              ))}
                            </div>

                            {/* Pinned Progress Card on Home */}
                            <div className="mx-2.5 p-2 rounded-xl bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] text-white shadow-md border border-blue-400/30">
                              <div className="flex items-center justify-between">
                                <span className="text-[5.5px] font-mono font-bold uppercase tracking-wider text-amber-300">
                                  REWARD IN PROGRESS
                                </span>
                                <span className="text-[6px] text-blue-200">1 of 2 done</span>
                              </div>
                              <p className="text-[8.5px] font-bold text-white mt-0.5">GIVA · 32% off</p>
                              <div className="w-full bg-blue-950/60 rounded-full h-1 my-1 overflow-hidden">
                                <div className="bg-[#f59e0b] h-full w-1/2 rounded-full" />
                              </div>
                              <div className="bg-white text-[#1e3a8a] font-bold text-[7px] py-1 rounded-md text-center mt-1">
                                ⚏ Scan &amp; pay to unlock
                              </div>
                            </div>

                            {/* Recent payments */}
                            <div className="px-2.5 py-1 text-left shrink-0">
                              <span className="text-[6.5px] font-bold text-neutral-500 uppercase block mb-0.5">Recent payments</span>
                              <div className="bg-white rounded-lg p-1.5 border border-neutral-200/80 space-y-1">
                                <div className="flex items-center justify-between text-[7px]">
                                  <div>
                                    <p className="font-bold text-neutral-900 leading-tight">Fresh Basket Kirana</p>
                                    <span className="text-[6px] text-emerald-600 font-semibold bg-emerald-50 px-1 py-0.2 rounded">Counted</span>
                                  </div>
                                  <span className="font-bold text-neutral-900">₹500</span>
                                </div>
                              </div>
                            </div>

                            {/* Bottom Nav */}
                            <div className="pb-1.5 px-3 shrink-0">
                              <div className="bg-[#002970] text-white rounded-full py-1 px-3 flex items-center justify-around text-[7.5px] font-medium shadow-md">
                                <span className="flex items-center gap-0.5 text-[#00b9f5] font-semibold">⌂ Home</span>
                                <span>⚏ Scan</span>
                                <span>🎁 Cashback</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Annotations Column */}
                        <div
                          className={`flex-1 min-w-[110px] sm:min-w-[130px] flex flex-col justify-around h-[360px] py-2 transition-opacity duration-300 ${
                            showReturningAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="flex items-center shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                              <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                              <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                            </div>
                            <div className="leading-tight">
                              <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                                Reminder
                              </h5>
                              <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                                Progress card on Home
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="flex items-center shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                              <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                              <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                            </div>
                            <div className="leading-tight">
                              <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                                Counted payments
                              </h5>
                              <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                                Shows which payments counted
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div className="mt-3.5 space-y-1">
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          A reminder on Home
                        </h4>
                        <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Progress sits next to Scan &amp; pay, without pressure.
                        </p>
                      </div>
                    </div>

                    {/* Card 5: Payment 2 completes it */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* Phone Mockup: Chai Point Café */}
                        <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                          <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#e8f6f8] flex flex-col justify-between text-neutral-900">
                            {/* Status Bar */}
                            <div className="pt-2 px-3 flex items-center justify-between text-[8px] font-sans font-semibold text-neutral-800 z-10 shrink-0">
                              <span>9:41</span>
                              <div className="w-13 h-3 bg-black rounded-full" />
                              <div className="flex items-center gap-1 text-[8px]">
                                <span>📶</span>
                                <span>⚡</span>
                              </div>
                            </div>

                            {/* Header */}
                            <div className="px-3 pt-1 flex items-center justify-between shrink-0">
                              <span className="text-xs text-neutral-700 font-bold">←</span>
                              <div className="flex items-center tracking-tight">
                                <span className="font-extrabold text-[#002970] text-[11px]">Pay</span>
                                <span className="font-bold text-[#00b9f5] text-[11px]">tm</span>
                              </div>
                              <span className="text-xs text-neutral-700 font-bold">⋮</span>
                            </div>

                            {/* Payment Info */}
                            <div className="px-3 pt-1 text-center shrink-0">
                              <p className="text-[10px] font-bold text-neutral-900 leading-tight">Chai Point Café</p>
                              <p className="text-[7.5px] text-neutral-500 leading-tight">UPI ID: chaipoint@ybl</p>
                              <div className="flex items-center justify-center gap-1 my-1">
                                <span className="text-base sm:text-lg font-extrabold text-neutral-900">₹249</span>
                                <span className="w-3.5 h-3.5 rounded-full bg-[#10b981] text-white flex items-center justify-center text-[7px] font-bold">✓</span>
                              </div>
                              <p className="text-[6.5px] text-neutral-500">22 Aug, 09:14 AM • Ref. No: 63789764537</p>

                              <div className="flex items-center justify-center gap-1 mt-1">
                                <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">Check Balance</span>
                                <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">Pay Again</span>
                                <span className="text-[6.5px] font-medium bg-white/90 border border-neutral-200/80 rounded-full px-1.5 py-0.5 text-neutral-700">&lt; Share</span>
                              </div>
                            </div>

                            <div className="w-full h-0.5 bg-[#00b9f5] mt-1 shrink-0" />

                            {/* Completed Card Bottom Sheet */}
                            <div className="relative flex-1 bg-gradient-to-b from-[#ecfdf5] to-white p-2 flex flex-col items-center justify-center overflow-hidden">
                              <div className="w-full max-w-[155px] rounded-xl bg-white/95 border border-emerald-200 p-2 shadow-sm text-center flex flex-col items-center">
                                <span className="text-[6.5px] font-mono font-bold tracking-wider text-emerald-800 uppercase">
                                  PAYMENT 2 OF 2
                                </span>
                                <h4 className="text-[11px] font-extrabold text-neutral-900 leading-tight mt-0.5">
                                  Your card is complete
                                </h4>

                                <div className="w-full h-12 relative rounded overflow-hidden bg-neutral-100 my-1 border border-neutral-200">
                                  <Image
                                    src="/paytm/giva_jewellery.png"
                                    alt="GIVA complete"
                                    fill
                                    className="object-cover"
                                    sizes="140px"
                                  />
                                </div>

                                <div className="bg-[#002970] text-white text-[7px] font-bold py-1 px-2.5 rounded-full w-full text-center shadow-xs">
                                  Claim your reward
                                </div>
                              </div>
                            </div>

                            {/* Bottom Nav */}
                            <div className="pb-1.5 px-3 shrink-0">
                              <div className="bg-[#002970] text-white rounded-full py-1 px-3 flex items-center justify-around text-[7.5px] font-medium shadow-md">
                                <span className="flex items-center gap-0.5 text-[#00b9f5] font-semibold">⌂ Home</span>
                                <span>⚏ Scan</span>
                                <span>🎁 Cashback</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right: Annotation */}
                        <div
                          className={`flex-1 min-w-[110px] sm:min-w-[130px] flex items-center gap-1.5 sm:gap-2 transition-opacity duration-300 ${
                            showReturningAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="flex items-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                            <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                          </div>
                          <div className="leading-tight">
                            <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Completion
                            </h5>
                            <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              The second half fills in here
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div className="mt-3.5 space-y-1">
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Payment 2 completes it
                        </h4>
                        <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          An eligible payment he already meant to make.
                        </p>
                      </div>
                    </div>

                    {/* Card 6: Ready to claim */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-center border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* Phone Mockup: Fully Unlocked Celebration */}
                        <div className="w-[185px] sm:w-[210px] h-[415px] sm:h-[440px] rounded-[28px] sm:rounded-[32px] p-[4px] sm:p-[5px] bg-[#11131a] border-2 border-[#2b3345] shadow-[0_12px_32px_rgba(0,0,0,0.5)] shrink-0 overflow-hidden flex flex-col relative select-none">
                          <div className="relative w-full h-full rounded-[22px] sm:rounded-[26px] overflow-hidden bg-gradient-to-b from-[#1d4ed8] via-[#2563eb] to-[#1e40af] flex flex-col justify-between text-white p-2">
                            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.8)_10%,transparent_70%)]" />

                            <div className="pt-1 px-1 flex items-center justify-between text-[8px] font-sans font-semibold text-white/90 z-10 shrink-0">
                              <span>9:41</span>
                              <div className="w-13 h-3 bg-black rounded-full" />
                              <div className="flex items-center gap-1 text-[8px]">
                                <span>📶</span>
                                <span>⚡</span>
                              </div>
                            </div>

                            <div className="pt-1 px-1 flex items-center justify-between shrink-0 relative z-10">
                              <span className="text-white/80 text-xs">✕</span>
                              <span className="bg-[#fef3c7] text-[#78350f] text-[6px] font-bold py-0.5 px-2 rounded-full shadow-xs">
                                ✨ Unlocked: 32% off
                              </span>
                              <span className="w-3" />
                            </div>

                            {/* White Coupon Card */}
                            <div className="w-[130px] bg-white rounded-xl p-2 text-neutral-900 shadow-xl border border-neutral-200 mx-auto my-1 relative z-10 flex flex-col">
                              <div className="w-full h-11 relative rounded overflow-hidden bg-neutral-100 mb-1">
                                <Image
                                  src="/paytm/giva_jewellery.png"
                                  alt="GIVA Jewellery"
                                  fill
                                  className="object-cover"
                                  sizes="130px"
                                />
                              </div>
                              <span className="text-[5.5px] font-bold text-neutral-500 uppercase">GIVA</span>
                              <p className="text-[7px] font-bold text-neutral-900 leading-tight">
                                Flat 32% off on MOV of ₹3,999
                              </p>
                            </div>

                            {/* Guaranteed Reward Banner */}
                            <div className="w-[145px] mx-auto border border-dashed border-blue-300/60 rounded-xl p-2 text-center relative z-10 my-auto bg-blue-900/30 backdrop-blur-2xs">
                              <span className="text-[5.5px] font-mono font-bold tracking-widest text-amber-300 uppercase block">
                                FULLY UNLOCKED
                              </span>
                              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight my-0.5 drop-shadow-sm">
                                32% off
                              </h3>
                              <p className="text-[6.5px] font-semibold text-blue-100 leading-tight">
                                Save up to ₹1,280 on GIVA jewellery
                              </p>
                              <p className="text-[5.5px] text-blue-200/70 mt-0.5">
                                On orders above ₹3,999 · Valid 30 days after claim
                              </p>
                            </div>

                            <div className="mt-auto pt-1 relative z-10 shrink-0">
                              <div className="bg-[#f59e0b] text-neutral-950 font-bold rounded-full py-1.5 text-[8px] w-full text-center shadow-lg">
                                Claim reward
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div className="mt-3.5 space-y-1">
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Ready to claim
                        </h4>
                        <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          The reward he chose, fully unlocked.
                        </p>
                      </div>
                    </div>

                    {/* Card 7: Outcome */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-5 sm:p-6 flex items-center justify-center border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* Floating White Outcome Card */}
                        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xl w-[210px] sm:w-[230px] text-left border border-neutral-100 flex flex-col justify-between">
                          <div>
                            <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-wider text-emerald-600 uppercase block mb-1.5">
                              WHAT USERS END UP WITH
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-neutral-900 leading-snug mb-3.5">
                              A goal they set, and finished
                            </h4>

                            <div className="space-y-2.5 my-2">
                              <div className="flex items-start gap-1.5">
                                <span className="text-emerald-600 text-xs font-bold shrink-0 mt-0.5">✓</span>
                                <div>
                                  <span className="text-[10px] sm:text-[10.5px] font-bold text-neutral-900 block leading-tight">Clear goal</span>
                                  <p className="text-[8.5px] sm:text-[9px] text-neutral-500 leading-tight">Terms and payments needed shown before choosing.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <span className="text-emerald-600 text-xs font-bold shrink-0 mt-0.5">✓</span>
                                <div>
                                  <span className="text-[10px] sm:text-[10.5px] font-bold text-neutral-900 block leading-tight">Progress</span>
                                  <p className="text-[8.5px] sm:text-[9px] text-neutral-500 leading-tight">Payment 1 starts it, payment 2 completes it.</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-1.5">
                                <span className="text-emerald-600 text-xs font-bold shrink-0 mt-0.5">✓</span>
                                <div>
                                  <span className="text-[10px] sm:text-[10.5px] font-bold text-neutral-900 block leading-tight">Reminder</span>
                                  <p className="text-[8.5px] sm:text-[9px] text-neutral-500 leading-tight">Visible on Home, so the next payment has a reason.</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-neutral-100/90 rounded-lg p-2.5 border border-neutral-200/60 mt-3">
                            <p className="text-[9.5px] sm:text-[10px] text-neutral-600 font-medium leading-snug">
                              The reward they picked is what they claim, so they come back to finish it.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Caption */}
                      <div className="mt-3.5 space-y-1">
                        <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Outcome
                        </h4>
                        <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          Two small moments of progress, one reward he chose.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step Progress / Timeline Bar for Returning User */}
                  <div className="mt-6 pt-6 border-t border-neutral-800/80 flex items-center justify-between gap-2 max-w-4xl mx-auto">
                    <button
                      type="button"
                      onClick={() => scrollFlow(returningFlowContainerRef, "left")}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isLight
                          ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                          : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                      }`}
                      aria-label="Previous step"
                    >
                      <span className="text-xs select-none">‹</span>
                    </button>

                    <div className="flex-1 flex items-center justify-between px-2 sm:px-6 relative">
                      <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-0.5 bg-neutral-800 -z-0" />
                      
                      {["Payment 1", "Browse", "50%", "Home", "Payment 2", "Claim", "Outcome"].map((step, idx) => (
                        <button
                          key={step}
                          type="button"
                          onClick={() => scrollToReturningStep(idx)}
                          className="flex flex-col items-center gap-1.5 relative z-10 cursor-pointer group"
                        >
                          <div
                            className={`w-3 h-3 rounded-full border-2 transition-all ${
                              activeReturningStep === idx
                                ? "bg-blue-500 border-white ring-2 ring-blue-500/50 scale-125"
                                : "bg-[#11131a] border-neutral-600 group-hover:border-neutral-400"
                            }`}
                          />
                          <span
                            className={`text-[9.5px] sm:text-[10.5px] font-mono tracking-tight transition-colors ${
                              activeReturningStep === idx
                                ? "text-blue-400 font-bold"
                                : "text-neutral-500 group-hover:text-neutral-300"
                            }`}
                          >
                            {step}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollFlow(returningFlowContainerRef, "right")}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isLight
                          ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                          : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                      }`}
                      aria-label="Next step"
                    >
                      <span className="text-xs select-none">›</span>
                    </button>
                  </div>
                </div>

                {/* Flow 3: Established user (Future) Complete Sequence */}
                <div className="mt-14 sm:mt-18 pt-10 sm:pt-14 border-t border-neutral-800/80">
                  {/* Header Row with Controls */}
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 sm:mb-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className={`text-base sm:text-lg font-bold font-sans ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Established user
                        </h3>
                        <span
                          className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-dashed ${
                            isLight
                              ? "bg-neutral-100 text-neutral-700 border-neutral-300"
                              : "bg-[#141a24] text-neutral-400 border-neutral-700"
                          }`}
                        >
                          Future
                        </span>
                      </div>
                      <p
                        className={`text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl ${
                          isLight ? "text-neutral-600" : "text-neutral-400"
                        }`}
                      >
                        Choose categories, then see each payment move the goal by a different amount. The reward is never random; only the progress varies.
                      </p>
                    </div>

                    {/* Top-Right Controls: Annotations Toggle & Replay Button */}
                    <div className="flex items-center gap-3 shrink-0 self-start lg:self-center mt-2 lg:mt-0">
                      {/* Annotations Toggle */}
                      <button
                        type="button"
                        onClick={() => setShowEstablishedAnnotations(!showEstablishedAnnotations)}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                          showEstablishedAnnotations
                            ? isLight
                              ? "bg-blue-50 border-blue-400 text-blue-700 shadow-2xs"
                              : "bg-[#0f172a] border-blue-500/80 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                            : isLight
                            ? "bg-white border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                            : "bg-[#121620] border-neutral-700 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <span
                          className={`w-5 h-3 rounded-full flex items-center p-0.5 transition-colors ${
                            showEstablishedAnnotations
                              ? "bg-blue-500 justify-end"
                              : "bg-neutral-600 justify-start"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
                        </span>
                        <span>Annotations</span>
                      </button>

                      {/* Replay Button */}
                      <button
                        type="button"
                        onClick={() => scrollToEstablishedStep(0)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
                          isLight
                            ? "bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                            : "bg-[#121620] border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500"
                        }`}
                      >
                        <span className="text-sm">↺</span>
                        <span>Replay</span>
                      </button>
                    </div>
                  </div>

                  {/* 3 Horizontal Cards Container */}
                  <div
                    ref={establishedFlowContainerRef}
                    className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth snap-x snap-mandatory"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {/* Card 1: His goal on Home */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* iPhone Chassis */}
                        <div className="relative w-[190px] sm:w-[210px] h-[390px] sm:h-[420px] rounded-[38px] p-2 bg-gradient-to-b from-[#4a4d55] via-[#24262b] to-[#121316] shadow-[0_20px_45px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.3)] shrink-0">
                          {/* Side buttons */}
                          <div className="absolute -left-[2.5px] top-[75px] w-[2.5px] h-6 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -left-[2.5px] top-[110px] w-[2.5px] h-9 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -left-[2.5px] top-[155px] w-[2.5px] h-9 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -right-[2.5px] top-[100px] w-[2.5px] h-12 bg-[#2f3136] rounded-r-sm" />

                          {/* Screen Frame */}
                          <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#f4f7fb] flex flex-col relative select-none border border-black/40">
                            {/* Dynamic Island & Status Bar */}
                            <div className="pt-2 px-3 pb-1 flex items-center justify-between shrink-0 bg-transparent relative z-20">
                              <span className="text-[10px] font-semibold text-neutral-900 tracking-tight ml-1">9:41</span>
                              <div className="w-16 h-3.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1.5 flex items-center justify-end pr-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#111] border border-[#222]" />
                              </div>
                              <div className="flex items-center gap-1 text-neutral-900 mr-1 text-[9px]">
                                <span>●●●●</span>
                                <span>📶</span>
                                <span>🔋</span>
                              </div>
                            </div>

                            {/* Home Screen Content */}
                            <div className="px-2.5 pt-1 pb-2 flex-1 flex flex-col justify-between overflow-hidden">
                              {/* Top User Info & Bell */}
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-7 h-7 rounded-full overflow-hidden border border-neutral-300 relative shrink-0">
                                    <Image
                                      src="/paytm/shriram_avatar.png"
                                      alt="Shriram Kumar"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="leading-tight">
                                    <div className="text-[10px] font-bold text-neutral-900 flex items-center gap-1">
                                      Shriram Kumar
                                    </div>
                                    <div className="text-[7.5px] text-neutral-500">
                                      UPI ID: shriramk@paytm
                                    </div>
                                  </div>
                                </div>
                                <div className="w-6 h-6 rounded-full bg-white border border-neutral-200/80 flex items-center justify-center text-neutral-700 shadow-2xs relative">
                                  <span className="text-[10px]">🔔</span>
                                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-1 right-1" />
                                </div>
                              </div>

                              {/* Search bar */}
                              <div className="bg-white rounded-full px-2.5 py-1 flex items-center gap-1.5 border border-neutral-200 shadow-2xs mb-2">
                                <span className="text-neutral-400 text-[9px]">🔍</span>
                                <span className="text-[8px] text-neutral-400 truncate">
                                  Search for &apos;electricity bill&apos;
                                </span>
                              </div>

                              {/* UPI Money Transfer Grid */}
                              <div className="mb-1.5">
                                <span className="text-[7.5px] font-bold text-neutral-600 uppercase tracking-tight block mb-1">
                                  UPI Money Transfer
                                </span>
                                <div className="grid grid-cols-4 gap-1">
                                  <div className="flex flex-col items-center">
                                    <div className="w-7 h-7 rounded-lg bg-[#002e6e] text-white flex items-center justify-center shadow-2xs text-[10px]">
                                      ⛶
                                    </div>
                                    <span className="text-[6.5px] text-neutral-700 font-medium text-center mt-0.5 leading-tight">
                                      Scan &amp; Pay
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <div className="w-7 h-7 rounded-lg bg-[#002e6e] text-white flex items-center justify-center shadow-2xs text-[10px]">
                                      📄
                                    </div>
                                    <span className="text-[6.5px] text-neutral-700 font-medium text-center mt-0.5 leading-tight">
                                      Pay Bills
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <div className="w-7 h-7 rounded-lg bg-[#002e6e] text-white flex items-center justify-center shadow-2xs text-[10px]">
                                      🏦
                                    </div>
                                    <span className="text-[6.5px] text-neutral-700 font-medium text-center mt-0.5 leading-tight">
                                      To Self A/C
                                    </span>
                                  </div>
                                  <div className="flex flex-col items-center">
                                    <div className="w-7 h-7 rounded-lg bg-[#002e6e] text-white flex items-center justify-center shadow-2xs text-[10px]">
                                      👑
                                    </div>
                                    <span className="text-[6.5px] text-neutral-700 font-medium text-center mt-0.5 leading-tight">
                                      My Rewards
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* REWARD IN PROGRESS Card */}
                              <div className="bg-gradient-to-br from-[#002970] via-[#00388d] to-[#004bb7] rounded-xl p-2 text-white shadow-md relative overflow-hidden mb-1.5">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[6.5px] font-mono tracking-wider uppercase text-blue-200 font-bold">
                                    REWARD IN PROGRESS
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-9 h-9 rounded-md bg-black/40 overflow-hidden relative border border-white/20 shrink-0">
                                    <Image
                                      src="/paytm/boat_headphones.png"
                                      alt="boAt"
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1 leading-tight">
                                    <h6 className="text-[9.5px] font-extrabold text-white truncate">
                                      boAt • 32% off
                                    </h6>
                                    <p className="text-[7px] text-blue-100 mt-0.5 leading-tight">
                                      40% unlocked • each payment adds a different amount
                                    </p>
                                  </div>
                                </div>
                                {/* Scan & pay button */}
                                <button
                                  type="button"
                                  className="mt-1.5 w-full bg-white hover:bg-neutral-100 text-[#002970] font-bold text-[8px] py-1 px-2 rounded-full shadow-2xs flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95"
                                >
                                  <span>+</span>
                                  <span>Scan &amp; pay to add progress</span>
                                </button>
                              </div>

                              {/* Reward preferences card */}
                              <div className="border border-dashed border-[#002970]/30 bg-white/90 rounded-xl p-1.5 flex items-center justify-between shadow-2xs mb-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-[9px] shrink-0">
                                    ⚙
                                  </div>
                                  <div className="min-w-0 leading-tight">
                                    <div className="text-[8px] font-bold text-neutral-900 truncate">
                                      Reward preferences
                                    </div>
                                    <div className="text-[7px] text-neutral-500 truncate">
                                      Electronics, Travel, Food
                                    </div>
                                  </div>
                                </div>
                                <span className="text-neutral-400 text-[10px] ml-1 shrink-0">›</span>
                              </div>

                              {/* Bottom Nav */}
                              <div className="bg-[#00204d] text-white rounded-full px-3 py-1 flex items-center justify-around shadow-md mt-auto">
                                <div className="flex items-center gap-1 bg-[#00388d] px-2 py-0.5 rounded-full">
                                  <span className="text-[7px] font-bold">Home</span>
                                </div>
                                <span className="text-[7px] text-blue-200">Scan</span>
                                <span className="text-[7px] text-blue-200">Rewards</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Annotations Stack */}
                        <div
                          className={`w-[110px] sm:w-[130px] shrink-0 flex flex-col justify-around h-[300px] transition-opacity duration-300 ${
                            showEstablishedAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          {/* Top Annotation: Active goal */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-1 shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                              <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                              <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                            </div>
                            <div className="leading-tight">
                              <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                                Active goal
                              </h5>
                              <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                                Progress carried over from earlier payments
                              </p>
                            </div>
                          </div>

                          {/* Bottom Annotation: Preferences */}
                          <div>
                            <div className="flex items-center gap-1.5 mb-1 shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                              <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                              <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                            </div>
                            <div className="leading-tight">
                              <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                                Preferences
                              </h5>
                              <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                                One tap to set what he shops for
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Caption Below Card */}
                      <div className="mt-4 px-1">
                        <h4 className={`text-xs sm:text-sm font-bold ${isLight ? "text-neutral-900" : "text-white"}`}>
                          His goal on Home
                        </h4>
                        <p className={`text-[11px] sm:text-xs leading-relaxed mt-1 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          An active reward, how far along it is, and a way to set preferences.
                        </p>
                      </div>
                    </div>

                    {/* Card 2: He sets his preferences */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* iPhone Chassis */}
                        <div className="relative w-[190px] sm:w-[210px] h-[390px] sm:h-[420px] rounded-[38px] p-2 bg-gradient-to-b from-[#4a4d55] via-[#24262b] to-[#121316] shadow-[0_20px_45px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.3)] shrink-0">
                          {/* Side buttons */}
                          <div className="absolute -left-[2.5px] top-[75px] w-[2.5px] h-6 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -left-[2.5px] top-[110px] w-[2.5px] h-9 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -left-[2.5px] top-[155px] w-[2.5px] h-9 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -right-[2.5px] top-[100px] w-[2.5px] h-12 bg-[#2f3136] rounded-r-sm" />

                          {/* Screen Frame (Dark) */}
                          <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#0d121c] text-white flex flex-col relative select-none border border-black/40">
                            {/* Dynamic Island & Status Bar */}
                            <div className="pt-2 px-3 pb-1 flex items-center justify-between shrink-0 bg-transparent relative z-20">
                              <span className="text-[10px] font-semibold text-neutral-300 tracking-tight ml-1">9:41</span>
                              <div className="w-16 h-3.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1.5 flex items-center justify-end pr-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#111] border border-[#222]" />
                              </div>
                              <div className="flex items-center gap-1 text-neutral-300 mr-1 text-[9px]">
                                <span>●●●●</span>
                                <span>📶</span>
                                <span>🔋</span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="p-3 flex-1 flex flex-col justify-between overflow-hidden">
                              {/* Top Close Icon */}
                              <div className="flex items-center justify-start">
                                <span className="text-neutral-400 text-xs cursor-pointer hover:text-white">✕</span>
                              </div>

                              {/* Heading */}
                              <div className="text-center mt-1">
                                <h5 className="text-[13px] sm:text-[14px] font-bold text-white tracking-tight">
                                  What do you shop for?
                                </h5>
                                <p className="text-[7.5px] sm:text-[8px] text-neutral-400 leading-snug mt-1 max-w-[170px] mx-auto">
                                  Your next rewards come from these. You still pick the exact one.
                                </p>
                              </div>

                              {/* Category Tag Pills in Dashed Box */}
                              <div className="border border-dashed border-[#2b3952] bg-[#121826]/70 rounded-2xl p-2.5 my-2 flex flex-wrap gap-1.5 justify-center items-center">
                                {/* Active: Electronics */}
                                <span className="bg-[#fbc02d] text-neutral-950 font-bold text-[8px] px-2.5 py-1 rounded-full shadow-2xs">
                                  Electronics
                                </span>
                                {/* Inactive: Fashion */}
                                <span className="bg-[#1b2333] text-neutral-300 border border-[#2b3952] font-medium text-[8px] px-2.5 py-1 rounded-full">
                                  Fashion
                                </span>
                                {/* Active: Travel */}
                                <span className="bg-[#fbc02d] text-neutral-950 font-bold text-[8px] px-2.5 py-1 rounded-full shadow-2xs">
                                  Travel
                                </span>
                                {/* Active: Food */}
                                <span className="bg-[#fbc02d] text-neutral-950 font-bold text-[8px] px-2.5 py-1 rounded-full shadow-2xs">
                                  Food
                                </span>
                                {/* Inactive: Beauty */}
                                <span className="bg-[#1b2333] text-neutral-300 border border-[#2b3952] font-medium text-[8px] px-2.5 py-1 rounded-full">
                                  Beauty
                                </span>
                                {/* Inactive: Home */}
                                <span className="bg-[#1b2333] text-neutral-300 border border-[#2b3952] font-medium text-[8px] px-2.5 py-1 rounded-full">
                                  Home
                                </span>
                                {/* Inactive: Fitness */}
                                <span className="bg-[#1b2333] text-neutral-300 border border-[#2b3952] font-medium text-[8px] px-2.5 py-1 rounded-full">
                                  Fitness
                                </span>
                                {/* Inactive: Jewellery */}
                                <span className="bg-[#1b2333] text-neutral-300 border border-[#2b3952] font-medium text-[8px] px-2.5 py-1 rounded-full">
                                  Jewellery
                                </span>
                              </div>

                              {/* Info note */}
                              <p className="text-[7px] text-neutral-400 text-center leading-snug px-1 mb-2">
                                Each payment adds a different amount of progress. Bills and recharges add more.
                              </p>

                              {/* Save preferences CTA */}
                              <button
                                type="button"
                                className="w-full bg-[#fbc02d] hover:bg-[#f9a825] text-neutral-950 font-bold text-[9px] py-2 px-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer text-center"
                              >
                                Save preferences
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Annotation: Categories, not brands */}
                        <div
                          className={`w-[110px] sm:w-[130px] shrink-0 transition-opacity duration-300 ${
                            showEstablishedAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                            <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                          </div>
                          <div className="leading-tight">
                            <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Categories, not brands
                            </h5>
                            <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              He sets the pool; the exact reward is still his pick
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Caption Below Card */}
                      <div className="mt-4 px-1">
                        <h4 className={`text-xs sm:text-sm font-bold ${isLight ? "text-neutral-900" : "text-white"}`}>
                          He sets his preferences
                        </h4>
                        <p className={`text-[11px] sm:text-xs leading-relaxed mt-1 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          He picks the categories his future rewards come from.
                        </p>
                      </div>
                    </div>

                    {/* Card 3: Progress varies */}
                    <div className="w-[340px] sm:w-[410px] lg:w-[440px] shrink-0 snap-start flex flex-col justify-between">
                      <div
                        className={`h-[450px] sm:h-[480px] rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-2.5 sm:gap-3.5 border transition-all relative overflow-hidden ${
                          isLight
                            ? "bg-neutral-100 border-neutral-200/90 shadow-2xs"
                            : "bg-[#0b0e17] border-[#1c2230]"
                        }`}
                      >
                        {/* iPhone Chassis */}
                        <div className="relative w-[190px] sm:w-[210px] h-[390px] sm:h-[420px] rounded-[38px] p-2 bg-gradient-to-b from-[#4a4d55] via-[#24262b] to-[#121316] shadow-[0_20px_45px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.3)] shrink-0">
                          {/* Side buttons */}
                          <div className="absolute -left-[2.5px] top-[75px] w-[2.5px] h-6 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -left-[2.5px] top-[110px] w-[2.5px] h-9 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -left-[2.5px] top-[155px] w-[2.5px] h-9 bg-[#2f3136] rounded-l-sm" />
                          <div className="absolute -right-[2.5px] top-[100px] w-[2.5px] h-12 bg-[#2f3136] rounded-r-sm" />

                          {/* Screen Frame */}
                          <div className="w-full h-full rounded-[30px] overflow-hidden bg-[#f4f7fb] flex flex-col relative select-none border border-black/40">
                            {/* Dynamic Island & Status Bar */}
                            <div className="pt-2 px-3 pb-1 flex items-center justify-between shrink-0 bg-transparent relative z-20">
                              <span className="text-[10px] font-semibold text-neutral-900 tracking-tight ml-1">9:41</span>
                              <div className="w-16 h-3.5 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1.5 flex items-center justify-end pr-1.5">
                                <div className="w-2 h-2 rounded-full bg-[#111] border border-[#222]" />
                              </div>
                              <div className="flex items-center gap-1 text-neutral-900 mr-1 text-[9px]">
                                <span>●●●●</span>
                                <span>📶</span>
                                <span>🔋</span>
                              </div>
                            </div>

                            {/* Top App Bar */}
                            <div className="px-3 py-1 flex items-center justify-between border-b border-neutral-200/60 bg-white shrink-0">
                              <span className="text-neutral-700 text-xs">←</span>
                              <span className="text-xs font-black tracking-tight text-[#002970]">
                                Pay<span className="text-[#00b9f5]">tm</span>
                              </span>
                              <span className="text-neutral-700 text-xs font-bold">⋮</span>
                            </div>

                            {/* Receipt Header */}
                            <div className="px-3 pt-2 pb-1.5 text-center bg-white border-b border-neutral-100">
                              <h5 className="text-[11px] font-bold text-neutral-900">
                                Airtel Prepaid
                              </h5>
                              <p className="text-[7.5px] text-neutral-500">
                                Recharge • 98XXXXXX21
                              </p>
                              <div className="flex items-center justify-center gap-1 mt-1">
                                <span className="text-lg font-black text-neutral-900">₹299</span>
                                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] font-bold">
                                  ✓
                                </div>
                              </div>
                              <p className="text-[7px] text-neutral-400 mt-0.5">
                                25 Aug, 07:40 PM • Ref. No: 63781220984
                              </p>
                            </div>

                            {/* Progress Card Section */}
                            <div className="p-2.5 flex-1 flex flex-col justify-between">
                              <div className="border border-dashed border-[#00b9f5]/50 bg-white rounded-xl p-2 text-center shadow-xs">
                                <span className="text-[7px] font-bold tracking-wider text-neutral-500 uppercase block">
                                  THIS PAYMENT ADDED
                                </span>
                                <span className="text-2xl font-black text-[#0088cc] block my-0.5 tracking-tight">
                                  +30%
                                </span>

                                {/* Inner Reward Card */}
                                <div className="bg-[#f8fafc] rounded-lg border border-neutral-200/80 p-1.5 flex items-center gap-1.5 text-left relative mt-1">
                                  <div className="w-8 h-8 rounded bg-black/10 overflow-hidden relative shrink-0">
                                    <Image
                                      src="/paytm/boat_headphones.png"
                                      alt="boAt"
                                      fill
                                      className="object-cover"
                                    />
                                    <span className="absolute top-0.5 left-0.5 bg-neutral-900/90 text-white text-[5.5px] font-bold px-1 rounded-full">
                                      70%
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 leading-tight">
                                    <span className="text-[6.5px] text-neutral-500 uppercase font-bold block">
                                      boAt
                                    </span>
                                    <span className="text-[8px] font-bold text-neutral-900 block truncate">
                                      Flat 32% off on MOV of ₹5,000
                                    </span>
                                    <span className="text-[6.5px] text-emerald-600 font-medium block mt-0.5">
                                      Varies per payment • 70% unlocked
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Back to Home CTA */}
                              <button
                                type="button"
                                className="w-full bg-[#00b9f5] hover:bg-[#00a8e0] text-white font-bold text-[9px] py-2 px-3 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer text-center mt-auto"
                              >
                                Back to Home
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Annotation: Variable step */}
                        <div
                          className={`w-[110px] sm:w-[130px] shrink-0 transition-opacity duration-300 ${
                            showEstablishedAnnotations ? "opacity-100" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                            <div className="w-4 sm:w-6 border-b border-dotted border-cyan-400 shrink-0" />
                            <span className="text-cyan-400 text-[10px] -ml-0.5">▶</span>
                          </div>
                          <div className="leading-tight">
                            <h5 className={`text-xs sm:text-[13px] font-bold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Variable step
                            </h5>
                            <p className={`text-[9.5px] sm:text-[10.5px] leading-snug mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              A different amount each time; the reward itself never changes
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Caption Below Card */}
                      <div className="mt-4 px-1">
                        <h4 className={`text-xs sm:text-sm font-bold ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Progress varies
                        </h4>
                        <p className={`text-[11px] sm:text-xs leading-relaxed mt-1 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                          This payment added 30%. The next might add more or less.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step Timeline Bar */}
                  <div className="mt-8 sm:mt-10 pt-6 border-t border-neutral-800/60 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToEstablishedStep(Math.max(0, activeEstablishedStep - 1))}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isLight
                          ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                          : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                      }`}
                      aria-label="Previous step"
                    >
                      <span className="text-xs select-none">‹</span>
                    </button>

                    <div className="flex-1 max-w-lg mx-auto flex items-center justify-between relative px-2">
                      <div
                        className={`absolute left-0 right-0 top-1.5 h-0.5 -translate-y-1/2 ${
                          isLight ? "bg-neutral-300" : "bg-neutral-800"
                        }`}
                      />
                      {["Home", "Preferences", "Progress"].map((step, idx) => (
                        <button
                          key={step}
                          type="button"
                          onClick={() => scrollToEstablishedStep(idx)}
                          className="flex flex-col items-center gap-1.5 relative z-10 cursor-pointer group"
                        >
                          <div
                            className={`w-3 h-3 rounded-full border-2 transition-all ${
                              activeEstablishedStep === idx
                                ? "bg-blue-500 border-white ring-2 ring-blue-500/50 scale-125"
                                : "bg-[#11131a] border-neutral-600 group-hover:border-neutral-400"
                            }`}
                          />
                          <span
                            className={`text-[9.5px] sm:text-[10.5px] font-mono tracking-tight transition-colors ${
                              activeEstablishedStep === idx
                                ? "text-blue-400 font-bold"
                                : "text-neutral-500 group-hover:text-neutral-300"
                            }`}
                          >
                            {step}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToEstablishedStep(Math.min(2, activeEstablishedStep + 1))}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        isLight
                          ? "border-neutral-300 hover:bg-neutral-100 text-neutral-600 active:scale-95"
                          : "border-neutral-700 hover:bg-neutral-800 text-neutral-400 hover:text-white active:scale-95"
                      }`}
                      aria-label="Next step"
                    >
                      <span className="text-xs select-none">›</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* 05 TRUST & SECURITY / PSYCHOLOGY SECTION */}
          <section
            id="psychology"
            className={`w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 border-t transition-colors ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            {isLexora ? (
              <>
                {/* Section Header */}
                <div className="mb-8 sm:mb-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-red-700 dark:text-red-400">
                      05
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Module Breakdown & Psychology
                    </span>
                  </div>
                  <h2
                    className={`text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument leading-tight tracking-tight ${
                      isLight ? "text-neutral-900" : "text-white"
                    }`}
                  >
                    Module breakdown <br className="hidden sm:block" />
                    and psychology
                  </h2>
                </div>

                {/* 3 Core Psychology Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-14">
                  {/* Card 01 - Ask */}
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border flex flex-col justify-start transition-all duration-200 ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-2xs hover:shadow-xs"
                        : "bg-[#0b0e17] border-[#1c2230] hover:border-[#2a3449]"
                    }`}
                  >
                    <span
                      className={`self-start px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium font-sans mb-3 sm:mb-4 ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                          : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                      }`}
                    >
                      Ask
                    </span>
                    <h3
                      className={`text-lg sm:text-xl font-bold font-sans tracking-tight mb-2 sm:mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      “Can I ask this without hesitation?”
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      Legal questions feel intimidating. A dedicated space lets users raise everyday concerns freely and learn from real discussions.
                    </p>
                  </div>

                  {/* Card 02 - Track */}
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border flex flex-col justify-start transition-all duration-200 ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-2xs hover:shadow-xs"
                        : "bg-[#0b0e17] border-[#1c2230] hover:border-[#2a3449]"
                    }`}
                  >
                    <span
                      className={`self-start px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium font-sans mb-3 sm:mb-4 ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                          : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                      }`}
                    >
                      Track
                    </span>
                    <h3
                      className={`text-lg sm:text-xl font-bold font-sans tracking-tight mb-2 sm:mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      “What's happening with my case?”
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      Eliminates repetitive check-ins. A structured timeline makes each stage and upcoming milestone easy to understand.
                    </p>
                  </div>

                  {/* Card 03 - Manage */}
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border flex flex-col justify-start transition-all duration-200 ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-2xs hover:shadow-xs"
                        : "bg-[#0b0e17] border-[#1c2230] hover:border-[#2a3449]"
                    }`}
                  >
                    <span
                      className={`self-start px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium font-sans mb-3 sm:mb-4 ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                          : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                      }`}
                    >
                      Manage
                    </span>
                    <h3
                      className={`text-lg sm:text-xl font-bold font-sans tracking-tight mb-2 sm:mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      “Where can I find everything?”
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      Case files, lawyer messaging, and milestone updates stay accessible in one central workspace for peace of mind.
                    </p>
                  </div>
                </div>

                {/* User Experience Loops Container */}
                <div className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl border space-y-6 sm:space-y-7 ${
                  isLight ? "bg-neutral-50/70 border-neutral-200/90" : "bg-[#0b0e17]/80 border-[#1c2230]"
                }`}>
                  <div>
                    <h4 className={`text-xs font-mono uppercase tracking-widest ${isLight ? "text-neutral-500" : "text-neutral-400"}`}>
                      User Experience Loops
                    </h4>
                  </div>

                  {/* Loop 1: Ask Community Loop */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-red-700 dark:text-red-400 block">
                      Community Experience Loop
                    </span>
                    <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
                      {/* Step 1 */}
                      <div className="flex flex-col items-start shrink-0 snap-start">
                        <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Legal concern
                        </span>
                        <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                          isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}>
                          Trigger
                        </span>
                      </div>

                      {/* Arrow */}
                      <span className={`select-none text-base sm:text-xl shrink-0 self-center mb-3 sm:mb-4 px-1 ${isLight ? "text-neutral-300" : "text-neutral-600"}`}>
                        →
                      </span>

                      {/* Step 2 */}
                      <div className="flex flex-col items-start shrink-0 snap-start">
                        <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Ask freely
                        </span>
                        <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                          isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}>
                          Engagement
                        </span>
                      </div>

                      {/* Arrow */}
                      <span className={`select-none text-base sm:text-xl shrink-0 self-center mb-3 sm:mb-4 px-1 ${isLight ? "text-neutral-300" : "text-neutral-600"}`}>
                        →
                      </span>

                      {/* Step 3 */}
                      <div className="flex flex-col items-start shrink-0 snap-start">
                        <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Explore answers
                        </span>
                        <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                          isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}>
                          Discovery
                        </span>
                      </div>

                      {/* Arrow */}
                      <span className={`select-none text-base sm:text-xl shrink-0 self-center mb-3 sm:mb-4 px-1 ${isLight ? "text-neutral-300" : "text-neutral-600"}`}>
                        →
                      </span>

                      {/* Step 4 */}
                      <div className="flex flex-col items-start shrink-0 snap-start">
                        <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap flex items-center gap-1 ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Informed action <span className="text-xs text-neutral-400">↺</span>
                        </span>
                        <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                          isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}>
                          Next step
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Loop 2: Case Management Loop */}
                  <div className="space-y-2.5 pt-4 sm:pt-5 border-t border-neutral-200/70 dark:border-neutral-800">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-red-700 dark:text-red-400 block">
                      Case Management Loop
                    </span>
                    <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
                      {/* Step 1 */}
                      <div className="flex flex-col items-start shrink-0 snap-start">
                        <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Legal service
                        </span>
                        <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                          isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}>
                          Trigger
                        </span>
                      </div>

                      {/* Arrow */}
                      <span className={`select-none text-base sm:text-xl shrink-0 self-center mb-3 sm:mb-4 px-1 ${isLight ? "text-neutral-300" : "text-neutral-600"}`}>
                        →
                      </span>

                      {/* Step 2 */}
                      <div className="flex flex-col items-start shrink-0 snap-start">
                        <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Open Case Desk
                        </span>
                        <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                          isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}>
                          Access
                        </span>
                      </div>

                      {/* Arrow */}
                      <span className={`select-none text-base sm:text-xl shrink-0 self-center mb-3 sm:mb-4 px-1 ${isLight ? "text-neutral-300" : "text-neutral-600"}`}>
                        →
                      </span>

                      {/* Step 3 */}
                      <div className="flex flex-col items-start shrink-0 snap-start">
                        <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Track progress
                        </span>
                        <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                          isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}>
                          Transparency
                        </span>
                      </div>

                      {/* Arrow */}
                      <span className={`select-none text-base sm:text-xl shrink-0 self-center mb-3 sm:mb-4 px-1 ${isLight ? "text-neutral-300" : "text-neutral-600"}`}>
                        →
                      </span>

                      {/* Step 4 */}
                      <div className="flex flex-col items-start shrink-0 snap-start">
                        <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap flex items-center gap-1 ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Connect lawyer <span className="text-xs text-neutral-400">↺</span>
                        </span>
                        <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                          isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                        }`}>
                          Support
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Closing Design Rationale Callout with Cyan Accent Line */}
                <div className="mt-8 sm:mt-12 pt-2">
                  <div className="pl-4 sm:pl-5 border-l-2 border-cyan-400 py-0.5 max-w-3xl">
                    <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-1 font-semibold">
                      Closing design rationale
                    </p>
                    <p
                      className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                        isLight ? "text-neutral-800" : "text-neutral-200"
                      }`}
                    >
                      I wanted legal support to feel approachable. Ask removes the hesitation around asking early questions, while Case Desk eliminates the uncertainty of active casework — giving users the freedom to ask and the confidence to stay informed.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Section Header (Exact Match to User Screenshot: No Eyebrow, Large Instrument Serif) */}
                <div className="mb-8 sm:mb-12">
                  <h2
                    className={`text-4xl sm:text-5xl lg:text-6xl font-normal font-instrument leading-[1.08] tracking-tight ${
                      isLight ? "text-neutral-900" : "text-white"
                    }`}
                  >
                    Module breakdown <br />
                    and psychology
                  </h2>
                </div>

                {/* 3 Core Psychology Cards: Choose, Build, Play (Exact Match to User Screenshot) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
                  {/* Card 01 - Choose */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border flex flex-col justify-start transition-all duration-200 ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-2xs hover:shadow-xs"
                        : "bg-[#0b0e17] border-[#1c2230] hover:border-[#2a3449]"
                    }`}
                  >
                    <span
                      className={`self-start px-3 py-1 rounded-full text-xs font-medium font-sans mb-4 ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                          : "bg-[#141a26] text-neutral-300 border border-[#222c3d]"
                      }`}
                    >
                      Choose
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      &ldquo;Is this for me?&rdquo;
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      A reward he picked feels relevant, so he comes back for it.
                    </p>
                  </div>

                  {/* Card 02 - Build */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border flex flex-col justify-start transition-all duration-200 ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-2xs hover:shadow-xs"
                        : "bg-[#0b0e17] border-[#1c2230] hover:border-[#2a3449]"
                    }`}
                  >
                    <span
                      className={`self-start px-3 py-1 rounded-full text-xs font-medium font-sans mb-4 ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                          : "bg-[#141a26] text-neutral-300 border border-[#222c3d]"
                      }`}
                    >
                      Build
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      &ldquo;Am I getting closer?&rdquo;
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      &ldquo;1 of 2 payments&rdquo; shows the goal is underway.
                    </p>
                  </div>

                  {/* Card 03 - Play */}
                  <div
                    className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border flex flex-col justify-start transition-all duration-200 ${
                      isLight
                        ? "bg-white border-neutral-200/90 shadow-2xs hover:shadow-xs"
                        : "bg-[#0b0e17] border-[#1c2230] hover:border-[#2a3449]"
                    }`}
                  >
                    <span
                      className={`self-start px-3 py-1 rounded-full text-xs font-medium font-sans mb-4 ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-200"
                          : "bg-[#141a26] text-neutral-300 border border-[#222c3d]"
                      }`}
                    >
                      Play
                    </span>
                    <h3
                      className={`text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      &ldquo;What&apos;s next?&rdquo;
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      Reminder, payment, progress, then a new goal.
                    </p>
                  </div>
                </div>

                {/* Habit Loop Row (Exact Match to User Screenshot: Open Layout on Dark Background, Inline Arrows) */}
                <div className="mb-12 sm:mb-16">
                  <div className="flex items-start gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x">
                    {/* Step 1: Home reminder */}
                    <div className="flex flex-col items-start shrink-0 snap-start">
                      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                        <span className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight whitespace-nowrap ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Home reminder
                        </span>
                        <span className="text-neutral-500 text-base sm:text-lg select-none">
                          →
                        </span>
                      </div>
                      <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-300"
                          : "bg-[#141a26] text-neutral-300 border border-[#222c3d]"
                      }`}>
                        Trigger
                      </span>
                    </div>

                    {/* Step 2: Eligible payment */}
                    <div className="flex flex-col items-start shrink-0 snap-start">
                      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                        <span className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight whitespace-nowrap ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Eligible payment
                        </span>
                        <span className="text-neutral-500 text-base sm:text-lg select-none">
                          →
                        </span>
                      </div>
                      <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-300"
                          : "bg-[#141a26] text-neutral-300 border border-[#222c3d]"
                      }`}>
                        Action
                      </span>
                    </div>

                    {/* Step 3: Visible progress */}
                    <div className="flex flex-col items-start shrink-0 snap-start">
                      <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                        <span className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight whitespace-nowrap ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Visible progress
                        </span>
                        <span className="text-neutral-500 text-base sm:text-lg select-none">
                          →
                        </span>
                      </div>
                      <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-300"
                          : "bg-[#141a26] text-neutral-300 border border-[#222c3d]"
                      }`}>
                        Reward
                      </span>
                    </div>

                    {/* Step 4: Choose the next reward */}
                    <div className="flex flex-col items-start shrink-0 snap-start">
                      <div className="flex items-center gap-2">
                        <span className={`text-base sm:text-lg lg:text-xl font-bold tracking-tight whitespace-nowrap ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Choose the next reward
                        </span>
                        <span className="text-sm sm:text-base text-neutral-400 select-none">
                          ↺
                        </span>
                      </div>
                      <span className={`mt-2 px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold ${
                        isLight
                          ? "bg-neutral-100 text-neutral-700 border border-neutral-300"
                          : "bg-[#141a26] text-neutral-300 border border-[#222c3d]"
                      }`}>
                        Investment
                      </span>
                    </div>
                  </div>
                </div>

                {/* Closing Callout with Cyan Accent Line (Exact Match to User Screenshot) */}
                <div className="pl-4 sm:pl-5 border-l-4 border-cyan-400 py-1 max-w-3xl">
                  <p
                    className={`text-sm sm:text-base lg:text-lg leading-relaxed font-normal ${
                      isLight ? "text-neutral-800" : "text-neutral-200"
                    }`}
                  >
                    The reminder should prompt, not pressure. The payment should be one the user already intends to make. That&apos;s the loop I&apos;d want to test.
                  </p>
                </div>
              </>
            )}
          </section>

          {/* 06 OUTCOMES: HYPOTHESES, NOT RESULTS SECTION */}
          <section
            id="outcomes"
            className={`w-full max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-20 border-t transition-colors ${
              isLight ? "border-neutral-200/80" : "border-neutral-800"
            }`}
          >
            {isLexora ? (
              <>
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-red-700 dark:text-red-400">
                      06
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Outcomes
                    </span>
                  </div>
                  <h2
                    className={`text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument leading-tight tracking-tight ${
                      isLight ? "text-neutral-900" : "text-white"
                    }`}
                  >
                    Outcomes: <br className="hidden sm:block" />
                    hypotheses, not results
                  </h2>
                  <p
                    className={`text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mt-3 ${
                      isLight ? "text-neutral-600" : "text-neutral-400"
                    }`}
                  >
                    Validating whether the redesign makes legal support approachable, case progress transparent, and clients confident throughout.
                  </p>
                </div>

                {/* Metrics Table */}
                <div className="w-full overflow-x-auto mt-6 sm:mt-8">
                  <table className="w-full text-left border-collapse min-w-[340px] sm:min-w-[560px]">
                    <thead>
                      <tr
                        className={`border-b text-[10px] sm:text-[11px] font-mono uppercase tracking-wider ${
                          isLight ? "border-neutral-200 text-neutral-500" : "border-neutral-800 text-neutral-400"
                        }`}
                      >
                        <th className="py-2.5 sm:py-3.5 pr-3 sm:pr-6 font-semibold w-[32%] sm:w-[28%]">Metric</th>
                        <th className="py-2.5 sm:py-3.5 px-2 sm:px-6 font-semibold w-[48%] sm:w-[52%]">Question</th>
                        <th className="py-2.5 sm:py-3.5 pl-2 sm:pl-6 font-semibold w-[20%] text-right sm:text-center">Expected</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isLight ? "divide-neutral-200/80" : "divide-neutral-800/80"
                      }`}
                    >
                      {/* Row 1 */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Question engagement
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Do users feel comfortable asking legal questions?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide ${
                            isLight
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-[#0d2818] text-[#4ade80] border border-[#1b4332]"
                          }`}>
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Community exploration
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Do users explore questions shared by others?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide ${
                            isLight
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-[#0d2818] text-[#4ade80] border border-[#1b4332]"
                          }`}>
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Case visibility
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Can users clearly understand their case status?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide ${
                            isLight
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-[#0d2818] text-[#4ade80] border border-[#1b4332]"
                          }`}>
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Document access
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Can clients locate case documents immediately?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide ${
                            isLight
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-[#0d2818] text-[#4ade80] border border-[#1b4332]"
                          }`}>
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 5 */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Lawyer communication
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Can clients connect directly with their lawyer?
                        </td>
                        <td className="py-4 sm:py-5 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide ${
                            isLight
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-[#0d2818] text-[#4ade80] border border-[#1b4332]"
                          }`}>
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 6 */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Support uncertainty
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Do manual follow-up calls decrease?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide ${
                            isLight
                              ? "bg-sky-100 text-sky-800 border border-sky-200"
                              : "bg-[#0c1d2e] text-[#60a5fa] border border-[#1e3a5f]"
                          }`}>
                            Down
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Closing Paragraph */}
                <div className="mt-8 sm:mt-12 max-w-3xl">
                  <p
                    className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                      isLight ? "text-neutral-700" : "text-neutral-300"
                    }`}
                  >
                    Success isn't measured by feature count, but by friction reduced. We want to validate whether users ask earlier, understand case progress effortlessly, and feel truly in control of their legal journey.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Header (Exact Match to User Screenshot: No Eyebrow, Large Instrument Serif) */}
                <div className="mb-8 sm:mb-10">
                  <h2
                    className={`text-4xl sm:text-5xl lg:text-6xl font-normal font-instrument leading-[1.08] tracking-tight ${
                      isLight ? "text-neutral-900" : "text-white"
                    }`}
                  >
                    Outcomes: <br />
                    hypotheses, not results
                  </h2>
                  <p
                    className={`text-sm sm:text-base leading-relaxed max-w-2xl mt-4 sm:mt-5 ${
                      isLight ? "text-neutral-600" : "text-neutral-300"
                    }`}
                  >
                    Relevant choices should lift selection and redemption. Visible progress may lift repeat payments and D7/D14 retention. Tested against the current scratch-card flow.
                  </p>
                </div>

                {/* Metrics Table (Exact Match to User Screenshot) */}
                <div className="w-full overflow-x-auto mt-6 sm:mt-10">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-neutral-800 text-xs sm:text-sm text-neutral-400 font-normal">
                        <th className="pb-3 pr-4 font-normal w-[26%] sm:w-[24%]">Metric</th>
                        <th className="pb-3 px-4 font-normal w-[56%] sm:w-[62%]">Question</th>
                        <th className="pb-3 pl-4 font-normal w-[18%] sm:w-[14%] text-right">Want</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/60">
                      {/* Row 1: Repeat payments */}
                      <tr className="transition-colors hover:bg-neutral-900/20">
                        <td className={`py-4 pr-4 font-bold text-sm sm:text-base tracking-tight ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Repeat payments
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          Do people come back to pay with Paytm?
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <span className="inline-flex items-center justify-center px-3.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#0a2318] text-[#34d399] border border-[#164e33]">
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 2: D7 / D14 retention */}
                      <tr className="transition-colors hover:bg-neutral-900/20">
                        <td className={`py-4 pr-4 font-bold text-sm sm:text-base tracking-tight ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          D7 / D14 retention
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          Does the test group stay longer?
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <span className="inline-flex items-center justify-center px-3.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#0a2318] text-[#34d399] border border-[#164e33]">
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 3: Selection */}
                      <tr className="transition-colors hover:bg-neutral-900/20">
                        <td className={`py-4 pr-4 font-bold text-sm sm:text-base tracking-tight ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Selection
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          After paying, do people choose a reward?
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <span className="inline-flex items-center justify-center px-3.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#0a2318] text-[#34d399] border border-[#164e33]">
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 4: Redemption */}
                      <tr className="transition-colors hover:bg-neutral-900/20">
                        <td className={`py-4 pr-4 font-bold text-sm sm:text-base tracking-tight ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Redemption
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          Do they use the reward they chose?
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <span className="inline-flex items-center justify-center px-3.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#0a2318] text-[#34d399] border border-[#164e33]">
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 5: Payment completion */}
                      <tr className="transition-colors hover:bg-neutral-900/20">
                        <td className={`py-4 pr-4 font-bold text-sm sm:text-base tracking-tight ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Payment completion
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          Guardrail: rewards must never slow paying.
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <span className="inline-flex items-center justify-center px-3.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#161c28] text-neutral-300 border border-[#263143]">
                            Hold
                          </span>
                        </td>
                      </tr>

                      {/* Row 6: Reward cost */}
                      <tr className="transition-colors hover:bg-neutral-900/20">
                        <td className={`py-4 pr-4 font-bold text-sm sm:text-base tracking-tight ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}>
                          Reward cost
                        </td>
                        <td className="py-4 px-4 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          Is the lift worth what the rewards cost?
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <span className="inline-flex items-center justify-center px-3.5 py-0.5 rounded-full text-xs font-semibold tracking-wide bg-[#241705] text-[#fbbf24] border border-[#52330a]">
                            Watch
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            )}
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
