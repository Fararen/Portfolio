import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogPost, BlogPostFrontmatter, BlogPostSummary } from "@/types/blog";

export type { BlogPost, BlogPostFrontmatter, BlogPostSummary };

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

/**
 * Calculates estimated reading time based on a standard 200 words-per-minute average.
 */
export function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Normalizes frontmatter data parsed from gray-matter.
 */
function parseFrontmatter(raw: Record<string, unknown>): BlogPostFrontmatter {
  let dateStr = "";
  if (typeof raw.date === "string") {
    dateStr = raw.date;
  } else if (raw.date instanceof Date) {
    dateStr = raw.date.toISOString().split("T")[0];
  } else if (raw.date) {
    dateStr = String(raw.date);
  }

  return {
    title: typeof raw.title === "string" ? raw.title : "",
    description: typeof raw.description === "string" ? raw.description : "",
    date: dateStr,
    tags: Array.isArray(raw.tags) ? raw.tags.map(String) : [],
    cover: typeof raw.cover === "string" ? raw.cover : undefined,
    draft: Boolean(raw.draft),
  };
}

/**
 * Retrieves all published blog posts sorted newest first (by ISO date descending).
 * Draft posts (draft: true) are excluded.
 */
export function getAllPosts(): BlogPostSummary[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_DIRECTORY);
  const posts: BlogPostSummary[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".mdx") && !fileName.endsWith(".md")) {
      continue;
    }

    const slug = fileName.replace(/\.(mdx|md)$/, "");
    const fullPath = path.join(BLOG_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = parseFrontmatter(data);

    if (frontmatter.draft) {
      continue;
    }

    posts.push({
      slug,
      ...frontmatter,
      readingTime: calculateReadingTime(content),
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Retrieves a single published blog post by its slug, including raw content.
 * Returns null if the post does not exist or is marked as draft.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const mdxPath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIRECTORY, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;

  if (!filePath) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = parseFrontmatter(data);

  if (frontmatter.draft) {
    return null;
  }

  return {
    slug,
    ...frontmatter,
    readingTime: calculateReadingTime(content),
    content,
  };
}

/**
 * Returns a list of unique tags used across all published blog posts.
 */
export function getAllBlogTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      if (tag && tag.trim()) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet).sort();
}

