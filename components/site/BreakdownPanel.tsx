import { dsRoot } from "./tokens";
import styles from "./BreakdownPanel.module.css";

export interface BreakdownSupplier {
  name: string;
  spend: string;
  lines: string;
}

export interface BreakdownLineItem {
  description: string;
  supplier: string;
  qty: string;
  unit: string;
  total: string;
}

export interface BreakdownPanelProps {
  breakdownLabel: string;
  name: string;
  detail: string;
  suppliersLabel: string;
  suppliers: BreakdownSupplier[];
  lineItemsLabel: string;
  columnLabels: { description: string; qty: string; unit: string; total: string };
  lineItems: BreakdownLineItem[];
  className?: string;
}

/** The panel beside TaxonomyTree: selected commodity's total spend/line
 * count/code, its supplier breakdown, and a line-items table. Props-only,
 * reusable alongside TaxonomyTree on any solution page. */
export function BreakdownPanel({
  breakdownLabel,
  name,
  detail,
  suppliersLabel,
  suppliers,
  lineItemsLabel,
  columnLabels,
  lineItems,
  className,
}: BreakdownPanelProps) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{breakdownLabel}</span>
        <span className={styles.name}>{name}</span>
        <span className={styles.detail}>{detail}</span>
      </div>

      <div className={styles.section}>
        <span className={styles.eyebrow}>{suppliersLabel}</span>
        <div className={styles.suppliers}>
          {suppliers.map((sp) => (
            <div className={styles.supplierRow} key={sp.name}>
              <span className={styles.supplierName}>{sp.name}</span>
              <span className={styles.supplierSpend}>
                {sp.spend} <span className={styles.muted}>· {sp.lines}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <span className={styles.eyebrow}>{lineItemsLabel}</span>
        <div className={styles.lineHeaderRow}>
          <span>{columnLabels.description}</span>
          <span className={styles.right}>{columnLabels.qty}</span>
          <span>{columnLabels.unit}</span>
          <span className={styles.right}>{columnLabels.total}</span>
        </div>
        {lineItems.map((li, i) => (
          <div className={styles.lineRow} key={i}>
            <div className={styles.lineDesc}>
              <span className={styles.lineDescMain}>{li.description}</span>
              <span className={styles.lineDescSub}>{li.supplier}</span>
            </div>
            <span className={styles.right}>{li.qty}</span>
            <span>{li.unit}</span>
            <span className={styles.right}>{li.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
