"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

// Available font definitions
const FONTS = [
  { name: "Montserrat", class: "font-montserrat", text: "Hello, I'm zaib" },
  { name: "Gemunu Libre", class: "font-gemunu", text: "Making Things Better." },
  { name: "Outfit", class: "font-outfit", text: "Building, Still Available" },
  { name: "Space Grotesk", class: "font-space", text: "Waiting For Plot Twist" },
];

// Available color definitions
const COLORS = [
  { name: "Rose Red", text: "text-rose-500", border: "border-rose-500", bg: "bg-rose-500", focusBg: "hover:bg-rose-50 dark:hover:bg-rose-950/20" },
  { name: "Electric Blue", text: "text-blue-500", border: "border-blue-500", bg: "bg-blue-500", focusBg: "hover:bg-blue-50 dark:hover:bg-blue-950/20" },
  { name: "Royal Purple", text: "text-violet-500", border: "border-violet-500", bg: "bg-violet-500", focusBg: "hover:bg-violet-50 dark:hover:bg-violet-950/20" },
  { name: "Emerald Green", text: "text-emerald-500", border: "border-emerald-500", bg: "bg-emerald-500", focusBg: "hover:bg-emerald-50 dark:hover:bg-emerald-950/20" },
  { name: "Amber Gold", text: "text-amber-500", border: "border-amber-500", bg: "bg-amber-500", focusBg: "hover:bg-amber-50 dark:hover:bg-amber-950/20" },
  { name: "Cyber Orange", text: "text-orange-500", border: "border-orange-500", bg: "bg-orange-500", focusBg: "hover:bg-orange-50 dark:hover:bg-orange-950/20" },
];

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

const EXPERIENCES = [
  {
    role: "UX/UI Designer",
    company: "AMA Legal Solutions",
    period: "Sept 2025 - Present",
  },
  {
    role: "UX/UI Designer",
    company: "DroDro",
    period: "April 2025 - Aug 2025",
  }
];

