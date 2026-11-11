"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  className: string;
  size: "1080x1920" | "1080x1080" | "1080x1350" | "1350x1080" | "1920x1080";
  sizeLabel: string;
  title: string;
  category: string;
}

// 6 columns x 4 items = 24 curated assets exclusively from this project
// Every column sums to exactly 1380px on desktop and 966px on mobile
// Symmetrical gaps: 16px desktop (12px mobile) horizontally & vertically everywhere
const baseColumns: GalleryItem[][] = [
  // Column 1
  [
    {
      id: "col1-1",
      src: "/Settlr.png",
      alt: "Settlr Brutalist Glyph",
      title: "Settlr Emblem",
      size: "1080x1080",
      sizeLabel: "1080 × 1080 (1:1)",
      category: "Brand",
      className: "h-[238px] sm:h-[340px]",
    },
    {
      id: "col1-2",
      src: "/projects/New folder/Whatsaap_Media.svg",
      alt: "WhatsApp Media Workspace",
      title: "Media Distribution Frame",
      size: "1350x1080",
      sizeLabel: "1350 × 1080 (5:4)",
      category: "Experiment",
      className: "h-[190px] sm:h-[272px]",
    },
    {
      id: "col1-3",
      src: "/ama-connect.jpg",
      alt: "AMA Connect Legal Suite",
      title: "AMA Connect Suite",
      size: "1080x1350",
      sizeLabel: "1080 × 1350 (4:5)",
      category: "Poster",
      className: "h-[297px] sm:h-[425px]",
    },
    {
      id: "col1-4",
      src: "/atom.png",
      alt: "Atomic System Nucleus",
      title: "Atomic Design System",
      size: "1080x1080",
      sizeLabel: "1080 × 1080 (1:1)",
      category: "Brand",
      className: "h-[241px] sm:h-[343px]",
    },
  ],
  // Column 2
  [
    {
      id: "col2-1",
      src: "/Cinematic AI Workspace Website Mockup.png",
      alt: "Cinematic AI Workspace",
      title: "Cinematic AI Workspace",
      size: "1920x1080",
      sizeLabel: "1920 × 1080 (16:9)",
      category: "Banner",
      className: "h-[134px] sm:h-[191px]",
    },
    {
      id: "col2-2",
      src: "/settlr/Warm Credit Score Smartphone Display.png",
      alt: "Credit Engine Mobile UI",
      title: "Credit Engine Reel UI",
      size: "1080x1920",
      sizeLabel: "1080 × 1920 (9:16)",
      category: "Motion",
      className: "h-[422px] sm:h-[604px]",
    },
    {
      id: "col2-3",
      src: "/Modern Workspace Showcasing Live Designs.png",
      alt: "Live Workspace Showcase",
      title: "Modern Live Workspace",
      size: "1920x1080",
      sizeLabel: "1920 × 1080 (16:9)",
      category: "Banner",
      className: "h-[134px] sm:h-[191px]",
    },
    {
      id: "col2-4",
      src: "/projects/New folder/Airtel_Homepage.svg",
      alt: "Airtel Digital Portal",
      title: "Airtel Interaction Blueprint",
      size: "1080x1350",
      sizeLabel: "1080 × 1350 (4:5)",
      category: "Poster",
      className: "h-[276px] sm:h-[394px]",
    },
  ],
  // Column 3
  [
    {
      id: "col3-1",
      src: "/settlr/1.png",
      alt: "Settlr Mobile Flow",
      title: "Tactile Flow State",
      size: "1080x1350",
      sizeLabel: "1080 × 1350 (4:5)",
      category: "Poster",
      className: "h-[297px] sm:h-[425px]",
    },
    {
      id: "col3-2",
      src: "/settlr/2 (2).png",
      alt: "Settlr Split Analytics",
      title: "Dual Perspective Flow",
      size: "1350x1080",
      sizeLabel: "1350 × 1080 (5:4)",
      category: "Experiment",
      className: "h-[189px] sm:h-[270px]",
    },
    {
      id: "col3-3",
      src: "/settlr/12.png",
      alt: "Settlr Transactions Interface",
      title: "Financial Telemetry",
      size: "1080x1350",
      sizeLabel: "1080 × 1350 (4:5)",
      category: "Poster",
      className: "h-[297px] sm:h-[425px]",
    },
    {
      id: "col3-4",
      src: "/projects/New folder/Paytm_Balance.svg",
      alt: "Paytm Balance Flow",
      title: "Paytm Quick Interaction",
      size: "1350x1080",
      sizeLabel: "1350 × 1080 (5:4)",
      category: "Experiment",
      className: "h-[183px] sm:h-[260px]",
    },
  ],
  // Column 4
  [
    {
      id: "col4-1",
      src: "/Warm Minimalist Workspace Mockup.png",
      alt: "Minimalist Workspace Canvas",
      title: "Warm Minimalist Canvas",
      size: "1920x1080",
      sizeLabel: "1920 × 1080 (16:9)",
      category: "Banner",
      className: "h-[134px] sm:h-[191px]",
    },
    {
      id: "col4-2",
      src: "/projects/New folder/Shopify_Liked.svg",
      alt: "Shopify Micro-Interactions",
      title: "Shopify Motion Fragment",
      size: "1080x1080",
      sizeLabel: "1080 × 1080 (1:1)",
      category: "Brand",
      className: "h-[238px] sm:h-[340px]",
    },
    {
      id: "col4-3",
      src: "/projects/New folder/INSTA_REELS.svg",
      alt: "Insta Reels Framework",
      title: "Stories & Reels Experience",
      size: "1080x1920",
      sizeLabel: "1080 × 1920 (9:16)",
      category: "Motion",
      className: "h-[422px] sm:h-[604px]",
    },
    {
      id: "col4-4",
      src: "/projects/New folder/Railone_Search.svg",
      alt: "RailOne Search Engine",
      title: "RailOne Route System",
      size: "1350x1080",
      sizeLabel: "1350 × 1080 (5:4)",
      category: "Experiment",
      className: "h-[172px] sm:h-[245px]",
    },
  ],
  // Column 5
  [
    {
      id: "col5-1",
      src: "/Pixel Hands Workspace Showcase.png",
      alt: "Pixel Hands Interactive Banner",
      title: "Pixel Hands Landscape",
      size: "1920x1080",
      sizeLabel: "1920 × 1080 (16:9)",
      category: "Banner",
      className: "h-[134px] sm:h-[191px]",
    },
    {
      id: "col5-2",
      src: "/projects/noto-cafe.jpg",
      alt: "Noto Cafe Branding",
      title: "Noto Cafe Visual Identity",
      size: "1080x1350",
      sizeLabel: "1080 × 1350 (4:5)",
      category: "Poster",
      className: "h-[297px] sm:h-[425px]",
    },
    {
      id: "col5-3",
      src: "/settlr/hero.png",
      alt: "Settlr Hero Dark Card",
      title: "Settlr Interface Core",
      size: "1080x1080",
      sizeLabel: "1080 × 1080 (1:1)",
      category: "Brand",
      className: "h-[238px] sm:h-[340px]",
    },
    {
      id: "col5-4",
      src: "/projects/New folder/IRCTC_BETAV.svg",
      alt: "IRCTC Modern Flow",
      title: "IRCTC Booking Engine",
      size: "1080x1350",
      sizeLabel: "1080 × 1350 (4:5)",
      category: "Poster",
      className: "h-[297px] sm:h-[424px]",
    },
  ],
  // Column 6
  [
    {
      id: "col6-1",
      src: "/Warm Office Administrator Sign-In Scene.png",
      alt: "Office Administrator Scene",
      title: "Admin Operations Suite",
      size: "1920x1080",
      sizeLabel: "1920 × 1080 (16:9)",
      category: "Banner",
      className: "h-[134px] sm:h-[191px]",
    },
    {
      id: "col6-2",
      src: "/settlr/landscape.jpg",
      alt: "Settlr Landscape Overview",
      title: "Financial Panoramic View",
      size: "1350x1080",
      sizeLabel: "1350 × 1080 (5:4)",
      category: "Experiment",
      className: "h-[190px] sm:h-[272px]",
    },
    {
      id: "col6-3",
      src: "/Emmanuel Mission School Login Workspace.png",
      alt: "Emmanuel Mission School Workspace",
      title: "SchoolDash Administrator",
      size: "1080x1080",
      sizeLabel: "1080 × 1080 (1:1)",
      category: "Brand",
      className: "h-[219px] sm:h-[313px]",
    },
    {
      id: "col6-4",
      src: "/settlr/Settlr Finance App UX Flowchart.png",
      alt: "Financial Architecture Map",
      title: "UX Architecture Map",
      size: "1080x1920",
      sizeLabel: "1080 × 1920 (9:16)",
      category: "Motion",
      className: "h-[422px] sm:h-[604px]",
    },
  ],
];

