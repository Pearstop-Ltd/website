import Link from "next/link";
import { dsRoot } from "./tokens";
import styles from "./ResourcesBar.module.css";

export interface ResourcesBarItem {
  label: string;
  href: string;
}

/** Small "direct to resources" link bar — a label plus a row of pill links
 * to related tools/pages, dropped in right below a hero CTA. */
export function ResourcesBar({ label, items, className }: { label: string; items: ResourcesBarItem[]; className?: string }) {
  return (
    <div className={dsRoot(styles.root, className)}>
      <span className={styles.label}>{label}</span>
      <div className={styles.links}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} className={styles.link}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
