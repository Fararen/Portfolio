import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Blog`,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : post.date;

  // Check if cover file exists on disk
  const coverExists = post.cover
    ? fs.existsSync(path.join(process.cwd(), "public", post.cover.replace(/^\//, "")))
    : false;

  // Article JSON-LD schema (AGENTS.md Section 8)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "AI Portfolio",
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="max-w-[750px] mx-auto py-4">
        {/* Back link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10 pb-8 border-b border-[var(--color-border)]">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-fg-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              <time dateTime={post.date}>{formattedDate}</time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{post.readingTime}</span>
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-[var(--color-fg-muted)] leading-relaxed">
            {post.description}
          </p>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 font-mono text-xs text-[var(--color-fg-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Cover image if provided */}
        {post.cover && (
          <div className="relative mb-12 overflow-hidden rounded-2xl bg-[var(--color-bg-subtle)] aspect-[16/9] border border-[var(--color-border)]">
            {coverExists ? (
              <Image
                src={post.cover}
                alt={`Cover for ${post.title}`}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 750px"
                className="object-cover"
              />
            ) : (
              <ImagePlaceholder
                filePath={post.cover}
                aspectRatio="aspect-full h-full w-full"
              />
            )}
          </div>
        )}

        {/* MDX Body with Shared Prose Styling */}
        <div className="prose-portfolio">
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: "github-dark",
                      keepBackground: true,
                    },
                  ],
                ],
              },
            }}
          />
        </div>
      </article>
    </>
  );
}
