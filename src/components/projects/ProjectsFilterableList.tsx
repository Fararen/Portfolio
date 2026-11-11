"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";

interface ProjectsFilterableListProps {
  projects: Array<Project & { coverExists: boolean }>;
  tags: string[];
}

export default function ProjectsFilterableList({
  projects,
  tags,
}: ProjectsFilterableListProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const shouldReduceMotion = useReducedMotion();

  const allFilterOptions = ["All", ...tags];

  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((project) => project.tags.includes(selectedTag));

  return (
    <div>
      {/* Tag filter bar */}
      <div className="mb-10 flex flex-wrap items-center gap-2" role="toolbar" aria-label="Project tag filters">
        {allFilterOptions.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              aria-pressed={isActive}
              className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                isActive
                  ? "bg-[var(--color-accent)] text-white shadow-sm"
                  : "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-fg-muted)]/40 hover:text-[var(--color-fg)]"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Animated project grid */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[var(--color-border)] p-12 text-center text-sm text-[var(--color-fg-muted)]">
          No projects found matching the tag &ldquo;{selectedTag}&rdquo;.
        </div>
      ) : (
        <motion.div
          layout={!shouldReduceMotion}
          className="grid grid-cols-1 gap-4"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <ProjectCard project={project} coverExists={project.coverExists} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

