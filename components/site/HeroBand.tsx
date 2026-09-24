import type { ReactNode } from "react";
import Image from "next/image";
import { dsRoot } from "./tokens";
import { Section } from "./internal/Section";
import { HeadlineAccent } from "./HeadlineAccent";
import styles from "./templates/SolutionPage.module.css";

export interface HeroBandImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface HeroBandProps {
  eyebrow: ReactNode;
  /** The page's single H1. */
  title: ReactNode;
  lead: ReactNode;
  primaryLabel: string;
  primaryHref?: string;
  /** Render prop for a non-link primary action (e.g. a modal trigger like
   * SampleRequestModal) instead of a plain link. Receives the primary
   * button's className so the action matches the standard button styling. */
  primaryAction?: (className: string) => ReactNode;
  secondaryLabel?: string;
  secondaryHref?: string;
  secondaryAction?: (className: string) => ReactNode;
  /** A bespoke visual node (diagram, illustration). Takes precedence over
   * `image` when both are set. */
  visual?: ReactNode;
  /** A photo for the hero visual slot when the page has no bespoke diagram. */
  image?: HeroBandImage;
  className?: string;
}

/** Standalone version of SolutionPage's hero band (eyebrow, H1, accent
 * rule, lead, primary/secondary CTA, right-side visual) for pages that
 * don't use the full SolutionPage template. Shares SolutionPage.module.css
 * so both stay visually identical. See DESIGN.md. */
export function HeroBand({
  eyebrow,
  title,
  lead,
  primaryLabel,
  primaryHref,
  primaryAction,
  secondaryLabel,
  secondaryHref,
  secondaryAction,
  visual,
  image,
  className,
}: HeroBandProps) {
  const visualNode = visual ?? (image ? <Image src={image.src} alt={image.alt} width={image.width} height={image.height} style={{ width: "100%", height: "auto", borderRadius: 16 }} /> : null);

  return (
    <Section background="white" className={dsRoot(className)}>
      <div className={styles.heroGrid}>
        <div className={styles.heroMain}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          <HeadlineAccent />
          <p className={styles.lead}>{lead}</p>
          <div className={styles.heroActions}>
            {primaryAction ? (
              primaryAction(styles.primary)
            ) : (
              <a href={primaryHref} className={styles.primary}>
                {primaryLabel}
              </a>
            )}
            {secondaryAction
              ? secondaryAction(styles.secondary)
              : secondaryLabel && secondaryHref ? (
                  <a href={secondaryHref} className={styles.secondary}>
                    {secondaryLabel}
                  </a>
                ) : null}
          </div>
        </div>
        {visualNode ? <div className={styles.heroVisual}>{visualNode}</div> : null}
      </div>
    </Section>
  );
}
