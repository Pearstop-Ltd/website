import { NextIntlClientProvider } from "next-intl";
import { Analytics } from "@vercel/analytics/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LatestBlogPosts } from "@/components/latest-blog-posts";
import enMessages from "../../messages/en.json";
import "../globals.css";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
