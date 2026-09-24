import type { ReactNode } from "react";
import Link from "next/link";
import { dsRoot } from "../tokens";
import styles from "./PatternCard.module.css";

export interface PatternCardProps {
  eyebrow: ReactNode;
  title: ReactNode;
  summary: ReactNode;
  linkLabel: string;
  href: string;
  visual: ReactNode;
  anchorId?: string;
  className?: string;
}

/** Illustrative "pattern" card — visual band on top, purple-text eyebrow,
 * title, one-line summary, link. Distinct from CaseCard (client cases,
 * which show two stats instead of a summary paragraph). */
export function PatternCard({ eyebrow, title, summary, linkLabel, href, visual, anchorId, className }: PatternCardProps) {
  return (
    <Link href={href} id={anchorId} className={dsRoot(styles.root, className)}>
      <div className={styles.visual}>{visual}</div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.summary}>{summary}</p>
        <span className={styles.link}>{linkLabel} →</span>
      </div>
    </Link>
  );
}
