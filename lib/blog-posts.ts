export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: "stephanie" | "richard" | "team";
  category: string;
  tags: string[];
  readingTime: number;
  tocItems: { id: string; label: string }[];
  softCta: "checklist" | "case-study" | "discovery" | "template";
  faqItems?: { q: string; a: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "procurement-data-cost",
    title: "Why Your Procurement Data Is Costing You More Than You Think",
    description: "Poor procurement data quality costs hard services companies 1-3% of total spend per year. This article shows where the cost hides and how to fix it.",
    publishedAt: "2026-02-04",
    author: "stephanie",
    category: "Procurement",
    tags: ["procurement data quality", "spend analytics", "UNSPSC", "category management"],
    readingTime: 7,
    tocItems: [
      { id: "the-problem", label: "The problem with procurement data" },
      { id: "where-cost-hides", label: "Where the cost hides" },
      { id: "what-clean-data-enables", label: "What clean data enables" },
      { id: "the-process", label: "How the fix works" },
    ],
    softCta: "case-study",
  },
  {
    slug: "what-is-unspsc",
    title: "What Is UNSPSC — And Why Hard Services Companies Should Care",
    description: "UNSPSC is the global procurement classification standard. This guide explains the hierarchy, why ERP systems don't solve classification on their own, and how automated classification works at scale.",
    publishedAt: "2026-02-17",
    author: "team",
    category: "Procurement",
    tags: ["UNSPSC", "procurement classification", "spend data", "ERP"],
    readingTime: 8,
    tocItems: [
      { id: "what-is-unspsc", label: "What UNSPSC is" },
      { id: "why-it-matters", label: "Why it matters in practice" },
      { id: "erp-problem", label: "Why ERPs don't solve this" },
      { id: "what-it-unlocks", label: "What classification unlocks" },
      { id: "maintaining", label: "Maintaining classification" },
    ],
    softCta: "template",
  },
  {
    slug: "asset-register-problems",
    title: "The Real Reason Your Asset Register Isn't Working",
    description: "Most FM companies have an asset register. Most don't trust it. This article explains the specific data gaps, their financial cost, and how AI-assisted enrichment fixes them.",
    publishedAt: "2026-02-24",
    author: "richard",
    category: "Asset Management",
    tags: ["asset register", "asset data management", "facilities management", "predictive maintenance"],
    readingTime: 7,
    tocItems: [
      { id: "what-bad-looks-like", label: "What a failing register looks like" },
      { id: "financial-cost", label: "The financial cost" },
      { id: "what-it-enables", label: "What accuracy enables" },
      { id: "missing-data", label: "What is typically missing" },
      { id: "ongoing-maintenance", label: "Ongoing maintenance" },
    ],
    softCta: "discovery",
  },
  {
    slug: "category-management-kraljic-hard-fm",
    title: "The Kraljic Matrix, Category Management, and Why Your Data Is the Missing Piece",
    description: "The Kraljic Matrix is the most useful tool in procurement strategy but it requires clean spend data to work. This article applies it to hard FM, construction, and MRO.",
    publishedAt: "2026-03-06",
    author: "stephanie",
    category: "Procurement",
    tags: ["category management", "Kraljic matrix", "hard FM procurement", "spend visibility"],
    readingTime: 9,
    tocItems: [
      { id: "kraljic", label: "The Kraljic Matrix explained" },
      { id: "data-problem", label: "Why data is the blocker" },
      { id: "five-scenarios", label: "5 category scenarios" },
      { id: "data-as-fuel", label: "Data as category management fuel" },
    ],
    softCta: "case-study",
  },
  {
    slug: "ai-readiness-data-quality",
    title: "AI Readiness Isn't an IT Problem. It's a Data Problem.",
    description: "AI tools amplify whatever structure exists in your data. If your procurement and asset data is messy, AI makes it expensively wrong. Here is what readiness actually requires.",
    publishedAt: "2026-03-18",
    author: "stephanie",
    category: "AI & Digital",
    tags: ["AI readiness", "Microsoft Fabric", "data quality", "digital transformation"],
    readingTime: 8,
    tocItems: [
      { id: "what-ai-requires", label: "What AI tools require" },
      { id: "fabric-reality", label: "The Microsoft Fabric reality" },
      { id: "checklist", label: "AI readiness checklist" },
      { id: "preparation", label: "What preparation looks like" },
    ],
    softCta: "checklist",
    faqItems: [
      { q: "What does AI readiness mean for a hard services company?", a: "AI readiness means your procurement and asset data is consistently structured, classified, and validated so that AI platforms can produce reliable outputs rather than amplifying the inconsistencies in your data." },
      { q: "Does Microsoft Fabric fix data quality issues automatically?", a: "No. Microsoft Fabric inherits the structure of the data you load into it. Without a clean data foundation, Fabric deployments typically spend their first phase on remediation rather than value creation." },
      { q: "How long does it take to get data AI-ready?", a: "A baseline assessment and initial cleaning typically takes four to six weeks. Ongoing quality control is then automated, so the data stays AI-ready without recurring manual effort." },
    ],
  },
  {
    slug: "fm-tender-win-rate",
    title: "How to Win More FM Tenders Without Increasing Your Team",
    description: "Most FM tender losses come down to pricing confidence, not capability. Clean cost data changes bid accuracy, speed, and win rate without adding headcount.",
    publishedAt: "2026-03-27",
    author: "richard",
    category: "Commercial FM",
    tags: ["FM tenders", "bid pricing", "facilities management", "procurement data"],
    readingTime: 8,
    tocItems: [
      { id: "pricing-problem", label: "The pricing confidence problem" },
      { id: "two-scenarios", label: "Scenario A vs B" },
      { id: "what-slows", label: "What slows bid teams down" },
      { id: "what-changes", label: "What changes with clean data" },
      { id: "compounding", label: "The compounding effect" },
    ],
    softCta: "discovery",
  },
  {
    slug: "excel-heroics-hard-services",
    title: "The Hidden Cost of Excel Heroics in Hard Services",
    description: "Every hard services company has someone who knows the data. This article explains the operational risk they carry, what it costs, and what the migration away from manual data management looks like.",
    publishedAt: "2026-04-03",
    author: "team",
    category: "Data Management",
    tags: ["data management", "manual reporting", "procurement automation", "operational risk"],
    readingTime: 7,
    tocItems: [
      { id: "visible-cost", label: "Visible vs real cost" },
      { id: "diagnostic", label: "Are you in Excel heroics territory?" },
      { id: "migration", label: "What the migration looks like" },
      { id: "other-side", label: "What the other side looks like" },
    ],
    softCta: "template",
  },
  {
    slug: "construction-procurement-material-costs",
    title: "Construction Procurement Data: Why Your Material Costs Are Harder to Control Than You Think",
    description: "Construction spend is structurally fragmented across projects. This article explains why material cost control requires spend classification and what steel procurement looks like as a case study.",
    publishedAt: "2026-04-14",
    author: "richard",
    category: "Construction",
    tags: ["construction procurement", "material costs", "spend classification", "supplier consolidation"],
    readingTime: 8,
    tocItems: [
      { id: "structural-problem", label: "Why construction data is different" },
      { id: "steel-case-study", label: "Steel: a case study" },
      { id: "spec-standardisation", label: "Specification standardisation" },
      { id: "software-integration", label: "Integration with construction software" },
    ],
    softCta: "case-study",
  },
  {
    slug: "what-clean-data-enables",
    title: "What Happens When Your Data Is Finally Clean: 5 Things That Become Possible",
    description: "Five specific capabilities that open up when procurement and asset data is clean, classified, and consistently maintained with practical examples of what each looks like.",
    publishedAt: "2026-04-28",
    author: "stephanie",
    category: "Procurement",
    tags: ["procurement data quality", "asset management", "AI readiness", "tender pricing"],
    readingTime: 8,
    tocItems: [
      { id: "supplier-consolidation", label: "1. Supplier consolidation" },
      { id: "predictive-maintenance", label: "2. Predictive maintenance" },
      { id: "tender-pricing", label: "3. Accurate tender pricing" },
      { id: "ai-tools", label: "4. AI tools that deliver" },
      { id: "strategic-procurement", label: "5. Strategic procurement" },
    ],
    softCta: "case-study",
  },
  {
    slug: "unspsc-vs-eclass-vs-cpv",
    title: "UNSPSC vs. eClass vs. CPV: Which Classification Standard Is Right for Your Business?",
    description: "A clear breakdown of the three main procurement classification standards UNSPSC, eClass, and CPV with a practical guide to implementation at scale.",
    publishedAt: "2026-05-07",
    author: "team",
    category: "Procurement",
    tags: ["UNSPSC", "eClass", "CPV", "procurement classification", "spend standards"],
    readingTime: 9,
    tocItems: [
      { id: "unspsc", label: "UNSPSC" },
      { id: "eclass", label: "eClass" },
      { id: "cpv", label: "CPV" },
      { id: "which-to-use", label: "Which to use" },
      { id: "implementation", label: "Implementation reality" },
    ],
    softCta: "discovery",
    faqItems: [
      { q: "What is the difference between UNSPSC and eClass?", a: "UNSPSC is a global four-level taxonomy covering all products and services, best for spend analytics and category management. eClass includes product attribute definitions alongside codes, making it more precise for industrial and engineering master data." },
      { q: "Do I need to use CPV codes for private sector procurement?", a: "No. CPV is mandated only for EU public procurement notices. Private sector organisations should use UNSPSC or eClass for internal spend management." },
      { q: "How many UNSPSC codes are there?", a: "The UNSPSC taxonomy contains over 55,000 commodity codes across four levels: Segment, Family, Class, and Commodity. It is updated quarterly by GS1 US on behalf of the United Nations." },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
