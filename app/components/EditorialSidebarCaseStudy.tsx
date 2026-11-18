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
        {/* COLLAPSED RAIL TOGGLE BUTTON (When sidebar is collapsed on desktop) */}
        {isCollapsed && (
          <aside
            className={`hidden lg:flex flex-col items-center py-5 px-2 border-r sticky top-[53px] h-[calc(100vh-53px)] z-30 shrink-0 transition-all duration-300 ${
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
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-neutral-200/70 dark:border-neutral-800 text-[11px] text-neutral-400 font-normal">
            {disclaimerNote}
          </div>
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
                  {isLexora ? "Product Goal" : "Business goal"}
                </span>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${
                    isLight ? "text-neutral-800" : "text-neutral-200"
                  }`}
                >
                  {isLexora
                    ? "Make legal guidance approachable by letting users ask questions freely, learn from community experiences, and stay informed throughout their journey."
                    : "Bring users back to make their next payment with Paytm UPI, and build a lasting preference for the app."}
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
                  {isLexora
                    ? "People hesitate to seek legal help due to high costs and jargon. When they do take services, tracking documents and communication is fragmented and stressful."
                    : "Users get rewards they can't use, with no say in what they receive. So they have little reason to open the next card, or to choose Paytm next time."}
                </p>
              </div>
            </div>

            {/* Storyboard Header */}
            <div className="mt-12 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium">
                {isLexora ? "User Journey Storyboard" : "The Kirana Story"}
              </span>
            </div>

            {/* Storyboard Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {isLexora ? (
                <>
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
                </>
              ) : (
                <>
                  {/* PAYTM PANEL 1 */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl border border-blue-900/30 overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 relative">
                      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20" y1="240" x2="380" y2="240" stroke="#1d4ed8" strokeWidth="2" />
                        {/* Shelf with groceries */}
                        <line x1="210" y1="130" x2="360" y2="130" stroke="#1d4ed8" strokeWidth="1.5" />
                        <rect x="225" y="100" width="14" height="30" rx="2" stroke="#1d4ed8" strokeWidth="1.5" fill="#eff6ff" />
                        <rect x="245" y="95" width="18" height="35" rx="2" stroke="#1d4ed8" strokeWidth="1.5" fill="#dbeafe" />
                        <rect x="270" y="105" width="16" height="25" rx="2" stroke="#1d4ed8" strokeWidth="1.5" fill="#eff6ff" />
                        {/* Kirana Counter */}
                        <rect x="200" y="180" width="160" height="60" stroke="#1d4ed8" strokeWidth="2" fill="#eff6ff" />
                        {/* Shopkeeper with mustache */}
                        <ellipse cx="280" cy="140" rx="20" ry="24" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                        <path d="M268 148 Q280 155 292 148" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="274" cy="136" r="2.5" fill="#1d4ed8" />
                        <circle cx="286" cy="136" r="2.5" fill="#1d4ed8" />
                        <path d="M260 180 C265 165 295 165 300 180" stroke="#1d4ed8" strokeWidth="2" fill="#dbeafe" />
                        {/* Shriram on left holding phone */}
                        <ellipse cx="90" cy="135" rx="22" ry="26" stroke="#1d4ed8" strokeWidth="2.5" fill="#fff" />
                        <path d="M72 130 C70 105 90 98 102 100 C116 102 118 116 115 130 Z" stroke="#1d4ed8" strokeWidth="2.5" fill="#1e3a8a" />
                        <circle cx="85" cy="132" r="3" fill="#1d4ed8" />
                        <circle cx="98" cy="132" r="3" fill="#1d4ed8" />
                        <path d="M86 145 Q92 150 98 145" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
                        <path d="M55 240 C60 190 80 180 110 178 C135 180 145 190 150 240" stroke="#1d4ed8" strokeWidth="2.5" fill="#eff6ff" />
                        {/* Phone scanning QR */}
                        <rect x="125" y="160" width="22" height="42" rx="3" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                        {/* Acrylic QR stand on counter */}
                        <path d="M215 155 L240 155 L245 180 L210 180 Z" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                        <rect x="220" y="160" width="14" height="14" stroke="#1d4ed8" strokeWidth="1" fill="#1e3a8a" />
                      </svg>
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4 className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                        1
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Shriram is a regular at his local kirana. He pays with whichever UPI app he opens first.
                      </p>
                    </div>
                  </div>

                  {/* PAYTM PANEL 2 */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl border border-blue-900/30 overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 relative">
                      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Phone screen centered */}
                        <rect x="130" y="35" width="140" height="230" rx="16" stroke="#1d4ed8" strokeWidth="3" fill="#fff" />
                        <rect x="175" y="45" width="50" height="8" rx="4" fill="#dbeafe" />
                        <circle cx="200" cy="115" r="34" stroke="#16a34a" strokeWidth="3" fill="#dcfce7" />
                        <path d="M188 115 L196 123 L214 105" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                        <text x="200" y="175" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="bold" fontFamily="sans-serif">₹500</text>
                        <text x="200" y="195" textAnchor="middle" fill="#16a34a" fontSize="10" fontWeight="bold" fontFamily="monospace">PAID SUCCESSFULLY</text>
                        <text x="200" y="215" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="sans-serif">To: Gupta Provisions & Dairy</text>
                        {/* Grocery bag next to phone */}
                        <path d="M295 190 L345 190 L340 250 L290 250 Z" stroke="#1d4ed8" strokeWidth="2" fill="#eff6ff" />
                        <path d="M308 190 C308 175 330 175 330 190" stroke="#1d4ed8" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4 className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                        2
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        ₹500 for the week's groceries. Quick and easy, like always.
                      </p>
                    </div>
                  </div>

                  {/* PAYTM PANEL 3 */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl border border-blue-900/30 overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 relative">
                      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Shriram excited scratching phone */}
                        <ellipse cx="140" cy="125" rx="24" ry="28" stroke="#1d4ed8" strokeWidth="2.5" fill="#fff" />
                        <path d="M120 120 C118 95 140 85 152 88 C166 90 170 106 166 120 Z" stroke="#1d4ed8" strokeWidth="2.5" fill="#1e3a8a" />
                        <circle cx="134" cy="122" r="3" fill="#1d4ed8" />
                        <circle cx="148" cy="122" r="3" fill="#1d4ed8" />
                        {/* Excited open smile */}
                        <path d="M132 136 Q141 148 150 136 Z" stroke="#1d4ed8" strokeWidth="2" fill="#1e3a8a" />
                        {/* Phone with glowing scratch card */}
                        <g transform="translate(195, 110) rotate(-5)">
                          <rect x="0" y="0" width="120" height="150" rx="10" stroke="#1d4ed8" strokeWidth="2.5" fill="#fff" />
                          <rect x="12" y="25" width="96" height="96" rx="8" stroke="#2563eb" strokeWidth="2" fill="#dbeafe" />
                          <path d="M25 40 L70 85 M35 35 L80 80 M55 35 L95 75" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
                          {/* Sparkles */}
                          <path d="M95 15 L100 25 L110 30 L100 35 L95 45 L90 35 L80 30 L90 25 Z" fill="#fbbf24" />
                          <path d="M15 105 L18 112 L25 115 L18 118 L15 125 L12 118 L5 115 L12 112 Z" fill="#fbbf24" />
                        </g>
                      </svg>
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4 className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                        3
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        A scratch card pops up after the payment. He's excited and starts scratching.
                      </p>
                    </div>
                  </div>

                  {/* PAYTM PANEL 4 */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl border border-blue-900/30 overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 relative">
                      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Shriram disappointed with cloud */}
                        <g transform="translate(60, 25)">
                          <path d="M20 25 C15 12 30 5 45 10 C52 0 75 0 85 10 C98 5 110 12 105 25 C115 32 108 45 95 42 C85 48 70 48 60 42 C48 48 35 45 28 35 C18 35 15 30 20 25 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
                          <line x1="35" y1="52" x2="30" y2="65" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="55" y1="55" x2="50" y2="68" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                          <line x1="75" y1="52" x2="70" y2="66" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
                        </g>

                        <ellipse cx="110" cy="145" rx="24" ry="28" stroke="#1d4ed8" strokeWidth="2.5" fill="#fff" />
                        <path d="M90 140 C88 115 110 105 122 108 C136 110 140 126 136 140 Z" stroke="#1d4ed8" strokeWidth="2.5" fill="#1e3a8a" />
                        <circle cx="104" cy="142" r="3" fill="#1d4ed8" />
                        <circle cx="118" cy="142" r="3" fill="#1d4ed8" />
                        {/* Frown */}
                        <path d="M104 160 Q111 152 118 160" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />

                        {/* Useless 32% Jewellery Card */}
                        <g transform="translate(200, 75)">
                          <rect x="0" y="0" width="150" height="150" rx="12" stroke="#1d4ed8" strokeWidth="2.5" fill="#fff" />
                          <rect x="12" y="15" width="126" height="45" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
                          <text x="75" y="36" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="bold" fontFamily="sans-serif">32% OFF</text>
                          <text x="75" y="50" textAnchor="middle" fill="#78350f" fontSize="7" fontFamily="sans-serif">Luxury Gold Jewellery</text>
                          {/* Diamond necklace sketch */}
                          <circle cx="75" cy="85" r="18" stroke="#1d4ed8" strokeWidth="1.5" strokeDasharray="2 2" fill="none" />
                          <path d="M68 95 L75 105 L82 95 Z" stroke="#1d4ed8" strokeWidth="1.5" fill="#dbeafe" />
                          <text x="75" y="125" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold" fontFamily="monospace">MIN SPEND ₹50,000</text>
                        </g>
                      </svg>
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4 className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                        4
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        He gets a reward card of no use: 32% off jewellery, irrelevant to him.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* 03 STRATEGY & VISION SECTION */}
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
                      {isLexora ? "Ask" : "Choose"}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isLight
                          ? "bg-neutral-100 text-neutral-600 border border-neutral-200"
                          : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                      }`}
                    >
                      {isLexora ? "Accessibility" : "Onboarding"}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    {isLexora
                      ? "A free, welcoming space to ask legal questions without intimidation or upfront fees."
                      : "After an eligible payment, users pick a reward that's ready to claim."}
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
                      {isLexora ? "Learn" : "Build"}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isLight
                          ? "bg-neutral-100 text-neutral-600 border border-neutral-200"
                          : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                      }`}
                    >
                      {isLexora ? "Community" : "Activation"}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    {isLexora
                      ? "Explore public queries and learn from real situations and verified answers shared by others."
                      : "Once they understand the experience, they can work towards a chosen reward over multiple payments."}
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
                      {isLexora ? "Manage" : "Play"}
                    </h3>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        isLight
                          ? "bg-neutral-100 text-neutral-600 border border-neutral-200"
                          : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                      }`}
                    >
                      {isLexora ? "Transparency" : "Power user"}
                    </span>
                  </div>
                  <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                    {isLexora
                      ? "A central workspace to access documents, message your lawyer, and follow timeline updates."
                      : "Test category choice and variation in progress, not a random reward."}
                  </p>
                </div>
              </div>
            </div>

            {/* Vision Storyboard Grid */}
            <div className="mt-12 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-medium">
                {isLexora ? "The Connected Experience" : "The Rewarded Journey"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {isLexora ? (
                <>
                  {/* LEXORA VISION 1: ASK */}
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

                  {/* LEXORA VISION 2: LEARN */}
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

                  {/* LEXORA VISION 3: CONNECT */}
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

                  {/* LEXORA VISION 4: STAY IN CONTROL */}
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
                </>
              ) : (
                <>
                  {/* PAYTM VISION 1 */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl border border-blue-900/30 overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 relative">
                      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20" y1="240" x2="380" y2="240" stroke="#1d4ed8" strokeWidth="2" />
                        <ellipse cx="120" cy="135" rx="22" ry="26" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                        <path d="M100 130 C98 105 120 95 132 98 C146 100 150 115 146 130 Z" stroke="#1d4ed8" strokeWidth="2" fill="#1e3a8a" />
                        <circle cx="114" cy="132" r="3" fill="#1d4ed8" />
                        <circle cx="128" cy="132" r="3" fill="#1d4ed8" />
                        <path d="M116 145 Q122 152 128 145" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
                        {/* Tablet card picker */}
                        <g transform="translate(180, 80) rotate(-6)">
                          <rect x="0" y="0" width="150" height="110" rx="10" stroke="#1d4ed8" strokeWidth="2.5" fill="#fff" />
                          <rect x="12" y="15" width="36" height="50" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
                          <rect x="56" y="15" width="36" height="50" rx="4" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
                          <rect x="100" y="15" width="36" height="50" rx="4" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.5" />
                          <circle cx="74" cy="40" r="10" stroke="#1d4ed8" strokeWidth="1.5" fill="#fff" />
                          <text x="75" y="85" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="bold" fontFamily="sans-serif">He picks: Headphones</text>
                        </g>
                      </svg>
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4 className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                        1 • Choose
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        After paying at the kirana, Shriram picks the reward he actually wants: headphones.
                      </p>
                    </div>
                  </div>

                  {/* PAYTM VISION 2 */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl border border-blue-900/30 overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 relative">
                      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <ellipse cx="200" cy="120" rx="26" ry="30" stroke="#1d4ed8" strokeWidth="2.5" fill="#fff" />
                        <path d="M178 115 C176 88 198 78 212 80 C228 82 232 98 228 115 Z" stroke="#1d4ed8" strokeWidth="2.5" fill="#1e3a8a" />
                        {/* Big over-ear headphones */}
                        <path d="M165 125 C165 80 235 80 235 125" stroke="#1e3a8a" strokeWidth="4" fill="none" />
                        <ellipse cx="165" cy="125" rx="8" ry="14" fill="#1d4ed8" />
                        <ellipse cx="235" cy="125" rx="8" ry="14" fill="#1d4ed8" />
                        <circle cx="192" cy="116" r="3" fill="#1d4ed8" />
                        <circle cx="208" cy="116" r="3" fill="#1d4ed8" />
                        <path d="M194 130 Q200 138 206 130" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" />
                        {/* Music notes floating */}
                        <path d="M260 85 L268 85 L268 105 M260 95 L268 95" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="258" cy="105" r="4" fill="#60a5fa" />
                        <circle cx="268" cy="105" r="4" fill="#60a5fa" />
                      </svg>
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4 className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                        2 • Choose
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        The headphones arrive. He chose them, so he uses them and enjoys them.
                      </p>
                    </div>
                  </div>

                  {/* PAYTM VISION 3 */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl border border-blue-900/30 overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 relative">
                      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20" y1="240" x2="380" y2="240" stroke="#1d4ed8" strokeWidth="2" />
                        {/* Kirana counter with progress card */}
                        <rect x="220" y="160" width="140" height="80" stroke="#1d4ed8" strokeWidth="2" fill="#eff6ff" />
                        <ellipse cx="290" cy="120" rx="18" ry="22" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                        <ellipse cx="90" cy="135" rx="20" ry="24" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                        {/* Progress card bubble */}
                        <g transform="translate(140, 70)">
                          <rect x="0" y="0" width="130" height="70" rx="8" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                          <rect x="15" y="18" width="100" height="12" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
                          <rect x="15" y="18" width="55" height="12" rx="6" fill="#3b82f6" />
                          <text x="65" y="48" textAnchor="middle" fill="#1e40af" fontSize="8" fontWeight="bold" fontFamily="monospace">1 OF 3 PAYMENTS DONE</text>
                        </g>
                      </svg>
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4 className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                        3 • Build
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Next time, a reward unlocks over more than one payment. The first payment gets it partway.
                      </p>
                    </div>
                  </div>

                  {/* PAYTM VISION 4 */}
                  <div className="flex flex-col">
                    <div className="w-full aspect-[4/3] rounded-xl border border-blue-900/30 overflow-hidden bg-white shadow-sm flex items-center justify-center p-2 relative">
                      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="20" y1="240" x2="380" y2="240" stroke="#1d4ed8" strokeWidth="2" />
                        {/* Cafe counter */}
                        <rect x="240" y="170" width="120" height="70" stroke="#1d4ed8" strokeWidth="2" fill="#eff6ff" />
                        <ellipse cx="300" cy="130" rx="16" ry="20" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                        <ellipse cx="100" cy="135" rx="20" ry="24" stroke="#1d4ed8" strokeWidth="2" fill="#fff" />
                        <g transform="translate(130, 60)">
                          <rect x="0" y="0" width="130" height="80" rx="8" stroke="#16a34a" strokeWidth="2" fill="#f0fdf4" />
                          <circle cx="65" cy="30" r="16" fill="#22c55e" />
                          <path d="M58 30 L63 35 L73 24" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                          <text x="65" y="62" textAnchor="middle" fill="#15803d" fontSize="8" fontWeight="bold" fontFamily="sans-serif">REWARD UNLOCKED</text>
                        </g>
                      </svg>
                    </div>
                    <div className="mt-3.5 space-y-1.5 flex flex-col">
                      <h4 className={`text-xs sm:text-[13px] font-semibold tracking-tight leading-snug ${isLight ? "text-neutral-900" : "text-white"}`}>
                        4 • Build
                      </h4>
                      <p className={`text-xs sm:text-[13px] leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        He pays at the café with Paytm too. Each payment brings the reward closer, and paying with Paytm becomes a habit.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Strategic Design Philosophy Callout Box */}
            <div
              className={`mt-10 p-6 sm:p-8 rounded-2xl border-l-4 transition-colors ${
                isLexora
                  ? isLight
                    ? "bg-amber-50/50 border-red-700/80 text-neutral-800"
                    : "bg-neutral-900/70 border-red-500 text-neutral-200"
                  : isLight
                    ? "bg-blue-50/60 border-blue-600 text-neutral-800"
                    : "bg-blue-950/20 border-blue-500 text-neutral-200"
              }`}
            >
              <p className="text-sm sm:text-base font-semibold leading-relaxed">
                {isLexora
                  ? '"Legal help shouldn\'t end with just finding a lawyer. People deserve to stay informed, supported, and in control throughout their journey."'
                  : "I'd earn the right to add complexity. First, make the reward clear and let people choose it. If a controlled test shows a clear, repeatable improvement in repeat payments and D7/D14 retention, I'd test visible progress. Only after that would I explore categories."}
              </p>
              <p
                className={`text-xs sm:text-[13px] mt-3 leading-relaxed ${
                  isLight ? "text-neutral-600" : "text-neutral-400"
                }`}
              >
                {isLexora
                  ? "Lexora connects two experiences: an open community to discover answers freely, and a dedicated Case Desk for active clients — bringing clarity from the first question to case resolution."
                  : "Onboarding is the early period of use, not one payment. Users get time to understand the simple version first."}
              </p>
            </div>
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
              /* Paytm Exact Carousel Flow Matching Lexora Structure */
              <>
                {/* Sub-header Flow Overview Pill */}
                <div className={`p-4 sm:p-5 rounded-2xl border mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${
                  isLight ? "bg-neutral-50/80 border-neutral-200/90 text-neutral-800" : "bg-[#10141d]/80 border-[#1c2230] text-neutral-200"
                }`}>
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-400">
                      Choice Architecture & Milestone Progress
                    </span>
                    <p className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                      <strong className={isLight ? "text-neutral-900" : "text-white"}>Pick your reward</strong>: Users choose what they earn rather than receiving random coupons. · <strong className={isLight ? "text-neutral-900" : "text-white"}>Milestone Progress</strong>: Routine payments tick off a clear goal until unlocked.
                    </p>
                  </div>
                </div>

                {/* Continuous Horizontal Flow Carousel */}
                <div
                  ref={flowContainerRef}
                  className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {/* Card 1: Screen 1 — Post-Payment Reward Choice */}
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
                            src="/iPhone_product_mockup_creation_0c49d661_2K.jpg"
                            alt="Screen 1 — Post-Payment Reward Choice"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 175px, 225px"
                          />
                        </div>
                      </div>

                      {/* Annotations Column */}
                      <div className="flex-1 min-w-[105px] sm:min-w-[125px] flex flex-col justify-around py-2 sm:py-3 space-y-2 sm:space-y-3">
                        <div className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                          <div className="leading-tight">
                            <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              User agency
                            </p>
                            <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Select from 3 relevant reward choices.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                          <div className="leading-tight">
                            <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Brand relevance
                            </p>
                            <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Electronics, dining, and daily essentials.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                          <div className="leading-tight">
                            <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Ownership
                            </p>
                            <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Tapping "I want this" creates buy-in.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                          <div className="leading-tight">
                            <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Zero clutter
                            </p>
                            <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              No forced scratches or spam vouchers.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className={`mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t ${isLight ? "border-neutral-100" : "border-[#1c2230]"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-300">
                          Choice
                        </span>
                        <h4 className={`text-xs sm:text-[13px] font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Screen 1 — Post-Payment Reward Choice
                        </h4>
                      </div>
                      <p className={`text-[10.5px] sm:text-[11px] mt-0.5 leading-snug ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Users select what they want to earn directly after paying, turning passive luck into deliberate choice.
                      </p>
                    </div>
                  </div>

                  {/* Card 2: Screen 2 — Milestone Progress Dashboard */}
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
                            src="/Create_iPhone_product_mockup_9ae62066_2K.jpg"
                            alt="Screen 2 — Milestone Progress Dashboard"
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 175px, 225px"
                          />
                        </div>
                      </div>

                      {/* Annotations Column */}
                      <div className="flex-1 min-w-[105px] sm:min-w-[125px] flex flex-col justify-around py-2 sm:py-3 space-y-2 sm:space-y-3">
                        <div className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                          <div className="leading-tight">
                            <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Visible progress
                            </p>
                            <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              "1 of 2 payments" shows the goal is underway.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                          <div className="leading-tight">
                            <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Dashboard anchor
                            </p>
                            <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Pinned on home screen as a reminder.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                          <div className="leading-tight">
                            <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Durable habit
                            </p>
                            <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Brings users back to pay with Paytm repeatedly.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                          <div className="w-3.5 sm:w-4 border-b border-dashed border-cyan-400/80 shrink-0 mt-1.5" />
                          <div className="leading-tight">
                            <p className={`text-[10.5px] sm:text-[11px] font-semibold tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                              Automatic unlock
                            </p>
                            <p className={`text-[9px] sm:text-[9.5px] leading-tight mt-0.5 ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                              Unlocks code upon final eligible transfer.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Caption */}
                    <div className={`mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t ${isLight ? "border-neutral-100" : "border-[#1c2230]"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-950 text-blue-300">
                          Progress
                        </span>
                        <h4 className={`text-xs sm:text-[13px] font-semibold ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Screen 2 — Milestone Progress Dashboard
                        </h4>
                      </div>
                      <p className={`text-[10.5px] sm:text-[11px] mt-0.5 leading-snug ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Every routine payment advances the progress bar until the reward code is unlocked automatically.
                      </p>
                    </div>
                  </div>

                  {/* Card 3: Outcome Card — Habit & Repeat Velocity */}
                  <div
                    className={`w-[310px] sm:w-[370px] lg:w-[400px] shrink-0 snap-center rounded-3xl p-3.5 sm:p-5 flex flex-col justify-between border transition-all duration-300 ${
                      isLight
                        ? "bg-white border-blue-500/80 ring-2 ring-blue-200/80 shadow-md"
                        : "bg-[#0f121a] border-blue-500/80 ring-2 ring-blue-950/60 shadow-lg shadow-black/40"
                    }`}
                  >
                    <div className="w-full max-w-[270px] mx-auto h-[385px] sm:h-[440px] bg-white rounded-[22px] sm:rounded-[26px] p-4 sm:p-5 shadow-xl border border-neutral-200 flex flex-col justify-between text-neutral-900">
                      <div>
                        <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-widest text-blue-600 uppercase">
                          RETENTION OUTCOME
                        </span>
                        <h4 className="text-sm sm:text-base font-bold leading-tight mt-1 mb-4 sm:mb-5 text-neutral-900">
                          Durable repeat payments
                        </h4>

                        {/* Checklist */}
                        <div className="space-y-3 sm:space-y-4">
                          <div className="flex items-start gap-2 sm:gap-2.5">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                              ✓
                            </div>
                            <div>
                              <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">Agency over luck</p>
                              <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">Users value rewards they actively choose.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-2.5">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                              ✓
                            </div>
                            <div>
                              <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">Visible progress</p>
                              <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">Predictable steps replace scratch card lottery.</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2 sm:gap-2.5">
                            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 text-[9px] sm:text-[10px] font-bold">
                              ✓
                            </div>
                            <div>
                              <p className="text-[11px] sm:text-[12px] font-bold text-neutral-900 leading-tight">D7 / D14 velocity</p>
                              <p className="text-[9.5px] sm:text-[10px] text-neutral-600 leading-tight mt-0.5">Everyday kirana transactions turn into habit.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-neutral-100/90 border border-neutral-200 rounded-xl p-2.5 sm:p-3 text-center mt-auto">
                        <p className="text-[9.5px] sm:text-[10px] text-neutral-700 font-medium leading-snug">
                          Converting one-off payments into deliberate, rewarding user preference.
                        </p>
                      </div>
                    </div>

                    <div className={`mt-3 pt-2.5 sm:mt-4 sm:pt-3 border-t ${isLight ? "border-neutral-100" : "border-[#1c2230]"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9.5px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          Outcome
                        </span>
                        <h4 className="text-xs sm:text-[13px] font-semibold text-blue-400">
                          Retention Outcome
                        </h4>
                      </div>
                      <p className={`text-[10.5px] sm:text-[11px] mt-0.5 leading-snug ${isLight ? "text-neutral-600" : "text-neutral-400"}`}>
                        Users return to Paytm because the reward represents genuine personal value.
                      </p>
                    </div>
                  </div>
                </div>
              </>
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
                {/* Section Header */}
                <div className="mb-8 sm:mb-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-blue-400">
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

                {/* 3 Core Psychology Cards: Choose, Build, Play (Matching User Screenshot) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-14">
                  {/* Card 01 - Choose */}
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
                      Choose
                    </span>
                    <h3
                      className={`text-lg sm:text-xl font-bold font-sans tracking-tight mb-2 sm:mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      “Is this for me?”
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
                      Build
                    </span>
                    <h3
                      className={`text-lg sm:text-xl font-bold font-sans tracking-tight mb-2 sm:mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      “Am I getting closer?”
                    </h3>
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isLight ? "text-neutral-600" : "text-neutral-400"
                      }`}
                    >
                      “1 of 2 payments” shows the goal is underway.
                    </p>
                  </div>

                  {/* Card 03 - Play */}
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
                      Play
                    </span>
                    <h3
                      className={`text-lg sm:text-xl font-bold font-sans tracking-tight mb-2 sm:mb-2.5 ${
                        isLight ? "text-neutral-900" : "text-white"
                      }`}
                    >
                      “What's next?”
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

                {/* User Experience Loop Container (Matching User Screenshot) */}
                <div className={`p-4 sm:p-7 rounded-2xl sm:rounded-3xl border space-y-6 sm:space-y-7 ${
                  isLight ? "bg-neutral-50/70 border-neutral-200/90" : "bg-[#0b0e17]/80 border-[#1c2230]"
                }`}>
                  <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
                    {/* Step 1: Home reminder */}
                    <div className="flex flex-col items-start shrink-0 snap-start">
                      <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                        Home reminder
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

                    {/* Step 2: Eligible payment */}
                    <div className="flex flex-col items-start shrink-0 snap-start">
                      <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                        Eligible payment
                      </span>
                      <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                        isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                      }`}>
                        Action
                      </span>
                    </div>

                    {/* Arrow */}
                    <span className={`select-none text-base sm:text-xl shrink-0 self-center mb-3 sm:mb-4 px-1 ${isLight ? "text-neutral-300" : "text-neutral-600"}`}>
                      →
                    </span>

                    {/* Step 3: Visible progress */}
                    <div className="flex flex-col items-start shrink-0 snap-start">
                      <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap ${isLight ? "text-neutral-900" : "text-white"}`}>
                        Visible progress
                      </span>
                      <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                        isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                      }`}>
                        Reward
                      </span>
                    </div>

                    {/* Arrow */}
                    <span className={`select-none text-base sm:text-xl shrink-0 self-center mb-3 sm:mb-4 px-1 ${isLight ? "text-neutral-300" : "text-neutral-600"}`}>
                      →
                    </span>

                    {/* Step 4: Choose the next reward */}
                    <div className="flex flex-col items-start shrink-0 snap-start">
                      <span className={`text-sm sm:text-base lg:text-lg font-bold tracking-tight whitespace-nowrap flex items-center gap-1 ${isLight ? "text-neutral-900" : "text-white"}`}>
                        Choose the next reward <span className="text-xs text-neutral-400">↺</span>
                      </span>
                      <span className={`mt-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider font-semibold ${
                        isLight ? "bg-white text-neutral-600 border border-neutral-200 shadow-2xs" : "bg-[#181d29] text-neutral-300 border border-[#263043]"
                      }`}>
                        Investment
                      </span>
                    </div>
                  </div>
                </div>

                {/* Closing Design Rationale Callout with Cyan Accent Line (Matching User Screenshot) */}
                <div className="mt-8 sm:mt-12 pt-2">
                  <div className="pl-4 sm:pl-5 border-l-2 border-cyan-400 py-0.5 max-w-3xl">
                    <p
                      className={`text-xs sm:text-sm lg:text-base leading-relaxed ${
                        isLight ? "text-neutral-800" : "text-neutral-200"
                      }`}
                    >
                      The reminder should prompt, not pressure. The payment should be one the user already intends to make. That's the loop I'd want to test.
                    </p>
                  </div>
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
                {/* Header (Matching User Screenshot) */}
                <div className="mb-6 sm:mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-semibold text-blue-400">
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
                    Relevant choices should lift selection and redemption. Visible progress may lift repeat payments and D7/D14 retention. Tested against the current scratch-card flow.
                  </p>
                </div>

                {/* Metrics Table (Matching User Screenshot) */}
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
                        <th className="py-2.5 sm:py-3.5 pl-2 sm:pl-6 font-semibold w-[20%] text-right sm:text-center">Want</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${
                        isLight ? "divide-neutral-200/80" : "divide-neutral-800/80"
                      }`}
                    >
                      {/* Row 1: Repeat payments */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Repeat payments
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Do people come back to pay with Paytm?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-[#0d2818] text-[#4ade80] border border-[#1b4332]">
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 2: D7 / D14 retention */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          D7 / D14 retention
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Does the test group stay longer?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-[#0d2818] text-[#4ade80] border border-[#1b4332]">
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 3: Selection */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Selection
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          After paying, do people choose a reward?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-[#0d2818] text-[#4ade80] border border-[#1b4332]">
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 4: Redemption */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Redemption
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Do they use the reward they chose?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-[#0d2818] text-[#4ade80] border border-[#1b4332]">
                            Up
                          </span>
                        </td>
                      </tr>

                      {/* Row 5: Payment completion */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Payment completion
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Guardrail: rewards must never slow paying.
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-[#1e2330] text-neutral-300 border border-neutral-700">
                            Hold
                          </span>
                        </td>
                      </tr>

                      {/* Row 6: Reward cost */}
                      <tr className="transition-colors hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30">
                        <td className={`py-3 sm:py-4 pr-3 sm:pr-6 font-bold text-xs sm:text-sm lg:text-base tracking-tight ${isLight ? "text-neutral-900" : "text-white"}`}>
                          Reward cost
                        </td>
                        <td className={`py-3 sm:py-4 px-2 sm:px-6 text-[11px] sm:text-xs lg:text-sm leading-snug ${isLight ? "text-neutral-600" : "text-neutral-300"}`}>
                          Is the lift worth what the rewards cost?
                        </td>
                        <td className="py-3 sm:py-4 pl-2 sm:pl-6 text-right sm:text-center">
                          <span className="inline-flex items-center justify-center px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide bg-[#2a1708] text-[#f59e0b] border border-[#78350f]">
                            Watch
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
                    The success of Paytm Rewards shouldn't be measured by how many features it offers, but by how effectively it reduces the friction of reward earning. I'd want to validate whether users pick more freely, understand their milestone progress better, and feel more in control.
                  </p>
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
