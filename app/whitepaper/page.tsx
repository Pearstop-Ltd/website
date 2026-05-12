import type { Metadata } from "next";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Whitepaper",
  description: "How hard services companies use spend data to negotiate better contracts.",
  alternates: {
    canonical: `${siteConfig.url}/whitepaper`
  }
};

export default function WhitepaperPage() {
  return (
    <>
      <PageHero
        eyebrow="Free Whitepaper"
        title="How hard services companies use spend data to negotiate better contracts"
        lead="A practical guide to building a spend baseline your procurement team can act on."
      />

      <section>
        <div className="container">
          <SectionTitle title="What you will get" lead="A low-commitment resource for people who are interested but not ready to book a call yet." />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>What a good spend baseline looks like</h3>
              <p>Use the whitepaper to understand the structure your data needs before you can negotiate well.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>How hard services teams use it</h3>
              <p>See how procurement teams turn messy spend into category management and supplier leverage.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Where Pearstop fits</h3>
              <p>Learn where automation removes the manual work and where your team stays in control.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="quote-card">
                <div className="story-label">Request the guide</div>
                <p className="light-copy">
                  If you want the whitepaper, send us a note and we will point you to the right resource. It is a simple, low-friction step for people who are not ready to schedule a call.
                </p>
                <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
                  <a className="btn btn-primary" href={`mailto:${siteConfig.email}?subject=Whitepaper%20request`}>
                    Request via email
                  </a>
                  <a className="btn btn-outline" href="/contact">
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Prefer a conversation?"
        lead="We can also walk you through the same thinking on a quick call."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Back to home", href: "/", variant: "secondary" }
        ]}
      />
    </>
  );
}
