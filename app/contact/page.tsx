import type { Metadata } from "next";
import Link from "next/link";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Pearstop",
  description: "Got a data problem worth solving? We would love to hear about it.",
  alternates: {
    canonical: `${siteConfig.url}/contact`
  }
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk."
        lead="Got a data problem worth solving? We would love to hear about it."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Email us", href: `mailto:${siteConfig.email}`, variant: "secondary", external: true }
        ]}
      />

      <section>
        <div className="container">
          <SectionTitle title="Where We Work" lead="Headquarters and local hubs." />
          <div className="row" style={{ alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="location-eyebrow">Headquarters</div>
              <h2>Dublin, Ireland</h2>
              <p className="light-copy">
                <strong>Dogpatch Labs</strong>
                <br />
                CHQ Building, Custom House Quay
                <br />
                Dublin D01 Y6H7, Ireland
              </p>
              <p>
                <a className="location-email" href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </p>
              <div className="hubs-label">Local hubs in</div>
              <div className="hubs-list">
                <span className="hub-tag">Ireland</span>
                <span className="hub-tag">Netherlands</span>
                <span className="hub-tag">South Africa</span>
                <span className="hub-tag">Italy</span>
              </div>
            </div>
            <div className="col-md-5" style={{ marginLeft: "auto" }}>
              <div className="quote-card">
                <div className="story-label">How to reach us</div>
                <p className="light-copy">The fastest way to start is a short discovery call. If you are not ready for that yet, send a note and we will point you to the right page or case study.</p>
                <div className="hero-actions" style={{ justifyContent: "flex-start", marginTop: "1rem" }}>
                  <Link href="/" className="btn btn-outline">
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Got a data problem worth solving?"
        lead="We would love to hear about it."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Email us", href: `mailto:${siteConfig.email}`, variant: "secondary", external: true }
        ]}
      />
    </>
  );
}

