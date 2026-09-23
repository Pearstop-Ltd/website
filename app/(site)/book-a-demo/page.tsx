import type { Metadata } from "next";
import Script from "next/script";
import { CTABand, PageHero } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "A 30-minute call to map your invoice and spend data blockers, your goals, and whether Pearstop gets you there.",
  alternates: {
    canonical: `${siteConfig.url}/book-a-demo`,
    languages: alternateLanguages("/book-a-demo")
  }
};

const STEPS = [
  {
    title: "Your current blockers",
    copy:
      "We start with where things actually break down. Is it invoice extraction? Where do your invoices even live today - in an ERP system, sitting in inboxes, or still arriving on paper? We'll walk through the options and find out exactly where yours get stuck."
  },
  {
    title: "Your process, mapped",
    copy:
      "Once invoices are processed, what happens next? We'll quickly map your process end to end, so we're working from how things actually flow today, not how they're supposed to."
  },
  {
    title: "Your goals",
    copy:
      "What do you actually want out of your invoice and spend data? We'll do a deep dive into what you're trying to achieve, not just what's broken."
  },
  {
    title: "The platform, walked through",
    copy:
      "We'll show you the parts of Pearstop that map directly to your goals, so you leave the call with a clear answer: will this get you where you want to be?"
  }
];

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="Here's exactly what we'll cover in 30 minutes"
        lead="No generic pitch. We spend the call on your data, your blockers, and whether Pearstop actually gets you where you want to go."
        actions={[{ label: "See available times", href: "#book", variant: "primary" }]}
      />

      <section>
        <div className="container">
          <div className="hiw-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            {STEPS.map((step, i) => (
              <article className="hiw-card" key={step.title}>
                <div className="hiw-badge">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft" id="book">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="text-center" style={{ marginBottom: "1.5rem" }}>
                <h2>Pick a time</h2>
                <p className="light-copy">Choose a slot below - no back-and-forth, no popup.</p>
              </div>
              <div className="calendly-card">
                <div
                  className="calendly-inline-widget"
                  data-url={siteConfig.demoCalendly}
                  style={{ minWidth: "320px", height: "700px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Script id="calendly-widget" src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />

      <CTABand
        title="Not ready to book yet?"
        lead="Send us a sample of your invoices and we'll show you what comes back, no call required."
        actions={[
          { label: "See how it works", href: "/", variant: "secondary" }
        ]}
      />
    </>
  );
}
