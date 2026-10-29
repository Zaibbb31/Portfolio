import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "../../data/projects";
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
  const projectIndex = PROJECTS.findIndex((p) => p.id === slug);
  const project = PROJECTS[projectIndex];

  if (!project) {
    notFound();
  }

  // Next project for pagination
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  // Grid images fallback
  const gridImages = [
    ...(project.gridImages || []),
    project.image,
    project.heroImage || project.image,
    "/projects/quantum-ui.jpg",
    "/projects/noto-device.jpg",
  ].slice(0, 4);

  // Full-width banner image fallback
  const fullWidthImg = project.fullWidthImage || project.heroImage || project.image;

  // Object notes fallback
  const objectNotes = project.objectNotes || {
    heading: project.tagline || project.subtitle || "Architected with precision & focus",
    description: [
      project.description,
      project.challenge || "Designed from the ground up to solve complex workflows into minimal, tactile, and intuitive interactions.",
    ],
    specs: {
      productType: project.category,
      dimensions: "Responsive Web / Native",
      platform: project.meta.platform || "Web & Mobile",
      weight: "Sub-100ms Interaction Latency",
      deliverables: "Design System, UI/UX, Front-End Architecture",
      finish: "Dark-mode Precision Aesthetic",
      role: project.meta.role || "Product Designer & Developer",
      leadTime: "Immediate Availability",
      timeline: project.meta.timeline || project.date || "2025 – 2026",
      designer: "Zaib",
      client: project.client || "Independent Project",
      year: project.date || "2026",
    },
  };

  // Material & Method fallback
  const materialMethod = project.materialMethod || {
    heading: "Design Architecture & Engineering Method",
    materialsFinish: [
      "Custom tokenized typography system using Instrument Serif and Inter.",
      "High-contrast dark color palette engineered for readability and long sessions.",
      "Custom vector iconography and tactile card micro-interactions.",
      "Tested and verified against WCAG AAA contrast standards.",
    ],
    productionMethod: [
      "Next.js App Router architecture with optimized server-side asset delivery.",
      "Strict zero-latency UI interactions with hardware-accelerated animations.",
      "Responsive fluid layout spanning mobile through ultrawide displays.",
      "Iterative user feedback loops integrated through rapid prototyping.",
    ],
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-[#ededed] font-sans selection:bg-neutral-800 selection:text-white">
      {/* MAIN CONTAINER: exact max-w-4xl with vertical borders matching portfolio */}
      <main className="w-full max-w-4xl mx-auto border-x border-neutral-800/80 bg-[#000000] min-h-screen flex flex-col relative">
        
        {/* 1. TOP HEADER / NAVBAR (Flush within container borders) */}
        <header className="sticky top-0 z-40 w-full px-5 sm:px-8 py-3.5 flex items-center justify-between border-b border-neutral-800/80 bg-[#000000]/90 backdrop-blur-md select-none">
          

          {/* Center/Right Brand & Category Pill */}
          <div className="flex items-center gap-3">
            
            <Link
              href="/"
              className="flex items-center select-none group"
              aria-label="Home"
            >
              <div className="relative h-6 w-12 flex items-center">
                <Image
                  src="/logoblack.svg"
                  alt="Zaib Logo"
                  width={48}
                  height={24}
                  className="object-contain h-5 w-auto transition-transform duration-200 group-hover:scale-105"
                  priority
                />
              </div>
            </Link>
          </div>
        </header>

        {/* 2. TOP HERO SECTION (Split Studio Image & Details) */}
        <section className="relative w-full flex flex-col md:flex-row items-stretch border-b border-neutral-800/80 overflow-hidden bg-black">
          {/* Left Studio Image */}
          <div className="w-full md:w-[50%] relative min-h-[360px] sm:min-h-[460px] md:min-h-[500px] bg-neutral-950 md:border-r border-neutral-800/80 overflow-hidden group">
            <Image
              src={project.heroImage || project.image}
              alt={project.title}
              fill
              priority
              className="object-cover object-center transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 480px"
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Hero Details */}
          <div className="w-full md:w-[50%] p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-black">
            <div className="flex flex-col gap-4">
              {/* Breadcrumb & Production Status */}
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest">
                <span>{project.breadcrumb || `Projects / ${project.id}`}</span>
                
              </div>

              {/* Heading in Instrument Serif */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-instrument text-white leading-[1.08] tracking-tight mt-1">
                {project.title}
              </h1>

              {/* Tagline / Subtitle */}
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                {project.tagline || project.subtitle || project.description}
              </p>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-mono text-neutral-400 rounded-md bg-neutral-900 border border-neutral-800/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-neutral-800/80">
             

             

              <a
                href="mailto:zaib7@example.com?subject=Inquiry about "
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-neutral-800 hover:border-neutral-600 text-neutral-400 hover:text-white text-xs sm:text-sm font-medium transition-colors"
              >
                <span>Enquire</span>
              </a>
            </div>
          </div>
        </section>

        {/* 3. BENTO GRID - ROW 1 (2 Columns: Images 01 & 02) */}
        <section className="w-full border-b border-neutral-800/80 bg-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800/80">
            {gridImages.slice(0, 2).map((img, idx) => (
              <div
                key={idx}
                className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-950 group"
              >
                <Image
                  src={img}
                  alt={`${project.title} detail ${idx + 1}`}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, 480px"
                />
                {/* Index tag */}
                <div className="absolute top-3.5 left-3.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                  0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. FULL-WIDTH LANDSCAPE SHOWCASE (Positioned between both grid rows) */}
        <section className="relative w-full aspect-[16/9] sm:h-[420px] md:h-[480px] border-b border-neutral-800/80 overflow-hidden bg-neutral-950 group">
          <Image
            src={fullWidthImg}
            alt={`${project.title} full showcase`}
            fill
            className="object-cover object-center transition-transform duration-700 ease-out"
            sizes="(max-width: 1024px) 100vw, 896px"
          />  
        </section>

        {/* 5. BENTO GRID - ROW 2 (2 Columns: Images 03 & 04) */}
        <section className="w-full border-b border-neutral-800/80 bg-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-neutral-800/80">
            {gridImages.slice(2, 4).map((img, idx) => {
              const isReduced =
                idx === 0 ||
                img.toLowerCase().includes("diagram") ||
                img.toLowerCase().includes("flow");

              return (
                <div
                  key={idx + 2}
                  className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-950 group flex items-center justify-center"
                >
                  <Image
                    src={img}
                    alt={`${project.title} detail ${idx + 3}`}
                    fill
                    className={`object-center transition-transform duration-700 ease-out ${
                      isReduced ? "object-contain scale-[1.05]" : "object-cover"
                    }`}
                    sizes="(max-width: 640px) 100vw, 480px"
                  />
                  {/* Index tag */}
                  <div className="absolute top-3.5 left-3.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 z-10">
                    0{idx + 3}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. OBJECT NOTES / SPECIFICATIONS SECTION */}
        <section className="p-6 sm:p-10 border-b border-neutral-800/80 bg-black">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Heading & Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2 block">
                Object Notes
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal font-instrument text-white leading-tight mb-5">
                {objectNotes.heading}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
                {objectNotes.description.map((paragraph, pIdx) => {
                  if (paragraph === "THE PROBLEM I SOLVE" || paragraph.startsWith("THE PROBLEM")) {
                    return (
                      <h3
                        key={pIdx}
                        className="text-xs font-mono uppercase tracking-widest text-neutral-300 pt-3 block"
                      >
                        {paragraph}
                      </h3>
                    );
                  }
                  return <p key={pIdx}>{paragraph}</p>;
                })}
              </div>
            </div>

            {/* Right Column: Specifications Table */}
            <div className="lg:col-span-6">
              <div className="border border-neutral-800/80 rounded-xl overflow-hidden divide-y divide-neutral-800/80 bg-neutral-950/40 text-xs sm:text-sm">
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                  <span className="text-neutral-500 font-mono">Product Type</span>
                  <span className="text-white font-medium text-right">{objectNotes.specs.productType}</span>
                </div>
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                  <span className="text-neutral-500 font-mono">Platform</span>
                  <span className="text-white font-medium text-right">{objectNotes.specs.platform}</span>
                </div>
                {objectNotes.specs.deliverables && (
                  <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <span className="text-neutral-500 font-mono">Deliverables</span>
                    <span className="text-white font-medium text-right ml-4 max-w-[65%]">
                      {objectNotes.specs.deliverables}
                    </span>
                  </div>
                )}
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                  <span className="text-neutral-500 font-mono">Role</span>
                  <span className="text-white font-medium text-right">{objectNotes.specs.role}</span>
                </div>
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                  <span className="text-neutral-500 font-mono">Timeline</span>
                  <span className="text-white font-medium text-right">{objectNotes.specs.timeline}</span>
                </div>
                {objectNotes.specs.projectType && (
                  <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <span className="text-neutral-500 font-mono">Project Type</span>
                    <span className="text-white font-medium text-right">{objectNotes.specs.projectType}</span>
                  </div>
                )}
                {objectNotes.specs.client && !objectNotes.specs.projectType && (
                  <div className="p-3.5 sm:p-4 flex items-center justify-between">
                    <span className="text-neutral-500 font-mono">Client</span>
                    <span className="text-white font-medium text-right">{objectNotes.specs.client}</span>
                  </div>
                )}
                <div className="p-3.5 sm:p-4 flex items-center justify-between">
                  <span className="text-neutral-500 font-mono">Year</span>
                  <span className="text-white font-medium text-right">{objectNotes.specs.year}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. MATERIAL / METHOD SECTION */}
        <section className="p-6 sm:p-10 border-b border-neutral-800/80 bg-black">
          <div className="flex flex-col gap-6">
            <div className="border-b border-neutral-800/80 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1 block">
                Design &amp; Execution
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal font-instrument text-white leading-tight">
                {materialMethod.heading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-2">
              {/* Materials & Finish */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  Materials &amp; Finish
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {materialMethod.materialsFinish.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-neutral-600 font-mono mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Production Method */}
              <div className="flex flex-col gap-4">
                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  Production Method
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {materialMethod.productionMethod.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-neutral-600 font-mono mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 7. DETAILED SCREENS SECTION (IF SCREEN REDESIGNS EXIST, E.G. AMA CONNECT / DRODRO) */}
        {project.screens && project.screens.length > 0 && (
          <section className="p-6 sm:p-10 border-b border-neutral-800/80 bg-black flex flex-col gap-12">
            <div className="border-b border-neutral-800/80 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-1 block">
                Screen Analysis &amp; Redesigns
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal font-instrument text-white leading-tight">
                Iterative Screen Breakdown
              </h2>
            </div>

            <div className="flex flex-col gap-12">
              {project.screens.map((screen, idx) => (
                <div key={idx} className="flex flex-col gap-5 border border-neutral-800/80 rounded-2xl overflow-hidden bg-neutral-950/60 p-5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-normal font-instrument text-white">
                      {screen.title}
                    </h3>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                      Screen 0{idx + 1}
                    </span>
                  </div>

                  {/* Screen Frame */}
                  <div className="relative w-full aspect-[16/10] sm:h-[440px] rounded-xl overflow-hidden bg-black border border-neutral-800 flex items-center justify-center">
                    <Image
                      src={screen.image}
                      alt={screen.title}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {screen.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t border-neutral-800/80">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-rose-400">
                        UX Friction Identified
                      </span>
                      <ul className="space-y-1.5 text-xs text-neutral-400">
                        {screen.flaws?.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <span className="text-rose-500 mt-0.5">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                        Solution Implemented
                      </span>
                      <ul className="space-y-1.5 text-xs text-neutral-400">
                        {screen.improvements?.map((imp, iIdx) => (
                          <li key={iIdx} className="flex items-start gap-2">
                            <span className="text-emerald-500 mt-0.5">•</span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. NEXT PROJECT & ENQUIRE CTA SECTION */}
        <section className="p-6 sm:p-10 border-b border-neutral-800/80 bg-black flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-1 text-center sm:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">
              Next Up
            </span>
            <Link
              href={`/projects/${nextProject.id}`}
              className="text-2xl sm:text-3xl font-normal font-instrument text-white hover:text-neutral-300 transition-colors inline-flex items-center gap-2 group"
            >
              <span>{nextProject.title}</span>
              <span className="text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-1 font-sans text-xl">
                →
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#projects"
              className="px-4 py-2 rounded-full border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white text-xs sm:text-sm font-medium transition-colors"
            >
              All Projects
            </Link>
            <a
              href="mailto:zaib7@example.com?subject=Project Inquiry"
              className="px-4 py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95"
            >
              Book Consultation
            </a>
          </div>
        </section>

        {/* 9. EXACT FOOTER MATCHING HOMEPAGE */}
        <Footer />
      </main>
    </div>
  );
}
