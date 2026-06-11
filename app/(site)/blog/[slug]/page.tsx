import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { getBlogPost, blogPosts } from "@/lib/blog-posts";
import { ArticleSchema, FaqSchema, BlogLayout, BlogQuote, SoftCta, ComparisonCards, ChecklistSection, KraljicMatrix } from "@/components/blog";
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

const MDX_COMPONENTS = { BlogQuote, SoftCta, ComparisonCards, ChecklistSection, KraljicMatrix };

const AUTHOR_NAMES: Record<string, string> = {
  stephanie: "Stephanie Wiechers",
  richard: "Richard Wallace",
  team: "Pearstop",
};

function getMdxContent(slug: string): string | null {
  const mdxPath = path.join(process.cwd(), "content", "blog", "en", `${slug}.mdx`);
  if (!existsSync(mdxPath)) return null;
  const raw = readFileSync(mdxPath, "utf-8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
  return raw.replace(/^---[\s\S]*?---\n/, "");
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteConfig.url}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${slug}`,
      type: "article",
      publishedTime: post.publishedAt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const PostComponent = POST_COMPONENTS[slug];
  const mdxContent = PostComponent ? null : getMdxContent(slug);
  if (!PostComponent && !mdxContent) notFound();

  return (
    <>
      <ArticleSchema title={post.title} description={post.description} slug={post.slug} publishedAt={post.publishedAt} authorName={AUTHOR_NAMES[post.author] ?? "Pearstop"} />
      {post.faqItems && <FaqSchema items={post.faqItems} slug={post.slug} />}
      <header className="page-hero dark" style={{ minHeight: "auto", paddingTop: "5rem", paddingBottom: "3.5rem" }}>
        <div className="hero-bg" aria-hidden="true" />
        <div className="container hero-copy">
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "left" }}>
            <span className="pill">{post.category}</span>
            <h1 className="hero-title dark" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", marginTop: "0.75rem" }}>{post.title}</h1>
            <p className="hero-lead" style={{ marginTop: "0.75rem", opacity: 0.85 }}>{post.description}</p>
          </div>
        </div>
      </header>
      <BlogLayout tocItems={post.tocItems} author={post.author} publishedAt={post.publishedAt} readingTime={post.readingTime} category={post.category} slug={post.slug} tags={post.tags}>
        {mdxContent ? (
          <MDXRemote source={mdxContent} components={MDX_COMPONENTS} options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }} />
        ) : (
          <PostComponent />
        )}
      </BlogLayout>
    </>
  );
}
