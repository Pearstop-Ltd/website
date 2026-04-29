import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { legacyWork, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Legacy Pearstop work pages preserved for old URLs and search traffic.",
  alternates: {
    canonical: `${siteConfig.url}/work`
  }
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Legacy Work"
        title="AI and due diligence work, preserved."
        lead="Older Pearstop work pages still resolve here so existing links and search results keep working."
      />

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="Archived work pages" />
          <div className="article-grid">
            {Object.values(legacyWork).map((entry) => (
              <article key={entry.slug} className="blog-card">
                <div className="blog-img-wrap" style={{ background: "var(--blue-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy)" }}>
                  Archived
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{entry.category}</span>
                  <h3 className="blog-title">
                    <Link href={`/work/${entry.slug}`}>{entry.title}</Link>
                  </h3>
                  <p className="light-copy">{entry.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Looking for the current AI page?"
        lead="The new AI readiness page carries the current message."
        actions={[
          { label: "Go to AI readiness", href: "/ai-readiness", variant: "primary" },
          { label: "Explore Fabric readiness", href: "/fabric", variant: "secondary" }
        ]}
      />
    </>
  );
}