export default function Home() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMoreSkills, setShowMoreSkills] = useState(false);

  const selectedFont = FONTS[activeIndex];
  const selectedColor = COLORS[0]; // Constant Rose Red accent color

  // Auto-cycle the carousel index every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FONTS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const composeEmail = () => {
    window.location.href = "mailto:zaib7@example.com?subject=Hello%20from%20Portfolio";
  };

  // Keystroke listener for 'C' to compose email
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
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
  }, []);

  // Scroll handler to calculate scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;
      
      if (totalScrollable <= 0) {
        setScrollPercent(0);
        return;
      }
      
      const currentScroll = window.scrollY;
      const percent = Math.min(100, Math.max(0, Math.round((currentScroll / totalScrollable) * 100)));
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#f5f7fa] transition-colors duration-500">
      
      {/* 1. FLOATING HEADER / NAVBAR */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full max-w-[320px] sm:max-w-[420px] px-4">
        <div className="flex items-center justify-between w-full bg-zinc-950/90 dark:bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-full  transition-all duration-300 hover:border-white/20">
          
          {/* Avatar and hireable badge */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20">
              <Image
                src="/avatar.jpeg"
                alt="Developer Avatar"
                fill
                sizes="32px"
                className="object-cover grayscale"
                priority
              />
            </div>
            <div className="flex items-center gap-1 select-none">
              <span className="text-[10px] sm:text-xs font-medium tracking-widest text-zinc-100 uppercase">
                BUILDING THINGS PEOPLE USE
              </span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
          </div>

          {/* Scroll counter */}
          <div className="flex items-center gap-1 select-none">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 border border-white/10 shadow-inner">
              <span className="text-xs font-extrabold font-mono text-zinc-200">
                {scrollPercent}
              </span>
            </div>
          </div>
          
        </div>
      </header>

      {/* 2. SUBTLE GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* 3. HERO SECTION CONTAINER */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-28 pb-16 text-center">
        
        {/* Large Central Avatar */}
        <div className="group relative w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-[6px] border-white dark:border-zinc-900 shadow-2xl mb-8 transform transition-all duration-500 hover:scale-105 hover:rotate-2">
          <Image
            src="/avatar.jpeg"
            alt="Developer portrait"
            fill
            sizes="(max-width: 768px) 128px, 144px"
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Carousel Tagline name badge with corner brackets */}
        <div className="relative inline-block px-10 py-4 mb-8 select-none group">
          {/* Top-left corner */}
          <div className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 ${selectedColor.border} transition-all duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5`} />
          {/* Top-right corner */}
          <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 ${selectedColor.border} transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5`} />
          {/* Bottom-left corner */}
          <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 ${selectedColor.border} transition-all duration-300 group-hover:-translate-x-1.5 group-hover:translate-y-1.5`} />
          {/* Bottom-right corner */}
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 ${selectedColor.border} transition-all duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5`} />
          
          {/* Vertical carousel viewport */}
          <div className="h-8 overflow-hidden relative flex items-center justify-center min-w-[260px] sm:min-w-[320px] md:min-w-[380px]">
            <div 
              className="flex flex-col transition-transform duration-700 ease-in-out absolute top-0 left-0 w-full"
              style={{ transform: `translateY(-${activeIndex * 32}px)` }}
            >
              {FONTS.map((font) => (
                <div 
                  key={font.name} 
                  className="h-8 flex items-center justify-center w-full flex-shrink-0"
                >
                  <span className={`text-lg md:text-xl font-regular uppercase tracking-[0.18em] md:tracking-[0.22em] ${selectedColor.text} ${font.class} transition-colors duration-300 whitespace-nowrap`}>
                    {font.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Heading Text */}
        <div className={`max-w-4xl tracking-tighter ${selectedFont.class} select-none`}>
          <h1 className="text-[8vw] sm:text-[6vw] md:text-[4.5vw] font-medium leading-[0.9] text-zinc-950 tracking-tighter">
            MOVES THINGS 2PX.
          </h1>
          <h1 className="text-[8vw] sm:text-[6vw] md:text-[4.5vw] font-medium leading-[0.9] text-zinc-950 tracking-tighter mt-2">
            CALLS IT A CAREER.
          </h1>
        </div>

      </section>

      {/* 3.5. WHO AM I / THE PERSON BEHIND THIS MESS SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 ">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <span className="text-xs font-regular tracking-[0.2em] text-zinc-500 uppercase">
            Who Am I
          </span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-zinc-950 mt-3 uppercase">
            The Person <br /> Behind This Mess
          </h2>
        </div>

        {/* Terminal Window Wrapper */}
        <div className="w-full bg-[#0c0c0e] border border-zinc-800/80 rounded-3xl overflow-hidden  transition-all duration-300 hover:border-zinc-700/80 select-none">
          
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between bg-[#16161a] px-5 py-3 border-b border-zinc-900 select-none">
            {/* Window control buttons */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600/40" />
              <div className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600/40" />
              <div className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600/40" />
            </div>
            
            {/* Terminal Title */}
            <span className="text-xs text-zinc-500 font-mono font-medium tracking-tight">
              zaib@portfolio - zsh - 120x30
            </span>
            
            {/* Version */}
            <span className="text-[10px] text-zinc-600 font-mono font-bold uppercase tracking-wider">
              v1.0
            </span>
          </div>

          {/* Terminal Content Body */}
          <div className="p-6 md:p-8 font-mono text-zinc-300 text-sm leading-relaxed">
            
            <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8">
              
              {/* Left Column: Avatar & Tech Stack */}
              <div className="flex flex-col items-center md:items-start gap-6">
                
                {/* stylized green screen matrix image */}
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-emerald-950/40 bg-zinc-950 shadow-inner group">
                  <Image
                    src="/avatar.jpeg"
                    alt="Zaib pixelated portrait"
                    fill
                    sizes="160px"
                    className="object-cover grayscale brightness-[0.7] contrast-[1.6] mix-blend-screen opacity-90 transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Scanline pattern overlay */}
                  <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60 bg-[linear-gradient(to_bottom,rgba(16,185,129,0.2)_50%,transparent_50%)] bg-[size:100%_4px]" />
                  {/* Green digital tint overlay */}
                  <div className="absolute inset-0 bg-emerald-500/20 mix-blend-color pointer-events-none" />
                  {/* Glare effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                </div>

                {/* Tech Stack List */}
                <div className="w-full flex flex-col items-center md:items-start gap-2.5">
                  <span className="text-[10px] font-extrabold tracking-widest text-zinc-600 uppercase">
                    Stack
                  </span>
                  <div className="flex items-center gap-3">
                    
                    {/* Figma Icon */}
                    <div className="cursor-help transition-all duration-300" title="Figma">
                      <Image
                        src="/figma.png"
                        alt="Figma"
                        width={18}
                        height={18}
                        className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                      />
                    </div>

                    {/* Framer Icon */}
                    <div className="cursor-help transition-all duration-300" title="Framer">
                      <Image
                        src="/Framer.svg"
                        alt="Framer"
                        width={18}
                        height={18}
                        className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                      />
                    </div>

                    {/* React Icon */}
                    <div className="cursor-help transition-all duration-300" title="React / React Native">
                      <Image
                        src="/atom.png"
                        alt="React"
                        width={18}
                        height={18}
                        className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110 animate-spin"
                        style={{ animationDuration: '8s' }}
                      />
                    </div>

                    {/* Next.js Icon */}
                    <div className="cursor-help transition-all duration-300" title="Next.js">
                      <Image
                        src="/Next.js.svg"
                        alt="Next.js"
                        width={18}
                        height={18}
                        className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                      />
                    </div>

                    {/* Shopify Icon */}
                    <div className="cursor-help transition-all duration-300" title="Shopify">
                      <Image
                        src="/Shopify.svg"
                        alt="Shopify"
                        width={18}
                        height={18}
                        className="object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                      />
                    </div>

                  </div>
                </div>

              </div>

              {/* Right Column: Console output and about detail */}
              <div className="flex flex-col gap-4 text-xs sm:text-sm">
                
                {/* zsh Prompt */}
                <div className="flex items-center gap-2 select-none">
                  <span className="text-emerald-500">zaib@portfolio:~ %</span>
                  <span className="text-zinc-100 font-semibold">whoami --verbose</span>
                </div>

                {/* brewed speed */}
                <span className="text-[10px] text-zinc-600 select-none">
                  * brewed in 5.5s
                </span>

                {/* About detail paragraph 1 */}
                <p className="text-zinc-400 font-medium leading-relaxed mt-2">
                  I'm <span className="text-zinc-100 font-bold">Zaib</span>, a <span className="text-zinc-100 font-bold">UI/UX Designer</span> who also speaks <span className="text-zinc-100 font-bold">React</span>.
                </p>

                {/* Paragraph 2 */}
                <p className="text-zinc-400 font-medium leading-relaxed">
                  I design products that don't just look good—they <span className="text-amber-500 font-semibold">solve real problems</span>. From wireframes to production, I enjoy turning messy ideas into intuitive experiences and bringing them to life with <span className="text-zinc-100 font-semibold">React, Next.js, TypeScript, and Framer Motion</span>.
                </p>

                {/* Paragraph 3 */}
                <p className="text-zinc-400 font-medium leading-relaxed">
                  Whether it's launching a startup MVP, redesigning an existing product, or crafting tiny interactions that make people smile, I'm all about building products that people actually <span className="text-emerald-400 font-semibold">enjoy using</span>.
                </p>

                {/* Metadata badges horizontal */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-start gap-10 sm:gap-12 mt-6 border-t border-zinc-900 pt-6 w-full">
                  
                  {/* Metadata Item 1 */}
                  <div className="flex items-center gap-2 text-xs text-emerald-500/90 font-mono whitespace-nowrap">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Gurugram, Haryana
                  </div>

                  {/* Metadata Item 2 */}
                  <div className="flex items-center gap-2 text-xs text-emerald-500/90 font-mono whitespace-nowrap">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    1+ Years Crafting Cool Stuff                
                  </div>

                  {/* Metadata Item 3 */}
                  <div className="flex items-center gap-2 text-xs text-emerald-500/90 font-mono whitespace-nowrap">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    10+ products
                  </div>

                </div>

               

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 3.8. SKILLS SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 -mt-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 select-none">
          <span className="text-xs font-regular tracking-[0.2em] text-zinc-500 uppercase">
            Skills &amp; Arsenal
          </span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-zinc-950 mt-3 uppercase">
            What I Bring <br /> To The Table
          </h2>
        </div>

        {/* Skills Badges Container */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 select-none">
          {PRIMARY_SKILLS.map((skill) => (
            <span
              key={skill}
              className="bg-[#2d2d30] hover:bg-[#1a1a1c] text-white text-sm sm:text-[15px] font-normal px-4 py-2 rounded-[10px] shadow-sm transition-all duration-200 cursor-default"
            >
              {skill}
            </span>
          ))}

          {showMoreSkills &&
            ADDITIONAL_SKILLS.map((skill) => (
              <span
                key={skill}
                className="bg-[#2d2d30] hover:bg-[#1a1a1c] text-white text-sm sm:text-[15px] font-normal px-4 py-2 rounded-[10px] shadow-sm transition-all duration-200 cursor-default hover:-translate-y-0.5 hover:shadow-md animate-in fade-in zoom-in-95 duration-200"
              >
                {skill}
              </span>
            ))}

          {/* Expand / Collapse Button */}
          <button
            type="button"
            onClick={() => setShowMoreSkills(!showMoreSkills)}
            className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 text-sm sm:text-[15px] font-medium px-3 py-2 transition-colors duration-200 cursor-pointer flex items-center gap-1 active:scale-95"
          >
            {showMoreSkills ? "− Less" : "+ More"}
          </button>
        </div>
      </section>

      {/* 3.9. EXPERIENCE SECTION */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 -mt-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 select-none">
          <span className="text-xs font-regular tracking-[0.2em] text-zinc-500 uppercase">
            Career Journey
          </span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-zinc-950 mt-3 uppercase">
            Work Experience
          </h2>
        </div>

        {/* Experience List Table */}
        <div className="w-full flex flex-col border-t border-zinc-200/80 dark:border-zinc-800/80 select-none">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center sm:flex-row sm:items-center sm:justify-between sm:text-left py-6 sm:py-7 border-b border-zinc-200/80 dark:border-zinc-800/80 gap-1 sm:gap-0"
            >
              {/* Role */}
              <span className="text-base sm:text-2xl font-normal text-rose-500 dark:text-rose-500">
                {exp.role}
              </span>

              {/* Company & Date */}
              <div className="flex flex-col items-center sm:items-end mt-1 sm:mt-0">
                <span className="text-xl sm:text-2xl font-normal text-zinc-700 dark:text-rose-500">
                  {exp.company}
                </span>
                <span className="text-xs sm:text-sm text-zinc-400 dark:text-black font-light mt-0.5">
                  {exp.period}
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. PREMIUM DESIGNED FOOTER */}
      <footer className="relative z-10 w-full pt-16 pb-12 px-6  ">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          
          {/* Circular Avatar with icon overlay */}
          <div className="relative group mb-5 select-none">
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[5px] border-white dark:border-zinc-900 shadow-xl transition-transform duration-500 hover:scale-105">
              <Image
                src="/avatar.jpeg"
                alt="Zaib Avatar"
                fill
                sizes="(max-width: 768px) 112px, 128px"
                className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>
            
          </div>

          {/* Subheader */}
          <span className="text-[10px] sm:text-xs font-regular tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase font-outfit mb-5 select-none">
            THE LAST PIXEL
          </span>

          {/* Main Heading Call to Action */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tighter text-zinc-950 font-outfit uppercase max-w-2xl mb-12 select-none">
            LET'S BUILD <br />
            SOMETHING <span className="text-rose-500 font-medium transition-all duration-300 hover:brightness-110">GOOD</span>
          </h2>

          {/* Social Links Row */}
          <div className="flex items-center justify-center gap-7 sm:gap-9 mb-16 text-rose-500 hover:text-rose-500 dark:text-zinc-500 transition-colors">
            
            {/* X / Twitter */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-rose-500 transition-all duration-300 transform hover:scale-120" title="X (Twitter)">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-500 transition-all duration-300 transform hover:scale-120" title="Instagram">
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            

            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-rose-500 transition-all duration-300 transform hover:scale-120" title="LinkedIn">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            

          </div>

          {/* Legal and Copyright row wrapper */}
          <div className="w-full max-w-5xl border-t border-zinc-200/50 dark:border-zinc-800/80 pt-8 flex flex-col items-center gap-6">
            
            {/* Terms / Privacy Policy links */}
            <div className="w-full flex flex-row items-center justify-between text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 font-outfit px-2">
              <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
            
            {/* Signature & Author Row */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium font-outfit select-none mt-2">
              <span>&copy; {new Date().getFullYear()}</span>
              
              <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 px-2 py-0.5 rounded-md text-[10px] sm:text-xs">
                {/* Next.js Mini Logo */}
                <svg className="w-3.5 h-3.5 fill-current text-zinc-700 dark:text-zinc-300" viewBox="0 0 128 128">
                  <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6zM96.7 44.8v38.4h-5.8V53.5L56.7 96H51.2V44.8h5.8v28.8L91.2 32h5.5v12.8z" />
                </svg>
                <span>Built in Next.js</span>
              </span>
              
              <span>by</span>
              
              <span className="flex items-center gap-1.5 font-bold text-zinc-950 dark:text-zinc-100">
                <div className="relative w-5 h-5 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src="/avatar.jpeg"
                    alt="Zaib Avatar"
                    fill
                    sizes="20px"
                    className="object-cover grayscale"
                  />
                </div>
                <span>Zaib</span>
              </span>
            </div>

          </div>

        </div>
      </footer>

    </div>
  );
}
