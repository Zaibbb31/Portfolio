import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-16 pb-12 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Circular Avatar with icon overlay */}
        <div className="relative group mb-5 select-none">
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-[5px] border-white dark:border-zinc-900 shadow-xl transition-transform duration-500 hover:scale-105">
            <Image
              src="/avatar.jpeg"
              alt="Zaib Avatar"
              fill
              sizes="(max-width: 768px) 112px, 128px"
              className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            />
          </div>
        </div>

        {/* Subheader */}
        <span className="text-[10px] sm:text-xs font-regular tracking-[0.25em] text-zinc-400 dark:text-zinc-500 uppercase font-outfit mb-5 select-none">
          THE LAST PIXEL
        </span>

        {/* Main Heading Call to Action */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tighter text-zinc-950 font-outfit uppercase max-w-2xl mb-12 select-none">
          LET'S BUILD <br />
          SOMETHING{" "}
          <span className="text-rose-500 font-medium transition-all duration-300 hover:brightness-110">
            GOOD
          </span>
        </h2>

        {/* Social Links Row */}
        <div className="flex items-center justify-center gap-7 sm:gap-9 mb-16 text-rose-500 hover:text-rose-500 dark:text-zinc-500 transition-colors">
          
          {/* X / Twitter */}
          <a
            href="https://x.com/Mzaib181"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-rose-500 transition-all duration-300 transform hover:scale-120"
            title="X (Twitter)"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/zzzaib317?igsi=MWZtMjV2anNzbWNzMA=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-800 hover:text-rose-500 dark:text-zinc-400 dark:hover:text-rose-500 transition-all duration-300 transform hover:scale-120"
            title="Instagram"
          >
            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/zaib-ba7086379?utm_source=share_via&utm_content=profile&utm_medium=member_android"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-rose-500 transition-all duration-300 transform hover:scale-120"
            title="LinkedIn"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>

        </div>

        {/* Legal and Copyright row wrapper */}
        <div className="w-full max-w-5xl border-t border-zinc-200/50 dark:border-zinc-800/80 pt-8 flex flex-col items-center gap-6">
          
          
          
          {/* Signature & Author Row */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium font-outfit select-none mt-2">
            <span>&copy; {new Date().getFullYear()}</span>
            
            <span className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 px-2 py-0.5 rounded-md text-[10px] sm:text-xs">
              {/* Next.js Mini Logo */}
              <svg className="w-3.5 h-3.5 fill-current text-zinc-700 dark:text-zinc-300" viewBox="0 0 128 128">
                <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6zM96.7 44.8v38.4h-5.8V53.5L56.7 96H51.2V44.8h5.8v28.8L91.2 32h5.5v12.8z" />
              </svg>
              <span>Built in Next.js</span>
            </span>
            
            <span>by</span>
            
            <span className="font-bold text-zinc-950 dark:text-zinc-700">
              Zaib
            </span>
          </div>

        </div>

      </div>
    </footer>
  );
}
