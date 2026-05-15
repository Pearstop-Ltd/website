import type { Metadata } from "next";
import { PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for using the Pearstop website.",
  alternates: {
    canonical: `${siteConfig.url}/terms-and-conditions`
  }
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms and Conditions" lead="A short, plain-English version of how you can use the Pearstop website." />
      <section>
        <div className="container">
          <SectionTitle title="Using this site" />
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy">
                The content on this site is provided for general information only. It is not legal, financial, or procurement advice. We try to keep the information accurate and current, but we do not guarantee that every page will always be complete.
              </p>
              <p className="light-copy">
                If you reuse the content, brand assets, or screenshots, please ask first. For questions about these terms, contact {siteConfig.email}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
