import type { Metadata } from "next";
import { CalendlyInlineWidget } from "@/components/calendly-inline-widget";
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
      "We start with where things actually break down. Invoices live in different places: an ERP system, inboxes, or still arriving on paper. We walk through yours and find exactly where it gets stuck."
  },
  {
    title: "Your process, mapped",
    copy:
      "Once invoices are processed, that data goes somewhere. We map your process end to end, based on how it actually flows today, not how it's supposed to."
  },
  {
    title: "Your goals",
    copy:
      "What's broken is usually obvious. What you actually want from your invoice and spend data often isn't written down anywhere. We get that in writing before we talk about the platform."
  },
  {
    title: "The platform, walked through",
    copy:
      "We show you the parts of Pearstop that map to your goals, so you leave the call with a clear answer: whether this gets you where you want to be."
  }
];

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="Here's exactly what we'll cover in 30 minutes"
        lead="We spend the call on your data, your blockers, and whether Pearstop actually gets you where you want to go."
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
                <p className="light-copy">Choose a slot below, no back-and-forth, no popup.</p>
              </div>
              <CalendlyInlineWidget url={siteConfig.demoCalendly} />
            </div>
          </div>
        </div>
      </section>

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
