import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  coverExists?: boolean;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const tags = project.tags.filter((tag) => tag && tag !== "TODO");
  const summary = project.summary === "TODO"
    ? "Project details will appear here once the case study is ready."
    : project.summary;

  return (
    <article className="project-editorial-card group">
      <div className="project-main">
        <div className="flex flex-wrap items-center gap-2">
          <span className="editorial-kicker text-[var(--color-fg-muted)]">{project.year} / {project.status}</span>
          {project.isPlaceholder && (
            <span className="rounded-full border border-[var(--color-border)] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide text-[var(--color-fg-muted)]">
              Sample project
            </span>
          )}
        </div>

        <h3 className="project-title editorial-heading">
          <Link href={`/projects/${project.slug}`} className="focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]">
            {project.title}
          </Link>
        </h3>
        <p className="project-summary">{summary}</p>

        {tags.length > 0 && (
          <div className="project-tags" aria-label={`หัวข้อของ ${project.title}`}>
            {tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        )}
      </div>

      <aside className="project-side">
        <div>
          <span className="project-side-label">PROJECT STATUS</span>
          <p className="project-status">{project.status === "completed" ? "Completed" : "In progress"}</p>
          {project.role && project.role !== "TODO" && <p className="project-role">{project.role}</p>}
        </div>

        <div className="project-actions">
          <Link href={`/projects/${project.slug}`} className="project-action-primary">
            View project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="project-action-secondary">
              <Github className="h-4 w-4" aria-hidden="true" /> GitHub
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-action-secondary">
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live demo
            </a>
          )}
        </div>
      </aside>
    </article>
  );
}
