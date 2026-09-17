import type { Metadata } from "next";
import { PageHero } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pearstop collects, uses, and protects your personal data, and your rights under GDPR.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
    languages: alternateLanguages("/privacy")
  }
};

type Section = { title: string; paragraphs?: string[]; list?: string[]; paragraphsAfter?: string[] };

const sections: Section[] = [
  {
    title: "1. Who we are",
    paragraphs: [
      "Pearstop (“Pearstop,” “we,” “us,” “our”) provides software and services that clean, extract, and classify procurement and asset data. We are based at Dogpatch Labs, CHQ Building, Custom House Quay, D01 Y6H7 Dublin, Ireland, and we are the data controller for the personal data described in this policy.",
      "We operate under the laws of Ireland and the European Union, including the General Data Protection Regulation (GDPR). This policy is written to meet those requirements and applies to every visitor, regardless of where you access the site from."
    ]
  },
  {
    title: "2. What we collect",
    paragraphs: ["We collect personal data only when you choose to give it to us:"],
    list: [
      "Contact form: your name, email address, company, and the content of your message.",
      "Newsletter sign-up: your email address and, if provided, your name.",
      "Sample classification requests: your name, email address, company name, an approximate spend range, a free-text description of what you're hoping to achieve, and any invoice files or line items you choose to upload.",
      "Case study downloads: your name, email address, and company.",
      "Site usage: aggregate, privacy-respecting analytics on how the site is used (pages viewed, general location, device type). We do not use this data to identify you personally."
    ]
  },
  {
    title: "3. Why we collect it",
    paragraphs: ["We only process personal data where we have a valid legal basis to do so:"],
    list: [
      "To respond to your enquiry or prepare a demo – legitimate interest, or performance of a contract you've asked us to prepare.",
      "To classify a sample you send us – legitimate interest in delivering the service you requested, or your consent.",
      "To send you the newsletter or case studies – your consent, which you can withdraw at any time.",
      "To understand and improve the site – our legitimate interest in running it well."
    ]
  },
  {
    title: "4. Who we share it with",
    paragraphs: [
      "We do not sell your personal data, ever. We share it only with the following categories of service provider, and only so far as needed to run the site and deliver what you asked for:"
    ],
    list: [
      "Hosting and infrastructure providers that run the website and store any files you upload.",
      "Email and workflow tools we use to route enquiries to the right person on our team.",
      "The AI/ML systems we use to classify submitted invoice data, run on EU-hosted or equivalently safeguarded infrastructure."
    ],
    paragraphsAfter: ["Each of these providers is bound by contract to protect your data and use it only for the purpose we specify."]
  },
  {
    title: "5. How long we keep it",
    list: [
      "Sample invoice files and the data submitted alongside them: kept only as long as needed to complete and follow up on the classification you requested, then deleted – unless you ask us to keep them for an ongoing engagement.",
      "Contact form and newsletter data: kept until you unsubscribe or ask us to delete it, or for as long as we have a legitimate reason to stay in touch, whichever is shorter.",
      "Aggregate analytics: retained only in anonymised or aggregated form and cannot be used to identify you."
    ]
  },
  {
    title: "6. How we protect it",
    paragraphs: [
      "We handle every piece of data you give us securely: encrypted in transit, access limited to the people who need it to do their job, and stored with providers that meet recognised security standards. No system is perfectly secure, but we treat your data the way we'd want our own treated."
    ]
  },
  {
    title: "7. Your rights",
    paragraphs: ["Because we operate under GDPR, you have the right to:"],
    list: [
      "Ask what data we hold about you and get a copy of it (access).",
      "Correct anything that's wrong (rectification).",
      "Ask us to delete your data at any time (erasure) – email us and we'll handle it promptly.",
      "Ask us to restrict, or object to, how we use your data.",
      "Move your data to another provider (portability).",
      "Withdraw consent at any point, with no effect on anything we did before you withdrew it.",
      "Lodge a complaint with the Irish Data Protection Commission (dataprotection.ie) or your local supervisory authority."
    ],
    paragraphsAfter: ["To exercise any of these rights, email inquiries@pearstop.com. We'll respond within a reasonable time and, in any case, within the timeframes GDPR requires."]
  },
  {
    title: "8. Cookies and analytics",
    paragraphs: [
      "We use privacy-respecting analytics to understand how the site is used in aggregate. We don't use third-party advertising trackers, and we don't sell or share analytics data with anyone outside Pearstop."
    ]
  },
  {
    title: "9. Children",
    paragraphs: ["This site isn't directed at children, and we don't knowingly collect personal data from anyone under 16."]
  },
  {
    title: "10. Changes to this policy",
    paragraphs: ["We may update this policy as the business or the law changes. We'll update the date at the top when we do."]
  },
  {
    title: "11. Contact us",
    paragraphs: [
      "Questions about this policy or your data: inquiries@pearstop.com, or write to us at Dogpatch Labs, CHQ Building, Custom House Quay, D01 Y6H7 Dublin, Ireland."
    ]
  }
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lead="How we collect, use, and protect your data, and the rights you have over it." />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy" style={{ fontSize: "0.85rem", marginBottom: "2.5rem" }}>Last updated: 17 September 2026</p>
              {sections.map((section) => (
                <div key={section.title} style={{ marginBottom: "2.25rem" }}>
                  <h2>{section.title}</h2>
                  {section.paragraphs?.map((p) => (
                    <p className="light-copy" key={p}>{p}</p>
                  ))}
                  {section.list ? (
                    <ul className="light-copy">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.paragraphsAfter?.map((p) => (
                    <p className="light-copy" key={p}>{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
