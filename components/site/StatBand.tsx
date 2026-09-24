import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import styles from "./StatBand.module.css";

export interface StatBandItem {
  value: ReactNode;
  caption: ReactNode;
}

export interface StatBandProps {
  stats: StatBandItem[];
  className?: string;
}

/** Navy rounded panel, 3-4 equal columns. Stacks to 2 columns then 1 below
 * 768px per DESIGN.md responsive rules. */
export function StatBand({ stats, className }: StatBandProps) {
  return (
    <div className={dsRoot(styles.root, className)} data-count={stats.length}>
      {stats.map((stat, i) => (
        <div className={styles.cell} key={i}>
          <span className={styles.value}>{stat.value}</span>
          <span className={styles.caption}>{stat.caption}</span>
        </div>
      ))}
    </div>
  );
}
