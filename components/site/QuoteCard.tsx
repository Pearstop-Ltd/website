import type { ReactNode } from "react";
import Image from "next/image";
import { dsRoot } from "./tokens";
import { getPerson, initialsOf, type PersonId } from "@/lib/people";
import styles from "./QuoteCard.module.css";

export type QuoteCardProps = {
  quote: ReactNode;
  variant?: "panel" | "inline";
  className?: string;
} & (
  | { personId: PersonId; role?: never }
  /** Anonymous quote — role only, never a name or a photo. */
  | { personId?: never; role: ReactNode }
);

const QuoteMark = () => (
  <svg width="36" height="28" viewBox="0 0 36 28" fill="none" aria-hidden="true">
    <path
      d="M0 28 V16 C0 7 5 1.5 14 0 L15.5 4 C10 5.5 7.5 9 7.5 13 H14 V28 Z M21 28 V16 C21 7 26 1.5 35 0 L36 4 C31 5.5 28.5 9 28.5 13 H35 V28 Z"
      fill="var(--purple)"
    />
  </svg>
);

/** panel: navy background, purple quote mark, large white quote (case study
 * pull-quotes). inline: bordered row with a circular initials avatar.
 *
 * Named quotes (`personId`) resolve name, role, company and headshot from
 * lib/people.ts, so a named person shows the same photo everywhere they're
 * quoted. Anonymous quotes (`role` only) never show a name or a photo. */
export function QuoteCard({ quote, variant = "panel", className, ...attribution }: QuoteCardProps) {
  const person = attribution.personId ? getPerson(attribution.personId) : undefined;
  const displayRole = person ? `${person.role}, ${person.company}` : attribution.role;

  const inlineAvatar = person ? (
    person.headshot ? (
      <Image src={person.headshot} alt={person.name} width={72} height={72} className={styles.inlineAvatarPhoto} />
    ) : (
      <span className={styles.inlineAvatar}>{initialsOf(person.name)}</span>
    )
  ) : null;

  const panelAvatar = person ? (
    person.headshot ? (
      <Image src={person.headshot} alt={person.name} width={48} height={48} className={styles.panelAvatarPhoto} />
    ) : (
      <span className={styles.panelAvatar}>{initialsOf(person.name)}</span>
    )
  ) : null;

  if (variant === "inline") {
    return (
      <figure className={dsRoot(styles.inlineRoot, className)}>
        {inlineAvatar}
        <div className={styles.inlineBody}>
          <blockquote className={styles.inlineQuote}>&ldquo;{quote}&rdquo;</blockquote>
          <figcaption className={styles.inlineCaption}>
            {person ? <strong className={styles.inlineName}>{person.name}</strong> : null}
            {person ? " · " : null}
            {displayRole}
          </figcaption>
        </div>
      </figure>
    );
  }

  return (
    <figure className={dsRoot(styles.panelRoot, className)}>
      <QuoteMark />
      <blockquote className={styles.panelQuote}>{quote}</blockquote>
      <figcaption className={styles.panelCaption}>
        {panelAvatar}
        <span className={styles.panelPerson}>
          {person ? <strong className={styles.panelName}>{person.name}</strong> : null}
          <span className={styles.panelRole}>{displayRole}</span>
        </span>
      </figcaption>
    </figure>
  );
}
