import { SectionHeader } from "./SectionHeader";
import { Section } from "./internal/Section";
import { TaxonomyTree, type TaxonomyNode, type TaxonomyEdge } from "./TaxonomyTree";
import { BreakdownPanel, type BreakdownSupplier, type BreakdownLineItem } from "./BreakdownPanel";
import styles from "./LabelledOutputPanel.module.css";

export interface LabelledOutputPanelProps {
  eyebrow: string;
  title: string;
  lead: string;
  illustrativeLabel?: string;
  columns: string[];
  nodes: TaxonomyNode[];
  edges: TaxonomyEdge[];
  breakdownLabel: string;
  name: string;
  detail: string;
  suppliersLabel: string;
  suppliers: BreakdownSupplier[];
  lineItemsLabel: string;
  columnLabels: { description: string; qty: string; unit: string; total: string };
  lineItems: BreakdownLineItem[];
  background?: "white" | "soft" | "purple";
  /** See Section's `contained` prop — pass true on a page (e.g. the
   * homepage) that still uses the legacy `.container` width elsewhere. */
  contained?: boolean;
}

/** "Every line, labelled" — a TaxonomyTree beside a BreakdownPanel, showing
 * one selected UNSPSC path and its supporting data. Composes the two
 * reusable, props-only components so any page can drop the whole section
 * in with its own illustrative data. First built for
 * /invoice-data-extraction (see components/site/pages/InvoiceDataExtraction.tsx
 * for that page's own instance); this is the shared version for reuse
 * elsewhere, e.g. the homepage. */
export function LabelledOutputPanel({
  eyebrow,
  title,
  lead,
  illustrativeLabel,
  columns,
  nodes,
  edges,
  breakdownLabel,
  name,
  detail,
  suppliersLabel,
  suppliers,
  lineItemsLabel,
  columnLabels,
  lineItems,
  background = "soft",
  contained,
}: LabelledOutputPanelProps) {
  return (
    <Section background={background} paddingTop={0} contained={contained}>
      <div className={styles.stack}>
        <div className={styles.headerRow}>
          <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
          {illustrativeLabel ? <span className={styles.caption}>{illustrativeLabel}</span> : null}
        </div>
        <div className={styles.panel}>
          <TaxonomyTree columns={columns} nodes={nodes} edges={edges} className={styles.tree} />
          <BreakdownPanel
            breakdownLabel={breakdownLabel}
            name={name}
            detail={detail}
            suppliersLabel={suppliersLabel}
            suppliers={suppliers}
            lineItemsLabel={lineItemsLabel}
            columnLabels={columnLabels}
            lineItems={lineItems}
            className={styles.breakdown}
          />
        </div>
      </div>
    </Section>
  );
}
