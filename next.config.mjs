import { readFileSync } from "node:fs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Localised slugs for the "Compliance questions" landing pages (see
// lib/compliance-pages.ts). Each nl/fr/de slug is rewritten to the English
// named route, and the English-named path under a locale prefix is
// redirected to the localised slug so there is one URL per page and language.
const complianceSlugs = JSON.parse(readFileSync(new URL("./lib/compliance-pages.json", import.meta.url), "utf8"));
const complianceLocales = ["nl", "fr", "de"];
const complianceRedirects = [];
const complianceRewrites = [];
for (const slugsByLocale of Object.values(complianceSlugs)) {
  for (const locale of complianceLocales) {
    complianceRedirects.push({
      source: `/${locale}/${slugsByLocale.en}`,
      destination: `/${locale}/${slugsByLocale[locale]}`,
      permanent: true,
    });
    complianceRewrites.push({
      source: `/${locale}/${slugsByLocale[locale]}`,
      destination: `/${locale}/${slugsByLocale.en}`,
    });
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return { beforeFiles: complianceRewrites };
  },
  async redirects() {
    return [
      ...complianceRedirects,
      {
        source: "/:path*",
        has: [{ type: "host", value: "pearstop.com" }],
        destination: "https://www.pearstop.com/:path*",
        permanent: true,
      },
      { source: "/home", destination: "/", permanent: true },
      { source: "/home.html", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/solutions.html", destination: "/solutions", permanent: true },
      { source: "/about-us.html", destination: "/about-us", permanent: true },
      { source: "/industries.html", destination: "/industries", permanent: true },
      { source: "/blog.html", destination: "/blog", permanent: true },
      { source: "/cases.html", destination: "/cases", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/data-quality.html", destination: "/data-quality", permanent: true },
      { source: "/procurement-data-quality.html", destination: "/procurement-data-quality", permanent: true },
      { source: "/spend-visibility", destination: "/procurement-data-quality", permanent: true },
      { source: "/cases/manufacturing-spend", destination: "/cases", permanent: true },
      { source: "/asset-data-management.html", destination: "/asset-data-management", permanent: true },
      { source: "/fabric.html", destination: "/fabric", permanent: true },
      { source: "/ai-readiness.html", destination: "/ai-readiness", permanent: true },
      { source: "/unspsc.html", destination: "/unspsc", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/terms.html", destination: "/terms-and-conditions", permanent: true },
      { source: "/terms", destination: "/terms-and-conditions", permanent: true },
      { source: "/whitepaper", destination: "/case-studies", permanent: true },
      { source: "/whitepaper.html", destination: "/case-studies", permanent: true },
      { source: "/learning-centre.html", destination: "/learning-centre", permanent: true },
      { source: "/use-cases.html", destination: "/use-cases", permanent: true },
      { source: "/work.html", destination: "/work", permanent: true },
      { source: "/assistants", destination: "/", permanent: false },
      { source: "/assistants/:path*", destination: "/", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
