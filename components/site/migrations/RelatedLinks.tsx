import Link from "next/link";
import { dsRoot } from "../tokens";
import { SectionHeader } from "../SectionHeader";
import styles from "./RelatedLinks.module.css";

export function RelatedLinks({
  links,
  className,
}: {
  links: Array<{ href: string; label: string }>;
  className?: string;
}) {
  return (
    <div className={dsRoot(className)}>
      <SectionHeader title="Related reading" />
      <div className={styles.grid} style={{ marginTop: 32 }}>
        {links.map((link) => (
          <Link href={link.href} className={styles.link} key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
