import type { Metadata } from "next";
import Script from "next/script";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { UnspscPage, type UnspscCopy } from "@/components/site/pages/Unspsc";
import { alternateLanguages, siteConfig } from "@/lib/site";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Automated UNSPSC Classification",
  description: "Pearstop auto-classifies up to 95% of procurement spend lines to UNSPSC standard without manual effort, and resolves a supplier's own part code back to the real manufacturer code. Built for hard services FM, infrastructure, construction, and manufacturing companies.",
  provider: {
    "@type": "Organization",
    name: "Pearstop",
    url: siteConfig.url,
    logo: `${siteConfig.url}/brand/logo-dark.webp`
  },
  serviceType: "Procurement Data Classification",
  areaServed: "Europe"
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "Unspsc" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: [
      "UNSPSC classification",
      "procurement classification",
      "UNSPSC lookup",
      "United Nations Standard Products and Services Code",
      "automated procurement classification",
    ],
    alternates: {
      canonical: `${siteConfig.url}${prefix}/unspsc`,
      languages: alternateLanguages("/unspsc")
    }
  };
}

export default async function UnspscRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;
  const messages = await getMessages({ locale });
  const copy = { ...messages.Unspsc, common: messages.Common } as unknown as UnspscCopy;
  const breadcrumbCopy = messages.Unspsc.breadcrumb as { home: string; current: string };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: breadcrumbCopy.home, item: `${siteConfig.url}${prefix}` },
      { "@type": "ListItem", position: 2, name: breadcrumbCopy.current, item: `${siteConfig.url}${prefix}/unspsc` }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer }
    }))
  };

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <UnspscPage copy={copy} />
    </>
  );
}
