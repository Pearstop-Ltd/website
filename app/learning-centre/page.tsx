import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { legacyLearningCentre, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learning Centre",
  description: "Legacy Pearstop learning centre content preserved for old URLs and search traffic.",
  alternates: {
    canonical: `${siteConfig.url}/learning-centre`
  }
};

export default function LearningCentrePage() {
  return (
    <>
      <PageHero
        eyebrow="Learning Centre"
        title="Legacy content, preserved."
        lead="Older Pearstop articles still have search value, so this hub stays alive while the new blog takes over the current content strategy."
      />

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="Archived articles" lead="A selection of legacy topics that still deserve a home." />
          <div className="article-grid">
            {Object.values(legacyLearningCentre).map((entry) => (
              <article key={entry.slug} className="blog-card">
                <div className="blog-img-wrap" style={{ background: "var(--blue-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy)" }}>
                  Archived
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{entry.category}</span>
                  <h3 className="blog-title">
                    <Link href={`/learning-centre/${entry.slug}`}>{entry.title}</Link>
                  </h3>
                  <p className="light-copy">{entry.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Looking for the current Pearstop content strategy?"
        lead="The blog is the newer home for insight content."
        actions={[
          { label: "Go to blog", href: "/blog", variant: "primary" },
          { label: "Explore solutions", href: "/solutions", variant: "secondary" }
        ]}
      />
    </>
  );
}

