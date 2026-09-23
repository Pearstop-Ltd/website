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
  assets: {
    logo: "/brand/logo-dark.webp",
    logoInverse: "/brand/logo-light.webp",
    heroVideo: "/video/section.mp4",
    heroVideoPoster: "/images/home/spend-control.webp",
    productDemoVideo: "/video/product-demo.mp4",
    productDemoVideoPoster: "/images/home/product-demo-poster.webp",
    leadMagnet: "/images/lead-magnet/solar-panels.png",
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
  children?: NavLink[];
};

export const solutionLinks: NavLink[] = [
  { label: "Invoice & Document Extraction", href: "/invoice-data-extraction", description: "Turn unread PDFs and scans into structured data." },
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
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "strukton",
    title: "Strukton (project in progress) — Classifying 35,000 procurement lines a month into UNSPSC",
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
    tone: "from-slate",
    image: siteConfig.assets.clients.faro,
    imageFit: "contain"
  },
  {
    slug: "spie",
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
    tone: "from-amber",
    image: "/images/cases/manufacturing-machine.svg",
    imageFit: "cover"
  },
  {
    slug: "lemtech",
    title: "Turning site visit reports into clean proposal documents, automatically",
    category: "Manufacturing",
    excerpt:
      "Site visit reports arrived in every format imaginable. Pearstop built a system that reads incoming reports and automatically outputs a clean, accurate proposal document.",
    tags: ["Asset Management", "Data Quality"],
    statPrimary: "Hours",
    statPrimaryLabel: "Saved per proposal",
    statSecondary: "~0",
    statSecondaryLabel: "Manual re-entry",
    tone: "from-indigo",
    image: "/images/cases/windmills.svg",
    imageFit: "cover"
  },
  {
    slug: "mro-confidential",
    title: "MRO (Confidential) — Part number enrichment to go direct to manufacturer",
    category: "Manufacturing / MRO",
    excerpt:
      "Part number enrichment to go direct to manufacturer. Full case study confidential.",
    tags: ["Procurement", "Data Quality"],
    statPrimary: "Direct",
    statPrimaryLabel: "To manufacturer",
    statSecondary: "MRO",
    statSecondaryLabel: "Part enrichment",
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
  "strukton": {
    slug: "strukton",
    eyebrow: "Infrastructure · Netherlands",
    title: "Classifying 35,000 procurement lines a month into UNSPSC",
    lead:
      "Strukton is a major Dutch infrastructure contractor running automated UNSPSC classification at scale with Pearstop. The engagement is still in progress, so this page describes the shape of the work rather than a finished result.",
    challenge:
      "Infrastructure contractors typically run procurement through SAP with purchasing spread across many projects and cost centres. At Strukton's volume, roughly 35,000 procurement lines a month, turning that into structured, comparable categories by hand isn't something a team can keep up with alongside its normal workload, and every category left unclassified is spend nobody can benchmark, consolidate, or negotiate against with real numbers.",
    solution:
      "Pearstop classifies procurement lines against UNSPSC as they arrive from Strukton's SAP environment, so category-level structure builds up continuously rather than depending on a periodic manual clean-up project. The pipeline runs the classification and confidence scoring; Strukton's team stays focused on the category management and supplier decisions that classification exists to support in the first place.",
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
      "This work sits squarely in the procurement data quality and UNSPSC lane - exactly where infrastructure and hard services companies feel the pain first, since procurement volume at this scale makes manual classification a losing race against incoming spend.",
    ctaLabel: "Follow our LinkedIn for updates",
    ctaHref: siteConfig.socials.linkedin
  },
  "lemtech": {
    slug: "lemtech",
    eyebrow: "Manufacturing",
    title: "Turning site visit reports into clean proposal documents, automatically",
    lead:
      "Site visit reports arrived in every format imaginable - handwritten notes, spelling mistakes, varying layouts. Pearstop built a system that reads incoming reports and automatically outputs a clean, accurate proposal document.",
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
      "Pearstop built a system that automatically pulls the right items from our visiting reports into a clean proposal document. It saves our team a lot of time by eliminating the repetitive tasks of combining the correct items.",
    author: "Vince Out",
    role: "Commercial Manager · Lemtech",
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
      "A mid-sized manufacturer had years of procurement data in SAP with no consistent categorisation. Without spend visibility, identifying supplier consolidation opportunities or benchmarking costs across sites was impossible. This is a composite, anonymized example built from a pattern Pearstop sees repeatedly across industrial and manufacturing clients, not a single named engagement.",
    challenge:
      "Years of purchase orders sat in SAP with no consistent category structure, spread across sites that had never been reconciled against each other. Leadership could see total spend, but not which categories it broke down into, which suppliers were being paid for functionally the same thing under different names, or where a framework agreement had quietly stopped reflecting what was actually being bought.",
    solution:
      "Pearstop classified the full historical spend dataset directly from SAP, consolidating supplier name variants and building a category-level view leadership could actually query, instead of a one-off spreadsheet exercise that goes stale the next reporting cycle.",
    wins: [
      { value: "Full", label: "spend baseline" },
      { value: "SAP", label: "direct integration" },
      { value: "95%", label: "auto-classified" }
    ],
    quote:
      "You could run Excel-type analysis, which we can all do, and it's great, but if we don't use that information to actually drive something, that's when it becomes a bit of a waste.",
    author: "Commercial lead",
    role: "Industrial operations & real estate",
    geo:
      "This is a strong example of procurement data quality work in manufacturing, where SAP data often needs a lot of help before it becomes usable - the same underlying problem Pearstop hears across industrial, real estate, and integrated FM operators: the data to act on is already sitting there, unused, because nobody has structured it enough to query.",
    ctaLabel: "Explore procurement",
    ctaHref: "/procurement-data-quality"
  },
  "mro-confidential": {
    slug: "mro-confidential",
    eyebrow: "Manufacturing / MRO",
    title: "Part number enrichment to go direct to manufacturer",
    lead:
      "Details of this engagement are confidential, so this page describes the shape of the problem and the approach rather than naming the client. It reflects a pattern Pearstop sees repeatedly in MRO and component sourcing.",
    challenge:
      "A component's purchase order often carries only the code assigned by whichever intermediary supplied it - not the code the manufacturer actually uses. The intermediary has no reason to share that mapping, since it's the reason the buyer keeps paying their markup instead of sourcing direct. When a part record is missing or unclear, resolving it usually means a manual round trip: someone in procurement goes back to whoever originally requisitioned the part and asks for a clearer description, then tries again.",
    solution:
      "Pearstop matches part records against manufacturer reference data to recover the real manufacturer part number and code, flagging anything it can't resolve with confidence for review rather than guessing - the same guardrail that matters on any supplier-matching engagement with a defined reference list to match against.",
    wins: [
      { value: "Direct", label: "to manufacturer" },
      { value: "MRO", label: "part enrichment" },
      { value: "Confidential", label: "full case study" }
    ],
    geo:
      "This is the same pattern behind Pearstop's supplier and manufacturer matching work generally: a buyer overpays an intermediary by default until the real manufacturer reference exists to buy direct against instead.",
    ctaLabel: "Explore procurement",
    ctaHref: "/procurement-data-quality"
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
