import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { projects } from "../src/data/projects.ts";

interface ValidationResult {
  errors: string[];
  warnings: string[];
}

function isValidUrl(urlString?: string): boolean {
  if (!urlString || urlString.trim() === "") return true;
  try {
    const url = new URL(urlString);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateProjects(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Duplicate slugs check
  const slugCounts = new Map<string, number>();
  for (const project of projects) {
    const count = (slugCounts.get(project.slug) || 0) + 1;
    slugCounts.set(project.slug, count);
  }
  for (const [slug, count] of slugCounts.entries()) {
    if (count > 1) {
      errors.push(`Duplicate project slug detected: "${slug}" appears ${count} times.`);
    }
  }

  // 2. Maximum 3 featured projects check
  const featuredProjects = projects.filter((p) => p.featured);
  if (featuredProjects.length > 3) {
    errors.push(
      `Too many featured projects: found ${featuredProjects.length}, maximum allowed is 3.`
    );
  }

  for (const project of projects) {
    const id = `"${project.title}" (${project.slug})`;

    // 3. Featured project without a cover
    if (project.featured) {
      if (!project.cover || project.cover.trim() === "") {
        errors.push(`Featured project ${id} has no cover image specified.`);
      }
    }

    // 4. Image without alt text
    if (Array.isArray(project.images)) {
      for (let i = 0; i < project.images.length; i++) {
        const img = project.images[i];
        if (!img || !img.alt || img.alt.trim() === "") {
          errors.push(
            `Project ${id} has an image at index ${i} (${img?.src || "unknown src"}) without alt text.`
          );
        }
      }
    }

    // 5. Invalid repoUrl or demoUrl
    if (project.repoUrl && !isValidUrl(project.repoUrl)) {
      errors.push(
        `Project ${id} has an invalid repoUrl: "${project.repoUrl}". Must be a valid http/https URL.`
      );
    }
    if (project.demoUrl && !isValidUrl(project.demoUrl)) {
      errors.push(
        `Project ${id} has an invalid demoUrl: "${project.demoUrl}". Must be a valid http/https URL.`
      );
    }

    // Warning: isPlaceholder projects
    if (project.isPlaceholder) {
      warnings.push(`Project ${id} is marked as a placeholder (isPlaceholder: true).`);
    }

    // Warning: "TODO" fields
    const textFields: Record<string, string | undefined> = {
      summary: project.summary,
      problem: project.problem,
      approach: project.approach,
      results: project.results,
      role: project.role,
    };
    for (const [fieldName, val] of Object.entries(textFields)) {
      if (typeof val === "string" && val.toUpperCase().includes("TODO")) {
        warnings.push(`Project ${id} has "TODO" in field "${fieldName}".`);
      }
    }

    if (project.title.toUpperCase().includes("TODO")) {
      warnings.push(`Project ${id} has "TODO" in title: "${project.title}".`);
    }

    for (const tag of project.tags) {
      if (tag.toUpperCase().includes("TODO")) {
        warnings.push(`Project ${id} has "TODO" in tags: "${tag}".`);
      }
    }

    for (const tech of project.techStack) {
      if (tech.toUpperCase().includes("TODO")) {
        warnings.push(`Project ${id} has "TODO" in techStack: "${tech}".`);
      }
    }
  }

  return { errors, warnings };
}

export function validateBlogPosts(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const blogDir = path.join(process.cwd(), "content", "blog");

  if (!fs.existsSync(blogDir)) {
    warnings.push(`Blog directory does not exist at ${blogDir}`);
    return { errors, warnings };
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  // 1. Duplicate slug check
  const slugCounts = new Map<string, number>();
  for (const file of files) {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const count = (slugCounts.get(slug) || 0) + 1;
    slugCounts.set(slug, count);
  }
  for (const [slug, count] of slugCounts.entries()) {
    if (count > 1) {
      errors.push(`Duplicate blog slug detected: "${slug}" resolved from multiple files.`);
    }
  }

  for (const file of files) {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(blogDir, file);
    const rawContent = fs.readFileSync(filePath, "utf8");

    let frontmatter: Record<string, unknown> = {};
    try {
      const parsed = matter(rawContent);
      frontmatter = parsed.data || {};
    } catch (err) {
      errors.push(`Failed to parse frontmatter in blog post "${file}": ${String(err)}`);
      continue;
    }

    const postLabel = `"${frontmatter.title || slug}" (${file})`;

    // 2. Missing title
    if (!frontmatter.title || typeof frontmatter.title !== "string" || frontmatter.title.trim() === "") {
      errors.push(`Blog post ${postLabel} is missing a required "title" in frontmatter.`);
    }

    // 3. Missing description
    if (
      !frontmatter.description ||
      typeof frontmatter.description !== "string" ||
      frontmatter.description.trim() === ""
    ) {
      errors.push(`Blog post ${postLabel} is missing a required "description" in frontmatter.`);
    }

    // 4. Missing date
    if (!frontmatter.date || String(frontmatter.date).trim() === "") {
      errors.push(`Blog post ${postLabel} is missing a required "date" in frontmatter.`);
    } else {
      // 5. Invalid date
      const dateStr = String(
        frontmatter.date instanceof Date
          ? frontmatter.date.toISOString().split("T")[0]
          : frontmatter.date
      );
      const timestamp = Date.parse(dateStr);
      if (Number.isNaN(timestamp)) {
        errors.push(
          `Blog post ${postLabel} has an invalid "date": "${dateStr}". Must be a valid date string (e.g. ISO format YYYY-MM-DD).`
        );
      }
    }

    // 6. Empty tags array
    if (!Array.isArray(frontmatter.tags) || frontmatter.tags.length === 0) {
      errors.push(`Blog post ${postLabel} has an empty or missing "tags" array. At least one tag is required.`);
    } else {
      const validTags = frontmatter.tags.filter((t) => typeof t === "string" && t.trim() !== "");
      if (validTags.length === 0) {
        errors.push(`Blog post ${postLabel} has no valid non-empty tags in the "tags" array.`);
      }
    }

    // Warnings
    if (frontmatter.draft) {
      warnings.push(`Blog post ${postLabel} is marked as draft (draft: true).`);
    }

    if (typeof frontmatter.title === "string" && frontmatter.title.toUpperCase().includes("PLACEHOLDER")) {
      warnings.push(`Blog post ${postLabel} is marked as a placeholder in its title.`);
    }

    if (typeof frontmatter.title === "string" && frontmatter.title.toUpperCase().includes("TODO")) {
      warnings.push(`Blog post ${postLabel} contains "TODO" in title.`);
    }
  }

  return { errors, warnings };
}

function main() {
  console.log("Validating project & blog data...\n");

  const projectValidation = validateProjects();
  const blogValidation = validateBlogPosts();

  const totalErrors = [...projectValidation.errors, ...blogValidation.errors];
  const totalWarnings = [...projectValidation.warnings, ...blogValidation.warnings];

  if (totalWarnings.length > 0) {
    console.log(`⚠️  ${totalWarnings.length} warning(s):`);
    for (const warning of totalWarnings) {
      console.log(`   [WARN] ${warning}`);
    }
    console.log("");
  }

  if (totalErrors.length > 0) {
    console.error(`❌ ${totalErrors.length} validation error(s) found:`);
    for (const error of totalErrors) {
      console.error(`   [ERROR] ${error}`);
    }
    console.error("\nValidation FAILED.");
    process.exit(1);
  }

  console.log("✅ All data validation passed (0 errors).\n");
}

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url).endsWith(process.argv[1].replace(/^[.\/\\]+/, ""));

if (isDirectRun || process.argv[1]?.includes("validate-data")) {
  main();
}
