import Link from "next/link";
import Image from "next/image";
import { CheckIcon } from "./icons";
import { QuoteCard } from "./QuoteCard";
import { Faq } from "./Faq";
import { SampleRequestModal } from "@/components/sample-request-modal";
import { CalendlyButton } from "@/components/calendly-button";
import { siteConfig } from "@/lib/site";
import type { PersonId } from "@/lib/people";
import styles from "./IndustrySection.module.css";

export interface IndustrySectionFaqItem {
  q: string;
  a: string;
}

export interface IndustrySectionProof {
  stat?: string;
  quote?: string;
  role?: string;
  personId?: PersonId;
  caseLabel?: string | null;
  caseHref?: string | null;
  linkLabel?: string;
  linkHref?: string;
}

export interface IndustrySectionCopy {
  id: string;
  tabLabel: string;
  eyebrow: string;
  ctaIndustry: string;
  h2: string;
  intro: string;
  photo?: string | null;
  photoAlt: string;
  dayToDay: { work: string; spend: string; matters: string };
  pains: { title: string; body: string }[];
  solutionLink: { label: string; href: string };
  changes: string[];
  proof?: IndustrySectionProof | null;
  faq: IndustrySectionFaqItem[];
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function forwardMailto(industryLabel: string, sectionUrl: string) {
  const subject = encodeURIComponent(`Worth a look: Pearstop for ${industryLabel}`);
  const body = encodeURIComponent(
    `Thought this might be relevant for us. Pearstop cleans and classifies procurement and asset data for ${industryLabel}.\n\n${sectionUrl}`
  );
  return `mailto:?subject=${subject}&body=${body}`;
}

/** One slide of the /industries slider: intro row, "day to day" facts,
 * pains/changes/proof, CTA bar, industry FAQ, and the closing row. Active
 * state, tabpanel semantics and inert handling all live in the slider
 * shell — this component only renders the slide's own content. */
export function IndustrySection({
  copy,
  isActive,
  nextIndustry,
  isLast
}: {
  copy: IndustrySectionCopy;
  isActive: boolean;
  nextIndustry?: { id: string; label: string };
  isLast: boolean;
}) {
  const sectionUrl = `${siteConfig.url}/industries#${copy.id}`;
  const proof = copy.proof;

  return (
    <section
      id={copy.id}
      role="tabpanel"
      aria-labelledby={`industry-tab-${copy.id}`}
      inert={!isActive}
      className={styles.root}
    >
      <div className={styles.intro}>
        <div className={styles.introText}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h2 className={styles.h2}>{copy.h2}</h2>
          <p className={styles.body}>{copy.intro}</p>
        </div>
        <div className={styles.introPhoto} data-has-photo={Boolean(copy.photo)}>
          {copy.photo ? <Image src={copy.photo} alt={copy.photoAlt} fill sizes="(max-width: 767px) 100vw, 480px" className={styles.introPhotoImage} /> : null}
        </div>
      </div>

      <div className={styles.dayToDay}>
        <div className={styles.dayToDayItem}>
          <span className={styles.dayToDayLabel}>The work</span>
          <span className={styles.dayToDayBody}>{copy.dayToDay.work}</span>
        </div>
        <div className={styles.dayToDayItem}>
          <span className={styles.dayToDayLabel}>The spend</span>
          <span className={styles.dayToDayBody}>{copy.dayToDay.spend}</span>
        </div>
        <div className={styles.dayToDayItem}>
          <span className={styles.dayToDayLabel}>What matters</span>
          <span className={styles.dayToDayBody}>{copy.dayToDay.matters}</span>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.painsCol}>
          <span className={styles.smallLabel}>Sound familiar?</span>
          <ul className={styles.painsList}>
            {copy.pains.map((pain) => (
              <li key={pain.title} className={styles.painItem}>
                <span className={styles.painDot} aria-hidden="true" />
                <div>
                  <strong className={styles.painTitle}>{pain.title}</strong>
                  <p className={styles.painBody}>{pain.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link href={copy.solutionLink.href} className={styles.solutionLink}>
            {copy.solutionLink.label} →
          </Link>
        </div>

        <div className={styles.changesCard}>
          <span className={styles.smallLabel}>What changes with Pearstop</span>
          <ul className={styles.changesList}>
            {copy.changes.map((change) => (
              <li key={change} className={styles.changeItem}>
                <CheckIcon />
                <span>{change}</span>
              </li>
            ))}
          </ul>
          {proof?.stat ? <div className={styles.statChip}>{proof.stat}</div> : null}
          {proof?.quote ? (
            <QuoteCard
              quote={proof.quote}
              variant="inline"
              {...(proof.personId ? { personId: proof.personId } : { role: proof.role ?? "" })}
            />
          ) : null}
          {proof?.quote && (proof.caseLabel || proof.linkLabel) ? (
            <Link href={(proof.caseHref || proof.linkHref)!} className={styles.caseLink}>
              {(proof.caseLabel || proof.linkLabel)} →
            </Link>
          ) : null}
          {!proof?.quote && proof?.linkLabel && proof.linkHref ? (
            <Link href={proof.linkHref} className={styles.caseLink}>
              {proof.linkLabel} →
            </Link>
          ) : null}
        </div>
      </div>

      <div className={styles.ctaBar}>
        <span className={styles.ctaBarLabel}>See it on your own {copy.ctaIndustry} data.</span>
        <div className={styles.ctaBarActions}>
          <SampleRequestModal label="Send us a data sample. We clean it for free." className={styles.ctaPrimary} />
          <CalendlyButton label="Book a 15-minute discovery" className={styles.ctaSecondary} />
          <a href={forwardMailto(copy.ctaIndustry, sectionUrl)} className={styles.ctaTertiary}>
            <MailIcon />
            Forward to a colleague
          </a>
        </div>
      </div>

      <div className={styles.faqBlock}>
        <span className={styles.smallLabel}>Questions about {copy.ctaIndustry}</span>
        <Faq items={copy.faq} defaultOpenIndex={0} />
      </div>

      <div className={styles.closingRow}>
        <a href="#all-industries" className={styles.backLink}>
          ↑ Back to all industries
        </a>
        {!isLast && nextIndustry ? (
          <a href={`#${nextIndustry.id}`} className={styles.nextLink}>
            Next industry: {nextIndustry.label} →
          </a>
        ) : null}
      </div>
    </section>
  );
}
