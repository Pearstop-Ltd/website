import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pearstop Blog",
  description:
    "Practical guides, industry analysis, and data quality thinking for hard services, construction, and infrastructure companies.",
  alternates: {
    canonical: `${siteConfig.url}/blog`
  }
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="The Pearstop Blog"
        lead="Practical guides, industry analysis, and data quality thinking for technical businesses."
      />

      <section>
        <div className="container">
          <SectionTitle title="Articles are on their way" lead="In the meantime, listen to the podcast or connect on LinkedIn for the latest thinking." />
          <div className="article-grid">
            {[
              { tag: "Data Quality", title: "Articles publishing soon" },
              { tag: "Procurement", title: "More content on the way" },
              { tag: "AI Readiness", title: "Follow on LinkedIn for updates" }
            ].map((post) => (
              <article key={post.title} className="blog-card">
                <div className="blog-img-wrap" style={{ background: "var(--purple-soft)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--purple)" }}>
                  Coming soon
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{post.tag}</span>
                  <h3 className="blog-title">
                    <Link href="/blog">{post.title}</Link>
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row" style={{ alignItems: "center", gap: "2.5rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <span className="podcast-pill">Podcast</span>
              <h2>The Data Edge podcast</h2>
              <p className="podcast-lead">Interviews, insights, and actionable thinking on data quality, procurement, and asset management for technical industries.</p>
              <div className="podcast-btns">
                <a className="podcast-btn podcast-btn-yt" href={siteConfig.socials.youtube} target="_blank" rel="noopener noreferrer">
                  YouTube
                </a>
                <a className="podcast-btn podcast-btn-sp" href="https://open.spotify.com/show/37QLB09fDgo8Q4g8wVw4uk" target="_blank" rel="noopener noreferrer">
                  Spotify
                </a>
                <a className="podcast-btn podcast-btn-ap" href="https://podcasts.apple.com/us/podcast/the-data-edge-data-quality-ai-readiness/id1872757553" target="_blank" rel="noopener noreferrer">
                  Apple Podcasts
                </a>
              </div>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto", textAlign: "center" }}>
              <img
                src={siteConfig.assets.blogPodcast}
                alt="The Data Edge Podcast"
                className="podcast-img"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Want the latest Pearstop thinking?"
        lead="The blog will grow, but the quickest updates are on LinkedIn and through the podcast."
        actions={[
          { label: "Visit LinkedIn", href: siteConfig.socials.linkedin, variant: "primary", external: true },
          { label: "Book a 7-minute discovery", href: "/contact", variant: "secondary" }
        ]}
      />
    </>
  );
}
