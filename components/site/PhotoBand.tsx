import type { ReactNode } from "react";
import Image from "next/image";
import { dsRoot } from "./tokens";
import styles from "./PhotoBand.module.css";

export interface PhotoBandProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: ReactNode;
  className?: string;
}

/** Full-width photography band with an optional caption. Placeholder for
 * the people/engineer/site photography being added later. */
export function PhotoBand({ src, alt, width, height, caption, className }: PhotoBandProps) {
  return (
    <figure className={dsRoot(styles.root, className)}>
      <Image src={src} alt={alt} width={width} height={height} className={styles.image} />
      {caption ? <figcaption className={styles.caption}>{caption}</figcaption> : null}
    </figure>
  );
}
