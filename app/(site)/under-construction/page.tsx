import type { Metadata } from "next";
import { UnderConstructionPage } from "@/components/under-construction-page";
import { alternateLanguages, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Under construction",
  description: "A temporary Pearstop page for routes that are not live yet.",
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: `${siteConfig.url}/under-construction`,
    languages: alternateLanguages("/under-construction")
  }
};

export default function UnderConstructionRoute() {
  return (
    <UnderConstructionPage
      eyebrow="Under construction"
      title="A few pages are still being finished."
      lead="The main site is ready, and any missing pages now land on a branded placeholder instead of a dead end."
      ctaLabel="Talk to sales"
    />
  );
}
