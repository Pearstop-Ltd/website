import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { legacyUseCases, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Projects",
  description: "Legacy Pearstop use cases preserved for old URLs and search traffic.",
  alternates: {
    canonical: `${siteConfig.url}/use-cases`
  }
};

export default function UseCasesPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Pearstop in action"
        lead="The old use-case hub remains available so existing links keep working, while the main site now leads with the newer cases page."
      />

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="Archived use cases" lead="A few of the older stories people still search for." />
          <div className="article-grid">
            {Object.values(legacyUseCases).map((entry) => (
              <article key={entry.slug} className="blog-card">
                <div className="blog-img-wrap" style={{ background: "var(--purple-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--navy)" }}>
                  Archived
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{entry.category}</span>
                  <h3 className="blog-title">
                    <Link href={`/use-cases/${entry.slug}`}>{entry.title}</Link>
                  </h3>
                  <p className="light-copy">{entry.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Looking for the main case studies page?"
        lead="The new cases page brings the stronger proof points together."
        actions={[
          { label: "Go to cases", href: "/cases", variant: "primary" },
          { label: "Explore solutions", href: "/solutions", variant: "secondary" }
        ]}
      />
    </>
  );
}

