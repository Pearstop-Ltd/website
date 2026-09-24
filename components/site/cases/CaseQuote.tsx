import Image from "next/image";
import { dsRoot } from "../tokens";
import { getPerson, initialsOf, type PersonId } from "@/lib/people";
import styles from "./CaseQuote.module.css";

export interface CaseQuoteProps {
  personId: PersonId;
  quote: string;
  className?: string;
}

/** Small testimonial card for the /cases index "In their words" grid —
 * bg-soft panel, quote, 44px avatar (photo or initials) + name/role. No
 * star ratings. */
export function CaseQuote({ personId, quote, className }: CaseQuoteProps) {
  const person = getPerson(personId);

  return (
    <figure className={dsRoot(styles.root, className)}>
      <blockquote className={styles.quote}>&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className={styles.caption}>
        {person.headshot ? (
          <Image src={person.headshot} alt={person.name} width={44} height={44} className={styles.avatarPhoto} />
        ) : (
          <span className={styles.avatar}>{initialsOf(person.name)}</span>
        )}
        <span className={styles.person}>
          <strong className={styles.name}>{person.name}</strong>
          <span className={styles.role}>
            {person.role}, {person.company}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
