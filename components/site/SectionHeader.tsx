import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import shared from "./shared.module.css";
import styles from "./SectionHeader.module.css";

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Renders the title as <h1> instead of <h2>. Use for the single H1 on a
   * page (e.g. inside a hero) — never use more than once per page. */
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeader({ eyebrow, title, lead, as = "h2", className }: SectionHeaderProps) {
  const Heading = as;
  return (
    <div className={dsRoot(styles.root, className)}>
      {eyebrow ? <span className={shared.eyebrow}>{eyebrow}</span> : null}
      <Heading className={styles.title}>{title}</Heading>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </div>
  );
}
