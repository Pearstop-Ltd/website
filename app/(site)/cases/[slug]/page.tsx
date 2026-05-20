import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTABand, GeoBlock, PageHero, QuoteBox, SectionTitle, StatsGrid } from "@/components/content";
import { caseStudyDetails, siteConfig } from "@/lib/site";

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = caseStudyDetails[slug];
  return {
    title: entry?.title ?? titleFromSlug(slug),
    description: entry?.lead ?? "Pearstop client case study.",
    alternates: {
      canonical: `${siteConfig.url}/cases/${slug}`
    }
  };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = caseStudyDetails[slug];

  if (!entry) {
    notFound();
  }

  return (
    <>
      <PageHero eyebrow={entry.eyebrow} title={entry.title} lead={entry.lead} />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="benefit-eyebrow">The challenge</div>
              <h2>{entry.challenge}</h2>
              <p className="light-copy">{entry.solution}</p>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <StatsGrid className="stats-aside" stats={entry.wins} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <QuoteBox quote={entry.quote} author={entry.author} role={entry.role} />
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <GeoBlock title="What changed?" copy={entry.geo} />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title={entry.slug === "strukton" ? "Want updates on the Strukton work?" : "Want a case study built around your data?"}
        lead={entry.slug === "strukton" ? "This page stays live while the full case study is being finalised." : "We can show you what the same approach would look like for your procurement or asset data."}
        actions={[
          { label: entry.ctaLabel, href: entry.ctaHref, variant: "primary", external: entry.ctaHref.startsWith("http") },
          { label: "Back to cases", href: "/cases", variant: "secondary" }
        ]}
      />
    </>
  );
}

