import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const googleSiteVerification = "C8qp78nVUWNoce0nCLL3e3n0PQ92mP9y_n6MdgSdvRs";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Pearstop",
    template: "%s | Pearstop",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en": siteConfig.url,
      "nl": `${siteConfig.url}/nl`,
      "x-default": siteConfig.url,
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Pearstop",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pearstop",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "nl")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        logo: `${siteConfig.url}${siteConfig.assets.logo}`,
        email: siteConfig.email,
        sameAs: [
          siteConfig.socials.linkedin,
          siteConfig.socials.youtube,
          siteConfig.socials.instagram,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: siteConfig.email,
            areaServed: "IE",
            availableLanguage: ["en", "nl", "fr", "de"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <Script
            id="site-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
          <main>{children}</main>
          <LatestBlogPosts locale={locale} />
          <SiteFooter />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
