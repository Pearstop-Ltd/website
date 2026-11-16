"use client";

import { TaxonomyTree } from "../TaxonomyTree";
import { BreakdownPanel } from "../BreakdownPanel";
import { useVisitorCurrency } from "../useVisitorCurrency";
import {
  TAXONOMY_EDGES,
  taxonomyNodesForCurrency,
  tissueSuppliersForCurrency,
  tissueLineItemsForCurrency,
  tissueDetailForCurrency,
} from "@/lib/taxonomy-demo-data";
import styles from "./InvoiceDataExtraction.module.css";

export interface InvoiceLabelledOutputPanelCopy {
  breakdownLabel: string;
  suppliersLabel: string;
  lineItemsLabel: string;
  columnDescription: string;
  columnQty: string;
  columnUnit: string;
  columnTotal: string;
}

/** The tree + breakdown pair of the invoice page's "Every line, labelled"
 * section, with amounts in the visitor's currency resolved in the browser
 * so the page itself stays static. */
export function InvoiceLabelledOutputPanel({ copy }: { copy: InvoiceLabelledOutputPanelCopy }) {
  const currency = useVisitorCurrency();
  return (
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
  );
}
