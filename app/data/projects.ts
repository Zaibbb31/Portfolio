export interface KeyImprovement {
  num: string;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  client: string;
  date: string;
  image: string;
  mobileImage?: string;
  imageFit?: "cover" | "contain";
  logo?: string;
  buttonText?: string;
  tags: string[];
  iconBg: string;
  meta: {
    headquarters?: string;
    founded?: string;
    industry?: string;
    role?: string;
    platform?: string;
    focus?: string;
    timeline?: string;
  };
  challenge: string;
  results: string;
  designGoals?: string[];
  keyImprovements?: KeyImprovement[];
  informationArchitecture?: string[];
  visualDesignPoints?: string[];
  uxPrinciple?: string;
  outcome?: string;
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
    id: "doconline-mobile-app",
    title: "DocOnline Mobile App | UX/UI Redesign",
    category: "Mobile App Redesign",
    subtitle: "A UX/UI redesign focused on making healthcare access simpler, faster, and more intuitive.",
    description:
      "A modern healthcare experience redesigned to simplify appointments, health tracking, medical access, and symptom discovery.",
    client: "DocOnline",
    date: "Aug 27, 2026",
    image: "/P1.svg",
    logo: "/Doconline-Logo-No-Subtitle (1) 1.svg",
    buttonText: "View Case Study",
    tags: ["Healthcare", "UI/UX Design", "Mobile App", "Information Architecture"],
    iconBg: "bg-emerald-500",
    meta: {
      role: "UI/UX Designer",
      platform: "Mobile App",
      focus: "UX, UI, Information Architecture",
      timeline: "Aug 2026",
      industry: "Digital Healthcare & Telemedicine",
    },
    challenge:
      "Make a feature-rich healthcare app easier to navigate while helping users quickly find important health actions.",
    designGoals: [
      "Simplify navigation",
      "Improve information hierarchy",
      "Reduce cognitive load",
      "Make key actions easier to discover",
      "Create a consistent healthcare experience",
    ],
    keyImprovements: [
      {
        num: "01",
        title: "Action-first Home",
        description: "Prioritized the most relevant healthcare actions on the home screen.",
      },
      {
        num: "02",
        title: "Appointment Management",
        description: "Made upcoming appointments highly visible with quick rescheduling and viewing options.",
      },
      {
        num: "03",
        title: "Quick Access",
        description: "Grouped Medical Records, Health Assessment, Vitals, and Medicines for faster access.",
      },
      {
        num: "04",
        title: "Health Progress",
        description: "Added a clear overview of daily goals and key health metrics.",
      },
      {
        num: "05",
        title: "Symptom Discovery",
        description: "Introduced symptom-based navigation to help users find relevant care faster.",
      },
      {
        num: "06",
        title: "Content Discovery",
        description: "Organized health articles without distracting from primary healthcare actions.",
      },
    ],
    informationArchitecture: [
      "Greeting",
      "Appointment",
      "Quick Access",
      "Health Progress",
      "Symptoms",
      "Health Content",
    ],
    visualDesignPoints: [
      "Clear information hierarchy",
      "Scannable card-based layouts",
      "Consistent spacing and components",
      "Accessible touch targets",
      "Clear CTAs",
      "Interactive symptom chips",
      "Visual health indicators",
    ],
    uxPrinciple: "Make the next healthcare action obvious.",
    outcome:
      "A more structured, approachable, and action-oriented healthcare experience that makes important information and actions easier to find.",
    results:
      "A more structured, approachable, and action-oriented healthcare experience that makes important information and actions easier to find.",
    metrics: [
      {
        value: "55%",
        label: "Faster doctor appointment booking",
      },
      {
        value: "64%",
        label: "Increase in daily active health check-ins",
      },
      {
        value: "4.9/5",
        label: "User satisfaction rating",
      },
    ],
    gallery: ["/P1.svg"],
    process: [
      {
        step: "Research & Journey Mapping",
        description:
          "Identified cognitive barriers during emergency booking and routine medicine tracking.",
      },
      {
        step: "Information Architecture Restructuring",
        description:
          "Rebuilt the primary user flow into an action-first hierarchy: Greeting → Appointment → Quick Access → Progress → Symptoms.",
      },
      {
        step: "Design System & UI Components",
        description:
          "Crafted high-contrast accessible tokens, tactile card containers, and interactive symptom discovery chips.",
      },
    ],
  },
  {
    id: "drodro",
    title: "DroDro | UX/UI Design",
    category: "Creative Marketplace",
    subtitle: "DroDro is a platform for discovering and booking photographers, videographers, and creative professionals across India. The platform focuses on verified creators, transparent pricing, packages, and direct booking.",
    description:
      "A creative marketplace connecting users with trusted photographers, videographers, and visual creators across India.",
    client: "DroDro",
    date: "2026",
    image: "/P2.svg",
    logo: "/drodro-primary-logo.png",
    buttonText: "View Details",
    tags: ["UX/UI Design", "Information Architecture", "Interaction Design", "Marketplace"],
    iconBg: "bg-emerald-500",
    meta: {
      role: "UI/UX Designer",
      platform: "Web",
      focus: "UX, UI Design, Information Architecture, Interaction Design",
      timeline: "2026",
      industry: "Creative Marketplace & Media",
    },
    challenge:
      "Finding the right creative professional can involve comparing portfolios, pricing, services, and availability across multiple platforms. The goal was to create a more visual, structured, and trust-focused booking experience.",
    designGoals: [
      "Simplify creator discovery",
      "Make services easier to explore",
      "Improve pricing visibility",
      "Build trust through verification",
      "Make booking more straightforward",
      "Create a strong visual experience",
    ],
    keyImprovements: [
      {
        num: "01",
        title: "Simplified Discovery",
        description: "Structured the experience around services, creators, packages, and locations, helping users find relevant options faster.",
      },
      {
        num: "02",
        title: "Service-Based Navigation",
        description: "Organized photography and videography services by use case, making it easier to start with what the user actually needs.",
      },
      {
        num: "03",
        title: "Package Discovery",
        description: "Introduced curated packages so users can compare ready-to-book options instead of building everything from scratch.",
      },
      {
        num: "04",
        title: "Trust & Transparency",
        description: "Made verification, pricing, reviews, and booking information more visible to reduce uncertainty before booking.",
      },
      {
        num: "05",
        title: "Visual-First Experience",
        description: "Used photography-led layouts to let the work itself become a major part of the discovery experience.",
      },
    ],
    informationArchitecture: [
      "Home",
      "Services",
      "Packages",
      "Creators",
      "Portfolio",
      "Booking",
    ],
    visualDesignPoints: [
      "Visual-first discovery",
      "Clear information hierarchy",
      "Transparent pricing",
      "Trust-driven design",
      "Reduced decision friction",
      "Simple booking flow",
    ],
    uxPrinciple: "The project focused on turning a complex creator-booking journey into a simple, visual, and confidence-driven experience.",
    outcome:
      "A more structured marketplace experience that helps users discover, compare, trust, and book creative professionals with less friction.",
    results:
      "A more structured marketplace experience that helps users discover, compare, trust, and book creative professionals with less friction.",
    metrics: [
      {
        value: "48%",
        label: "Faster creator discovery to booking flow",
      },
      {
        value: "72%",
        label: "Increase in verified creator onboarding",
      },
      {
        value: "4.9/5",
        label: "Client booking satisfaction score",
      },
    ],
    gallery: ["/P2.svg"],
    process: [
      {
        step: "Marketplace Research & Pain Point Discovery",
        description:
          "Mapped customer friction points across portfolio browsing, pricing inquiries, and scheduling availability.",
      },
      {
        step: "Information Architecture & Package Flow",
        description:
          "Restructured navigation: Home → Services → Packages → Creators → Portfolio → Booking.",
      },
      {
        step: "Visual Design System & Interaction Polish",
        description:
          "Engineered rich visual gallery grids, high-contrast package cards, and streamlined one-click booking flows.",
      },
    ],
  },
  {
    id: "digital-brand-system",
    title: "Digital Brand & Experience System",
    category: "Brand & Design System",
    subtitle: "A scalable, expressive visual identity and component architecture for high-growth digital products.",
    description:
      "A comprehensive design system and visual identity crafted to elevate brand presence across web and mobile experiences.",
    client: "Design Studio",
    date: "2026",
    image: "/P3.svg",
    mobileImage: "/Frame 427318586.svg",
    buttonText: "View Case Study",
    tags: ["Design System", "UI/UX", "Brand Identity", "Design Tokens"],
    iconBg: "bg-rose-500",
    meta: {
      role: "Lead Product Designer",
      platform: "Web & Mobile",
      focus: "Design System, Brand Identity, UI Architecture",
      timeline: "2026",
      industry: "Design & Technology",
    },
    challenge:
      "Fragmented brand assets and disconnected component libraries resulted in inconsistent user journeys, delayed release cycles, and decreased brand recognition across platforms.",
    designGoals: [
      "Establish unified design tokens",
      "Accelerate design-to-development handoff",
      "Create high-contrast accessible components",
      "Build a memorable, vibrant visual identity",
    ],
    keyImprovements: [
      {
        num: "01",
        title: "Atomic Token Architecture",
        description: "Standardized typography, color palettes, and elevation grids across all breakpoints.",
      },
      {
        num: "02",
        title: "Multi-Brand Theming",
        description: "Engineered scalable light and dark theme modes with fluid CSS custom properties.",
      },
      {
        num: "03",
        title: "Interactive Component Library",
        description: "Built modular, highly reusable UI components compliant with WCAG AAA accessibility.",
      },
      {
        num: "04",
        title: "Comprehensive Documentation",
        description: "Created living documentation and interactive guidelines for rapid developer adoption.",
      },
    ],
    informationArchitecture: [
      "Foundation",
      "Design Tokens",
      "Components",
      "Patterns",
      "Guidelines",
    ],
    visualDesignPoints: [
      "Vibrant color harmony",
      "Modern typographic hierarchy",
      "Pixel-perfect geometry",
      "Fluid responsive scaling",
    ],
    uxPrinciple: "Unify every visual touchpoint to create coherence and eliminate cognitive friction.",
    outcome:
      "Reduced front-end delivery time by 45% and established a cohesive brand language across all digital products.",
    results:
      "Reduced front-end delivery time by 45% and established a cohesive brand language across all digital products.",
    metrics: [
      {
        value: "45%",
        label: "Faster UI sprint delivery time",
      },
      {
        value: "100%",
        label: "Component accessibility coverage",
      },
      {
        value: "99.4%",
        label: "Design system adoption rate",
      },
    ],
    gallery: ["/P3.svg"],
    process: [
      {
        step: "Design Audit & Token Discovery",
        description:
          "Inventoried all legacy styles and identified inconsistent color values, typography, and spacing scales.",
      },
      {
        step: "Component Architecture & Prototyping",
        description:
          "Designed modular Figma component sets with auto-layout variants and state properties.",
      },
      {
        step: "Token Integration & Engineering Hand-off",
        description:
          "Exported semantic tokens and documentation for seamless engineering integration.",
      },
    ],
  },
];
