import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LatestBlogPosts } from "@/components/latest-blog-posts";
import enMessages from "../../messages/en.json";
import { siteConfig } from "@/lib/site";
import { inter } from "@/lib/fonts";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <NextIntlClientProvider locale="en" messages={enMessages as Record<string, unknown>}>
          <SiteHeader />
          <main>{children}</main>
          <LatestBlogPosts locale="en" />
          <SiteFooter />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
