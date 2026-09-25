import { routing } from "@/i18n/routing";

/**
 * Builds the hreflang alternate-language map for a given locale-neutral path
 * (e.g. "/solutions", "" for the homepage). Next.js replaces (not merges) a
 * route's `alternates` object when a page defines its own, so every page's
 * `generateMetadata` must spread this in itself - defining it once here
 * only, at the root layout, silently produces zero hreflang tags on every
 * page that sets its own canonical (which is every real page on this site).
 */
export function alternateLanguages(path: string): Record<string, string> {
  const entries = routing.locales.map((locale) => [
    locale,
    locale === routing.defaultLocale ? `${siteConfig.url}${path}` : `${siteConfig.url}/${locale}${path}`
  ]);
  return { ...Object.fromEntries(entries), "x-default": `${siteConfig.url}${path}` };
}

export const siteConfig = {
  name: "Pearstop",
  url: "https://www.pearstop.com",
  description:
    "Pearstop cleans and classifies procurement and asset data for hard services, construction, infrastructure, and manufacturing companies.",
  email: "inquiries@pearstop.com",
  calendly: "https://calendly.com/stephanie-pearstop/7-min-discovery",
  demoCalendly: "https://calendly.com/stephanie-pearstop/demo-call",
  assets: {
    logo: "/brand/logo-dark.webp",
    logoInverse: "/brand/logo-light.webp",
    heroVideo: "/video/section.mp4",
    heroVideoPoster: "/images/photos/construction-planner-woman-1.png",
    productDemoVideo: "/video/product-demo.mp4",
    productDemoVideoPoster: "/images/home/product-demo-poster.webp",
    leadMagnet: "/images/photos/construction-planner-woman-1.png",
    blogPodcast: "/images/blog/podcast.webp",
    clients: {
      strukton: "/images/clients/strukton.png",
      fmo: "/images/clients/fmo.png",
      faro: "/images/clients/faro.png",
      spie: "/images/clients/spie.webp",
      kelpBlue: "/images/clients/kelp-blue.png",
      lemtech: "/images/clients/lemtech.svg"
    },
    team: {
      stephanie: "/images/clients/stephanie-headshot-team.png",
      richard: "/images/clients/richard-headshot.png",
      raeesah: "/images/clients/raeesah-headshot.png",
      neharika: "/images/clients/neharika-headshot.png",
      max: "/images/clients/max-headshot.png",
      robin: "/images/clients/robin-headshot.png",
      dania: "/images/clients/dania-headshot.png",
      sjoerd: "/images/clients/sjoerd-headshot.png",
      vince: "/images/clients/vince-headshot.jpg",
      david: "/images/clients/david-headshot.jpg",
    },
    home: {
      spendControl: "/images/photos/office-desk-woman-1.png",
      assetManagement: "/images/photos/the-city-2.png",
      scaleConfidence: "/images/photos/office-worker-1.png",
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
  children?: NavLink[];
};

export const solutionLinks: NavLink[] = [
  {
    label: "Invoice & Document Extraction",
    href: "/invoice-data-extraction",
    description: "Turn unread PDFs and scans into structured data.",
    children: [
      { label: "For Construction", href: "/invoice-extraction-construction" },
      { label: "For Cleaning", href: "/invoice-extraction-cleaning" },
      { label: "For Facilities Management", href: "/invoice-extraction-fm" }
    ]
  },
  {
    label: "UNSPSC Classification",
    href: "/unspsc",
    description: "Automated classification, including tracing parts to the real manufacturer code.",
    children: [
      { label: "AI UNSPSC Classification Guide", href: "/unspsc-ai-classification-guide" },
      { label: "Free UNSPSC Lookup", href: "/unspsc-code-lookup" },
      { label: "UNSPSC Taxonomy Tree", href: "/unspsc-classification-demo" },
      { label: "UNSPSC for FM", href: "/unspsc-classification-facilities-management" },
      { label: "UNSPSC Netherlands", href: "/unspsc-classification-netherlands" },
      { label: "UNSPSC Germany", href: "/unspsc-classification-germany" }
    ]
  },
  {
    label: "Spend Visibility",
    href: "/procurement-data-quality",
    description: "A real spend baseline to negotiate, tender, and check framework compliance from.",
    children: [
      { label: "Spend Cube & Dashboards", href: "/spend-cube" }
    ]
  },
  {
    label: "Data Readiness",
    href: "/data-quality",
    description: "The clean, structured data an ERP migration, Microsoft Fabric, or an AI initiative all depend on.",
    children: [
      { label: "ERP Migration Data Cleansing", href: "/erp-migration-data-cleansing" },
      { label: "Fabric Ready", href: "/fabric" },
      { label: "AI Readiness", href: "/ai-readiness" }
    ]
  },
  { label: "Asset Data Management", href: "/asset-data-management", description: "An independent, classified view of spend and maintenance data you don't generate yourself." },
  { label: "For Procurement Consultancies", href: "/procurement-consultancies", description: "White-labelled spend classification under your own taxonomy, delivered as your engagement's data layer." }
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
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" }
];

export const footerSolutionLinks: NavLink[] = [
  { label: "Invoice & Document Extraction", href: "/invoice-data-extraction" },
  { label: "Invoice Extraction for Construction", href: "/invoice-extraction-construction" },
  { label: "Invoice Extraction for Cleaning", href: "/invoice-extraction-cleaning" },
  { label: "Invoice Extraction for Facilities Management", href: "/invoice-extraction-fm" },
  { label: "ERP Migration Data Cleansing", href: "/erp-migration-data-cleansing" },
  { label: "Data Readiness", href: "/data-quality" },
  { label: "Spend Visibility", href: "/procurement-data-quality" },
  { label: "Spend Cube & Dashboards", href: "/spend-cube" },
  { label: "Asset Data Management", href: "/asset-data-management" },
  { label: "For Procurement Consultancies", href: "/procurement-consultancies" },
  { label: "UNSPSC Classification", href: "/unspsc" },
  { label: "AI UNSPSC Classification Guide", href: "/unspsc-ai-classification-guide" },
  { label: "Free UNSPSC Lookup", href: "/unspsc-code-lookup" },
  { label: "UNSPSC Taxonomy Tree", href: "/unspsc-classification-demo" },
  { label: "UNSPSC for FM", href: "/unspsc-classification-facilities-management" },
  { label: "UNSPSC Netherlands", href: "/unspsc-classification-netherlands" },
  { label: "UNSPSC Germany", href: "/unspsc-classification-germany" },
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
  image?: string;
  imageFit?: "contain" | "cover";
  type: "client" | "pattern";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "strukton",
    type: "client",
    title: "Classified 35,000 to 50,000 procurement lines a month into UNSPSC, from zero classification history",
    category: "Infrastructure · Netherlands",
    excerpt:
      "Strukton had identified a real cost-saving opportunity in procurement but needed higher granularity to act on it. Pearstop built an AI classification system with their procurement team: automated UNSPSC classification to all four hierarchy levels, a human-in-the-loop review step, and a weekly feedback loop with their buyers.",
    tags: ["Procurement", "UNSPSC"],
    statPrimary: "35k–50k",
    statPrimaryLabel: "Lines / month",
    statSecondary: "4",
    statSecondaryLabel: "UNSPSC levels",
    tone: "from-blue",
    image: siteConfig.assets.clients.strukton,
    imageFit: "contain"
  },
  {
    slug: "faro",
    type: "client",
    title: "Accurate margin estimates on every container purchase, automatically",
    category: "Retail · South Africa",
    excerpt:
      "For every purchasing decision, FARO needed to categorise around 30,000 product lines per five containers to estimate margin. Pearstop automated the classification and linked it directly to their sales database.",
    tags: ["Procurement", "Data Quality"],
    statPrimary: "30k",
    statPrimaryLabel: "Lines / decision",
    statSecondary: "1 wk",
    statSecondaryLabel: "Classification time",
    tone: "from-slate",
    image: siteConfig.assets.clients.faro,
    imageFit: "contain"
  },
  {
    slug: "spie",
    type: "client",
    title: "Cleaning the Asset Records of SPIE Building Solutions",
    category: "Hard Services FM · Europe",
    excerpt:
      "SPIE's asset register had grown messy across systems and contractors. Pearstop applied its procurement-data classification pipeline to consolidate 9,175 supplier name variants into 1,493 canonical suppliers across 204,029 records — the same engine that cleans spend data, proven on a different kind of messy dataset.",
    tags: ["Data Quality", "Supplier Matching"],
    statPrimary: "204k",
    statPrimaryLabel: "Records cleaned",
    statSecondary: "73.1%",
    statSecondaryLabel: "Confirmed match rate",
    tone: "from-green",
    image: siteConfig.assets.clients.spie,
    imageFit: "contain"
  },
  {
    slug: "construction-spend-benchmarking",
    type: "pattern",
    title: "Your estimating problem is not an estimating problem",
    category: "Construction & Infrastructure · Anonymized use case",
    excerpt:
      "One aluminium windowsill, bought on ten projects, described ten different ways - a 45% price spread, invisible until classified. An illustrative use case based on a real pattern in construction and infrastructure procurement.",
    tags: ["Procurement", "UNSPSC"],
    statPrimary: "45%",
    statPrimaryLabel: "Price spread, one item",
    statSecondary: "8-15%",
    statSecondaryLabel: "Typical savings",
    tone: "from-amber",
    image: "/images/cases/manufacturing-machine.svg",
    imageFit: "cover"
  },
  {
    slug: "cleaning-consumables-consolidation",
    type: "pattern",
    title: "Nobody chose 30 toilet paper suppliers. They just couldn't see them.",
    category: "Cleaning & Soft FM · Anonymized use case",
    excerpt:
      "30 different suppliers invoiced one cleaning business for toilet paper in twelve months. Classified, the pattern - and the three suppliers worth keeping - was visible in days. An illustrative use case based on a real pattern in soft FM procurement.",
    tags: ["Procurement", "Data Quality"],
    statPrimary: "68%",
    statPrimaryLabel: "Price spread, same product",
    statSecondary: "10-20%",
    statSecondaryLabel: "Typical savings",
    tone: "from-slate",
    image: "/images/cases/warehouse-sorting.svg",
    imageFit: "cover"
  },
  {
    slug: "lemtech",
    type: "client",
    title: "Turning site visit reports into clean proposal documents, automatically",
    category: "Manufacturing",
    excerpt:
      "Site visit reports arrived in every format imaginable. Pearstop built a system that reads incoming reports and automatically outputs a clean, accurate proposal document.",
    tags: ["Asset Management", "Data Quality"],
    statPrimary: "1–3 hrs",
    statPrimaryLabel: "Saved per proposal",
    statSecondary: "~0",
    statSecondaryLabel: "Manual re-entry",
    tone: "from-indigo",
    image: "/images/cases/windmills.svg",
    imageFit: "cover"
  },
  {
    slug: "mro-confidential",
    type: "pattern",
    title: "Going direct to the manufacturer on MRO parts",
    category: "Manufacturing / MRO · Anonymized use case",
    excerpt:
      "Buying MRO parts direct from the manufacturer usually means researching the real part number by hand, typically outsourced to an offshore research bureau. AI can do that research faster, but general models hallucinate part numbers and don't check their own work - which is exactly where a specialized, checked AI pipeline matters.",
    tags: ["Procurement", "Data Quality"],
    statPrimary: "Direct",
    statPrimaryLabel: "To manufacturer",
    statSecondary: "Checked",
    statSecondaryLabel: "Not guessed",
    tone: "from-cobalt",
    image: "/images/cases/bottling-line.svg",
    imageFit: "cover"
  }
];

export type CaseStudyDetail = {
  slug: string;
  eyebrow: string;
  title: string;
  lead: string;
  /** Optional longer context paragraph, rendered in a dedicated section
   * right below the hero (kept out of the hero itself so the hero title/lead
   * can stay short). */
  intro?: string;
  challenge: string;
  solution: string;
  wins: { value: string; label: string }[];
  quote?: string;
  author?: string;
  role?: string;
  geo: string;
  ctaLabel: string;
  ctaHref: string;
};

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
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
  }
};



export const industryCards = [
  {
    title: "Infrastructure",
    href: "#infrastructure",
    copy: "Know where a named savings target actually sits in the spend, before you try to find it by hand."
  },
  {
    title: "Facilities Management",
    href: "#facilities-management",
    copy: "Integrated FM, hard services, and soft services, each with its own data problem and its own fix.",
    links: [
      { label: "Integrated FM", href: "#integrated-fm" },
      { label: "Hard Services", href: "#hard-services" },
      { label: "Soft Services", href: "#soft-services" }
    ]
  },
  {
    title: "Cleaning",
    href: "#cleaning",
    copy: "Get every invoice read and checked against the contract, instead of taking the total on trust."
  },
  {
    title: "Construction",
    href: "#construction",
    copy: "Turn spend spread across entities and projects into one categorised, group-wide view."
  },
  {
    title: "Manufacturers of Building Systems",
    href: "#manufacturing",
    copy: "Extend the classification standard one entity already runs to every plant and site."
  },
  {
    title: "Asset Owners",
    href: "#asset-owners",
    copy: "Get an independent, comparable view of what is spent on your behalf, not just a provider's report."
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
