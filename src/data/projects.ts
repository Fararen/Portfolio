import type { Project, ProjectImage } from "@/types/project";

export type { Project, ProjectImage };

const projectList: Project[] = [
  {
    slug: "placeholder-project-1",
    title: "Placeholder Project 1",
    summary: "TODO",
    problem: "TODO",
    approach: "TODO",
    results: "TODO",
    techStack: [],
    tags: ["TODO"],
    cover: "/projects/placeholder-project-1/cover.webp",
    images: [],
    featured: true,
    year: 2026,
    role: "TODO",
    status: "in-progress",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-project-2",
    title: "Placeholder Project 2",
    summary: "TODO",
    problem: "TODO",
    approach: "TODO",
    results: "TODO",
    techStack: [],
    tags: ["TODO"],
    cover: "/projects/placeholder-project-2/cover.webp",
    images: [],
    featured: true,
    year: 2025,
    role: "TODO",
    status: "in-progress",
    isPlaceholder: true,
  },
  {
    slug: "placeholder-project-3",
    title: "Placeholder Project 3",
    summary: "TODO",
    problem: "TODO",
    approach: "TODO",
    results: "TODO",
    techStack: [],
    tags: ["TODO"],
    cover: "/projects/placeholder-project-3/cover.webp",
    images: [],
    featured: true,
    year: 2024,
    role: "TODO",
    status: "in-progress",
    isPlaceholder: true,
  },
];

export const projects: Project[] = [...projectList].sort((a, b) => b.year - a.year);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => b.year - a.year)
    .slice(0, 3);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  for (const project of projects) {
    for (const tag of project.tags) {
      if (tag && tag.trim()) {
        tagSet.add(tag);
      }
    }
  }
  return Array.from(tagSet);
}
