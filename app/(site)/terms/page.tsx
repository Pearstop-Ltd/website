import type { Metadata } from "next";
import { PageHero } from "@/components/content";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms that govern your use of the Pearstop website and sample classification requests.",
  alternates: {
    canonical: `${siteConfig.url}/terms-and-conditions`,
    languages: alternateLanguages("/terms-and-conditions")
  }
};

type Section = { title: string; paragraphs?: string[]; list?: string[]; paragraphsAfter?: string[] };

const sections: Section[] = [
  {
    title: "1. Acceptance of these terms",
    paragraphs: ["By using pearstop.com (the “Site”), you agree to these terms. If you don't agree, please don't use the Site."]
  },
  {
    title: "2. What Pearstop does",
    paragraphs: [
      "Pearstop provides software and services that clean, extract, and classify procurement and asset data, including UNSPSC classification. Content on the Site describes these services for general informational purposes and does not itself constitute a binding offer of services; any paid engagement is governed by a separate agreement between Pearstop and the client."
    ]
  },
  {
    title: "3. Sample classification requests",
    paragraphs: [
      "If you send us a sample of invoice lines through the Site, we will classify it and return the result as a demonstration of our service, free of charge and without obligation on either side. Sample results are provided “as is” to illustrate what Pearstop can do, and should not be relied on as a final, audited dataset. Submitting a sample does not create a contract for ongoing services; that requires a separate agreement.",
      "By uploading a sample, you confirm that you are authorised by your organisation to share it with us. Invoice files often contain personal data about people other than you, such as supplier contacts, technicians or staff named on invoices. You are responsible for having a lawful basis under applicable data protection law (GDPR or POPIA) to share that data with us, and we encourage you to remove names, email addresses and bank details that are not needed for classification.",
      "For any personal data contained in a sample, we act on your organisation's behalf. We use it only to produce and discuss your sample result, keep it confidential, and limit access to the people who need it. Sample files are deleted automatically after 90 days, or sooner if you ask us to, unless you ask us in writing to keep them for an ongoing engagement."
    ]
  },
  {
    title: "4. Using the Site",
    paragraphs: ["You agree not to:"],
    list: [
      "Use the Site for anything unlawful, or to infringe anyone else's rights.",
      "Attempt to gain unauthorised access to the Site or any connected systems.",
      "Scrape, copy, or republish the Site's content, brand assets, or code without permission.",
      "Upload anything you don't have the right to share with us."
    ]
  },
  {
    title: "5. Intellectual property",
    paragraphs: ["Everything on the Site – text, design, logos, and the Pearstop name – belongs to Pearstop or our licensors. You may not use it without our written permission."]
  },
  {
    title: "6. No warranty",
    paragraphs: [
      "The Site and its content are provided “as is.” We keep information as accurate and current as we reasonably can, but we don't guarantee it's complete, error-free, or fit for a particular purpose. Nothing on the Site is legal, financial, or procurement advice."
    ]
  },
  {
    title: "7. Limitation of liability",
    paragraphs: [
      "To the extent permitted by law, Pearstop is not liable for any indirect, incidental, or consequential loss arising from your use of the Site. Nothing in these terms limits liability that cannot be limited under Irish or EU law."
    ]
  },
  {
    title: "8. Third-party links",
    paragraphs: ["The Site may link to third-party sites. We don't control them and aren't responsible for their content or practices."]
  },
  {
    title: "9. Governing law",
    paragraphs: ["These terms are governed by the laws of Ireland. Any dispute will be handled by the Irish courts."]
  },
  {
    title: "10. Changes to these terms",
    paragraphs: ["We may update these terms from time to time. We'll update the date at the top when we do; continuing to use the Site after a change means you accept the update."]
  },
  {
    title: "11. Contact us",
    paragraphs: ["Questions about these terms: inquiries@pearstop.com."]
  }
];

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms and Conditions" lead="The terms that govern your use of this site." />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy" style={{ fontSize: "0.85rem", marginBottom: "2.5rem" }}>Last updated: 25 September 2026</p>
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