// 3x3 repetition of base grid columns for endless seamless 2D tiling
const tileOffsets = [
  { xIndex: -1, yIndex: -1 },
  { xIndex: 0, yIndex: -1 },
  { xIndex: 1, yIndex: -1 },
  { xIndex: -1, yIndex: 0 },
  { xIndex: 0, yIndex: 0 },
  { xIndex: 1, yIndex: 0 },
  { xIndex: -1, yIndex: 1 },
  { xIndex: 0, yIndex: 1 },
  { xIndex: 1, yIndex: 1 },
];

export default function TheMessPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fullscreenCanvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [isMobileFullscreen, setIsMobileFullscreen] = useState(false);

  // Dimensions ref: desktop gap = 16px, mobile gap = 12px
  // blockHeight includes 4 gaps so inter-tile distance is identically 16px / 12px
  const dimensionsRef = useRef({
    colWidth: 340,
    gap: 16,
    blockWidth: baseColumns.length * (340 + 16),
    blockHeight: 1380 + 4 * 16, // 1444px
    isMobile: false,
  });

  // Track responsive screen resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      const colW = mobile ? 238 : 340;
      const g = mobile ? 12 : 16;
      dimensionsRef.current = {
        colWidth: colW,
        gap: g,
        blockWidth: baseColumns.length * (colW + g),
        blockHeight: mobile ? 966 + 4 * 12 : 1380 + 4 * 16,
        isMobile: mobile,
      };
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Physics animation references for smooth glide & ambient drift in any direction
  const targetPos = useRef({ x: -180, y: -120 });
  const currentPos = useRef({ x: -180, y: -120 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPointer = useRef({ x: 0, y: 0, time: 0 });
  const isDraggingRef = useRef(false);
  const driftTime = useRef(0);

  // Lock body scroll when mobile fullscreen gallery is open
  useEffect(() => {
    if (isMobileFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileFullscreen]);

  // 60/120fps Automatic Multi-Directional Floating & Drag Physics Loop
  useEffect(() => {
    let animationFrameId: number;

    const animateLoop = () => {
      const { blockWidth, blockHeight } = dimensionsRef.current;

      if (!isDraggingRef.current) {
        // Continuous organic multi-directional ambient drift
        driftTime.current += 0.0035;
        const autoDriftX =
          Math.cos(driftTime.current * 0.75) * 0.45 -
          Math.sin(driftTime.current * 0.35) * 0.4 -
          0.38;
        const autoDriftY =
          Math.sin(driftTime.current * 0.55) * 0.38 +
          Math.cos(driftTime.current * 0.45) * 0.3 -
          0.22;

        targetPos.current.x += velocity.current.x + autoDriftX;
        targetPos.current.y += velocity.current.y + autoDriftY;

        // Inertia momentum decay
        velocity.current.x *= 0.955;
        velocity.current.y *= 0.955;

        if (Math.abs(velocity.current.x) < 0.02) velocity.current.x = 0;
        if (Math.abs(velocity.current.y) < 0.02) velocity.current.y = 0;
      }

      // Smooth LERP interpolation
      const lerpFactor = isDraggingRef.current ? 0.38 : 0.12;
      currentPos.current.x +=
        (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y +=
        (targetPos.current.y - currentPos.current.y) * lerpFactor;

      // Infinite modulo toroidal wrap in both X and Y directions
      const wrappedX =
        ((((currentPos.current.x % blockWidth) - blockWidth) % blockWidth) +
          blockWidth) %
          blockWidth -
        blockWidth;
      const wrappedY =
        ((((currentPos.current.y % blockHeight) - blockHeight) %
          blockHeight) +
          blockHeight) %
          blockHeight -
        blockHeight;

      if (canvasRef.current) {
        canvasRef.current.style.transform = `translate3d(${wrappedX}px, ${wrappedY}px, 0px)`;
      }
      if (fullscreenCanvasRef.current) {
        fullscreenCanvasRef.current.style.transform = `translate3d(${wrappedX}px, ${wrappedY}px, 0px)`;
      }

      animationFrameId = requestAnimationFrame(animateLoop);
    };

    animationFrameId = requestAnimationFrame(animateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Desktop Mouse Handlers (Enables dragging anywhere across images or background in any direction)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault(); // Prevents native browser image ghosting and text selection
    isDraggingRef.current = true;
    setIsDragging(true);
    setHasDragged(false);
    lastPointer.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };
    velocity.current = { x: 0, y: 0 };
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastPointer.current.time, 10);
    const dx = e.clientX - lastPointer.current.x;
    const dy = e.clientY - lastPointer.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      setHasDragged(true);
    }

    targetPos.current.x += dx;
    targetPos.current.y += dy;

    // Multi-directional flick velocity
    const speedX = (dx / dt) * 16;
    const speedY = (dy / dt) * 16;
    velocity.current = {
      x: Math.max(Math.min(speedX, 35), -35),
      y: Math.max(Math.min(speedY, 35), -35),
    };

    lastPointer.current = { x: e.clientX, y: e.clientY, time: now };
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  // Mobile Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      setIsDragging(true);
      setHasDragged(false);
      lastPointer.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: performance.now(),
      };
      velocity.current = { x: 0, y: 0 };
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const now = performance.now();
    const dt = Math.max(now - lastPointer.current.time, 10);
    const dx = e.touches[0].clientX - lastPointer.current.x;
    const dy = e.touches[0].clientY - lastPointer.current.y;

    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      setHasDragged(true);
    }

    targetPos.current.x += dx;
    targetPos.current.y += dy;

    const speedX = (dx / dt) * 16;
    const speedY = (dy / dt) * 16;
    velocity.current = {
      x: Math.max(Math.min(speedX, 35), -35),
      y: Math.max(Math.min(speedY, 35), -35),
    };

    lastPointer.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: now,
    };
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  // Global listeners for uninterrupted drag & flick in any direction
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  // Click on section handler for Mobile to open full screen of this section
  const handleSectionClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      if (!hasDragged) {
        setIsMobileFullscreen(true);
      }
    }
  };

  // Reusable Gallery Grid Elements with perfectly symmetric gaps horizontally & vertically
  const renderGridContent = () =>
    tileOffsets.map((offset) => (
      <div
        key={`${offset.xIndex}-${offset.yIndex}`}
        className="absolute flex gap-3 sm:gap-4 pointer-events-none"
        style={{
          left: `${(offset.xIndex + 1) * dimensionsRef.current.blockWidth}px`,
          top: `${(offset.yIndex + 1) * dimensionsRef.current.blockHeight}px`,
          width: `${dimensionsRef.current.blockWidth}px`,
          height: `${dimensionsRef.current.blockHeight}px`,
        }}
      >
        {baseColumns.map((col, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col gap-3 sm:gap-4 w-[238px] sm:w-[340px] flex-shrink-0"
          >
            {col.map((item) => (
              <div
                key={`${offset.xIndex}-${offset.yIndex}-${item.id}`}
                className={`relative w-full ${item.className} overflow-hidden rounded-xl bg-neutral-950 border border-neutral-800/80 shadow-2xl transition-all duration-300 hover:border-neutral-500 group select-none pointer-events-auto ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 238px, 340px"
                  draggable={false}
                  className="object-cover object-center pointer-events-none select-none transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Dimension Pill (top-right) */}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-300 z-10 select-none pointer-events-none">
                  {item.size.replace("x", " × ")}
                </div>

                {/* Subtle Hover Meta Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4 flex flex-col justify-end gap-1 z-20 pointer-events-none select-none">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    {item.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-normal font-instrument text-white leading-tight">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ));

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-[#ededed] font-sans selection:bg-neutral-800 selection:text-white">
      {/* MAIN CONTAINER: exact max-w-4xl with vertical borders matching portfolio */}
      <main className="w-full max-w-4xl mx-auto border-x border-neutral-800/80 bg-[#000000] min-h-screen flex flex-col relative">
        {/* 1. TOP HEADER / NAVBAR */}
        <header className="sticky top-0 z-40 w-full px-5 sm:px-8 py-3.5 flex items-center justify-between border-b border-neutral-800/80 bg-[#000000]/90 backdrop-blur-md select-none">
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

          <div className="flex items-center gap-3 sm:gap-5 text-xs">
            <Link
              href="/"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#projects"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/the-mess"
              className="text-white transition-colors"
            >
              The Mess.
            </Link>
            <a
              href="mailto:zaib.work31@gmail.com"
              className="text-neutral-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              Contact
            </a>
          </div>
        </header>

        {/* 2. HERO BANNER INTRO */}
        <section className="p-6 sm:p-8 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-950/80 via-black to-black flex flex-col gap-3">
          

          <div className="flex flex-col gap-1.5">
            <h1 className="text-3xl sm:text-4xl font-normal font-instrument text-white tracking-tight">
              The Mess<span className="text-neutral-600">.</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl font-normal">
              An infinite 2D canvas of raw banners, interface flows, motion clips, and unreleased visuals.
              Grab and drag anywhere in any direction to explore.
            </p>
          </div>
        </section>

        {/* 3. INFINITE DRAGGABLE BENTO CANVAS (Desktop: Drag in any direction | Mobile: Click anywhere to open Full Screen) */}
        <section
          id="mess-canvas"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onClick={handleSectionClick}
          onDragStart={(e) => e.preventDefault()}
          className={`relative w-full h-[65vh] sm:h-[82vh] overflow-hidden bg-[#000000] select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {/* Endless 3x3 Tiled Canvas with Multi-Directional Ambient Drift & Drag Momentum */}
          <div
            ref={canvasRef}
            className="absolute will-change-transform pointer-events-none"
            style={{
              width: `${dimensionsRef.current.blockWidth * 3}px`,
              height: `${dimensionsRef.current.blockHeight * 3}px`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {renderGridContent()}
          </div>

          {/* Centered Floating Capsule "Drag to explore" on Desktop */}
          <div
            className={`hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-700 ease-out ${
              hasDragged || isDragging
                ? "opacity-0 scale-90 pointer-events-none"
                : "opacity-100 scale-100"
            }`}
          >
            <div className="px-5 py-2.5 rounded-full bg-neutral-950/90 text-white font-medium text-xs sm:text-sm tracking-wide shadow-2xl backdrop-blur-md border border-neutral-700/80 flex items-center justify-center gap-2 select-none">
              <span>Drag anywhere in any direction</span>
            </div>
          </div>

          {/* Mobile Tap Banner: Tapping anywhere in the section opens Full Screen */}
          <div className="sm:hidden absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/20 pointer-events-auto">
            <button
              type="button"
              onClick={() => {
                setIsMobileFullscreen(true);
                setHasDragged(false);
              }}
              className="px-6 py-3.5 rounded-full bg-neutral-900/95 text-white font-medium text-xs shadow-2xl border border-neutral-700 backdrop-blur-md flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer"
              aria-label="Tap to explore in full screen"
            >
              
              <span>Tap to explore in full screen</span>
            </button>
          </div>
        </section>

        {/* 4. FULLSCREEN MOBILE DRAGGABLE CANVAS VIEW */}
        {isMobileFullscreen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Interactive Projects Canvas Fullscreen"
            onTouchStart={handleTouchStart}
            onMouseDown={handleMouseDown}
            onDragStart={(e) => e.preventDefault()}
            className="fixed inset-0 z-[99999999] w-screen h-screen bg-[#000000] select-none touch-none overflow-hidden"
            style={{ isolation: "isolate" }}
          >
            {/* Top Bar with Close Button */}
            <div className="absolute top-4 right-4 z-30 pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsMobileFullscreen(false)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-neutral-900/95 text-white text-xs font-mono font-medium shadow-2xl backdrop-blur-md border border-neutral-700 active:scale-95 transition-all cursor-pointer"
                aria-label="Close fullscreen gallery"
              >
                <span>✕</span>
                <span>Close</span>
              </button>
            </div>

            {/* Fullscreen Interactive Canvas */}
            <div
              ref={fullscreenCanvasRef}
              className="absolute will-change-transform pointer-events-none"
              style={{
                width: `${dimensionsRef.current.blockWidth * 3}px`,
                height: `${dimensionsRef.current.blockHeight * 3}px`,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              {renderGridContent()}
            </div>

            {/* Mobile Thumb Interaction Hint */}
            <div
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-700 ease-out ${
                hasDragged
                  ? "opacity-0 scale-90 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <div className="px-4 py-2 rounded-full bg-neutral-950/90 text-white/90 text-[11px] font-mono shadow-xl backdrop-blur-md border border-neutral-800 flex items-center justify-center gap-2 select-none">
                <span>Drag with your thumb in any direction</span>
              </div>
            </div>
          </div>
        )}

        {/* 5. FOOTER */}
        <Footer />
      </main>
    </div>
  );
}
