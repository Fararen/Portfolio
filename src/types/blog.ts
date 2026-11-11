export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO date format, e.g. "YYYY-MM-DD"
  tags: string[];
  cover?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  readingTime: string;
  content: string;
}

export type BlogPostSummary = Omit<BlogPost, "content">;

