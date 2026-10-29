export interface KeyImprovement {
  num: string;
  title: string;
  description: string;
}

export interface ScreenRedesign {
  title: string;
  image: string;
  description: string;
  highlights: string[];
  flaws: string[];
  improvements: string[];
}

export interface ProjectSpecs {
  productType: string;
  dimensions?: string;
  platform?: string;
  weight?: string;
  deliverables?: string;
  finish?: string;
  role?: string;
  leadTime?: string;
  timeline?: string;
  designer?: string;
  client?: string;
  year?: string;
}

export interface ProjectObjectNotes {
  heading: string;
  description: string[];
  specs: ProjectSpecs;
}

export interface ProjectMaterialMethod {
  heading: string;
  materialsFinish: string[];
  productionMethod: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  breadcrumb?: string;
  tagline?: string;
  subtitle: string;
  description: string;
  client: string;
  date: string;
  availability?: string;
  image: string;
  heroImage?: string;
  mobileImage?: string;
  imageFit?: "cover" | "contain";
  logo?: string;
  buttonText?: string;
  liveUrl?: string;
  codeUrl?: string;
  tags: string[];
  iconBg: string;
  gridImages?: string[];
  fullWidthImage?: string;
  objectNotes?: ProjectObjectNotes;
  materialMethod?: ProjectMaterialMethod;
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
  screens?: ScreenRedesign[];
}

