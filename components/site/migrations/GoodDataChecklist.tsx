import { dsRoot } from "../tokens";
import { CheckIcon } from "../icons";
import styles from "./GoodDataChecklist.module.css";

const SHARED_ITEMS = [
  "One record per supplier, with no duplicates across entities.",
  "Every spend line labelled to one standard (UNSPSC or your own).",
  "Item and material descriptions written the same way.",
  "Units of measure consistent.",
  "Inactive suppliers and items flagged, not migrated.",
  "Every field mapped to the new system and documented.",
];

export function GoodDataChecklist({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={dsRoot(styles.root, className)}>
      {[...SHARED_ITEMS, ...items].map((item) => (
        <li className={styles.item} key={item}>
          <span className={styles.icon}>
            <CheckIcon color="var(--green-text)" />
          </span>
          <span className={styles.text}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
