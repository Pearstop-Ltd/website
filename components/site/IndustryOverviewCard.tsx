import Link from "next/link";
import Image from "next/image";
import { dsRoot } from "./tokens";
import styles from "./IndustryOverviewCard.module.css";

export interface IndustryOverviewCardProps {
  name: string;
  pain: string;
  outcome: string;
  linkLabel: string;
  href: string;
  photoAlt: string;
  photo?: string | null;
  tint?: "blue" | "purple" | "green" | "soft";
  className?: string;
}

/** One card in the "Which one sounds like you?" static grid: a circular
 * photo crop clipped into the card's top-right corner, name, pain,
 * outcome and a link. When no matching photo exists yet, the circle falls
 * back to a navy-to-blue gradient instead of a placeholder image. */
export function IndustryOverviewCard({ name, pain, outcome, linkLabel, href, photoAlt, photo, tint = "soft", className }: IndustryOverviewCardProps) {
  return (
    <Link href={href} className={dsRoot(styles.root, styles[`tint-${tint}`], className)}>
      <span className={styles.circle} aria-hidden="true" title={photoAlt}>
        {photo ? <Image src={photo} alt="" width={132} height={132} className={styles.circleImage} /> : null}
      </span>
      <span className={styles.body}>
        <h3 className={styles.eyebrow}>{name}</h3>
        <span className={styles.pain}>{pain}</span>
        <span className={styles.outcome}>{outcome}</span>
        <span className={styles.link}>{linkLabel}</span>
      </span>
    </Link>
  );
}
