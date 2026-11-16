import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Crawlers that hit the site hard and give nothing back (scraper indexes,
// backlink/SEO-tool spiders whose reports we don't use). Blocking them saves
// Vercel bandwidth. Search engines (Googlebot, Bingbot, ...) and the AI
// assistants we want citing us for AEO (GPTBot, OAI-SearchBot, ChatGPT-User,
// ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot,
// Amazonbot, ...) are deliberately NOT listed and fall under the open "*" rule.
const BLOCKED_BOTS = [
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "PetalBot",
  "Bytespider",
  "DataForSeoBot",
  "serpstatbot",
  "Barkrowler",
  "SeekportBot",
  "AwarioBot",
  "ImagesiftBot",
  "magpie-crawler",
];

// SEO tools we may still want site audits / backlink data from: slow them down
// instead of blocking them outright.
const THROTTLED_BOTS = ["AhrefsBot", "SemrushBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: THROTTLED_BOTS, allow: "/", disallow: ["/api/"], crawlDelay: 10 },
      { userAgent: BLOCKED_BOTS, disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
