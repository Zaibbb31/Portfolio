export interface MessItem {
  id: string;
  title: string;
  type: "image" | "video";
  src: string;
  width: number;
  height: number;
  aspectRatio: string;
  sizeLabel: string;
  category: string;
  description?: string;
}

export const ITSME_MESS_ITEMS: MessItem[] = [
  {
    id: "itsme-trivora",
    title: "Trivora Panoramic Platform",
    type: "image",
    src: "/itsme/trivora.webp",
    width: 1920,
    height: 800,
    aspectRatio: "1920 / 800",
    sizeLabel: "1920 × 800 (2.4:1)",
    category: "Digital Platform",
    description: "Panoramic web interface layout engineered for multi-tier visual hierarchy.",
  },
  {
    id: "itsme-pehnavri-mobile",
    title: "Pehnavri Mobile Experience",
    type: "image",
    src: "/itsme/pehnavri%20mobile.jpg",
    width: 1080,
    height: 1920,
    aspectRatio: "1080 / 1920",
    sizeLabel: "1080 × 1920 (9:16)",
    category: "Mobile Design",
    description: "Full-bleed vertical mobile flow crafted for modern e-commerce commerce experiences.",
  },
  {
    id: "itsme-video",
    title: "Motion & Visual Showcase",
    type: "video",
    src: "/itsme/Untitled%20design.mp4",
    width: 1920,
    height: 1080,
    aspectRatio: "1920 / 1080",
    sizeLabel: "1920 × 1080 (16:9)",
    category: "Motion Reel",
    description: "High-framerate looping motion prototype exploring brand kinetics.",
  },
  {
    id: "itsme-pehnavri",
    title: "Pehnavri Visual Identity",
    type: "image",
    src: "/itsme/Pehnavri.jpg",
    width: 1920,
    height: 1080,
    aspectRatio: "1920 / 1080",
    sizeLabel: "1920 × 1080 (16:9)",
    category: "Brand & E-Commerce",
    description: "Widescreen composition featuring tailored apparel and luxury lifestyle typography.",
  },
  {
    id: "itsme-1",
    title: "Editorial Composition I",
    type: "image",
    src: "/itsme/1.jpg",
    width: 1086,
    height: 1448,
    aspectRatio: "1086 / 1448",
    sizeLabel: "1086 × 1448 (3:4)",
    category: "Editorial Design",
    description: "Curated lifestyle editorial frame emphasizing light and material tactility.",
  },
  {
    id: "itsme-2",
    title: "Editorial Composition II",
    type: "image",
    src: "/itsme/2.jpg",
    width: 1086,
    height: 1448,
    aspectRatio: "1086 / 1448",
    sizeLabel: "1086 × 1448 (3:4)",
    category: "Editorial Design",
    description: "Complementary vertical narrative focusing on minimalist form and structure.",
  },
  {
    id: "itsme-for4",
    title: "Spatial Banner Concept",
    type: "image",
    src: "/itsme/for4.jpg",
    width: 1920,
    height: 980,
    aspectRatio: "1920 / 980",
    sizeLabel: "1920 × 980 (~2:1)",
    category: "Spatial UI",
    description: "Expansive landscape banner balancing negative space and geometric contrast.",
  },
];
