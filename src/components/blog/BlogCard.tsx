import Link from "next/link";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import type { BlogPostSummary } from "@/types/blog";

interface BlogCardProps {
  post: BlogPostSummary;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format date safely
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : post.date;

  return (
    <article className="group relative flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-[var(--color-fg-muted)]/40">
      <div>
        {/* Meta: Date & Reading Time */}
        <div className="flex items-center gap-3 text-xs text-[var(--color-fg-muted)]">
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
            <time dateTime={post.date}>{formattedDate}</time>
          </span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{post.readingTime}</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-[var(--color-fg)] transition-colors group-hover:text-[var(--color-accent)]">
          <Link href={`/blog/${post.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-[var(--color-fg-muted)] leading-relaxed">
          {post.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-3 border-t border-[var(--color-border)]/60">
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2 py-0.5 font-mono text-[11px] text-[var(--color-fg-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)]">
          Read Article
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </article>
  );
}

