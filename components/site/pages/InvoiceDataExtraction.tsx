import { SolutionPage, type SolutionSection } from "../templates/SolutionPage";
import { Section } from "../internal/Section";
import { SectionHeader } from "../SectionHeader";
import { TaxonomyTree } from "../TaxonomyTree";
import { BreakdownPanel } from "../BreakdownPanel";
import { StatusChip } from "../DataTable";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { siteConfig } from "@/lib/site";
import {
  TAXONOMY_EDGES,
  taxonomyNodesForCurrency,
  tissueSuppliersForCurrency,
  tissueLineItemsForCurrency,
  tissueDetailForCurrency,
} from "@/lib/taxonomy-demo-data";
import type { CurrencyInfo } from "@/lib/currency";
import styles from "./InvoiceDataExtraction.module.css";

export interface InvoiceDataExtractionCopy {
  common: { faqEyebrow: string; faqTitle: string };
  hero: {
    eyebrow: string;
    title: string;
    lead: string;
    primaryLabel: string;
    secondaryLabel: string;
  };
  problem: {
    eyebrow: string;
    leadIn?: string;
    title: string;
    body: string;
    quote: { text: string; attribution: string };
  };
  painCards: { title: string; body: string }[];
  howItWorks: {
    eyebrow: string;
    title: string;
    inputs: string[];
    processLabel: string;
    outputs: string[];
    step1: { title: string; copy: string };
    step2: { title: string; copy: string };
    step3: { title: string; copy: string };
  };
  labelledOutput: {
    eyebrow: string;
    title: string;
    lead: string;
    illustrativeLabel: string;
    breakdownLabel: string;
    suppliersLabel: string;
    lineItemsLabel: string;
    columnDescription: string;
    columnQty: string;
    columnUnit: string;
    columnTotal: string;
  };
  stats: {
    s1: { value: string; caption: string };
    s2: { value: string; caption: string };
    s3: { value: string; caption: string };
  };
  table: { eyebrow: string; title: string; lead: string; caption: string };
  whatMakesPossible: {
    eyebrow: string;
    title: string;
    b1: { title: string; copy: string };
    b2: { title: string; copy: string };
    b3: { title: string; copy: string };
    b4: { title: string; copy: string };
  };
  quote: { text: string; author: string; role: string };
  geoBlock: { title: string; copy: string };
  faq: { question: string; answer: string }[];
  cta: { title: string; lead: string; primaryLabel: string; secondaryLabel: string };
}

// Illustrative only — not real client data, matches the ref mockup.
const HERO_ROWS = [
  { item: "Toilet roll, case of 36", price: "19.20", check: "Read", ok: true },
  { item: "Surface cleaner 5L", price: "6.45", check: "Read", ok: true },
  { item: "Nitrile gloves, box of 100", price: "4.10", check: "Read", ok: true },
  { item: "+2 mop heads, handwritten", price: "?", check: "To review", ok: false },
];

const WORKED_EXAMPLE_ROWS = [
  { desc: "Toilet roll, case of 36", qty: "12", unit: "case", cost: "£19.20", code: "CC-4410", supplier: "Bunzl CHS", ok: true },
  { desc: "Multi-surface cleaner 5L", qty: "8", unit: "each", cost: "£6.45", code: "CC-4420", supplier: "Bunzl CHS", ok: true },
  { desc: "Nitrile gloves, medium, box of 100", qty: "20", unit: "box", cost: "£4.10", code: "CC-4520", supplier: "Bunzl CHS", ok: true },
  { desc: "Delivery charge, site 14", qty: "1", unit: "each", cost: "£12.00", code: "CC-9100", supplier: "Bunzl CHS", ok: true },
  { desc: "Handwritten amendment: +2 mop heads", qty: "2", unit: "each", cost: "unclear", code: "n/a", supplier: "Bunzl CHS", ok: false },
];

const PAIN_ICONS = [
  <svg key="inbox" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7 L12 13 L21 7" />
  </svg>,
  <svg key="layouts" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="8" height="10" rx="1" />
    <rect x="13" y="7" width="8" height="14" rx="1" />
  </svg>,
  <svg key="cycle" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7 V12 L15 14" />
  </svg>,
  <svg key="stale" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 18 L10 12 L14 15 L20 7" />
    <path d="M20 12 V7 H15" />
  </svg>,
];

function Arrow() {
  return (
    <svg width="32" height="12" viewBox="0 0 32 12" fill="none" aria-hidden="true" className={styles.arrow}>
      <path d="M0 6 H26" stroke="var(--navy)" strokeWidth="1.6" />
      <path d="M24 1 L31 6 L24 11 Z" fill="var(--navy)" />
    </svg>
  );
}

