export const siteConfig = {
  name: "Pearstop",
  url: "https://www.pearstop.com",
  description:
    "Pearstop cleans and classifies procurement and asset data for hard services, construction, infrastructure, and manufacturing companies.",
  email: "inquiries@pearstop.com",
  calendly: "https://calendly.com/stephanie-pearstop/7-min-discovery",
  assets: {
    logo: "/brand/logo-dark.webp",
    logoInverse: "/brand/logo-light.webp",
    heroVideo: "/video/section.mp4",
    heroVideoPoster: "/images/home/spend-control.webp",
    leadMagnet: "/images/lead-magnet/whitepaper-cover.jpg",
    blogPodcast: "/images/blog/podcast.webp",
    clients: {
      strukton: "/images/clients/strukton.png",
      fmo: "/images/clients/fmo.png",
      faro: "/images/clients/faro.png",
      spie: "/images/clients/spie.webp",
      kelpBlue: "/images/clients/kelp-blue.png"
    },
    team: {
      stephanie: "/images/clients/stephanie-headshot.png",
      richard: "/images/clients/richard-headshot.png"
    },
    home: {
      spendControl: "/images/home/spend-control.webp",
      assetManagement: "/images/home/asset-management.webp",
      scaleConfidence: "/images/home/scale-confidence.webp",
      demo: "/images/home/demo.webp"
    }
  },
  downloads: {
    caseStudiesPdf: "https://docs.google.com/presentation/d/1QMJJo8U7Sc4o54PxmjSDQTg76L65pncExkcUvEbuAh8/export/pdf",
    caseStudiesView: "https://docs.google.com/presentation/d/1QMJJo8U7Sc4o54PxmjSDQTg76L65pncExkcUvEbuAh8/view?usp=sharing"
  },
  socials: {
    linkedin: "https://www.linkedin.com/company/pearstop",
    youtube: "https://www.youtube.com/playlist?list=PLBmjBcqpuejp4B-A1ZuiXYt-P5DFwR4yH",
    instagram: "https://www.instagram.com/pearstop_/"
  }
} as const;

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export const solutionLinks: NavLink[] = [
  { label: "Procurement data quality", href: "/procurement-data-quality", description: "Category management and spend visibility." },
  { label: "Asset Data Management", href: "/asset-data-management", description: "Reliable asset registers for FM and maintenance." },
  { label: "Data Quality", href: "/data-quality", description: "Clean, standardise, and enrich operational data." },
  { label: "Fabric Ready", href: "/fabric", description: "Prepare for Microsoft Fabric migration." },
  { label: "AI Readiness", href: "/ai-readiness", description: "Build a trustworthy AI data foundation." },
  { label: "UNSPSC", href: "/unspsc", description: "Automated procurement classification at scale." }
];

export const mainNavLinks: NavLink[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "Cases", href: "/cases" }
];

export const footerCompanyLinks: NavLink[] = [
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about-us" },
  { label: "Case Studies", href: "/cases" },
  { label: "Download Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" }
];

export const footerSolutionLinks: NavLink[] = [
  { label: "Data Quality", href: "/data-quality" },
  { label: "Procurement", href: "/procurement-data-quality" },
  { label: "Asset Data Management", href: "/asset-data-management" },
  { label: "UNSPSC", href: "/unspsc" },
  { label: "Fabric Ready", href: "/fabric" },
  { label: "AI Readiness", href: "/ai-readiness" }
];

export type FeatureCard = {
  title: string;
  copy: string;
  href: string;
};

