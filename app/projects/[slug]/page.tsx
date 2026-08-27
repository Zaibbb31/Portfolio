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

      {/* 3. Main Content Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-16">
        
        {/* Back Link Breadcrumb */}
        <div className="mb-6 select-none">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-zinc-500 hover:text-rose-500 transition-colors uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-12 select-none">
          <span className="text-xs font-regular tracking-[0.2em] text-zinc-500 uppercase">
            Case Study &amp; Overview
          </span>
          <h1 className="text-4xl sm:text-6xl font-medium tracking-tight text-zinc-950 font-outfit uppercase">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl font-normal mt-1">
            {project.subtitle || project.description}
          </p>
        </div>

        {/* Hero Media Banner */}
        <div className="relative w-full h-[320px] sm:h-[440px] md:h-[520px] bg-black rounded-3xl overflow-hidden border border-zinc-200/80 mb-16 shadow-xl">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-contain sm:object-cover"
            priority
          />
        </div>

        {/* Two-Column Facts & Challenge/Results */}
        <div className="w-full bg-white border border-zinc-200/80 rounded-3xl p-7 sm:p-10 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14">
          
          {/* Left Column: Quick Facts Metadata */}
          <div className="md:col-span-4 flex flex-col gap-6 text-sm border-b md:border-b-0 md:border-r border-zinc-100 pb-6 md:pb-0 md:pr-6 select-none">
            {project.meta.headquarters && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-500 font-semibold block mb-1">
                  Headquarters
                </span>
                <span className="text-zinc-800 font-medium">{project.meta.headquarters}</span>
              </div>
            )}

            {project.meta.founded && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-500 font-semibold block mb-1">
                  Founded
                </span>
                <span className="text-zinc-800 font-medium">{project.meta.founded}</span>
              </div>
            )}

            {project.meta.industry && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-500 font-semibold block mb-1">
                  Industry
                </span>
                <span className="text-zinc-800 font-medium">{project.meta.industry}</span>
              </div>
            )}

            {project.meta.role && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-500 font-semibold block mb-1">
                  Role
                </span>
                <span className="text-zinc-800 font-medium">{project.meta.role}</span>
              </div>
            )}

            {project.meta.timeline && (
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-500 font-semibold block mb-1">
                  Timeline
                </span>
                <span className="text-zinc-800 font-medium">{project.meta.timeline}</span>
              </div>
            )}
          </div>

          {/* Right Column: Challenge & Results */}
          <div className="md:col-span-8 flex flex-col gap-10">
            <div>
              <span className="text-xs font-mono font-semibold tracking-wider text-rose-500 uppercase block mb-1">
                The Problem
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 tracking-tight mb-3 font-outfit uppercase">
                Challenge
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                {project.challenge}
              </p>
            </div>

            <div>
              <span className="text-xs font-mono font-semibold tracking-wider text-rose-500 uppercase block mb-1">
                The Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 tracking-tight mb-3 font-outfit uppercase">
                Results
              </h2>
              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
                {project.results}
              </p>
            </div>
          </div>

        </div>

        {/* Three Big Metrics Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14 select-none">
          {project.metrics.map((metric, i) => (
            <div
              key={i}
              className="flex flex-col p-7 rounded-3xl bg-white border border-zinc-200/80 shadow-xs hover:border-zinc-300 transition-colors"
            >
              <span className="text-4xl sm:text-5xl font-semibold text-rose-500 tracking-tight font-outfit mb-2">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm text-zinc-600 leading-normal font-medium">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Dual Visual Gallery Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {project.gallery.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full h-[260px] sm:h-[320px] bg-black rounded-3xl overflow-hidden border border-zinc-200/80 shadow-md group"
            >
              <Image
                src={img}
                alt={`${project.title} gallery asset ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="w-full bg-white border border-zinc-200/80 rounded-3xl p-7 sm:p-10 shadow-xs flex flex-col gap-6 mb-16">
          <div className="select-none">
            <span className="text-xs font-mono font-semibold tracking-wider text-rose-500 uppercase block mb-1">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-medium text-zinc-950 tracking-tight font-outfit uppercase">
              Process &amp; Execution
            </h2>
          </div>

          <div className="flex flex-col gap-6 text-sm sm:text-base leading-relaxed text-zinc-600">
            {project.process.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1 border-t border-zinc-100 pt-4 first:border-0 first:pt-0">
                <span className="font-semibold text-zinc-950 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  {item.step}
                </span>
                <p className="text-zinc-600 pl-4">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* 4. Footer from Homepage */}
      <Footer />

      {/* 5. Floating Bottom Center "Back to Base" Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 select-none">
        <Link
          href="/"
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
