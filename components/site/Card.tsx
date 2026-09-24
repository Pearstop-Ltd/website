import type { ReactNode } from "react";
import Image from "next/image";
import { dsRoot } from "./tokens";
import styles from "./Card.module.css";

export interface CardImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CardProps {
  title: ReactNode;
  body: ReactNode;
  variant?: "plain" | "tinted-blue" | "tinted-purple" | "tinted-green";
  /** Small inline icon rendered above the title. The refs use bespoke
   * per-item stroke SVGs; there's no fixed icon set, so callers pass one. */
  icon?: ReactNode;
  image?: CardImage;
  /** Heading level for the card title. Defaults to h3, matching DESIGN.md
   * ("H3 (card title)"). Never render more than one h1/h2 via this prop. */
  headingLevel?: "h3" | "h4";
  className?: string;
}

export function Card({ title, body, variant = "plain", icon, image, headingLevel = "h3", className }: CardProps) {
  const Heading = headingLevel;
  return (
    <div className={dsRoot(styles.root, styles[variant], className)}>
      {image ? (
        <div className={styles.imageWrap}>
          <Image src={image.src} alt={image.alt} width={image.width} height={image.height} className={styles.image} />
        </div>
      ) : null}
      {icon ? <div className={styles.icon}>{icon}</div> : null}
      <Heading className={styles.title}>{title}</Heading>
      <div className={styles.body}>{body}</div>
    </div>
  );
}
