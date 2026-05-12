import type { Metadata } from "next";
import { CTABand, PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download the Case Studies",
  description:
    "Download Pearstop's case studies to see how technical businesses clean data, protect margins, and reduce manual work.",
  alternates: {
    canonical: `${siteConfig.url}/case-studies`
  },
  openGraph: {
    title: "Download the Pearstop Case Studies",
    description:
      "Download Pearstop's case studies to see how technical businesses clean data, protect margins, and reduce manual work.",
    url: `${siteConfig.url}/case-studies`,
    siteName: siteConfig.name,
    images: ["/opengraph-image"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Download the Pearstop Case Studies",
    description:
      "Download Pearstop's case studies to see how technical businesses clean data, protect margins, and reduce manual work.",
    images: ["/opengraph-image"]
  }
};

const highlights = [
  {
    title: "Strukton",
    copy: "Automated UNSPSC classification at scale for infrastructure procurement."
  },
  {
    title: "FARO",
    copy: "Margin estimates on every container purchase, generated automatically."
  },
  {
    title: "SPIE and FMO",
    copy: "Cleaner asset and project data that teams can actually trust."
  }
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Case Studies"
        title="Download the Pearstop case studies"
        lead="Enter your details and we’ll send you straight to the PDF deck. See how technical businesses use Pearstop to clean data and protect margin."
        actions={[
          { label: "Get the PDF", href: "#get-the-download", variant: "primary" },
          { label: "View in browser", href: siteConfig.downloads.caseStudiesView, variant: "secondary", external: true },
          { label: "Follow Stephanie on LinkedIn", href: siteConfig.socials.linkedin, variant: "secondary", external: true }
        ]}
      />

      <section id="get-the-download">
        <div className="container">
          <div className="case-studies-layout">
            <div className="case-studies-preview dark">
              <span className="pill">What’s inside</span>
              <h2>Real examples from the teams already using clean data to work smarter.</h2>
              <p>
                This download pulls together a few of the strongest Pearstop stories so you can see the pattern quickly.
                Less manual work, better data, tighter margins.
              </p>
              <ul className="ind-pains case-studies-list">
                {highlights.map((item) => (
                  <li key={item.title}>
                    <span className="ind-ok">✓</span>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.copy}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="quote-card case-studies-form-card" style={{ margin: 0 }}>
              <div className="story-label">Get the PDF</div>
              <p className="light-copy" style={{ marginTop: "1rem" }}>
                Leave your details and the download will start automatically after submission.
              </p>
              <form className="contact-form" action="https://formspree.io/f/xyklkdkj" method="POST">
                <input type="text" name="name" placeholder="Your name" autoComplete="name" required aria-label="Your name" />
                <input type="email" name="email" placeholder="Your email" autoComplete="email" required aria-label="Your email" />
                <input type="text" name="company" placeholder="Company (optional)" autoComplete="organization" aria-label="Company" />
                <input type="hidden" name="_subject" value="Case studies download request" />
                <input type="hidden" name="_next" value={siteConfig.downloads.caseStudiesPdf} />
                <button type="submit" className="btn btn-primary">
                  Download the case studies
                </button>
              </form>
              <p className="case-studies-note">
                Prefer to just view it? <a href={siteConfig.downloads.caseStudiesView} target="_blank" rel="noopener noreferrer">Open the Google Slides deck</a>.
                <br />
                Prefer to talk first? <a href={siteConfig.calendly} target="_blank" rel="noopener noreferrer">Book a 7-minute discovery call</a> instead.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <SectionTitle
            title="Why people download it"
            lead="A quick read for teams that want the short version before they book a call."
          />
          <div className="bene-cards">
            <article className="ben-card">
              <div className="ben-icon">✓</div>
              <h3>See the pattern</h3>
              <p>Understand how Pearstop turns fragmented operational data into a reliable base for decisions.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">↗</div>
              <h3>Borrow the structure</h3>
              <p>Use the examples to spot where your own data is leaking time, margin, or control.</p>
            </article>
            <article className="ben-card">
              <div className="ben-icon">⚡</div>
              <h3>Share it internally</h3>
              <p>The deck is concise enough to forward to the people who need to see the problem quickly.</p>
            </article>
          </div>
        </div>
      </section>

      <CTABand
        title="Want to talk it through?"
        lead="If you’d rather discuss your data problem directly, we’re happy to help."
        actions={[
          { label: "Follow Stephanie on LinkedIn", href: siteConfig.socials.linkedin, variant: "secondary", external: true },
          { label: "Book a 7-minute discovery", href: siteConfig.calendly, variant: "primary", external: true }
        ]}
      />
    </>
  );
}
