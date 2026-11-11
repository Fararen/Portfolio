export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  approach: string;
  results: string;
  techStack: string[];
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  cover: string;
  images: ProjectImage[];
  featured: boolean;
  year: number;
  role?: string;
  status: "completed" | "in-progress";
  isPlaceholder?: boolean;
}

