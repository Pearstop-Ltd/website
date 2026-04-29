import type { Metadata } from "next";
import { PageHero, SectionTitle } from "@/components/content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Pearstop.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`
  }
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lead="We only use the data we need to respond to your enquiry, improve the site, and support our services." />
      <section>
        <div className="container">
          <SectionTitle title="What we collect" />
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <p className="light-copy">
                If you contact us, we may collect your name, email address, company, and message so we can respond. If you sign up for updates, we store the details you submit through the form provider we use. We may also collect basic analytics to understand how the site is used.
              </p>
              <p className="light-copy">
                We do not sell your personal information. If you want us to remove your contact details, email {siteConfig.email} and we will handle it promptly.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

