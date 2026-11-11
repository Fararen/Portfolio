import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Clock } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import ImagePlaceholder from "@/components/common/ImagePlaceholder";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study`,
    description: project.summary === "TODO" ? `Technical case study for ${project.title}` : project.summary,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Check if cover file exists on disk
  const relativeCover = project.cover.replace(/^\//, "");
  const coverDiskPath = path.join(process.cwd(), "public", relativeCover);
  const coverExists = fs.existsSync(coverDiskPath);

  return (
    <article className="max-w-[850px] mx-auto py-4">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-fg-muted)] transition-colors hover:text-[var(--color-fg)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--color-fg-muted)]">
          <span>{project.year}</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            {project.status === "completed" ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Clock className="h-3.5 w-3.5 text-amber-500" aria-hidden="true" />
                <span>In Progress</span>
              </>
            )}
          </span>
          {project.role && project.role !== "TODO" && (
            <>
              <span>•</span>
              <span>{project.role}</span>
            </>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-fg)] sm:text-5xl">
          {project.title}
        </h1>

        <p className="mt-4 text-lg text-[var(--color-fg-muted)] leading-relaxed">
          {project.summary === "TODO" ? "Technical case study overview." : project.summary}
        </p>

        {/* Links & Tags bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-[var(--color-border)] py-4">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 font-mono text-xs text-[var(--color-fg-muted)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-sm">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>Source Code</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--color-accent)] transition-opacity hover:opacity-85"
              >
                <span>Live Demo</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      <div className="relative mb-12 overflow-hidden rounded-2xl bg-[var(--color-bg-subtle)] aspect-[16/9] border border-[var(--color-border)]">
        {coverExists ? (
          <Image
            src={project.cover}
            alt={`Cover visualization for ${project.title}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 850px"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder
            filePath={project.cover}
            aspectRatio="aspect-full h-full w-full"
          />
        )}
      </div>

      {/* Structured Case Study Sections */}
      <div className="space-y-12">
        {/* Problem */}
        <section aria-labelledby="problem-heading" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 id="problem-heading" className="text-xl font-bold tracking-tight text-[var(--color-fg)]">
            1. The Problem
          </h2>
          <div className="mt-3 text-sm sm:text-base text-[var(--color-fg-muted)] leading-relaxed">
            {project.problem === "TODO" ? (
              <p className="italic text-[var(--color-fg-muted)]/70">
                [TODO] Problem statement pending user input. Describe the core obstacle, inefficiency, or research challenge this project addressed.
              </p>
            ) : (
              <p>{project.problem}</p>
            )}
          </div>
        </section>

        {/* Approach */}
        <section aria-labelledby="approach-heading" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 id="approach-heading" className="text-xl font-bold tracking-tight text-[var(--color-fg)]">
            2. Technical Approach &amp; Architecture
          </h2>
          <div className="mt-3 text-sm sm:text-base text-[var(--color-fg-muted)] leading-relaxed">
            {project.approach === "TODO" ? (
              <p className="italic text-[var(--color-fg-muted)]/70">
                [TODO] Technical approach pending user input. Describe the architecture, models, training routine, or data pipeline implemented.
              </p>
            ) : (
              <p>{project.approach}</p>
            )}
          </div>

          {project.techStack.length > 0 && (
            <div className="mt-6 pt-4 border-t border-[var(--color-border)]">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-fg-muted)] mb-2">
                Technologies &amp; Libraries
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 font-mono text-xs text-[var(--color-fg)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Results */}
        <section aria-labelledby="results-heading" className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <h2 id="results-heading" className="text-xl font-bold tracking-tight text-[var(--color-fg)]">
            3. Results &amp; Impact
          </h2>
          <div className="mt-3 text-sm sm:text-base text-[var(--color-fg-muted)] leading-relaxed">
            {project.results === "TODO" ? (
              <p className="italic text-[var(--color-fg-muted)]/70">
                [TODO] Real results pending user input. Per AGENTS.md, no metrics are invented. Provide verified evaluation metrics, throughput benchmarks, or production outcomes.
              </p>
            ) : (
              <p>{project.results}</p>
            )}
          </div>
        </section>

        {/* Screenshots / Architecture diagrams gallery */}
        {project.images.length > 0 ? (
          <section aria-labelledby="gallery-heading" className="space-y-6">
            <h2 id="gallery-heading" className="text-xl font-bold tracking-tight text-[var(--color-fg)]">
              Visuals &amp; Diagrams
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {project.images.map((img, i) => {
                const imgRelative = img.src.replace(/^\//, "");
                const exists = fs.existsSync(path.join(process.cwd(), "public", imgRelative));
                return (
                  <figure key={i} className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
                    {exists ? (
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        className="object-cover w-full h-auto"
                      />
                    ) : (
                      <ImagePlaceholder filePath={img.src} />
                    )}
                    {img.alt && (
                      <figcaption className="p-3 text-center text-xs text-[var(--color-fg-muted)]">
                        {img.alt}
                      </figcaption>
                    )}
                  </figure>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-center text-xs text-[var(--color-fg-muted)]">
            <span>No additional screenshots configured. See </span>
            <code className="rounded bg-[var(--color-bg)] px-1.5 py-0.5 text-[var(--color-fg)]">
              public/projects/{project.slug}/README.txt
            </code>
            <span> for assets that can be added.</span>
          </section>
        )}
      </div>
    </article>
  );
}
