import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { caseStudies, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Results",
  description:
    "Real results from hard services, infrastructure, manufacturing, and FM companies that used Pearstop to clean their data, cut manual work, and protect their margins.",
  alternates: {
    canonical: `${siteConfig.url}/cases`
  }
};

export default function CasesPage() {
  const featured = caseStudies[0];
  const others = caseStudies.slice(1);

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
              <div className="cf-industry">{featured.category}</div>
              <h2>{featured.title}</h2>
              <p className="cf-body">
                A major Dutch contractor had two dedicated staff manually assigning categories to supplier invoices - a slow, error-prone process that made spend analysis unreliable and procurement benchmarking impossible.
              </p>
              <p className="cf-body">
                Pearstop automated category assignment across 140,000+ line items, eliminated duplicate supplier records, and delivered a clean procurement dataset that feeds directly into their SAP system and reporting tools.
              </p>
              <div className="cf-quote-block">
                <p className="cf-quote">We used to have two full-time staff working on category assignment. Now the system does this for us - which has unlocked margin estimations further down the line too. It is more reliable at a fraction of the cost.</p>
                <div className="cf-attr">
                  <div className="cf-avatar" />
                  <div>
                    <strong>Head of Procurement</strong>
                    <span className="cf-role">Infrastructure Contractor, Netherlands</span>
                  </div>
                </div>
              </div>
              <p className="light-copy">
                Full case study coming soon. <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">Follow our LinkedIn for updates →</a>
              </p>
            </div>
            <div className="col-md-5">
              <div className="cf-stats-box">
                <div className="cf-stats-header">Results at a glance</div>
                <div className="cf-stat-row">
                  <div className="cf-stat-num">75%</div>
                  <div className="cf-stat-lbl">Reduction in manual category assignment time</div>
                </div>
                <div className="cf-stat-row">
                  <div className="cf-stat-num">140k+</div>
                  <div className="cf-stat-lbl">Supplier invoice lines cleaned and classified</div>
                </div>
                <div className="cf-stat-row">
                  <div className="cf-stat-num">2 FTE</div>
                  <div className="cf-stat-lbl">Redeployed to value-adding procurement work</div>
                </div>
                <div className="cf-stat-row">
                  <div className="cf-stat-num">SAP</div>
                  <div className="cf-stat-lbl">Single clean dataset feeding ERP and BI directly</div>
                </div>
                <div className="cf-tags">
                  <span className="cf-tag">Infrastructure</span>
                  <span className="cf-tag">UNSPSC</span>
                  <span className="cf-tag">Procurement</span>
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
                Our asset data was spread across spreadsheets and feeding from clients' legacy systems. None of it was consistent enough to do anything analytical with. Pearstop consolidated and structured it and suddenly we had something we could actually build on.
              </p>
              <div className="cq-attr">
                <div className="cq-avatar" />
                <div>
                  <span className="cq-name">Client</span>
                  <span className="cq-role">Asset Manager · SPIE</span>
                </div>
              </div>
            </article>
            <article className="cq-card featured-dark">
              <div className="cq-stars">★★★★★</div>
              <p className="cq-text">
                Pearstop built a system that automatically pulls the right items from our visiting reports into a clean proposal document. It saves our team a lot of time by eliminating the repetitive tasks of combining the correct items.
              </p>
              <div className="cq-attr">
                <div className="cq-avatar" />
                <div>
                  <span className="cq-name">Vince Out</span>
                  <span className="cq-role">Commercial Manager · Manufacturing | Air Filtration Units</span>
                </div>
              </div>
            </article>
            <article className="cq-card">
              <div className="cq-stars">★★★★★</div>
              <p className="cq-text">
                We had thousands of product lines that needed to be categorised before we could even begin to understand our costs. Pearstop classified them in under a week. That would have taken our team six months and still would not have been this accurate.
              </p>
              <div className="cq-attr">
                <div className="cq-avatar" />
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
                <div className={`cg-img ${story.tone}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: "2rem", background: story.tone === "from-blue" ? "linear-gradient(135deg,#1F2A68,#353FFF)" : story.tone === "from-slate" ? "linear-gradient(135deg,#0f172a,#1e3a5f)" : story.tone === "from-green" ? "linear-gradient(135deg,#1a4731,#2d7a4f)" : story.tone === "from-amber" ? "linear-gradient(135deg,#7c2d12,#c2410c)" : story.tone === "from-indigo" ? "linear-gradient(135deg,#312e81,#5847a0)" : "linear-gradient(135deg,#1e3a5f,#2563eb)" }}>
                  ✦
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
                  <Link className="cg-link" href={`/cases/${story.slug}`}>
                    {story.slug === "strukton" ? "Read the coming soon case →" : "Read the case study →"}
                  </Link>
                </div>
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