export const homeBenefits: FeatureCard[] = [
  {
    title: "Maximize Spend Control",
    copy:
      "Automatically classify every procurement line, at scale. 35,000 lines a month, no manual work. Turn incoherent ledger lines into a single source of truth so your procurement team can see exactly where money is going, activate competition across suppliers, and negotiate better contracts.",
    href: "/unspsc"
  },
  {
    title: "Your Asset List Should Work For You, Not Against You",
    copy:
      "If your asset list needs human interpretation, it is not usable. We clean spelling errors, fix field mismatches, and structure your asset data so systems - and people - can actually work with it. Ready for maintenance planning, lifecycle analysis, and smarter bidding.",
    href: "/asset-data-management"
  },
  {
    title: "Scale With Confidence, Not Headcount",
    copy:
      "End the Excel heroics. Reduce manual data clean-up by 70-90%, freeing up your best buyers, engineers, analysts, and project managers for work that actually moves the needle.",
    href: "/data-quality"
  }
];

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  tags: string[];
  statPrimary: string;
  statPrimaryLabel: string;
  statSecondary: string;
  statSecondaryLabel: string;
  tone: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "strukton",
    title: "Classifying 35,000 procurement lines a month into UNSPSC",
    category: "Infrastructure · Netherlands",
    excerpt:
      "We are currently working with a major Dutch infrastructure contractor on automated UNSPSC classification at scale. Case study coming soon.",
    tags: ["Procurement", "UNSPSC"],
    statPrimary: "35k",
    statPrimaryLabel: "Lines / month",
    statSecondary: "SAP",
    statSecondaryLabel: "Source system",
    tone: "from-blue"
  },
  {
    slug: "faro",
    title: "Accurate margin estimates on every container purchase, automatically",
    category: "Retail · South Africa",
    excerpt:
      "For every purchasing decision, FARO needed to categorise around 30,000 product lines per five containers to estimate margin. Pearstop automated the classification and linked it directly to their sales database.",
    tags: ["Procurement", "Data Quality"],
    statPrimary: "30k",
    statPrimaryLabel: "Lines / decision",
    statSecondary: "1 wk",
    statSecondaryLabel: "Classification time",
    tone: "from-slate"
  },
  {
    slug: "spie",
    title: "Cleaning 100,000 assets as the foundation for smarter maintenance",
    category: "Hard Services FM · Europe",
    excerpt:
      "SPIE's asset database had grown organically across sites and systems. Pearstop cleaned and structured the full register, creating a reliable foundation for maintenance planning and lifecycle analysis.",
    tags: ["Asset Management", "Data Quality"],
    statPrimary: "100k+",
    statPrimaryLabel: "Assets cleaned",
    statSecondary: "95%",
    statSecondaryLabel: "Structured",
    tone: "from-green"
  },
  {
    slug: "manufacturing-spend",
    title: "Uncovering procurement inefficiencies hidden in unclassified spend",
    category: "Manufacturing · Europe",
    excerpt:
      "A mid-sized manufacturer had years of procurement data in SAP with no consistent categorisation. Pearstop cleaned and classified the full spend dataset, surfacing immediately actionable inefficiencies.",
    tags: ["Procurement", "UNSPSC"],
    statPrimary: "SAP",
    statPrimaryLabel: "Direct integration",
    statSecondary: "95%",
    statSecondaryLabel: "Auto-classified",
    tone: "from-amber"
  },
  {
    slug: "lemtech",
    title: "Turning site visit reports into clean proposal documents, automatically",
    category: "Manufacturing · Air Filtration",
    excerpt:
      "LemTech's site visit reports arrived in every format imaginable. Pearstop built a system that reads incoming reports and automatically outputs a clean, accurate proposal document.",
    tags: ["Asset Management", "Data Quality"],
    statPrimary: "Hours",
    statPrimaryLabel: "Saved per proposal",
    statSecondary: "~0",
    statSecondaryLabel: "Manual re-entry",
    tone: "from-indigo"
  },
  {
    slug: "fmo",
    title: "From fragmented project data to MT-level capacity planning",
    category: "Finance · Netherlands",
    excerpt:
      "FMO's PMO needed a clear view of project capacity and resource allocation across a complex portfolio. Pearstop cleaned and structured the full project dataset and built the dashboards that gave MT visibility to make confident decisions.",
    tags: ["Data Quality", "Reporting"],
    statPrimary: "Full",
    statPrimaryLabel: "Portfolio visibility",
    statSecondary: "0",
    statSecondaryLabel: "Manual aggregation",
    tone: "from-cobalt"
  }
];

