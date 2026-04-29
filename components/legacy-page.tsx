import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import type { LegacyEntry } from "@/lib/site";

export function LegacyArticlePage({
  entry,
  backHref,
  backLabel
}: {
  entry: LegacyEntry;
  backHref: string;
  backLabel: string;
}) {
  return (
    <>
      <PageHero eyebrow={entry.category} title={entry.title} lead={entry.summary} actions={[{ label: "Back", href: backHref, variant: "secondary" }, { label: entry.ctaLabel, href: entry.ctaHref, variant: "primary" }]} />

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="Why this page still matters" lead="This URL is preserved for legacy SEO value and for visitors who still find the older Pearstop content in search or through external links." />
          <div className="bene-cards">
            {entry.bullets.map((bullet) => (
              <article key={bullet} className="ben-card">
                <div className="ben-icon">✓</div>
                <p>{bullet}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="geo-block">
                <h3>Archived content</h3>
                <p>
                  This legacy page remains available so the old path does not break. Pearstop's newer marketing pages cover the same underlying problem with the updated positioning and route structure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand title={`Looking for the newer Pearstop page for this topic?`} lead={`The old ${backLabel} path is still here, but the updated site now groups this topic under the main solution pages.`} actions={[{ label: "Explore the new site", href: backHref, variant: "primary" }]} />
    </>
  );
}

