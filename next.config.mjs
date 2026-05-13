import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
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
    ];
  },
};

export default withNextIntl(nextConfig);
