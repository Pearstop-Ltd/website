import type { ReactNode } from "react";
import { dsRoot } from "../tokens";
import shared from "../shared.module.css";
import { HeadlineAccent } from "../HeadlineAccent";
import styles from "./CasesHero.module.css";

export interface CasesHeroJumpLink {
  label: string;
  href: string;
  /** Small dot rendered before the label, colour-matched to the section it
   * jumps to (client cases = blue, patterns = purple) so the client/pattern
   * distinction is legible from the jump links alone. */
  dot: "client" | "pattern";
}

export interface CasesHeroProps {
  eyebrow: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  jumpLinks: CasesHeroJumpLink[];
  className?: string;
}

/** /cases index hero: H1 + lead, then a row of in-page jump links (replaces
 * the design ref's filter row — no client-side filtering) with a
 * colour-coded dot per link instead of a separate legend panel. */
export function CasesHero({ eyebrow, title, lead, jumpLinks, className }: CasesHeroProps) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <span className={shared.eyebrow}>{eyebrow}</span>
      <h1 className={styles.title}>{title}</h1>
      <HeadlineAccent />
      <p className={styles.lead}>{lead}</p>
      <div className={styles.jumpLinks}>
        {jumpLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.jumpLink}>
            <span className={dsRoot(styles.jumpLinkDot, link.dot === "client" ? styles.jumpLinkDotClient : styles.jumpLinkDotPattern)} />
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
