import type { Metadata } from "next";
import { ComplianceQuestionPage, type ComplianceQuestionCopy } from "@/components/site/pages/ComplianceQuestion";
import { siteConfig } from "@/lib/site";
import { COMPLIANCE_KEYS, complianceAlternates, compliancePath, complianceUrl, type ComplianceKey } from "@/lib/compliance-pages";

type ComplianceMessages = { Compliance: { shared: ComplianceQuestionCopy["shared"] } & Record<string, unknown> };

/** Copy for one page out of a messages object (`Compliance.<key>` + `Compliance.shared`). */
export function complianceCopy(messages: unknown, key: ComplianceKey): ComplianceQuestionCopy {
  const { Compliance } = messages as ComplianceMessages;
  return { ...(Compliance[key] as object), shared: Compliance.shared } as ComplianceQuestionCopy;
}

export function complianceMetadata(key: ComplianceKey, locale: string, copy: ComplianceQuestionCopy): Metadata {
  const url = complianceUrl(key, locale);
  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: { canonical: url, languages: complianceAlternates(key) },
    openGraph: {
      title: `${copy.meta.title} | Pearstop`,
      description: copy.meta.description,
      url,
      siteName: siteConfig.name,
      locale,
    },
    twitter: { card: "summary_large_image", title: `${copy.meta.title} | Pearstop`, description: copy.meta.description },
  };
}

export function ComplianceRoute({ pageKey, locale, copy }: { pageKey: ComplianceKey; locale: string; copy: ComplianceQuestionCopy }) {
  const url = complianceUrl(pageKey, locale);
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: locale,
        isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
        publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
        mainEntity: { "@id": `${url}#faq` },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: locale,
        mainEntity: copy.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      {/* Plain tag, not next/script: it must be in the server-rendered HTML for crawlers. */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
      <ComplianceQuestionPage copy={copy} localePrefix={locale === "en" ? "" : `/${locale}`} />
    </>
  );
}

/** Cards for the "Compliance" section on /solutions: menu label as title, the page's own question as the pain line. */
export function complianceCards(messages: unknown, locale: string): { title: string; pain: string; href: string }[] {
  const m = messages as { Header: { nav: Record<string, string> }; Compliance: Record<string, { hero: { title: string } }> };
  const labelKeys: Record<ComplianceKey, string> = {
    freelancers: "complianceFreelancers",
    certification: "complianceCertification",
    timber: "complianceTimber",
    hazardous: "complianceHazardous",
    recycling: "complianceRecycling",
  };
  return COMPLIANCE_KEYS.map((key) => ({
    title: m.Header.nav[labelKeys[key]],
    pain: m.Compliance[key].hero.title,
    href: compliancePath(key, locale),
  }));
}
