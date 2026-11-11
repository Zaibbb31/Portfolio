export type MessItemSize =
  | "1080x1920"
  | "1080x1080"
  | "1080x1350"
  | "1350x1080"
  | "1920x1080";

export interface MessItem {
  id: string;
  title: string;
  type: "image" | "video";
  src: string;
  poster?: string; // Optional thumbnail for videos
  size: MessItemSize;
  category: "Banner" | "Motion" | "Poster" | "Brand" | "Experiment";
  description?: string;
  date?: string;
}

/**
 * Aspect ratio helper mapping each allowed size to exact CSS aspect-ratio strings.
 * Only the 5 allowed sizes are supported:
 * 1. 1080x1920 (9:16 vertical reel / story)
 * 2. 1080x1080 (1:1 square)
 * 3. 1080x1350 (4:5 portrait)
 * 4. 1350x1080 (5:4 horizontal)
 * 5. 1920x1080 (16:9 widescreen / banner)
 */
export const MESS_ASPECT_RATIOS: Record<MessItemSize, { ratio: string; label: string; width: number; height: number }> = {
  "1080x1920": { ratio: "1080 / 1920", label: "1080 × 1920 (9:16)", width: 1080, height: 1920 },
  "1080x1080": { ratio: "1080 / 1080", label: "1080 × 1080 (1:1)", width: 1080, height: 1080 },
  "1080x1350": { ratio: "1080 / 1350", label: "1080 × 1350 (4:5)", width: 1080, height: 1350 },
  "1350x1080": { ratio: "1350 / 1080", label: "1350 × 1080 (5:4)", width: 1350, height: 1080 },
  "1920x1080": { ratio: "1920 / 1080", label: "1920 × 1080 (16:9)", width: 1920, height: 1080 },
};

/**
 * THE MESS: A curated visual playground of banners, graphic experiments, and motion design.
 * Drop your media files into `/public` and register them below with one of the 5 allowed sizes!
 */
export const MESS_ITEMS: MessItem[] = [
  {
    id: "mess-01",
    title: "Cinematic AI Workspace",
    type: "image",
    src: "/Cinematic AI Workspace Website Mockup.png",
    size: "1920x1080",
    category: "Banner",
    description: "Atmospheric widescreen render showcasing neural interface exploration.",
    date: "2026",
  },
  {
    id: "mess-02",
    title: "Credit Engine Reel UI",
    type: "image",
    src: "/settlr/Warm Credit Score Smartphone Display.png",
    size: "1080x1920",
    category: "Motion",
    description: "Vertical 9:16 smartphone motion mockup highlighting micro-interactions.",
    date: "2026",
  },
  {
    id: "mess-03",
    title: "Settlr Obsidian Emblem",
    type: "image",
    src: "/Settlr.png",
    size: "1080x1080",
    category: "Brand",
    description: "Monochrome brutalist glyph engineered for tactile product branding.",
    date: "2025",
  },
  {
    id: "mess-04",
    title: "AMA Connect Social Poster",
    type: "image",
    src: "/ama-connect.jpg",
    size: "1080x1350",
    category: "Poster",
    description: "4:5 vertical editorial composition built for digital publication.",
    date: "2025",
  },
  {
    id: "mess-05",
    title: "Modern Live Workspace",
    type: "image",
    src: "/Modern Workspace Showcasing Live Designs.png",
    size: "1920x1080",
    category: "Banner",
    description: "High-contrast dual-display workspace visualization.",
    date: "2026",
  },
  {
    id: "mess-06",
    title: "Interactive Media Frame",
    type: "image",
    src: "/projects/New folder/Whatsaap_Media.svg",
    size: "1350x1080",
    category: "Experiment",
    description: "5:4 landscape visual exploring structured asset distribution.",
    date: "2025",
  },
  {
    id: "mess-07",
    title: "Stories & Reels Experience",
    type: "image",
    src: "/projects/New folder/INSTA_REELS.svg",
    size: "1080x1920",
    category: "Motion",
    description: "Full-bleed mobile interactive story framework.",
    date: "2025",
  },
  {
    id: "mess-08",
    title: "Pixel Hands Hero Landscape",
    type: "image",
    src: "/Pixel Hands Workspace Showcase.png",
    size: "1920x1080",
    category: "Banner",
    description: "Panoramic showcase blending physical ergonomics with virtual interfaces.",
    date: "2026",
  },
  {
    id: "mess-09",
    title: "Atomic Core Component",
    type: "image",
    src: "/atom.png",
    size: "1080x1080",
    category: "Experiment",
    description: "Design system nucleus rendered with depth and luminescence.",
    date: "2025",
  },
  {
    id: "mess-10",
    title: "Tactile Flow State",
    type: "image",
    src: "/settlr/1.png",
    size: "1080x1350",
    category: "Poster",
    description: "4:5 portrait exploring financial telemetry and user pacing.",
    date: "2025",
  },
  {
    id: "mess-11",
    title: "Warm Minimalist Canvas",
    type: "image",
    src: "/Warm Minimalist Workspace Mockup.png",
    size: "1920x1080",
    category: "Banner",
    description: "Studio surface rendering with balanced typography and ambient glow.",
    date: "2026",
  },
  {
    id: "mess-12",
    title: "Shopify Motion Fragment",
    type: "image",
    src: "/projects/New folder/Shopify_Liked.svg",
    size: "1080x1080",
    category: "Motion",
    description: "Micro-animation prototype exploring delight states.",
    date: "2025",
  },
  {
    id: "mess-13",
    title: "Administrator Operations Suite",
    type: "image",
    src: "/Warm Office Administrator Sign-In Scene.png",
    size: "1920x1080",
    category: "Banner",
    description: "Enterprise access environment with organic wood tone atmosphere.",
    date: "2026",
  },
  {
    id: "mess-14",
    title: "Airtel Interaction Blueprint",
    type: "image",
    src: "/projects/New folder/Airtel_Homepage.svg",
    size: "1080x1350",
    category: "Poster",
    description: "Telecom portal redesign study prioritizing high-density legibility.",
    date: "2025",
  },
  {
    id: "mess-15",
    title: "Dual Perspective Flow",
    type: "image",
    src: "/settlr/2 (2).png",
    size: "1350x1080",
    category: "Experiment",
    description: "5:4 modular layout charting dual-state transitions.",
    date: "2025",
  },
];

