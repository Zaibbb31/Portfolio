"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import GitHubContributions from "./components/GitHubContributions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { PROJECTS } from "./data/projects";

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
  },
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
      <Navbar />

      {/* 2. SUBTLE GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* 3. HERO SECTION CONTAINER */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-3 sm:px-6 pt-28 pb-16 text-center max-w-6xl mx-auto">
        
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
        <div className="relative inline-flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 mb-8 select-none group">
          {/* Top-left corner */}
          <div className={`absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 ${selectedColor.border} transition-all duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5`} />
          {/* Top-right corner */}
          <div className={`absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 ${selectedColor.border} transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5`} />
          {/* Bottom-left corner */}
          <div className={`absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 ${selectedColor.border} transition-all duration-300 group-hover:-translate-x-1.5 group-hover:translate-y-1.5`} />
          {/* Bottom-right corner */}
          <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 ${selectedColor.border} transition-all duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5`} />
          
          {/* Vertical carousel viewport */}
          <div className="h-8 overflow-hidden relative w-[270px] sm:w-[320px] md:w-[380px]">
            <div 
              className="flex flex-col transition-transform duration-700 ease-in-out absolute top-0 left-0 w-full"
              style={{ transform: `translateY(-${activeIndex * 32}px)` }}
            >
              {FONTS.map((font) => (
                <div 
                  key={font.name} 
                  className="h-8 flex items-center justify-center w-full flex-shrink-0"
                >
                  <span className={`text-[16px] sm:text-base md:text-xl font-normal uppercase tracking-wider sm:tracking-[0.18em] ${selectedColor.text} ${font.class} transition-colors duration-300 whitespace-nowrap text-center`}>
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

        {/* View CV Button */}
        <div className="mt-8 sm:mt-10 select-none">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white dark:bg-black dark:text-white text-zinc-950 text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 shadow-md hover:shadow-xl active:scale-95 group cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-white  transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>View CV</span>
          </a>
        </div>

      </section>

      {/* 3.5. WHO AM I / THE PERSON BEHIND THIS MESS SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-24">
        
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
            
            <div className="flex flex-col gap-6">
              
              {/* Top Row: zsh Prompt & Stack */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-900 pb-4">
                
                {/* zsh Prompt */}
                <div className="flex items-center gap-2 select-none">
                  <span className="text-emerald-500">zaib@portfolio:~ %</span>
                  <span className="text-zinc-100 font-semibold">whoami --verbose</span>
                </div>

                {/* Tech Stack List */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold tracking-widest text-zinc-600 uppercase mr-1">
                    Stack:
                  </span>
                  
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

              {/* Console output and about detail */}
              <div className="flex flex-col gap-4 text-xs sm:text-sm">
                
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

      {/* 3.6. FEATURED PROJECTS CARDS SECTION */}
      <section id="projects" className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-20 -mt-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 select-none">
          <span className="text-xs font-regular tracking-[0.2em] text-zinc-500 uppercase">
            Featured Work
          </span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-zinc-950 mt-3 uppercase">
            Selected <br /> Projects
          </h2>
        </div>

        {/* Projects Cards Stack */}
        <div className="flex flex-col gap-10 sm:gap-10 select-none">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch select-none"
            >
              {/* Left Card: Details Panel (Order 2 on mobile, Order 1 on desktop) */}
              <div className="lg:col-span-5 bg-white dark:bg-rose-500/5 rounded-[28px] p-7 sm:p-9 flex flex-col justify-between order-2 lg:order-1">
                <div>
                  {/* Icon Badge */}
                  <div className={`w-12 h-12 rounded-xl ${project.iconBg} flex items-center justify-center text-white shadow-[0_8px_18px_rgba(255,80,40,0.3)] mb-6`}>
                    <svg className="w-7 h-7 text-white fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.8" strokeLinecap="round">
                      <line x1="12" y1="3" x2="12" y2="21" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="5.64" y1="5.64" x2="18.36" y2="18.36" />
                      <line x1="5.64" y1="18.36" x2="18.36" y2="5.64" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-[26px] font-medium text-zinc-900 dark:text-black tracking-tight mb-2.5 font-outfit">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-[15px] text-[#71717a] font-normal leading-relaxed mb-9">
                    {project.description}
                  </p>

                  {/* Metadata Rows */}
                  <div className="flex flex-col pt-2 mb-8">
                    <div className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-[#a1a1aa] font-normal">Client</span>
                      <span className="text-[#27272a] dark:text-black font-medium">{project.client}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 text-sm border-t border-zinc-200/80">
                      <span className="text-[#a1a1aa] font-normal">Date</span>
                      <span className="text-[#27272a] dark:text-black font-medium">{project.date}</span>
                    </div>
                  </div>
                </div>

                {/* CTA Action Button redirecting to Project Case Study */}
                <div>
                  <Link
                    href={`/projects/${project.id}`}
                    className="block w-full py-3.5 px-6 rounded-2xl bg-[#09090b] hover:bg-zinc-800 text-white font-medium text-sm transition-all duration-200 text-center shadow-md active:scale-98 cursor-pointer"
                  >
                    View Details
                  </Link>
                </div>
              </div>

              {/* Right Card: Black Frame Media Preview (Order 1 on mobile, Order 2 on desktop) */}
              <div className="lg:col-span-7 w-full min-h-[340px] sm:min-h-[420px] lg:min-h-[460px] bg-black rounded-[28px] overflow-hidden relative group flex items-center justify-center p-4 order-1 lg:order-2">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3.8. MY EXPERTISE SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-20 -mt-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 select-none">
          <span className="text-xs font-regular tracking-[0.2em] text-zinc-500 uppercase">
            MY EXPERTISE
          </span>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight text-zinc-950 mt-3 uppercase">
            DESIGNING WITH PURPOSE, <br /> BUILDING WITH PRECISION
          </h2>
        </div>

        {/* GitHub Contribution Activity Table */}
        <div className="w-full mb-10">
          <GitHubContributions />
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
                className="bg-[#2d2d30] hover:bg-[#1a1a1c] text-white text-sm sm:text-[15px] font-normal px-4 py-2 rounded-[10px] shadow-sm transition-all duration-200 cursor-default animate-in fade-in zoom-in-95 duration-200"
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

      {/* 3.9. CAREER JOURNEY SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-20 -mt-10">
        
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
      <Footer />

    </div>
  );
}
