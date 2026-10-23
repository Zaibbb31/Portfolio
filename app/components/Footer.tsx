export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center select-none pt-8">
      {/* Footer Text */}
      <div className="flex flex-col items-center text-center gap-1 mb-7 px-4">
        <p className="text-xs sm:text-[13px] text-neutral-400 font-normal">
          Designed and developed by{" "}
          <span className="underline underline-offset-4 decoration-neutral-500 font-medium text-white">
            Zaib
          </span>
        </p>
        <p className="text-xs text-neutral-500 font-mono">
          &copy; {new Date().getFullYear()}. Built in the open.
        </p>
      </div>

      {/* Bottom Dotted Matrix Banner - exact match to screenshot */}
      <div
        aria-hidden="true"
        className="w-full h-24 sm:h-28 border-t border-neutral-800/80 bg-[radial-gradient(#3a3a3e_1.2px,transparent_1.2px)] [background-size:16px_16px] bg-neutral-950/40 relative overflow-hidden"
      />
    </footer>
  );
}
