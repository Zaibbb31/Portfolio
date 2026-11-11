"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import { ITSME_MESS_ITEMS, MessItem } from "../data/mess";

export default function TheMessPage() {
  const [activeItem, setActiveItem] = useState<MessItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeItem]);

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Find individual items for explicit bento placements
  const trivora = ITSME_MESS_ITEMS.find((it) => it.id === "itsme-trivora")!;
  const pehnavriMobile = ITSME_MESS_ITEMS.find((it) => it.id === "itsme-pehnavri-mobile")!;
  const videoItem = ITSME_MESS_ITEMS.find((it) => it.id === "itsme-video")!;
  const pehnavri = ITSME_MESS_ITEMS.find((it) => it.id === "itsme-pehnavri")!;
  const editorial1 = ITSME_MESS_ITEMS.find((it) => it.id === "itsme-1")!;
  const editorial2 = ITSME_MESS_ITEMS.find((it) => it.id === "itsme-2")!;
  const for4 = ITSME_MESS_ITEMS.find((it) => it.id === "itsme-for4")!;

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
              className="text-white transition-colors font-medium"
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

        {/* 2. HERO INTRO BANNER */}
        <section className="p-6 sm:p-8 border-b border-neutral-800/80 bg-gradient-to-b from-neutral-950/80 via-black to-black flex flex-col gap-2">
          

          <h1 className="text-3xl sm:text-4xl font-normal font-instrument text-white tracking-tight mt-1">
            The Mess<span className="text-neutral-600">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl font-normal">
            A simple bento grid organized according to each asset&apos;s natural resolution — from
            panoramic widescreen headers to full-bleed mobile flows and motion prototypes.
          </p>
        </section>

        {/* 3. SIMPLE BENTO GRID ORGANIZED BY IMAGE RESOLUTIONS */}
        <section className="p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 flex-1">
          {/* Bento Item 1: Panoramic Widescreen Header (1920x800) */}
          <div
            onClick={() => setActiveItem(trivora)}
            className="group relative w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 shadow-2xl transition-colors duration-200 hover:border-neutral-600 cursor-pointer"
            style={{ aspectRatio: trivora.aspectRatio }}
          >
            <Image
              src={trivora.src}
              alt={trivora.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-center"
            />
            {/* Top Right Dimension Pill */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-300 z-10 select-none">
              {trivora.sizeLabel}
            </div>
          </div>

          {/* Bento Row 2: Split Vertical Mobile (1080x1920) + Dual 16:9 Cards (1920x1080 each) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            {/* Left: 9:16 Tall Vertical Mobile Flow (1080x1920) */}
            <div
              onClick={() => setActiveItem(pehnavriMobile)}
              className="md:col-span-5 group relative overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 shadow-2xl transition-colors duration-200 hover:border-neutral-600 cursor-pointer flex flex-col justify-center"
              style={{ aspectRatio: pehnavriMobile.aspectRatio }}
            >
              <Image
                src={pehnavriMobile.src}
                alt={pehnavriMobile.title}
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover object-center"
              />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-300 z-10 select-none">
                {pehnavriMobile.sizeLabel}
              </div>
            </div>

            {/* Right: Dual 16:9 Cards (Video Reel + Pehnavri Widescreen) */}
            <div className="md:col-span-7 flex flex-col gap-4 sm:gap-6 justify-between">
              {/* Item: 16:9 Video Reel (1920x1080) */}
              <div
                onClick={() => setActiveItem(videoItem)}
                className="group relative w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 shadow-2xl transition-colors duration-200 hover:border-neutral-600 cursor-pointer"
                style={{ aspectRatio: videoItem.aspectRatio }}
              >
                <video
                  ref={videoRef}
                  src={videoItem.src}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Video Tag & Dimension Badge */}
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-white flex items-center gap-1.5 z-10 select-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>MOTION REEL</span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10 select-none">
                  {/* Play / Pause toggle */}
                  <button
                    type="button"
                    onClick={toggleVideoPlayback}
                    className="p-1 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    )}
                  </button>

                  {/* Sound mute toggle */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                        <line x1="23" y1="9" x2="17" y2="15" />
                        <line x1="17" y1="9" x2="23" y2="15" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                      </svg>
                    )}
                  </button>

                  <div className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-300">
                    {videoItem.sizeLabel}
                  </div>
                </div>
              </div>

              {/* Item: 16:9 Pehnavri Widescreen Banner (1920x1080) */}
              <div
                onClick={() => setActiveItem(pehnavri)}
                className="group relative w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 shadow-2xl transition-colors duration-200 hover:border-neutral-600 cursor-pointer"
                style={{ aspectRatio: pehnavri.aspectRatio }}
              >
                <Image
                  src={pehnavri.src}
                  alt={pehnavri.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center"
                />
                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-300 z-10 select-none">
                  {pehnavri.sizeLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Bento Row 3: Twin 3:4 Vertical Editorial Portraits (1086x1448 each) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Editorial 1 */}
            <div
              onClick={() => setActiveItem(editorial1)}
              className="group relative w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 shadow-2xl transition-colors duration-200 hover:border-neutral-600 cursor-pointer"
              style={{ aspectRatio: editorial1.aspectRatio }}
            >
              <Image
                src={editorial1.src}
                alt={editorial1.title}
                fill
                sizes="(max-width: 640px) 100vw, 440px"
                className="object-cover object-center"
              />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-300 z-10 select-none">
                {editorial1.sizeLabel}
              </div>
            </div>

            {/* Editorial 2 */}
            <div
              onClick={() => setActiveItem(editorial2)}
              className="group relative w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 shadow-2xl transition-colors duration-200 hover:border-neutral-600 cursor-pointer"
              style={{ aspectRatio: editorial2.aspectRatio }}
            >
              <Image
                src={editorial2.src}
                alt={editorial2.title}
                fill
                sizes="(max-width: 640px) 100vw, 440px"
                className="object-cover object-center"
              />
              <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-300 z-10 select-none">
                {editorial2.sizeLabel}
              </div>
            </div>
          </div>

          {/* Bento Item 4: Bottom Spatial Panorama (1920x980) */}
          <div
            onClick={() => setActiveItem(for4)}
            className="group relative w-full overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/80 shadow-2xl transition-colors duration-200 hover:border-neutral-600 cursor-pointer"
            style={{ aspectRatio: for4.aspectRatio }}
          >
            <Image
              src={for4.src}
              alt={for4.title}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover object-center"
            />
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md border border-neutral-800 text-[10px] font-mono text-neutral-300 z-10 select-none">
              {for4.sizeLabel}
            </div>
          </div>
        </section>

        {/* 4. LIGHTBOX MODAL (FOR FULL-RESOLUTION DETAIL INSPECTION) */}
        {activeItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[9999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
            onClick={() => setActiveItem(null)}
          >
            <div
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar */}
              <div className="p-4 sm:px-6 flex items-center justify-between border-b border-neutral-800/80 bg-neutral-900/50">
                <div className="flex items-center gap-3">
                  <h2 className="text-base sm:text-lg font-normal font-instrument text-white">
                    {activeItem.title}
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-800 text-neutral-300">
                    {activeItem.sizeLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveItem(null)}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center text-sm font-mono transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              {/* Media Body */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-black/60">
                <div
                  className="relative w-full max-h-[68vh] rounded-xl overflow-hidden border border-neutral-800/80 bg-black flex items-center justify-center"
                  style={{
                    aspectRatio: activeItem.aspectRatio,
                    maxWidth:
                      activeItem.id === "itsme-pehnavri-mobile"
                        ? "380px"
                        : activeItem.id === "itsme-1" || activeItem.id === "itsme-2"
                        ? "500px"
                        : "100%",
                  }}
                >
                  {activeItem.type === "video" ? (
                    <video
                      src={activeItem.src}
                      controls
                      autoPlay
                      loop
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={activeItem.src}
                      alt={activeItem.title}
                      fill
                      priority
                      className="object-contain"
                      sizes="100vw"
                    />
                  )}
                </div>
              </div>

              {/* Bottom Info Bar */}
              <div className="p-4 sm:px-6 border-t border-neutral-800/80 bg-neutral-900/40 flex items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                  Category: {activeItem.category}
                </span>
                <a
                  href={activeItem.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline underline-offset-4 font-mono text-[11px]"
                >
                  View Original File ↗
                </a>
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
