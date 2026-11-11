import type { Metadata } from "next";
import { getAllPosts, getAllBlogTags } from "@/lib/blog";
import BlogFilterableList from "@/components/blog/BlogFilterableList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles, research notes, and tutorials on machine learning, deep learning, and engineering.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllBlogTags();

  return (
    <section aria-labelledby="blog-page-heading">
      <header className="mb-10 max-w-3xl border-b border-[var(--color-border)] pb-8 sm:pb-10">
        <span className="editorial-kicker text-[var(--color-accent)]">
          03 / THE NOTES
        </span>
        <h1
          id="blog-page-heading"
          className="editorial-heading mt-3 text-5xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-7xl"
        >
          Notes from the lab.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-[var(--color-fg-muted)] leading-relaxed sm:text-base">
          Short notes and longer thoughts about AI, technology, and what I’m learning along the way.
        </p>
      </header>

      <BlogFilterableList posts={posts} tags={allTags} />
    </section>
  );
}
