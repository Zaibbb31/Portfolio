"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

type DogPose = "sit" | "wag" | "blink";

export default function DogMascot() {
  const [pose, setPose] = useState<DogPose>("sit");
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextParticleId = useRef(0);

  // Retro 8-bit chiptune sound on click
  const play8BitSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // 8-bit square wave jump/bark chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.14);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  // Idle cycle: gentle tail wag and warm blinking
  useEffect(() => {
    const wagInterval = setInterval(() => {
      setPose((prev) => (prev === "sit" ? "wag" : "sit"));
    }, 1800);

    const blinkInterval = setInterval(() => {
      setPose("blink");
      setTimeout(() => {
        setPose("sit");
      }, 260);
    }, 4200);

    return () => {
      clearInterval(wagInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClicked(true);
    play8BitSound();

    // Spawn tiny floating hearts/sparkles
    const emojis = ["❤️", "✨", "⭐", "🐾"];
    const newParticles: Particle[] = [
      {
        id: nextParticleId.current++,
        x: (Math.random() - 0.5) * 30,
        y: -12,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      },
      {
        id: nextParticleId.current++,
        x: (Math.random() - 0.5) * 40,
        y: -22,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      },
    ];

    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => setClicked(false), 300);
  };

  // Clean up floating particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [particles]);

  const getPoseSrc = () => {
    switch (pose) {
      case "wag":
        return "/mascot/dog-wag.png";
      case "blink":
        return "/mascot/dog-blink.png";
      case "sit":
      default:
        return "/mascot/dog-sit.png";
    }
  };

  return (
    <div
      onClick={handleClick}
      className="absolute bottom-full right-2 sm:right-3 -mb-[1px] z-30 cursor-pointer select-none group"
      aria-label="Undertale Shimeji Dog Mascot sitting on border"
      title="Click me!"
    >
      {/* Floating Particles on Click */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-xs pointer-events-none animate-float-fade z-40"
          style={{
            left: `calc(50% + ${p.x}px)`,
            top: `${p.y}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Mascot Body & Animated Waving Paw */}
      <div
        className={`relative flex items-end justify-center transition-transform duration-200 ${
          clicked ? "scale-115 -translate-y-1" : "group-hover:scale-105"
        }`}
      >
        {/* Shimeji Pixel Dog Frame */}
        <div className="relative w-[58px] h-[36px] sm:w-[66px] sm:h-[41px]">
          <Image
            src={getPoseSrc()}
            alt="Pixel Dog Mascot"
            fill
            sizes="(max-width: 640px) 58px, 66px"
            className="object-contain [image-rendering:pixelated] pointer-events-none filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]"
            priority
          />
        </div>

        {/* Crisp Pixel-Art Waving Paw */}
        <div
          className="absolute -top-1 -right-1 z-20 origin-bottom-left animate-pixel-wave pointer-events-none"
          title="Waving paw"
        >
          <Image
            src="/mascot/pixel-paw.svg"
            alt="Waving Paw"
            width={16}
            height={16}
            className="[image-rendering:pixelated] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            priority
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes pixelWave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-18deg) translateY(-2px);
          }
          50% {
            transform: rotate(12deg) translateY(-1px);
          }
          75% {
            transform: rotate(-14deg) translateY(-2px);
          }
        }
        .animate-pixel-wave {
          animation: pixelWave 1.4s ease-in-out infinite;
        }

        @keyframes floatFade {
          0% {
            opacity: 1;
            transform: translateY(0) scale(0.8);
          }
          100% {
            opacity: 0;
            transform: translateY(-26px) scale(1.2);
          }
        }
        .animate-float-fade {
          animation: floatFade 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}
