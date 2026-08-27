export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  client: string;
  date: string;
  image: string;
  tags: string[];
  iconBg: string;
  meta: {
    headquarters?: string;
    founded?: string;
    industry?: string;
    role?: string;
    timeline?: string;
  };
  challenge: string;
  results: string;
  metrics: {
    value: string;
    label: string;
  }[];
  gallery: string[];
  process: {
    step: string;
    description: string;
  }[];
}

export const PROJECTS: Project[] = [
  {
    id: "noto-cafe",
    title: "Noto Café",
    category: "Product Design",
    subtitle: "Designing a Modern Digital Presence for Specialty Coffee",
    description:
      "A cozy digital home for a neighborhood café, featuring seasonal menus, event updates, and warm visual storytelling.",
    client: "Noto Café & Bakery",
    date: "Apr 29, 2025",
    image: "/projects/noto-device.jpg",
    tags: ["Product Design", "UI/UX", "Brand Identity"],
    iconBg: "bg-gradient-to-tr from-[#ff4d29] to-[#ff6b4a]",
    meta: {
      headquarters: "Tokyo, Japan",
      founded: "2022",
      industry: "Specialty Hospitality & Retail",
      role: "Lead Product Designer & Frontend Dev",
      timeline: "3 Months (Q1 2025)",
    },
    challenge:
      "The existing digital presence was fragmented across social media and lacked a unified platform for seasonal releases, menu exploration, and customer reservations. Customers found it cumbersome to discover limited-batch roasts and upcoming community workshops.",
    results:
      "Following the launch of the new digital experience, mobile orders and event RSVPs surged by 42%. Time spent browsing the curated menu increased by 35%, while customer retention and subscription signups achieved record highs in the first quarter.",
    metrics: [
      {
        value: "42%",
        label: "Increase in digital orders & RSVPs",
      },
      {
        value: "35%",
        label: "Longer average session duration",
      },
      {
        value: "96%",
        label: "Positive user satisfaction rating",
      },
    ],
    gallery: [
      "/projects/noto-device.jpg",
      "/projects/noto-cafe.jpg",
    ],
    process: [
      {
        step: "Research & Analysis",
        description:
          "We conducted customer interviews, in-store usability surveys, and analyzed ordering drop-off points to understand the core customer journey and pain points.",
      },
      {
        step: "Information Architecture",
        description:
          "Restructured the menu hierarchy, prioritizing seasonal coffees, pastry pairings, and one-tap event RSVP flows tailored for mobile browsing.",
      },
      {
        step: "Wireframing & Prototyping",
        description:
          "Crafted high-fidelity interactive prototypes in Figma with micro-interactions, smooth page transitions, and responsive mobile-first views.",
      },
    ],
  },
  {
    id: "quantum-terminal",
    title: "Quantum Terminal",
    category: "Web Applications",
    subtitle: "Real-Time Portfolio Intelligence & Financial Terminal",
    description:
      "Next-generation portfolio intelligence and real-time financial analytics dashboard with ambient glassmorphism.",
    client: "Quantum Financials",
    date: "Feb 14, 2025",
    image: "/projects/quantum-ui.jpg",
    tags: ["React", "Next.js", "Design System"],
    iconBg: "bg-gradient-to-tr from-[#7c3aed] to-[#6366f1]",
    meta: {
      headquarters: "San Francisco, CA",
      founded: "2021",
      industry: "Fintech & Web3 Analytics",
      role: "Senior UI/UX Engineer",
      timeline: "4 Months (Q4 2024 - Q1 2025)",
    },
    challenge:
      "Traders and asset managers faced cognitive overload when tracking multi-asset portfolios across fragmented dashboards with sluggish refresh rates and clunky data visualizations.",
    results:
      "Streamlined all portfolio monitoring into a unified, high-performance terminal. Latency in asset navigation dropped by 60%, and active daily user engagement increased by 48% within two months of rollout.",
    metrics: [
      {
        value: "60%",
        label: "Reduction in workflow latency",
      },
      {
        value: "48%",
        label: "Growth in daily active users",
      },
      {
        value: "99.8%",
        label: "User task completion rate",
      },
    ],
    gallery: [
      "/projects/quantum-ui.jpg",
      "/projects/noto-device.jpg",
    ],
    process: [
      {
        step: "Data Architecture & Discovery",
        description:
          "Collaborated with quant analysts and traders to determine critical telemetry data, candle charts, and alert thresholds.",
      },
      {
        step: "Component Design System",
        description:
          "Engineered a scalable dark-mode design system with accessible data visualization tokens, glassmorphism layers, and responsive layouts.",
      },
      {
        step: "Performance Optimization",
        description:
          "Implemented WebSocket streaming with virtualized data lists in Next.js and React to deliver sub-millisecond chart re-renders.",
      },
    ],
  },
];