/** Doc-to-rows illustration for the hero visual slot — an invoice mockup
 * (rotated card, illustrative line values) feeding a structured-rows table,
 * matching design/refs/solution-invoice-extraction.dc.html. Page-specific,
 * not a reusable DESIGN.md component. */
function InvoiceHeroIllustration() {
  return (
    <div className={styles.heroIllustration}>
      <div className={styles.docCard}>
        <div className={styles.docHeader}>
          <div className={styles.docBar} />
          <span className={styles.docLabel}>INVOICE</span>
        </div>
        <div className={styles.docLine} style={{ width: "80%" }} />
        <div className={styles.docLine} style={{ width: "55%" }} />
        <div className={styles.docDivider} />
        <div className={styles.docRow}>
          <div className={styles.docRowMain} />
          <div className={styles.docRowSide} />
        </div>
        <div className={styles.docRow}>
          <div className={styles.docRowMain} />
          <div className={styles.docRowSide} />
        </div>
        <div className={styles.docRow}>
          <div className={styles.docRowMain} />
          <div className={styles.docRowSide} />
        </div>
        <div className={styles.docRow}>
          <div className={styles.docRowMainHighlight} />
          <div className={styles.docRowSide} />
        </div>
        <div className={styles.docDivider} />
        <div className={styles.docFooter}>
          <div className={styles.docBarSmall} />
        </div>
        <span className={styles.docCaption}>Scanned PDF with a handwritten note</span>
      </div>

      <Arrow />

      <div className={styles.rowsTable}>
        <div className={styles.rowsHeader}>
          <span>Line item</span>
          <span className={styles.rowsHeaderRight}>£ each</span>
          <span>Check</span>
        </div>
        {HERO_ROWS.map((row, i) => (
          <div className={styles.row} key={i}>
            <span className={styles.rowItem}>{row.item}</span>
            <span className={styles.rowPrice}>{row.price}</span>
            <span className={dsChip(row.ok)}>{row.check}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function dsChip(ok: boolean) {
  return `${styles.chip} ${ok ? styles["chip-ok"] : styles["chip-review"]}`;
}

/** "Every line, labelled" — the taxonomy fold-out below the worked-example
 * table, matching design/refs/solution-invoice-extraction.dc.html. Built
 * from the reusable TaxonomyTree/BreakdownPanel components. Amounts are
 * converted to the visitor's currency by the caller (see
 * lib/currency.ts / lib/taxonomy-demo-data.ts). */
function LabelledOutputSection({ copy, currency }: { copy: InvoiceDataExtractionCopy["labelledOutput"]; currency: CurrencyInfo }) {
  return (
    <Section background="soft" paddingTop={0}>
      <div className={styles.labelledOutputStack}>
        <div className={styles.labelledOutputHeaderRow}>
          <SectionHeader eyebrow={copy.eyebrow} title={copy.title} lead={copy.lead} />
          <span className={styles.caption}>{copy.illustrativeLabel}</span>
        </div>
        <div className={styles.labelledOutputPanel}>
          <TaxonomyTree
            columns={["Segment", "Family", "Class", "Commodity"]}
            nodes={taxonomyNodesForCurrency(currency)}
            edges={TAXONOMY_EDGES}
            className={styles.labelledOutputTree}
          />
          <BreakdownPanel
            breakdownLabel={copy.breakdownLabel}
            name="Toilet tissue"
            detail={tissueDetailForCurrency(currency)}
            suppliersLabel={copy.suppliersLabel}
            suppliers={tissueSuppliersForCurrency(currency)}
            lineItemsLabel={copy.lineItemsLabel}
            columnLabels={{ description: copy.columnDescription, qty: copy.columnQty, unit: copy.columnUnit, total: copy.columnTotal }}
            lineItems={tissueLineItemsForCurrency(currency)}
            className={styles.labelledOutputBreakdown}
          />
        </div>
      </div>
    </Section>
  );
}

export function InvoiceDataExtractionPage({ copy, currency }: { copy: InvoiceDataExtractionCopy; currency: CurrencyInfo }) {
  const sections: SolutionSection[] = [
    {
      type: "statBand",
      key: "stats",
      stats: [copy.stats.s1, copy.stats.s2, copy.stats.s3],
    },
    {
      type: "problem",
      key: "problem",
      leadIn: copy.problem.leadIn,
      eyebrow: copy.problem.eyebrow,
      title: copy.problem.title,
      body: <p>{copy.problem.body}</p>,
      quote: { variant: "panel", role: copy.problem.quote.attribution, quote: copy.problem.quote.text },
    },
    {
      type: "painCards",
      key: "painCards",
      background: "soft",
      cards: copy.painCards.map((card, i) => ({ title: card.title, body: card.body, icon: PAIN_ICONS[i] })),
    },
    {
      type: "diagram",
      key: "howItWorks",
      anchorId: "how-it-works",
      eyebrow: copy.howItWorks.eyebrow,
      title: copy.howItWorks.title,
      diagram: {
        inputs: copy.howItWorks.inputs,
        processLines: [copy.howItWorks.processLabel],
        outputs: [
          { label: copy.howItWorks.outputs[0], tint: "blue" },
          { label: copy.howItWorks.outputs[1], tint: "purple" },
          { label: copy.howItWorks.outputs[2], tint: "green" },
        ],
      },
      steps: [
        { number: 1, title: copy.howItWorks.step1.title, body: copy.howItWorks.step1.copy },
        { number: 2, title: copy.howItWorks.step2.title, body: copy.howItWorks.step2.copy },
        { number: 3, title: copy.howItWorks.step3.title, body: copy.howItWorks.step3.copy },
      ],
    },
    {
      type: "table",
      key: "workedExample",
      background: "soft",
      eyebrow: copy.table.eyebrow,
      title: copy.table.title,
      lead: copy.table.lead,
      caption: copy.table.caption,
      table: {
        columns: [
          { key: "desc", label: "Description", width: "2.2fr" },
          { key: "qty", label: "Qty", width: "0.6fr" },
          { key: "unit", label: "Unit", width: "0.7fr" },
          { key: "cost", label: "Unit cost", width: "0.9fr" },
          { key: "code", label: "Cost code", width: "1fr" },
          { key: "supplier", label: "Supplier", width: "1.4fr" },
          { key: "status", label: "Status", width: "1.1fr" },
        ],
        rows: WORKED_EXAMPLE_ROWS.map((row) => ({
          desc: row.desc,
          qty: row.qty,
          unit: row.unit,
          cost: row.cost,
          code: row.code,
          supplier: row.supplier,
          status: <StatusChip tone={row.ok ? "done" : "review"} label={row.ok ? "Read" : "To review"} />,
        })),
      },
    },
    {
      type: "custom",
      key: "labelledOutput",
      node: <LabelledOutputSection copy={copy.labelledOutput} currency={currency} />,
    },
    {
      type: "outcomeCards",
      key: "outcome",
      eyebrow: copy.whatMakesPossible.eyebrow,
      title: copy.whatMakesPossible.title,
      columns: 2,
      cards: [
        { title: copy.whatMakesPossible.b1.title, body: copy.whatMakesPossible.b1.copy, variant: "tinted-blue" },
        { title: copy.whatMakesPossible.b2.title, body: copy.whatMakesPossible.b2.copy, variant: "tinted-purple" },
        { title: copy.whatMakesPossible.b3.title, body: copy.whatMakesPossible.b3.copy, variant: "tinted-green" },
        { title: copy.whatMakesPossible.b4.title, body: copy.whatMakesPossible.b4.copy, variant: "tinted-blue" },
      ],
    },
    {
      type: "quote",
      key: "outcomeQuote",
      quote: { variant: "inline", role: `${copy.quote.author}, ${copy.quote.role}`, quote: copy.quote.text },
    },
    {
      type: "definition",
      key: "definition",
      background: "soft",
      title: copy.geoBlock.title,
      body: copy.geoBlock.copy,
    },
    {
      type: "faq",
      key: "faq",
      eyebrow: copy.common.faqEyebrow,
      title: copy.common.faqTitle,
      items: copy.faq.map((item) => ({ q: item.question, a: item.answer })),
    },
  ];

  return (
    <SolutionPage
      hero={{
        eyebrow: copy.hero.eyebrow,
        title: copy.hero.title,
        lead: copy.hero.lead,
        primaryLabel: copy.hero.primaryLabel,
        primaryAction: (className) => <SampleRequestModal label={copy.hero.primaryLabel} className={className} />,
        secondaryLabel: copy.hero.secondaryLabel,
        secondaryHref: "#how-it-works",
        visual: <InvoiceHeroIllustration />,
      }}
      sections={sections}
      emitFaqSchema={false}
      closingCTA={{
        title: copy.cta.title,
        body: copy.cta.lead,
        primaryLabel: copy.cta.primaryLabel,
        primaryAction: (className) => <SampleRequestModal label={copy.cta.primaryLabel} className={className} />,
        secondaryLabel: copy.cta.secondaryLabel,
        secondaryHref: siteConfig.calendly,
        footerLine: `© ${new Date().getFullYear()} Pearstop · Privacy · Terms`,
      }}
    />
  );
}
