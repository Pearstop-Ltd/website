import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { alternateLanguages, caseStudies, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Results",
  description:
    "Real results from hard services, infrastructure, manufacturing, and FM companies that used Pearstop to clean their data, cut manual work, and protect their margins.",
  alternates: {
    canonical: `${siteConfig.url}/cases`,
    languages: alternateLanguages("/cases")
  }
};

export default function CasesPage() {
  const featured = caseStudies.find((c) => c.slug === "spie") ?? caseStudies[0];
  const others = caseStudies.filter((c) => c.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow="Client Results"
        title="Real work. Real margins."
        lead="How technical businesses in FM, construction, manufacturing, and infrastructure use Pearstop to clean their data and protect their margins."
      />

      <section>
        <div className="container">
          <div className="row" style={{ marginBottom: "1rem" }}>
            <div className="col-md-12">
              <span className="cf-pill">Featured Case Study</span>
            </div>
          </div>
          <div className="row" style={{ alignItems: "flex-start", gap: "2.5rem", flexWrap: "wrap" }}>
            <div className="col-md-6" id={featured.slug}>
              <div style={{ background: "var(--navy)", borderRadius: 10, padding: "0.85rem 1.25rem", display: "inline-block", marginBottom: "1rem" }}>
                <img src={siteConfig.assets.clients.spie} alt="SPIE" style={{ height: 32, width: "auto", display: "block" }} />
              </div>
              <div className="cf-industry">{featured.category}</div>
              <h2>{featured.title}</h2>
              <p className="cf-body">
                SPIE Building Solutions&apos; asset register had been fed by different maintenance systems, contractors, and manual entry over many years. The same manufacturer could appear under a dozen different spellings, and equipment types were often missing or recorded incorrectly.
              </p>
              <p className="cf-body">
                Pearstop applied its procurement-data classification pipeline to consolidate 9,175 supplier name variants into 1,493 canonical suppliers across 204,029 asset records — the same engine that cleans spend data, proven on a different kind of messy dataset.
              </p>
              <div className="cf-quote-block">
                <p className="cf-quote">The confidence scoring meant our team knew where to spend their review time first, instead of starting from scratch on 200,000 rows.</p>
                <div className="cf-attr">
                  <img src="/images/clients/bart-headshot.jpg" alt="Bart van Peij" className="cf-avatar" style={{ borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <strong>Bart van Peij</strong>
                    <span className="cf-role">Head of Master Data Management, SPIE Building Solutions</span>
                  </div>
                </div>
              </div>
              <p className="light-copy">
                <Link href="/cases/spie">Read the full case study →</Link>
              </p>
            </div>
            <div className="col-md-5">
              <div className="cf-stats-box">
                <div className="cf-stats-header">Results at a glance</div>
                <div className="cf-stat-row">
                  <div className="cf-stat-num">204,029</div>
                  <div className="cf-stat-lbl">Asset records processed</div>
                </div>
                <div className="cf-stat-row">
                  <div className="cf-stat-num">9,175 → 1,493</div>
                  <div className="cf-stat-lbl">Supplier variants consolidated</div>
                </div>
                <div className="cf-stat-row">
                  <div className="cf-stat-num">73.1%</div>
                  <div className="cf-stat-lbl">Confirmed match rate</div>
                </div>
                <div className="cf-stat-row">
                  <div className="cf-stat-num">107,081</div>
                  <div className="cf-stat-lbl">Lines enhanced</div>
                </div>
                <div className="cf-tags">
                  <span className="cf-tag">Hard Services FM</span>
                  <span className="cf-tag">Data Quality</span>
                  <span className="cf-tag">Supplier Matching</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle title="What our clients say" lead="From procurement teams to operations directors - the impact shows up in the numbers." />
          <div className="testimonials-grid">
            <article className="cq-card">
              <div className="cq-stars">★★★★★</div>
              <p className="cq-text">
                The confidence scoring meant our team knew where to spend their review time first, instead of starting from scratch on 200,000 rows.
              </p>
              <div className="cq-attr">
                <div className="cq-avatar" />
                <div>
                  <span className="cq-name">Bart van Peij</span>
                  <span className="cq-role">Head of Master Data Management · SPIE Building Solutions</span>
                </div>
              </div>
            </article>
            <article className="cq-card featured-dark">
              <div className="cq-stars">★★★★★</div>
              <p className="cq-text">
                Pearstop built a system that automatically pulls the right items from our visiting reports into a clean proposal document. It saves our team a lot of time by eliminating the repetitive tasks of combining the correct items.
              </p>
              <div className="cq-attr">
                <img src="/images/clients/vince-headshot.jpg" alt="Vince Out" className="cq-avatar" style={{ borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <span className="cq-name">Vince Out</span>
                  <span className="cq-role">Commercial Manager · Manufacturing</span>
                </div>
              </div>
            </article>
            <article className="cq-card">
              <div className="cq-stars">★★★★★</div>
              <p className="cq-text">
                We had thousands of product lines that needed to be categorised before we could even begin to understand our costs. Pearstop classified them in under a week. That would have taken our team six months and still would not have been this accurate.
              </p>
              <div className="cq-attr">
                <img src="/images/clients/david-headshot.jpg" alt="David Torr" className="cq-avatar" style={{ borderRadius: "50%", objectFit: "cover" }} />
                <div>
                  <span className="cq-name">David Torr</span>
                  <span className="cq-role">CEO · FARO</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="More client stories" lead="A selection of projects across industries, challenges, and solution types." />
          <div className="article-grid">
            {others.map((story) => (
              <article key={story.slug} className="cg-card" id={story.slug}>
                <Link className="cg-card-link" href={`/cases/${story.slug}`}>
                  <div className={`cg-img ${story.tone}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: "2rem", background: story.tone === "from-blue" ? "linear-gradient(135deg,#1F2A68,#353FFF)" : story.tone === "from-slate" ? "linear-gradient(135deg,#0f172a,#1e3a5f)" : story.tone === "from-green" ? "linear-gradient(135deg,#1a4731,#2d7a4f)" : story.tone === "from-amber" ? "linear-gradient(135deg,#7c2d12,#c2410c)" : story.tone === "from-indigo" ? "linear-gradient(135deg,#312e81,#5847a0)" : "linear-gradient(135deg,#1e3a5f,#2563eb)" }}>
                    {story.image ? (
                      story.imageFit === "contain" ? (
                        <img src={story.image} alt={`${story.title} logo`} style={{ maxHeight: 56, maxWidth: 200, display: "block" }} />
                      ) : (
                        <img src={story.image} alt="" aria-hidden="true" style={{ width: 72, height: 72 }} />
                      )
                    ) : (
                      "✦"
                    )}
                  </div>
                  <div className="cg-body">
                    <div className="cg-ind">{story.category}</div>
                    <h3>{story.title}</h3>
                    <p className="cg-excerpt">{story.excerpt}</p>
                    <div className="cg-results">
                      <div>
                        <span className="cg-result-num">{story.statPrimary}</span>
                        <span className="cg-result-lbl">{story.statPrimaryLabel}</span>
                      </div>
                      <div>
                        <span className="cg-result-num">{story.statSecondary}</span>
                        <span className="cg-result-lbl">{story.statSecondaryLabel}</span>
                      </div>
                    </div>
                    <div className="cg-tags">
                      {story.tags.map((tag) => (
                        <span key={tag} className="cg-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="cg-link">Read the case study →</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        eyebrow="Ready to see results like these?"
        title="Let's talk about your data challenge."
        lead="Tell us where your margins are leaking. We will show you exactly how Pearstop fixes it."
        actions={[
          { label: "Book a demo", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Explore solutions", href: "/solutions", variant: "secondary" }
        ]}
      />
    </>
  );
}