export type CaseStudyDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  challenge: string;
  solution: string;
  wins: { value: string; label: string }[];
  quote: string;
  author: string;
  role: string;
  geo: string;
  ctaLabel: string;
  ctaHref: string;
};

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "strukton": {
    slug: "strukton",
    eyebrow: "Infrastructure · Netherlands",
    title: "Classifying 35,000 procurement lines a month into UNSPSC",
    lead:
      "We are currently working with Strukton, a major Dutch infrastructure contractor, on automated UNSPSC classification at scale.",
    challenge:
      "The team needed a reliable way to turn large volumes of procurement lines into structured categories without adding headcount or creating another manual burden.",
    solution:
      "Pearstop provides automated classification and review so the team can keep their focus on category management and supplier decisions while the system handles the repetitive work.",
    wins: [
      { value: "35k", label: "lines a month" },
      { value: "SAP", label: "system of record" },
      { value: "Coming soon", label: "full case study" }
    ],
    quote:
      "We are working through the classification problem at scale so procurement can focus on the decisions that matter.",
    author: "Pearstop client",
    role: "Infrastructure contractor",
    geo:
      "This work sits squarely in the procurement data quality and UNSPSC lane - exactly where hard services companies feel the pain first.",
    ctaLabel: "Follow our LinkedIn for updates",
    ctaHref: siteConfig.socials.linkedin
  },
  "spie": {
    slug: "spie",
    eyebrow: "Hard Services FM · Europe",
    title: "Cleaning 100,000 assets as the foundation for smarter maintenance",
    lead:
      "SPIE's asset database had grown organically across sites and systems. Pearstop cleaned and structured the full register, creating a reliable foundation for maintenance planning and lifecycle analysis.",
    challenge:
      "Asset records were spread across spreadsheets and legacy systems, with spelling errors, field mismatches, and duplicate records making analysis unreliable.",
    solution:
      "Pearstop consolidated the asset data, standardised the structure, and created a clean register that could support maintenance decisions and analysis.",
    wins: [
      { value: "100k+", label: "assets cleaned" },
      { value: "Structured", label: "analysis-ready" },
      { value: "FM", label: "use case" }
    ],
    quote:
      "Our asset lists worked for mechanics on-site, but did not allow us to plan smart maintenance or manage bid risk in a data-driven way.",
    author: "Asset Manager",
    role: "Facilities Management",
    geo:
      "This is the same asset data problem that shows up across hard services, FM, and infrastructure teams whenever records were built for operations rather than analysis.",
    ctaLabel: "Book a 7-minute discovery",
    ctaHref: "/contact"
  },
  "lemtech": {
    slug: "lemtech",
    eyebrow: "Manufacturing · Air Filtration",
    title: "Turning site visit reports into clean proposal documents, automatically",
    lead:
      "LemTech's site visit reports arrived in every format imaginable - handwritten notes, spelling mistakes, varying layouts. Pearstop built a system that reads incoming reports and automatically outputs a clean, accurate proposal document.",
    challenge:
      "The commercial team was spending too much time retyping and reconciling site-visit notes into a proposal format that the business could trust.",
    solution:
      "Pearstop interpreted the incoming notes, pulled the right products and specifications, and returned a cleaner proposal workflow with much less manual re-entry.",
    wins: [
      { value: "Hours", label: "saved per proposal" },
      { value: "~0", label: "manual re-entry" },
      { value: "Accurate", label: "specification capture" }
    ],
    quote:
      "Our site visit reports come in every format imaginable - handwritten notes, spelling mistakes, scribbles. Pearstop built a system that reads them and automatically pulls the right items into a clean proposal document.",
    author: "Vince Out",
    role: "Commercial Manager, LemTech",
    geo:
      "This is a manufacturing example of the same core problem: operational data is messy, inconsistent, and expensive to handle by hand.",
    ctaLabel: "Explore AI readiness",
    ctaHref: "/ai-readiness"
  },
  "fmo": {
    slug: "fmo",
    eyebrow: "Finance · Netherlands",
    title: "From fragmented project data to MT-level capacity planning",
    lead:
      "FMO's PMO office needed a clear view of project capacity and resource allocation across a complex portfolio. Pearstop cleaned and structured the full project dataset and built the dashboards that gave MT the visibility to make confident decisions.",
    challenge:
      "The portfolio data was fragmented and inconsistent, making it difficult for the leadership team to get a reliable view of workload and capacity.",
    solution:
      "Pearstop structured the underlying dataset and produced a cleaner reporting view so management could make capacity decisions with confidence.",
    wins: [
      { value: "Full", label: "portfolio visibility" },
      { value: "MT", label: "level decision making" },
      { value: "0", label: "manual aggregation" }
    ],
    quote:
      "A clear view of project capacity makes the difference between guesswork and confident decision making.",
    author: "Programme Lead",
    role: "FMO",
    geo:
      "This is the kind of data quality problem that shows up in reporting-heavy organisations when source data was never designed for strategic use.",
    ctaLabel: "View more cases",
    ctaHref: "/cases"
  },
  "manufacturing-spend": {
    slug: "manufacturing-spend",
    eyebrow: "Manufacturing · Europe",
    title: "Uncovering procurement inefficiencies hidden in unclassified spend",
    lead:
      "A mid-sized manufacturer had years of procurement data in SAP with no consistent categorisation. Without spend visibility, identifying supplier consolidation opportunities or benchmarking costs across sites was impossible.",
    challenge:
      "The procurement team needed to turn messy spend into a category-level view that leadership could actually use.",
    solution:
      "Pearstop cleaned and classified the full spend dataset, surfacing inefficiencies that were immediately actionable for the procurement team.",
    wins: [
      { value: "Full", label: "spend baseline" },
      { value: "SAP", label: "direct integration" },
      { value: "95%", label: "auto-classified" }
    ],
    quote:
      "The team needed a clean baseline before it could negotiate better contracts and consolidate suppliers.",
    author: "Procurement Lead",
    role: "Manufacturing client",
    geo:
      "This is a strong example of procurement data quality work in manufacturing, where SAP data often needs a lot of help before it becomes usable.",
    ctaLabel: "Explore procurement",
    ctaHref: "/procurement-data-quality"
  }
};

