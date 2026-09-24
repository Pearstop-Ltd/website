import type { ReactNode } from "react";
import { dsRoot } from "../tokens";
import shared from "../shared.module.css";
import { HeadlineAccent } from "../HeadlineAccent";
import styles from "./CasesHero.module.css";

export interface CasesHeroJumpLink {
  label: string;
  href: string;
}

export interface CasesHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  clientLegend: ReactNode;
  patternLegend: ReactNode;
  jumpLinks: CasesHeroJumpLink[];
  className?: string;
}

/** /cases index hero: H1 + lead on the left, a client-vs-pattern legend
 * panel on the right, and a row of in-page jump links below (replaces the
 * design ref's filter row — no client-side filtering). */
export function CasesHero({ eyebrow, title, lead, clientLegend, patternLegend, jumpLinks, className }: CasesHeroProps) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <div className={styles.main}>
        <span className={shared.eyebrow}>{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        <HeadlineAccent />
        <p className={styles.lead}>{lead}</p>
        <div className={styles.jumpLinks}>
          {jumpLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.jumpLink}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className={styles.legend}>
        <div className={styles.legendRow}>
          <span className={dsRoot(styles.legendDot, styles.legendDotClient)} />
          <div className={styles.legendText}>{clientLegend}</div>
        </div>
        <div className={styles.legendRow}>
          <span className={dsRoot(styles.legendDot, styles.legendDotPattern)} />
          <div className={styles.legendText}>{patternLegend}</div>
        </div>
      </div>
    </div>
  );
}
