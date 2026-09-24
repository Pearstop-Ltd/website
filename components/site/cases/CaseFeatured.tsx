import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { dsRoot } from "../tokens";
import type { CaseStat } from "@/lib/cases";
import styles from "./CaseFeatured.module.css";

export interface CaseFeaturedProps {
  metaLabel: string;
  tag: ReactNode;
  title: ReactNode;
  summary: ReactNode;
  stats: CaseStat[];
  linkLabel: string;
  href: string;
  logo?: { src: string; alt: string };
  visual: ReactNode;
  className?: string;
}

/** The single featured client case, above the client-case grid — bg-soft
 * panel, headline + summary + up to 3 stats on the left, a bespoke visual
 * (e.g. CaseCardVisual variant="supplierMerge") on the right. */
export function CaseFeatured({ metaLabel, tag, title, summary, stats, linkLabel, href, logo, visual, className }: CaseFeaturedProps) {
  return (
    <Link href={href} className={dsRoot(styles.root, className)}>
      <div className={styles.grid}>
        <div className={styles.main}>
          <div className={styles.metaRow}>
            <span className={styles.metaLabel}>{metaLabel}</span>
            <span className={styles.tag}>{tag}</span>
            {logo ? <Image src={logo.src} alt={logo.alt} width={100} height={22} className={styles.logo} /> : null}
          </div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.summary}>{summary}</p>
          <div className={styles.stats}>
            {stats.map((stat, i) => (
              <div className={styles.stat} key={i}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
          <span className={styles.link}>{linkLabel} →</span>
        </div>
        <div className={styles.visual}>{visual}</div>
      </div>
    </Link>
  );
}
