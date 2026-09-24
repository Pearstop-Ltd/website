import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import styles from "./DataTable.module.css";

export interface DataTableColumn {
  key: string;
  label: ReactNode;
  /** CSS grid track size, e.g. "1.3fr" or "120px". Defaults to "1fr". */
  width?: string;
  align?: "left" | "right";
}

export interface StatusChipProps {
  label: ReactNode;
  tone: "done" | "review";
}

export function StatusChip({ label, tone }: StatusChipProps) {
  return <span className={dsRoot(styles.chip, styles[`chip-${tone}`])}>{label}</span>;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: Array<Record<string, ReactNode>>;
  /** e.g. "4 of 30 shown · Standard 2-ply" */
  footnote?: ReactNode;
  className?: string;
}

/** Navy header row, 1px row borders, horizontal scroll on narrow viewports
 * so columns never wrap or truncate on mobile. */
export function DataTable({ columns, rows, footnote, className }: DataTableProps) {
  const gridTemplate = columns.map((c) => c.width ?? "1fr").join(" ");

  return (
    <div className={dsRoot(styles.root, className)}>
      <div className={styles.scroller}>
        <div className={styles.inner} style={{ minWidth: columns.length * 140 }}>
          <div className={styles.headerRow} style={{ gridTemplateColumns: gridTemplate }}>
            {columns.map((col) => (
              <span key={col.key} style={{ textAlign: col.align === "right" ? "right" : "left" }}>
                {col.label}
              </span>
            ))}
          </div>
          {rows.map((row, i) => (
            <div className={styles.row} style={{ gridTemplateColumns: gridTemplate }} key={i}>
              {columns.map((col) => (
                <span key={col.key} style={{ textAlign: col.align === "right" ? "right" : "left" }}>
                  {row[col.key]}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      {footnote ? <div className={styles.footnote}>{footnote}</div> : null}
    </div>
  );
}
