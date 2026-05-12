import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionTitle } from "@/components/content";
import { legacyLearningCentre, siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Pearstop Blog and Learning Centre",
  description:
    "Practical guides, archived learning-centre articles, and data quality thinking for hard services, construction, and infrastructure companies.",
  alternates: {
    canonical: `${siteConfig.url}/blog`
  }
};

const learningCentreArticles = Object.values(legacyLearningCentre);

type PodcastLink = {
  kind: "youtube" | "spotify" | "apple";
  label: string;
  href: string;
  meta: string;
};

const podcastLinks: PodcastLink[] = [
  {
    kind: "youtube",
    label: "YouTube",
    href: siteConfig.socials.youtube,
    meta: "Watch episodes"
  },
  {
    kind: "spotify",
    label: "Spotify",
    href: "https://open.spotify.com/show/37QLB09fDgo8Q4g8wVw4uk",
    meta: "Listen on Spotify"
  },
  {
    kind: "apple",
    label: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/the-data-edge-data-quality-ai-readiness/id1872757553",
    meta: "Listen on Apple"
  }
];

function PodcastIcon({ kind }: { kind: PodcastLink["kind"] }) {
  switch (kind) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <rect x="2.5" y="6" width="19" height="12" rx="3" fill="currentColor" opacity="0.16" />
          <path d="M15.6 12 10 8.8v6.4L15.6 12Z" fill="currentColor" />
        </svg>
      );
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="9" fill="currentColor" opacity="0.16" />
          <path d="M6.8 10.2c3.3-1 6.8-.8 10 .6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7.5 13c2.7-.7 5.4-.5 8 .5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M8.1 15.6c2-.4 4-.2 5.8.4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M14.8 4.2c-.8.1-1.8.5-2.5 1.2-.6.6-1.1 1.6-1 2.5.9.1 1.8-.4 2.4-1 .7-.6 1.2-1.5 1.1-2.7Z" fill="currentColor" />
          <path d="M16.5 8.1c-1.2 0-2.1.7-2.8.7-.8 0-1.8-.7-3-.7-2 0-4.4 1.8-4.4 5.2 0 3.4 1.9 7.1 4 7.1 1 0 1.6-.6 2.6-.6s1.6.6 2.8.6c2.2 0 4.2-3.7 4.2-7.1 0-2.9-1.7-5.2-3.4-5.2Z" fill="currentColor" opacity="0.16" />
          <path d="M16.7 7.7c-1.1.1-2 .8-2.6.8-.7 0-1.7-.7-2.9-.7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
  }
}


const CATEGORY_ICONS: Record<string, string> = {
  "Procurement": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  "Asset Management": "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  "AI & Digital": "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  "Commercial FM": "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  "Data Management": "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
  "Construction": "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
};
const DEFAULT_ICON = "M13 10V3L4 14h7v7l9-11h-7z";

const CATEGORY_GRADIENTS: Record<string, string> = {
  "Procurement": "linear-gradient(135deg, #4c1d95 0%, #6d28d9 50%, #7c3aed 100%)",
  "Asset Management": "linear-gradient(135deg, #1e3a5f 0%, #1e40af 50%, #3b82f6 100%)",
  "AI & Digital": "linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #14b8a6 100%)",
  "Commercial FM": "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)",
  "Data Management": "linear-gradient(135deg, #1e1b4b 0%, #3730a3 50%, #6366f1 100%)",
  "Construction": "linear-gradient(135deg, #14532d 0%, #15803d 50%, #22c55e 100%)",
};
const DEFAULT_GRADIENT = "linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)";

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Blog and Learning Centre"
        lead="Current thinking, archived learning-centre articles, and the Data Edge podcast in one place."
      />

      <section id="blog-posts">
        <div className="container">
          <SectionTitle
            title="Latest Articles"
            lead="In-depth guides on procurement data, asset management, and AI readiness for hard services and construction."
          />
          <div className="article-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card">
                <div
                  className="blog-img-wrap"
                  style={{
                    background: CATEGORY_GRADIENTS[post.category] ?? DEFAULT_GRADIENT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 72, height: 72, opacity: 0.18, position: "absolute" }} aria-hidden="true">
                    <path d={CATEGORY_ICONS[post.category] ?? DEFAULT_ICON} />
                  </svg>
                  <span style={{ position: "relative", color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>{post.category}</span>
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{post.category}</span>
                  <h3 className="blog-title">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="light-copy">{post.description}</p>
                  <Link className="blog-read" href={`/blog/${post.slug}`}>
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="learning-centre">
        <div className="container">
          <SectionTitle
            title="Learning Centre"
            lead="Older Pearstop articles now sit inside the blog hub so there is one clear place for insight content."
          />
          <div className="article-grid">
            {learningCentreArticles.map((entry, index) => (
              <article key={entry.slug} className="blog-card">
                <div
                  className="blog-img-wrap"
                  style={{
                    background: index % 2 === 0 ? "var(--purple-soft)" : "var(--blue-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--navy)",
                    fontWeight: 800,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase"
                  }}
                >
                  Learning Centre
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{entry.category}</span>
                  <h3 className="blog-title">
                    <Link href={`/learning-centre/${entry.slug}`}>{entry.title}</Link>
                  </h3>
                  <p className="light-copy">{entry.summary}</p>
                  <Link className="blog-read" href={`/learning-centre/${entry.slug}`}>
                    {entry.ctaLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="blog-podcast-grid">
            <div className="blog-podcast-copy">
              <span className="podcast-pill">Podcast</span>
              <h2>The Data Edge</h2>
              <p className="podcast-lead">
                Interviews, insights, and actionable thinking on data quality, procurement, and asset management for technical industries.
              </p>
              <div className="blog-podcast-links">
                {podcastLinks.map((link) => (
                  <a key={link.label} className="blog-podcast-link" href={link.href} target="_blank" rel="noopener noreferrer">
                    <span className="blog-podcast-link-icon" aria-hidden="true">
                      <PodcastIcon kind={link.kind} />
                    </span>
                    <span className="blog-podcast-link-copy">
                      <span className="blog-podcast-link-title">{link.label}</span>
                      <span className="blog-podcast-link-meta">{link.meta}</span>
                    </span>
                    <span className="blog-podcast-link-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="blog-podcast-media">
              <img src={siteConfig.assets.blogPodcast} alt="The Data Edge Podcast" className="podcast-img" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
