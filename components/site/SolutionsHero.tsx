import type { ReactNode } from "react";
import { Section } from "./internal/Section";
import { HeadlineAccent } from "./HeadlineAccent";
import styles from "./SolutionsHero.module.css";

export interface SolutionsHeroProps {
  eyebrow: ReactNode;
  /** The page's single H1. */
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}

/** Left-aligned, single-column hero on a navy-deep background — for index
 * pages that don't have a per-product visual/diagram slot, unlike
 * SolutionPage's two-column white hero. */
export function SolutionsHero({ eyebrow, title, lead, className }: SolutionsHeroProps) {
  return (
    <Section background="navy-deep" className={className}>
      <div className={styles.stack}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        <HeadlineAccent tone="dark" />
        {lead ? <p className={styles.lead}>{lead}</p> : null}
      </div>
    </Section>
  );
}
