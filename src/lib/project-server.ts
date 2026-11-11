import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/types/project";

export function checkProjectCoverExists(coverPath: string): boolean {
  if (!coverPath) return false;
  const relativeCover = coverPath.replace(/^\//, "");
  const coverDiskPath = path.join(process.cwd(), "public", relativeCover);
  return fs.existsSync(coverDiskPath);
}

export function getProjectsWithCoverStatus(projects: Project[]): Array<Project & { coverExists: boolean }> {
  return projects.map((project) => ({
    ...project,
    coverExists: checkProjectCoverExists(project.cover),
  }));
}

