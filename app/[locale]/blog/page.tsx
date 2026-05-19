import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { PageHero, SectionTitle } from "@/components/content";
import { BlogCardPattern } from "@/components/blog-card-pattern";
import { siteConfig } from "@/lib/site";
import { blogPosts } from "@/lib/blog-posts";

function getMdxFrontmatter(locale: string, slug: string): { title?: string; description?: string } {
  const tryPath = (loc: string) => path.join(process.cwd(), "content", "blog", loc, `${slug}.mdx`);
  const filePath = existsSync(tryPath(locale)) ? tryPath(locale) : existsSync(tryPath("en")) ? tryPath("en") : null;
  if (!filePath) return {};
  const raw = readFileSync(filePath, "utf-8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    fm[key] = line.slice(colon + 1).trim().replace(/^"|"$/g, "");
  }
  return { title: fm.title, description: fm.description };
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: `${siteConfig.url}/blog`
    }
  };
}

type PodcastLink = {
  kind: "youtube" | "spotify" | "apple";
  label: string;
  href: string;
  meta: string;
};

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


export const dynamic = "force-dynamic";

export default async function BlogPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const prefix = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations({ locale, namespace: "Blog" });

  const podcastLinks: PodcastLink[] = [
    {
      kind: "youtube",
      label: t("podcast.youtube.label"),
      href: siteConfig.socials.youtube,
      meta: t("podcast.youtube.meta")
    },
    {
      kind: "spotify",
      label: t("podcast.spotify.label"),
      href: "https://open.spotify.com/show/37QLB09fDgo8Q4g8wVw4uk",
      meta: t("podcast.spotify.meta")
    },
    {
      kind: "apple",
      label: t("podcast.apple.label"),
      href: "https://podcasts.apple.com/us/podcast/the-data-edge-data-quality-ai-readiness/id1872757553",
      meta: t("podcast.apple.meta")
    }
  ];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lead={t("hero.lead")}
      />

      <section id="blog-posts">
        <div className="container">
          <SectionTitle
            title={t("latestArticles.title")}
            lead={t("latestArticles.lead")}
          />
          <div className="article-grid">
            {blogPosts.map((post) => {
              const fm = getMdxFrontmatter(locale, post.slug);
              const title = fm.title ?? post.title;
              const description = fm.description ?? post.description;
              return (
              <article key={post.slug} className="blog-card">
                <BlogCardPattern category={post.category} image={post.image} showLabel={false} />
                <div className="blog-body">
                  <span className="blog-tag">{post.category}</span>
                  <h3 className="blog-title">
                    <Link href={`${prefix}/blog/${post.slug}`}>{title}</Link>
                  </h3>
                  <p className="light-copy">{description}</p>
                  <Link className="blog-read" href={`${prefix}/blog/${post.slug}`}>
                    {t("latestArticles.readArticle")}
                  </Link>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-soft">
        <div className="container">
          <div className="blog-podcast-grid">
            <div className="blog-podcast-copy">
              <span className="podcast-pill">{t("podcast.pill")}</span>
              <h2>{t("podcast.title")}</h2>
              <p className="podcast-lead">{t("podcast.lead")}</p>
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
              <img src={siteConfig.assets.blogPodcast} alt={t("podcast.title")} className="podcast-img" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