export type LegacyEntry = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  accent?: string;
};

export const legacyLearningCentre: Record<string, LegacyEntry> = {
  "spreadsheets-history-future": {
    slug: "spreadsheets-history-future",
    title: "The Rise (and Rise) of Spreadsheets: Past, Present, and the AI Future",
    category: "Learning Centre · AI · MS Excel",
    summary:
      "A legacy article on how spreadsheets became central to modern business and how AI changes the role they play.",
    bullets: [
      "Shows the history of spreadsheet adoption and why it became the default business tool.",
      "Frames spreadsheets as the starting point for a broader data and automation conversation.",
      "Preserves a useful SEO entry point for AI-adjacent search traffic."
    ],
    ctaLabel: "Read the blog",
    ctaHref: "/blog"
  },
  "data-handling-acquire-organise-analyse-deliver": {
    slug: "data-handling-acquire-organise-analyse-deliver",
    title: "Data Handling: Acquire, Organise, Analyse, Deliver",
    category: "Learning Centre · Data Access",
    summary:
      "A practical guide to the four steps of handling business data and creating usable insight.",
    bullets: [
      "Acquisition, organisation, analysis, and delivery are treated as a single workflow.",
      "Useful bridge content for readers comparing data operations and reporting maturity.",
      "Preserved for legacy URL continuity and topical authority."
    ],
    ctaLabel: "Explore data quality",
    ctaHref: "/data-quality"
  },
  "serving-the-future-of-ai-and-data-analytics": {
    slug: "serving-the-future-of-ai-and-data-analytics",
    title: "Serving the Future of AI and Data Analytics",
    category: "Learning Centre · AI",
    summary:
      "A legacy article about how analytics is shifting toward automation and AI-assisted insight generation.",
    bullets: [
      "Explains the link between automated analytics and reliable inputs.",
      "Still useful for broad AI discovery queries.",
      "Redirects readers to Pearstop's modern AI readiness message."
    ],
    ctaLabel: "See AI readiness",
    ctaHref: "/ai-readiness"
  }
};

export const legacyUseCases: Record<string, LegacyEntry> = {
  "data-driven-asset-management": {
    slug: "data-driven-asset-management",
    title: "Data Driven Asset Management",
    category: "Use Cases · Building Technologies",
    summary:
      "A legacy use case showing how a global building-solutions company unified asset data and improved maintenance performance.",
    bullets: [
      "Links clean asset registers to predictive maintenance and lifecycle decisions.",
      "Supports the new asset data management page with older SEO value.",
      "Useful for readers who still search the legacy use-cases path."
    ],
    ctaLabel: "See asset data management",
    ctaHref: "/asset-data-management"
  },
  "procurement-data-classification": {
    slug: "procurement-data-classification",
    title: "Procurement Data Classification",
    category: "Use Cases · Procurement",
    summary:
      "A legacy procurement use case focused on category management, supplier leverage, and spend analysis.",
    bullets: [
      "Preserves a strong legacy procurement-intent landing page.",
      "Carries searchers forward to the new procurement data quality page.",
      "Highlights the same category management problem in updated language."
    ],
    ctaLabel: "See procurement data quality",
    ctaHref: "/procurement-data-quality"
  },
  "cost-calculation-for-facilities-management": {
    slug: "cost-calculation-for-facilities-management",
    title: "Cost Calculation for Facilities Management",
    category: "Use Cases · Facilities Management",
    summary:
      "A legacy FM tender use case showing how cost calculation improves speed, win rate, and margin confidence.",
    bullets: [
      "Supports the broader cases hub with a high-intent FM story.",
      "Preserves a path for searchers looking for tender and proposal automation.",
      "Connects to the procurement and data quality services underneath."
    ],
    ctaLabel: "See cases",
    ctaHref: "/cases"
  }
};

