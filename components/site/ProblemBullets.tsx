import type { ReactNode } from "react";
import { dsRoot } from "./tokens";
import { XMarkIcon } from "./icons";
import styles from "./ProblemBullets.module.css";

/** A page's problem-section pain points as a plain list (a stroke icon per
 * item, replacing the old "×" glyph character), used inside the
 * SolutionPage "problem" section's body. Not a DESIGN.md card grid — these
 * pages' bullets are single sentences, not title/body pairs, so they don't
 * fit the "painCards" section type. */
export function ProblemBullets({ items, className }: { items: ReactNode[]; className?: string }) {
  return (
    <ul className={dsRoot(styles.root, className)}>
      {items.map((item, i) => (
        <li className={styles.item} key={i}>
          <span className={styles.icon}>
            <XMarkIcon />
          </span>
          <span className={styles.text}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
