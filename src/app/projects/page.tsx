import type { Metadata } from "next";
import { projects, getAllTags } from "@/data/projects";
import { getProjectsWithCoverStatus } from "@/lib/project-server";
import ProjectsFilterableList from "@/components/projects/ProjectsFilterableList";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore machine learning pipelines, deep learning models, and full-stack AI applications.",
};

export default function ProjectsPage() {
  const allTags = getAllTags();
  const projectsWithCover = getProjectsWithCoverStatus(projects);

  return (
    <section aria-labelledby="projects-page-heading">
      <header className="mb-10 max-w-3xl border-b border-[var(--color-border)] pb-8 sm:pb-10">
        <span className="editorial-kicker text-[var(--color-accent)]">
          01 / THE WORK
        </span>
        <h1
          id="projects-page-heading"
          className="editorial-heading mt-3 text-5xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-7xl"
        >
          Selected projects.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-[var(--color-fg-muted)] leading-relaxed sm:text-base">
          A collection of AI and technology projects. Filter by topic to explore the work.
        </p>
        {projects.some((project) => project.isPlaceholder) && (
          <p className="mt-4 max-w-2xl border-l-2 border-[#c46a4a] pl-3 text-xs leading-6 text-[var(--color-fg-muted)]">
            Sample project entries are marked clearly so you can replace them with your own project details.
          </p>
        )}
      </header>

      <ProjectsFilterableList projects={projectsWithCover} tags={allTags} />
    </section>
  );
}