export const legacyWork: Record<string, LegacyEntry> = {
  "data-rooms": {
    slug: "data-rooms",
    title: "Pearstop for Data Rooms",
    category: "Legacy Work · AI",
    summary:
      "AI-powered document search, automated summaries, contradiction and opportunity identification for secure data rooms.",
    bullets: [
      "Preserves the old AI/data-room landing page URL.",
      "Useful for due diligence, PE, and legal search traffic.",
      "Modernised messaging can point readers toward AI readiness."
    ],
    ctaLabel: "See AI readiness",
    ctaHref: "/ai-readiness"
  },
  "due-diligence": {
    slug: "due-diligence",
    title: "Pearstop for Due Diligence",
    category: "Legacy Work · AI",
    summary:
      "A legacy due diligence page with secure document search, summarisation, and data tagging for transaction teams.",
    bullets: [
      "Keeps a high-intent M&A URL alive.",
      "Explains the secure search and summary workflow in modern terms.",
      "Routes the reader to the main AI and Fabric story."
    ],
    ctaLabel: "See AI readiness",
    ctaHref: "/ai-readiness"
  },
  "ai-consulting": {
    slug: "ai-consulting",
    title: "AI Consulting",
    category: "Legacy Work · Reporting and AI",
    summary:
      "Legacy consulting page covering AI training, reporting automation, and custom data flows.",
    bullets: [
      "Keeps older service naming discoverable.",
      "Reframes the page around clean data foundations for AI and reporting.",
      "Useful for visitors arriving from older social or search links."
    ],
    ctaLabel: "See AI readiness",
    ctaHref: "/ai-readiness"
  }
};

export const industryCards = [
  {
    title: "Soft Services (FM)",
    href: "#soft-services",
    copy: "Identify fixed-price contracts creating margin pressure before offering. Provide value beyond basic operations."
  },
  {
    title: "Construction",
    href: "#construction",
    copy: "Improve margin accuracy through procurement and people cost estimates. Establish spend baselines."
  },
  {
    title: "Manufacturing",
    href: "#manufacturing",
    copy: "Reduce costs and protect margins with accurate parts data, standardised supplier codes, and faster procurement workflows."
  },
  {
    title: "Hard Services (FM)",
    href: "#hard-services",
    copy: "Address workforce knowledge loss. Prevent low-margin execution. Enable meaningful digital transformation."
  },
  {
    title: "Infrastructure",
    href: "#infrastructure",
    copy: "Ensure critical asset reliability. Manage pricing squeeze and rising material costs through data clarity."
  },
  {
    title: "Building Technology",
    href: "#building-tech",
    copy: "Move beyond commoditisation. Transform digitalisation strategically. Integrate acquisitions efficiently."
  }
];

export const faqItems = {
  procurement: [
    {
      q: "What is procurement data quality and why does it matter for hard services companies?",
      a:
        "Procurement data quality refers to the accuracy, consistency, and completeness of spend data across invoices, purchase orders, and supplier records. For hard services companies managing decentralised purchasing, poor data quality makes category management impossible. Teams cannot see what they are buying, from whom, or at what cost."
    },
    {
      q: "Do you integrate directly with SAP or other ERP systems?",
      a:
        "Pearstop can receive data via direct API connection or via CSV export from your existing systems, including SAP, Oracle, and other ERP and P2P platforms. In practice, many clients find that CSV is the simplest way to start."
    },
    {
      q: "How long does it take to see results?",
      a:
        "Most clients have a clean, classified dataset ready to use within four to six weeks of starting. The first engagement starts with a Data Stability Baseline so you can assess the output before committing further."
    }
  ]
} as const;
