import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { getBlogPost, blogPosts } from "@/lib/blog-posts";
import { ArticleSchema, FaqSchema, BlogLayout, BlogQuote, SoftCta, ComparisonCards, ChecklistSection, KraljicMatrix, AUTHORS, isAuthorKey, type AuthorKey } from "@/components/blog";
import { siteConfig } from "@/lib/site";
import ProcurementDataCost from "@/components/blog-posts/procurement-data-cost";
import WhatIsUnspsc from "@/components/blog-posts/what-is-unspsc";
import AssetRegisterProblems from "@/components/blog-posts/asset-register-problems";
import CategoryManagementKraljic from "@/components/blog-posts/category-management-kraljic-hard-fm";
import AiReadinessDataQuality from "@/components/blog-posts/ai-readiness-data-quality";
import FmTenderWinRate from "@/components/blog-posts/fm-tender-win-rate";
import ExcelHeroics from "@/components/blog-posts/excel-heroics-hard-services";
import ConstructionProcurement from "@/components/blog-posts/construction-procurement-material-costs";
import WhatCleanDataEnables from "@/components/blog-posts/what-clean-data-enables";
import UnspscVsEclassVsCpv from "@/components/blog-posts/unspsc-vs-eclass-vs-cpv";
import WinAiRaceProcurementDataQuality from "@/components/blog-posts/win-ai-race-procurement-data-quality";

const POST_COMPONENTS: Record<string, ComponentType> = {
  "procurement-data-cost": ProcurementDataCost,
  "what-is-unspsc": WhatIsUnspsc,
  "asset-register-problems": AssetRegisterProblems,
  "category-management-kraljic-hard-fm": CategoryManagementKraljic,
  "ai-readiness-data-quality": AiReadinessDataQuality,
  "fm-tender-win-rate": FmTenderWinRate,
  "excel-heroics-hard-services": ExcelHeroics,
  "construction-procurement-material-costs": ConstructionProcurement,
  "what-clean-data-enables": WhatCleanDataEnables,
  "unspsc-vs-eclass-vs-cpv": UnspscVsEclassVsCpv,
  "win-ai-race-procurement-data-quality": WinAiRaceProcurementDataQuality,
};

const MDX_COMPONENTS = {
  BlogQuote,
  SoftCta,
  ComparisonCards,
  ChecklistSection,
  KraljicMatrix,
};

function getMdxFrontmatter(locale: string, slug: string): { title?: string; description?: string; author?: AuthorKey } {
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
    fm[line.slice(0, colon).trim()] = line.slice(colon + 1).trim().replace(/^"|"$/g, "");
  }
  return {
    title: fm.title,
    description: fm.description,
    author: fm.author && isAuthorKey(fm.author) ? fm.author : undefined,
  };
}

function stripMdx(raw: string): string {
  // Strip UTF-8 BOM if present, then strip frontmatter
  const clean = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  return clean.replace(/^---[\s\S]*?---\n/, "");
}

function getMdxContent(locale: string, slug: string): string | null {
  const mdxPath = path.join(process.cwd(), "content", "blog", locale, `${slug}.mdx`);
  if (existsSync(mdxPath)) return stripMdx(readFileSync(mdxPath, "utf-8"));
  const enPath = path.join(process.cwd(), "content", "blog", "en", `${slug}.mdx`);
  if (existsSync(enPath)) return stripMdx(readFileSync(enPath, "utf-8"));
  return null;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const fm = getMdxFrontmatter(locale, slug);
  const title = fm.title ?? post.title;
  const description = fm.description ?? post.description;
  const prefix = locale === "en" ? "" : `/${locale}`;
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}${prefix}/blog/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}${prefix}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const fm = getMdxFrontmatter(locale, slug);
  const title = fm.title ?? post.title;
  const description = fm.description ?? post.description;
  const author = fm.author ?? "team";
  const tocItems = locale === "nl" && post.tocItemsNl ? post.tocItemsNl : post.tocItems;
  const tocHeading = locale === "nl" ? "In dit artikel" : "In this article";

  // Try MDX (translated if available, fallback to EN MDX, then TSX)
  const mdxContent = getMdxContent(locale, slug);

  return (
    <>
      <ArticleSchema
        title={title}
        description={description}
        slug={post.slug}
        publishedAt={post.publishedAt}
        authorName={AUTHORS[author].name}
      />
      {post.faqItems && <FaqSchema items={post.faqItems} slug={post.slug} />}
      <header
        className="page-hero dark"
        style={{ minHeight: "auto", paddingTop: "5rem", paddingBottom: "3.5rem" }}
      >
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-copy">
          <div className="text-center">
            <span className="pill">{post.category}</span>
            <h1
              className="hero-title dark"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginTop: "0.75rem", maxWidth: 1000, marginInline: "auto" }}
            >
              {title}
            </h1>
            <p className="hero-lead" style={{ marginTop: "0.75rem", opacity: 0.85 }}>
              {description}
            </p>
          </div>
        </div>
      </header>
      <BlogLayout
        tocItems={tocItems}
        tocHeading={tocHeading}
        author={author}
        publishedAt={post.publishedAt}
        readingTime={post.readingTime}
        category={post.category}
        slug={post.slug}
        tags={post.tags}
      >
        {mdxContent ? (
          <MDXRemote source={mdxContent} components={MDX_COMPONENTS} options={{ mdxOptions: { rehypePlugins: [rehypeSlug], remarkPlugins: [remarkGfm] } }} />
        ) : (
          (() => {
            const PostContent = POST_COMPONENTS[slug];
            if (!PostContent) notFound();
            return <PostContent />;
          })()
        )}
      </BlogLayout>
    </>
  );
}
