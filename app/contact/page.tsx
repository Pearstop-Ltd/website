import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { ContactMailtoForm } from "@/components/contact-mailto-form";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Pearstop",
  description: "See what Pearstop can do. Get to know the team or schedule a demo.",
  alternates: {
    canonical: `${siteConfig.url}/contact`
  }
};

export default function ContactPage() {
  const leaders = [
    { name: "Stephanie Wiechers", role: "CEO", image: siteConfig.assets.team.stephanie },
    { name: "Richard Wallace", role: "CCO", image: siteConfig.assets.team.richard }
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="See what Pearstop can do." lead="Don't take our word for it. Get to know the team or schedule a demo." />

      <section>
        <div className="container">
          <div className="row" style={{ alignItems: "flex-start", gap: "3rem", flexWrap: "wrap" }}>
            <div className="col-md-6">
              <div className="quote-card" style={{ margin: 0 }}>
                <div className="story-label">Get in touch</div>
                <p className="light-copy" style={{ marginTop: "1rem" }}>
                  Fill in the details and your email app will open with a prefilled message ready to send.
                </p>
                <ContactMailtoForm />
              </div>
            </div>

            <div className="col-md-6">
              <SectionTitle title="Our Locations" lead="We have local presence in Ireland, the Netherlands, UK, California and South Africa." />
              <div className="quote-card">
                <div className="story-label">Main OFFICE</div>
                <p className="light-copy">
                  Dogpatch labs, CHQ Building
                  <br />
                  Custom House Quay,
                  <br />
                  D01 Y6H7 Dublin, Ireland
                </p>
                <div className="story-label">CONTACT</div>
                <p>
                  <a className="location-email" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </p>
                <div className="story-label">Legal</div>
                <p className="light-copy">
                  Pearstop Ltd, registered in Ireland
                  <br />
                  <Link href="/terms-and-conditions">Terms and conditions</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <SectionTitle
                eyebrow="Calendly"
                title="Prefer to book directly?"
                lead="Use the inline calendar below to choose a time with Stephanie without the back-and-forth."
              />
              <div className="calendly-card">
                <div
                  className="calendly-inline-widget"
                  data-url={siteConfig.calendly}
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script id="calendly-widget" src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

      <section className="technical-team">
        <div className="container">
          <SectionTitle title="Technical team" lead="The people behind the work." />
          <div className="testimonials-grid">
            {leaders.map((leader) => (
              <article key={leader.name} className="person-card">
                <div className="person-photo">
                  <img src={leader.image} alt={`${leader.name} portrait`} loading="lazy" />
                </div>
                <div className="person-body">
                  <h3>{leader.name}</h3>
                  <div className="person-role">{leader.role}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Not sure if Pearstop is for you?"
        lead="Let's talk. You're smart - let's work out your solution."
        actions={[
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true },
          { label: "Find out what's possible (send email)", href: `mailto:${siteConfig.email}`, variant: "secondary", external: true }
        ]}
      />
    </>
  );
}
