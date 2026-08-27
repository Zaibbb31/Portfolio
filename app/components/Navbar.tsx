"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrollPercent, setScrollPercent] = useState(0);

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
      const percent = Math.min(
        100,
        Math.max(0, Math.round((currentScroll / totalScrollable) * 100))
      );
      setScrollPercent(percent);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-full max-w-[320px] sm:max-w-[420px] px-4">
      <Link
        href="/"
        className="flex items-center justify-between w-full bg-zinc-950/90 dark:bg-black/80 backdrop-blur-md border border-white/10 px-3 py-2 rounded-full transition-all duration-300  shadow-2xl"
      >
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
      </Link>
    </header>
  );
}
