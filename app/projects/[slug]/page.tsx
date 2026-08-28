import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "../../data/projects";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectSlugPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#ffffff] text-zinc-950 font-sans transition-colors duration-500 selection:bg-rose-500 selection:text-white">
      
      {/* 1. Navbar from Homepage */}
      <Navbar />

      {/* 2. Subtle Grid Background Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* 3. Main Case Study Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-28">
        
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-8 select-none">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 hover:text-rose-500 transition-colors uppercase tracking-wider group"
          >
            <span className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-rose-50 transition-colors">
              <svg className="w-3.5 h-3.5 text-zinc-600 group-hover:text-rose-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span>Back to All Projects</span>
          </Link>

          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-rose-500 font-semibold px-3 py-1 bg-rose-50/80 rounded-full border border-rose-100">
            {project.category}
          </span>
        </div>

        {/* Project Header Title & Overview */}
        <div className="flex flex-col gap-5 mb-12">
          {project.logo && (
            <div className="relative w-44 h-12">
              <Image
                src={project.logo}
                alt={`${project.title} logo`}
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-zinc-950 font-outfit uppercase leading-[1.05]">
            {project.title}
          </h1>
          
          <p className="text-base sm:text-xl text-zinc-600 leading-relaxed max-w-3xl font-normal">
            {project.subtitle || project.description}
          </p>
        </div>

        {/* Project Metadata Strip (Editorial Table) */}
        {(!project.screens || project.screens.length === 0) && (
          <div className="w-full bg-[#fbfbfb] border border-zinc-200/80 rounded-2xl p-5 sm:p-7 grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14 select-none">
            {project.client && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold block mb-1.5">
                  Client
                </span>
                <span className="text-sm font-semibold text-zinc-900">{project.client}</span>
              </div>
            )}

            {project.meta?.role && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold block mb-1.5">
                  Role
                </span>
                <span className="text-sm font-semibold text-zinc-900">{project.meta.role}</span>
              </div>
            )}

            {project.meta?.focus && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold block mb-1.5">
                  Focus
                </span>
                <span className="text-sm font-semibold text-zinc-900">{project.meta.focus}</span>
              </div>
            )}

            {project.date && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold block mb-1.5">
                  Timeline
                </span>
                <span className="text-sm font-semibold text-zinc-900">{project.date}</span>
              </div>
            )}
          </div>
        )}

        {!project.screens || project.screens.length === 0 ? (
          <>
            {/* Hero Showcase Preview Frame */}
            <div className="relative w-full h-[340px] sm:h-[480px] md:h-[580px] bg-zinc-950 rounded-[32px] overflow-hidden border border-zinc-200/80 mb-20 shadow-xl flex items-center justify-center">
              {project.mobileImage ? (
                <>
                  <div className="block md:hidden absolute inset-0">
                    <Image
                      src={project.mobileImage}
                      alt={project.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="hidden md:block absolute inset-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="1024px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </>
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                  priority
                />
              )}
            </div>

            {/* ======================================================== */}
            {/* SECTION 01: THE CHALLENGE (SPLIT EDITORIAL LAYOUT) */}
            {/* ======================================================== */}
            <section className="w-full border-t border-zinc-200/80 pt-12 pb-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4 select-none">
                <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-2">
                  01 / The Challenge
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-outfit uppercase tracking-tight">
                  Context &amp; Obstacles
                </h2>
              </div>

              <div className="md:col-span-8 flex flex-col gap-4">
                <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
                  {project.challenge}
                </p>
              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 02: DESIGN GOALS */}
            {/* ======================================================== */}
            {project.designGoals && project.designGoals.length > 0 && (
              <section className="w-full border-t border-zinc-200/80 pt-12 pb-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4 select-none">
                  <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-2">
                    02 / Objectives
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-outfit uppercase tracking-tight">
                    Design Goals
                  </h2>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.designGoals.map((goal, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-[#fafafa] border border-zinc-200/60 hover:border-zinc-300 transition-colors select-none"
                    >
                      <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-zinc-800">{goal}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* SECTION 03: KEY UX IMPROVEMENTS */}
            {/* ======================================================== */}
            {project.keyImprovements && project.keyImprovements.length > 0 && (
              <section className="w-full border-t border-zinc-200/80 pt-12 pb-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4 select-none">
                  <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-2">
                    03 / Enhancements
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-outfit uppercase tracking-tight">
                    Key UX Improvements
                  </h2>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.keyImprovements.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs flex flex-col justify-between hover:border-zinc-400 transition-all hover:shadow-sm"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3 select-none">
                          <span className="text-xs font-mono font-extrabold text-rose-500 tracking-wider">
                            {item.num}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        </div>
                        <h3 className="text-base font-semibold text-zinc-950 mb-2 font-outfit">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* SECTION 04: INFORMATION ARCHITECTURE */}
            {/* ======================================================== */}
            {project.informationArchitecture && project.informationArchitecture.length > 0 && (
              <section className="w-full border-t border-zinc-200/80 pt-12 pb-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4 select-none">
                  <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-2">
                    04 / User Journey
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-outfit uppercase tracking-tight">
                    Information Architecture
                  </h2>
                </div>

                <div className="md:col-span-8 flex flex-wrap items-center gap-2 sm:gap-3">
                  {project.informationArchitecture.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 sm:gap-3 select-none">
                      <div className="px-4 py-2.5 rounded-xl bg-zinc-950 text-white text-xs sm:text-sm font-medium font-mono shadow-sm">
                        {step}
                      </div>
                      {idx < (project.informationArchitecture?.length ?? 0) - 1 && (
                        <span className="text-rose-500 font-bold text-base">→</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* SECTION 05: VISUAL & INTERACTION DESIGN */}
            {/* ======================================================== */}
            {project.visualDesignPoints && project.visualDesignPoints.length > 0 && (
              <section className="w-full border-t border-zinc-200/80 pt-12 pb-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4 select-none">
                  <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-2">
                    05 / Visual System
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-outfit uppercase tracking-tight">
                    Visual &amp; Interaction Design
                  </h2>
                </div>

                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {project.visualDesignPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-[#fafafa] border border-zinc-200/60 select-none"
                    >
                      <div className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-800">{point}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ======================================================== */}
            {/* UX PRINCIPLE STATEMENT BANNER */}
            {/* ======================================================== */}
            {project.uxPrinciple && (
              <div className="w-full bg-gradient-to-br from-zinc-950 via-[#121215] to-zinc-950 border border-zinc-800 rounded-[28px] p-8 sm:p-14 text-center text-white my-8 shadow-2xl select-none">
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-rose-500 uppercase block mb-4">
                  Core UX Principle
                </span>
                <blockquote className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight font-outfit text-white leading-tight">
                  “{project.uxPrinciple}”
                </blockquote>
              </div>
            )}

            {/* ======================================================== */}
            {/* SECTION 06: OUTCOME & RESULTS */}
            {/* ======================================================== */}
            <section className="w-full border-t border-zinc-200/80 pt-12 pb-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
              <div className="md:col-span-4 select-none">
                <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-2">
                  06 / The Impact
                </span>
                <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-outfit uppercase tracking-tight">
                  Outcome &amp; Results
                </h2>
              </div>

              <div className="md:col-span-8 flex flex-col gap-8">
                <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
                  {project.outcome || project.results}
                </p>

                {/* Impact Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 select-none">
                  {project.metrics.map((metric, i) => (
                    <div
                      key={i}
                      className="flex flex-col p-6 rounded-2xl bg-white border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-colors"
                    >
                      <span className="text-3xl sm:text-4xl font-semibold text-rose-500 tracking-tight font-outfit mb-1.5">
                        {metric.value}
                      </span>
                      <span className="text-xs text-zinc-600 leading-normal font-medium">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PROCESS & EXECUTION METHODOLOGY */}
            {project.process && project.process.length > 0 && (
              <section className="w-full border-t border-zinc-200/80 pt-12 pb-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                <div className="md:col-span-4 select-none">
                  <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-2">
                    Methodology
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-outfit uppercase tracking-tight">
                    Process &amp; Execution
                  </h2>
                </div>

                <div className="md:col-span-8 flex flex-col gap-6">
                  {project.process.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1.5 border-b border-zinc-100 pb-5 last:border-0 last:pb-0">
                      <span className="font-semibold text-zinc-950 flex items-center gap-2.5 font-outfit text-base">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        {item.step}
                      </span>
                      <p className="text-sm sm:text-base text-zinc-600 pl-4 leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <div className="mt-16 flex flex-col gap-24">
            {project.screens.map((screen, idx) => (
              <section key={idx} className="w-full flex flex-col gap-6">
                {/* Upper Heading */}
                <h3 className="text-2xl sm:text-3xl font-medium text-zinc-950 font-outfit uppercase tracking-tight">
                  {screen.title}
                </h3>
                
                {/* Image on Top, Details Below Layout */}
                <div className="flex flex-col gap-6 w-full">
                  {/* Top Image Card */}
                  <div className="w-full h-[350px] sm:h-[550px] md:h-[700px] flex items-center justify-center rounded-[32px] overflow-hidden border border-rose-500 bg-[#fbfbfb]/5 relative">
                    <Image
                      src={screen.image}
                      alt={screen.title}
                      fill
                      className="object-contain p-6 md:p-8"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                      priority={idx < 2}
                    />
                  </div>

                  {/* Bottom Content Card */}
                  <div className="w-full bg-[#faf5f6] border border-rose-100/40 rounded-[32px] p-8 sm:p-10 flex flex-col justify-center">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest py-1 rounded-full">
                          Screen {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                        </span>
                      </div>
                      
                      <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
                        {screen.description}
                      </p>

                      <div className="border-t border-rose-200/30 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Left Column: UX Flaws I Saw */}
                          <div className="flex flex-col gap-4">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-500">
                              UX Flaws I Saw
                            </h4>
                            <ul className="flex flex-col gap-3">
                              {screen.flaws && screen.flaws.map((flaw, fIdx) => (
                                <li
                                  key={fIdx}
                                  className="flex items-start gap-2.5 text-sm text-zinc-600 font-medium select-none animate-fade-in"
                                >
                                  <svg className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  <span>{flaw}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Right Column: What I Did Better */}
                          <div className="flex flex-col gap-4 border-t md:border-t-0 md:border-l border-rose-200/20 pt-6 md:pt-0 md:pl-8">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-600">
                              What I Did Better
                            </h4>
                            <ul className="flex flex-col gap-3">
                              {screen.improvements && screen.improvements.map((imp, iIdx) => (
                                <li
                                  key={iIdx}
                                  className="flex items-start gap-2.5 text-sm text-zinc-700 font-medium select-none animate-fade-in"
                                >
                                  <svg className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>{imp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}

      </main>

      {/* 4. Footer from Homepage */}
      <Footer />

      {/* 5. Floating Bottom Center "Back to Base" Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2.5 bg-zinc-950/90 dark:bg-black/85 backdrop-blur-md border border-white/20 hover:border-white/40 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 tracking-wide group"
        >
          <div className="relative w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
            <Image
              src="/2785693.png"
              alt="Base Beacon"
              fill
              sizes="20px"
              className="object-contain"
            />
          </div>
          <span>Back to Base</span>
        </Link>
      </div>

    </div>
  );
}