export const PROJECTS: Project[] = [
  {
    id: "settlr",
    title: "Settlr | Group Expense & Settlement Platform",
    category: "Fintech Web & Mobile App",
    breadcrumb: "Fintech Application",
    tagline: "Automated expense splitting and instant payment settlement platform designed for groups and teams.",
    subtitle: "A modern financial settlement application designed to eliminate friction in shared expenses, calculations, and payouts.",
    description:
      "Engineered to streamline group finances, bill splitting, multi-currency settlements, and instant payment reconciliation with real-time balance tracking.",
    client: "Settlr Labs",
    date: "2026",
    image: "/Settlr.png",
    heroImage: "/settlr/hero.png",
    gridImages: [
      "/settlr/1.png",
      "/Settlr.png",
      "/projects/quantum-ui.jpg",
      "/projects/noto-device.jpg",
    ],
    liveUrl: "https://settlr.app",
    codeUrl: "https://github.com/Zaibbb31",
    tags: ["Figma", "Fintech"],
    iconBg: "bg-emerald-500",
    meta: {
      role: "Lead Product Designer & Frontend Engineer",
      platform: "Web & Mobile (Responsive)",
      focus: "Product Design, Financial UX, Settlement Architecture",
      timeline: "2026",
      industry: "Fintech & Financial Software",
    },
    challenge:
      "Splitting group costs, tracking who paid what across diverse categories, and chasing reimbursement is awkward and chaotic. Traditional expense apps often feel cluttered, lack transparent settlement paths, and confuse users with convoluted multi-step math.",
    designGoals: [
      "Zero-friction expense logging and smart category detection",
      "Instant, transparent visual settlement graphs",
      "One-click payout reconciliation and reminders",
      "High-contrast accessible financial dashboard",
      "Real-time balance breakdown across multiple groups",
    ],
    keyImprovements: [
      {
        num: "01",
        title: "Smart Settlement Engine",
        description: "Optimized multi-party debt settlement algorithms, reducing the number of total transactions needed to settle a group by 65%.",
      },
      {
        num: "02",
        title: "Real-Time Balance Desk",
        description: "Gives every participant an immediate, scannable overview of their net position across all circles and trips.",
      },
      {
        num: "03",
        title: "One-Tap Settle Flow",
        description: "Integrated frictionless digital payment triggers to close open balances without manual ledger reconciliation.",
      },
      {
        num: "04",
        title: "Tactile Dark-Mode Aesthetic",
        description: "Designed a high-contrast financial palette with calming emerald status cues and accessible typography.",
      },
    ],
    informationArchitecture: [
      "Dashboard & Net Balance",
      "Group Circles & Trips",
      "Expense Intake & Splitter",
      "Settlement Matrix",
      "Activity Audit Log",
    ],
    visualDesignPoints: [
      "High-clarity numeric typography for financial precision",
      "Tactile card containers with distinct settlement status states",
      "Minimalist transaction streams with category color coding",
      "Accessible touch targets for mobile payment flows",
    ],
    uxPrinciple: "Financial clarity over cognitive complexity: make every balance transparent and instant to settle.",
    outcome:
      "Delivered a seamless settlement experience with sub-second calculations, high user retention, and frictionless group payouts.",
    results:
      "Reduced time spent reconciling shared group expenses by 70% while achieving a 99.8% settlement completion rate.",
    metrics: [
      {
        value: "65%",
        label: "Fewer transactions to settle debts",
      },
      {
        value: "70%",
        label: "Faster expense reconciliation",
      },
      {
        value: "99.8%",
        label: "Successful settlement rate",
      },
    ],
    gallery: ["/projects/settlr.svg"],
    process: [
      {
        step: "Behavioral Finance & Friction Analysis",
        description: "Researched group dynamics around debt settlement and awkward reminders to design empathetic interaction flows.",
      },
      {
        step: "Information Architecture & Math Simplification",
        description: "Modeled split graphs and simplified settlement paths to minimize transaction volume.",
      },
      {
        step: "Design System & High-Fidelity Prototyping",
        description: "Engineered responsive dark-mode component tokens and frictionless mobile-first interfaces.",
      },
    ],
  },
  {
    id: "ama-connect",
    title: "AMA Connect | Pro Bono Legal Aid Mobile App",
    category: "Mobile App Design",
    subtitle: "A pro bono legal-aid mobile platform connecting individuals with verified lawyers, resolving critical legal queries within 45 minutes.",
    description:
      "Designed end-to-end to streamline pro bono legal assistance, real-time case tracking, verified lawyer discovery, and seamless consultation.",
    client: "AMA Legal Solutions",
    date: "2025 – Present",
    image: "/ama-connect.jpg",
    logo: "/ama-connect-logo.svg",
    buttonText: "View Case Study",
    tags: ["LegalTech", "UI/UX Design", "Mobile App", "Case Tracking"],
    iconBg: "bg-sky-500",
    meta: {
      role: "UX/UI Designer",
      platform: "Mobile App (iOS & Android)",
      focus: "UX Research, Wireframing, Case Desk, High-Fidelity UI",
      timeline: "Sept 2025 – Present",
      industry: "LegalTech & Pro Bono Legal Aid",
    },
    challenge:
      "Navigating complex legal procedures is often daunting, opaque, and unaffordable. Users needed an intuitive, trustworthy mobile platform to connect with verified lawyers quickly without getting bogged down by complicated legal jargon.",
    designGoals: [
      "Streamline lawyer discovery and consultations",
      "Design real-time Case Desk for tracking progress",
      "Reduce cognitive load through clear legal step-by-step guidance",
      "Establish trust and transparency with verified credentials",
      "Ensure WCAG-compliant accessible mobile UI",
    ],
    keyImprovements: [
      {
        num: "01",
        title: "Rapid Lawyer Matching",
        description: "Enabled users to match with verified attorneys and resolve pressing queries in under 45 minutes.",
      },
      {
        num: "02",
        title: "Real-Time Case Desk",
        description: "Introduced end-to-end case timeline tracking with live status updates and document vault.",
      },
      {
        num: "03",
        title: "Direct In-App Communication",
        description: "Implemented secure messaging, consultation scheduling, and updates directly inside the app.",
      },
      {
        num: "04",
        title: "Transparent Legal Categories",
        description: "Organized complex legal matters into plain-language, digestible service categories.",
      },
    ],
    informationArchitecture: [
      "Home & Fast Intake",
      "Lawyer Discovery",
      "Case Desk Timeline",
      "In-App Consultation",
      "Document Vault",
      "Profile & History",
    ],
    visualDesignPoints: [
      "High-contrast accessible color hierarchy",
      "Tactile card containers with clear status indicators",
      "Action-first navigation structure",
      "Trust-inducing verified badges and lawyer credentials",
    ],
    uxPrinciple: "Demystify legal procedures through empathetic, friction-free design.",
    outcome:
      "Grew AMA Connect to 2,500+ active users with a 4.9/5 rating across Play Store and App Store, featured on Bar & Bench.",
    results:
      "Grew AMA Connect to 2,500+ active users with a 4.9/5 rating across Play Store and App Store, featured on Bar & Bench.",
    metrics: [
      {
        value: "2,500+",
        label: "Active mobile app users",
      },
      {
        value: "4.9/5",
        label: "Rating across App Store & Play Store",
      },
      {
        value: "45 min",
        label: "Average lawyer query response time",
      },
    ],
    gallery: ["/ama-connect.jpg"],
    process: [
      {
        step: "User Research & Legal Journey Mapping",
        description:
          "Conducted interviews with pro bono legal seekers and attorneys to uncover communication and paperwork bottlenecks.",
      },
      {
        step: "Information Architecture & Case Desk Flows",
        description:
          "Designed the Case Desk architecture to give users real-time visibility into every phase of their legal assistance.",
      },
      {
        step: "Design System & Accessible Mobile UI",
        description:
          "Crafted high-contrast tokens, scalable typography hierarchies, and intuitive consultation flows in Figma.",
      },
    ],
  },
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
    screens: [
      {
        title: "Airtel Thanks App Screen Redesign",
        image: "/projects/New%20folder/Airtel_Homepage.svg",
        description: "Redesigning Airtel’s plan dashboard to make essential account information easier to scan, understand, and act on without navigating across multiple sections.",
        highlights: [
          "Unified plan status dashboard",
          "Clear typography & spacing hierarchy",
          "Contextual action chips",
          "Reduced visual noise & cognitive load"
        ],
        flaws: [
          "Fragmented plan information",
          "Weak information hierarchy",
          "Promotions interrupt key tasks",
          "Scattered usage details",
          "Multiple actions across sections"
        ],
        improvements: [
          "Unified plan details into one focused dashboard",
          "Prioritized validity, usage, calls, and SMS at a glance",
          "Reduced distractions around core account actions",
          "Added clear, contextual usage insights",
          "Grouped frequently used actions for faster access"
        ]
      },
      {
        title: "From Spam Folder to Smart Review",
        image: "/projects/New%20folder/Gmail_SPAM.svg",
        description: "Reimagining Gmail’s spam experience to help users quickly understand what’s risky, what’s worth reviewing, and what can be safely cleared.",
        highlights: [ 
          "Bulk action optimization",
          "Visual indicator for high-risk emails",
          "One-click 'Unsubscribe' & 'Block'",
          "Clear empty-state encouragement"
        ],
        flaws: [
          "No spam prioritization",
          "Limited spam insights",
          "Poor information hierarchy",
          "Basic filtering options",
          "Low email management efficiency"
        ],
        improvements: [
          "Prioritized potentially important and high-risk emails", 
          "Added useful spam activity and cleanup insights",
          "Created a clearer information hierarchy",
          "Introduced smart categories and advanced filters",
          "Added quick actions for faster spam management"
        ]
      },
      {
        title: "From Contact Grid to Smarter Sharing",
        image: "/projects/New%20folder/INSTA_REELS.svg",
        description: "Reworking Instagram’s Reel sharing flow to make finding people faster, reduce visual clutter, and keep sharing actions clear and organized.",
        highlights: [
          "Switched to a cleaner list for faster scanning",
          "Gave search a more prominent position",
          "Added selection controls for intentional sharing",
          "Separated in-app actions from external apps",
          "Used hierarchy to make key actions easier to find"
        ],
        flaws: [
          "Grid layout makes contacts harder to scan",
          "Search gets lost among sharing options",
          "All contacts have the same visual weight",
          "In-app and external actions feel mixed together",
          "No clear way to select a specific contact"
        ],
        improvements: [
          "Switched to a cleaner list for faster scanning",
          "Gave search a more prominent position",
          "Added selection controls for intentional sharing",
          "Separated in-app actions from external apps",
          "Used hierarchy to make key actions easier to find"
        ]
      },
      {
        title: "From Scrolling to Smarter Train Discovery",
        image: "/projects/New%20folder/IRCTC_BETAV.svg",
        description: "Reworking IRCTC’s train search experience to help users find the right train faster, with less scrolling, clearer filters, and a more focused search flow.",
        highlights: [
          "Added search by train name or number",
          "Made train discovery faster and more direct",
          "Unified search, filters, and sorting into one flow",
          "Created a clearer visual hierarchy",
          "Added one-tap quick filter chips"
        ],
        flaws: [
          "No way to search within results",
          "Excessive scrolling to find specific trains",
          "Search and filter controls feel fragmented",
          "Weak information hierarchy",
          "No quick filter shortcuts"
        ],
        improvements: [
          "Added search by train name or number",
          "Made train discovery faster and more direct",
          "Unified search, filters, and sorting into one flow",
          "Created a clearer visual hierarchy",
          "Added one-tap quick filter chips"
        ]
      },
      {
        title: "From Transaction List to Financial Clarity",
        image: "/projects/New%20folder/Paytm_Balance.svg",
        description: "Reworking Paytm’s balance and history experience to give users a clearer picture of their money, spending patterns, and recent transactions in one place.",
        highlights: [
          "Created an instant overview across linked accounts",
          "Made individual balances easier to scan",
          "Put spending and income insights upfront",
          "Added useful context to recent transactions",
          "Reduced distractions around core financial tasks"
        ],
        flaws: [
          "Financial information feels fragmented",
          "Account balances are difficult to compare",
          "Weak hierarchy between balance and transactions",
          "Limited context around spending",
          "Promotions compete with useful information"
        ],
        improvements: [
          "Created an instant overview across linked accounts",
          "Made individual balances easier to scan",
          "Put spending and income insights upfront",
          "Added useful context to recent transactions",
          "Reduced distractions around core financial tasks"
        ]
      },
      {
        title: "From Form Filling to Faster Route Discovery",
        image: "/projects/New%20folder/Railone_Search.svg",
        description: "Reworking RailOne’s train search flow to reduce repetitive inputs, make route selection more intuitive, and get users to relevant journeys faster.",
        highlights: [
          "Simplified the route-first search flow",
          "Made From and To selection more prominent",
          "Added one-tap frequent route searches",
          "Separated route, train number, and station searches",
          "Reduced friction for repeat journeys"
        ],
        flaws: [
          "Search flow feels form-heavy",
          "Weak hierarchy between search options",
          "Frequent routes are buried below the form",
          "Train and station search options compete for attention",
          "Re-entering common routes adds unnecessary effort"
        ],
        improvements: [
          "Simplified the route-first search flow",
          "Made From and To selection more prominent",
          "Added one-tap frequent route searches",
          "Separated route, train number, and station searches",
          "Reduced friction for repeat journeys"
        ]
      },
      {
        title: "From a Playlist to a Personal Music Hub",
        image: "/projects/New%20folder/Shopify_Liked.svg",
        description: "Reimagining Spotify’s Liked Songs to make saved music easier to explore, organize, and rediscover while adding more personalized context to the listening experience.",
        highlights: [
          "Added smarter search with genre and mood filters",
          "Introduced smart collections for easier discovery",
          "Added personalized listening insights",
          "Made song details more informative at a glance",
          "Improved the overall organization of saved music"
        ],
        flaws: [
          "Limited ways to organize saved songs",
          "Basic search makes specific tracks harder to find",
          "Saved music lacks discovery cues",
          "Song information feels minimal",
          "No personalized context around listening habits"
        ],
        improvements: [
          "Added smarter search with genre and mood filters",
          "Introduced smart collections for easier discovery",
          "Added personalized listening insights",
          "Made song details more informative at a glance",
          "Improved the overall organization of saved music"
        ]
      },
      {
        title: "From Media Dump to Organized Memories",
        image: "/projects/New%20folder/Whatsaap_Media.svg",
        description: "Reimagining WhatsApp’s media view to help users find shared photos and videos faster, with better organization and a more useful browsing experience.",
        highlights: [
          "Added smart collections for faster discovery",
          "Introduced a chronological media timeline",
          "Added simple filters for different media types",
          "Improved visual hierarchy across the screen",
          "Made frequently needed media easier to navigate"
        ],
        flaws: [
          "No quick way to revisit specific media",
          "Limited options for content discovery",
          "Media feels poorly organized",
          "Weak hierarchy between content types",
          "Experience relies heavily on endless scrolling"
        ],
        improvements: [
          "Added smart collections for faster discovery",
          "Introduced a chronological media timeline",
          "Added simple filters for different media types",
          "Improved visual hierarchy across the screen",
          "Made frequently needed media easier to navigate"
        ]
      }
    ]
  },
];
