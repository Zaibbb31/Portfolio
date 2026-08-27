"use client";

import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const requestRef = useRef<number | null>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        document.documentElement.classList.add("custom-cursor-active");
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.getAttribute("role") === "button" ||
          window.getComputedStyle(target).cursor === "pointer";
        setIsPointer(isInteractive);
      }
    };

    const handleTouchStart = () => {
      setIsVisible(false);
      document.documentElement.classList.remove("custom-cursor-active");
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Smooth render loop for silky tracking
    const updateCursor = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.55;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.55;

      setPosition({
        x: currentPos.current.x,
        y: currentPos.current.y,
      });

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[999999] transition-opacity duration-150"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        opacity: isVisible ? 1 : 0,
        willChange: "transform",
      }}
    >
      <div
        className={`transition-transform duration-100 ease-out origin-top-left ${
          isClicking ? "scale-90" : isPointer ? "scale-115 -rotate-6" : "scale-100"
        }`}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_10px_rgba(244,63,94,0.6)]"
        >
          <path
            d="M4.5 3L19.5 12L12 13.5L8.5 20.5L4.5 3Z"
            fill="#f43f5e"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
