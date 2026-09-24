import Link from "next/link";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps {
  parentLabel: string;
  parentHref: string;
  currentLabel: string;
}

/** Not a named DESIGN.md component — built as part of CasePage's hero. */
export function Breadcrumb({ parentLabel, parentHref, currentLabel }: BreadcrumbProps) {
  return (
    <nav className={styles.root} aria-label="Breadcrumb">
      <Link href={parentHref} className={styles.link}>
        {parentLabel}
      </Link>
      <span aria-hidden="true">/</span>
      <span className={styles.current}>{currentLabel}</span>
    </nav>
  );
}
