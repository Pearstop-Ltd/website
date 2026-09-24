export type CaseVisualVariant =
  | "supplierMerge"
  | "taxonomyBars"
  | "marginBars"
  | "accuracyBars"
  | "docToDoc"
  | "priceSpread"
  | "supplierTiles"
  | "partNumber";

export interface CaseStat {
  value: string;
  label: string;
}

export interface CaseEntry {
  slug: string;
  kind: "client" | "pattern";
  featured?: boolean;
  logo?: { src: string; alt: string };
  tag: string;
  headline: string;
  /** Featured case summary, or a pattern card's one-line description.
   * Client cards (non-featured) show stats instead, no summary. */
  summary?: string;
  /** Up to 3 on the featured case, 2 on a client card. Patterns show
   * `summary` instead and have no stats. */
  stats?: CaseStat[];
  visual: CaseVisualVariant;
  href: string;
  anchorId?: string;
}

export const cases: CaseEntry[] = [
  {
    slug: "spie",
    kind: "client",
    featured: true,
    logo: { src: "/images/clients/spie.webp", alt: "SPIE" },
    tag: "Hard services FM · Asset data",
    headline: "9,175 supplier spellings brought back to 1,493 for SPIE Building Solutions",
    summary:
      "Every asset matched against SPIE's own approved supplier list, scored for confidence, and ranked so the team knew exactly where to review first.",
    stats: [
      { value: "73.1%", label: "matches confirmed" },
      { value: "107,081", label: "lines enhanced" },
      { value: "204,029", label: "asset records" },
    ],
    visual: "supplierMerge",
    href: "/cases/spie",
  },
  {
    slug: "strukton",
    kind: "client",
    logo: { src: "/images/clients/strukton.png", alt: "Strukton" },
    tag: "Infrastructure · Procurement",
    headline: "Spend classified to UNSPSC commodity level from zero classification history, for Strukton",
    stats: [
      { value: "0", label: "classification history at start" },
      { value: "+20 pts", label: "accuracy gained by adding human review" },
    ],
    visual: "taxonomyBars",
    href: "/cases/strukton",
    anchorId: "strukton",
  },
  {
    slug: "faro",
    kind: "client",
    logo: { src: "/images/clients/faro.png", alt: "FARO" },
    tag: "Retail · Procurement",
    headline: "Margin visible before the purchase is committed, for FARO",
    stats: [
      { value: "Up to 7%", label: "higher sell-through" },
      { value: "1 week", label: "vs six months by hand" },
    ],
    visual: "marginBars",
    href: "/cases/faro",
    anchorId: "faro",
  },
  {
    slug: "cleaning-invoice-extraction",
    kind: "client",
    tag: "Cleaning services · Invoices",
    headline: "Invoice extraction accuracy from 70% to 99% for a cleaning services company",
    stats: [
      { value: "~300", label: "invoices a month" },
      { value: "Pilot → live", label: "now on subscription" },
    ],
    visual: "accuracyBars",
    href: "/invoice-data-extraction",
  },
  {
    slug: "lemtech",
    kind: "client",
    logo: { src: "/images/clients/lemtech.svg", alt: "Lemtech" },
    tag: "Manufacturing · Documents",
    headline: "Site visit reports turned into clean proposal documents for Lemtech",
    stats: [
      { value: "~0", label: "manual re-entry" },
      { value: "1–3 hrs", label: "saved per proposal" },
    ],
    visual: "docToDoc",
    href: "/cases/lemtech",
  },
  {
    slug: "construction-spend-benchmarking",
    kind: "pattern",
    tag: "Pattern · Construction",
    headline: "A 45% price spread on one aluminium windowsill, bought on ten projects",
    summary: "Ten descriptions, one item. Invisible until classified.",
    visual: "priceSpread",
    href: "/cases/construction-spend-benchmarking",
  },
  {
    slug: "cleaning-pattern",
    kind: "pattern",
    tag: "Pattern · Cleaning & soft FM",
    headline: "30 toilet paper suppliers in twelve months, and nobody chose them",
    summary: "Same roll, five prices. A 68% spread on one product.",
    visual: "supplierTiles",
    href: "/cases/cleaning-consumables-consolidation",
  },
  {
    slug: "mro-confidential",
    kind: "pattern",
    tag: "Pattern · Manufacturing & MRO",
    headline: "The real manufacturer part number behind every reseller code",
    summary: "Checked matches replace slow offshore research, so you can buy direct.",
    visual: "partNumber",
    href: "/cases/mro-confidential",
  },
];

export const featuredCase = cases.find((c) => c.featured)!;
export const clientCases = cases.filter((c) => c.kind === "client" && !c.featured);
export const patternCases = cases.filter((c) => c.kind === "pattern");
