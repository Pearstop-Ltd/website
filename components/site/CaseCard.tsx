import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { dsRoot } from "./tokens";
import type { CardImage } from "./Card";
import styles from "./CaseCard.module.css";

export interface CaseCardStat {
  value: ReactNode;
  label: ReactNode;
}

export interface CaseCardProps {
  /** "client" = named work, real data (blue eyebrow). "pattern" =
   * illustrative data (purple-text eyebrow). */
  variant: "client" | "pattern";
  eyebrow: ReactNode;
  title: ReactNode;
  stats: CaseCardStat[];
  href: string;
  linkLabel: string;
  /** Mini visual panel slot — the refs use bespoke per-case illustrations
   * (colour bars, tile grids, before/after bars). */
  visual?: ReactNode;
  image?: CardImage;
  /** Client logo badge, from an existing file in /images/clients/. Omit
   * for anonymised pattern cases — there's no client to credit. */
  logo?: { src: string; alt: string };
  className?: string;
}

export function CaseCard({ variant, eyebrow, title, stats, href, linkLabel, visual, image, logo, className }: CaseCardProps) {
  return (
    <article className={dsRoot(styles.root, className)}>
      {image ? (
        <div className={styles.imageWrap}>
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className={styles.image} />
        </div>
      ) : visual ? (
        <div className={styles.visual}>{visual}</div>
      ) : null}
      <div className={styles.body}>
        {logo ? (
          <div className={styles.logo}>
            <Image src={logo.src} alt={logo.alt} width={96} height={28} className={styles.logoImage} />
          </div>
        ) : null}
        <span className={dsRoot(styles.eyebrow, variant === "pattern" ? styles.eyebrowPattern : styles.eyebrowClient)}>
          {eyebrow}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.stats}>
          {stats.map((stat, i) => (
            <div className={styles.stat} key={i}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
        <Link href={href} className={styles.link}>
          {linkLabel} →
        </Link>
      </div>
    </article>
  );
}
