import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import styles from "./DataTable.module.css";

export interface DataTableColumn {
  key: string;
  label: ReactNode;
  /** CSS <col> width, e.g. "18%" or "120px", or a grid-style fraction like
   * "1.3fr" (fr values are converted to a proportional percentage since
   * <col> doesn't support fr). Defaults to an even split. */
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

function resolveColWidths(columns: DataTableColumn[]): Array<string | undefined> {
  const frTotal = columns.reduce((sum, col) => {
    const match = /^([\d.]+)fr$/.exec((col.width ?? "").trim());
    return match ? sum + parseFloat(match[1]) : sum;
  }, 0);

  return columns.map((col) => {
    const raw = (col.width ?? "").trim();
    const match = /^([\d.]+)fr$/.exec(raw);
    if (match) {
      const fr = parseFloat(match[1]);
      const total = frTotal || columns.length;
      return `${((fr / total) * 100).toFixed(2)}%`;
    }
    return raw || undefined;
  });
}

/** Semantic <table> — real thead/tbody/th/td, never a div grid — with the
 * same navy header row, 1px row borders and horizontal scroll on narrow
 * viewports as the refs. */
export function DataTable({ columns, rows, footnote, className }: DataTableProps) {
  const colWidths = resolveColWidths(columns);

  return (
    <div className={dsRoot(styles.root, className)}>
      <div className={styles.scroller}>
        <table className={styles.table} style={{ minWidth: columns.length * 140 }}>
          <colgroup>
            {columns.map((col, i) => (
              <col key={col.key} style={colWidths[i] ? { width: colWidths[i] } : undefined} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key} scope="col" className={styles.th} style={{ textAlign: col.align === "right" ? "right" : "left" }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className={styles.td} style={{ textAlign: col.align === "right" ? "right" : "left" }}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          {footnote ? (
            <tfoot>
              <tr>
                <td className={styles.footnote} colSpan={columns.length}>
                  {footnote}
                </td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    </div>
  );
}
