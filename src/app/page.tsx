import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";
import { checkProjectCoverExists } from "@/lib/project-server";
import Hero from "@/components/home/Hero";
import ShortAbout from "@/components/home/ShortAbout";
import ContactCTA from "@/components/home/ContactCTA";
import BlogCard from "@/components/blog/BlogCard";
import ProjectCard from "@/components/projects/ProjectCard";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata: Metadata = {
  title: "Friend — AI Student & Portfolio",
  description:
    "AI student at the College of Computing, Khon Kaen University, exploring technology and useful AI solutions.",
};

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const latestPosts = getAllPosts().slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Friend",
    jobTitle: "AI Student",
    description: "AI student at the College of Computing, Khon Kaen University.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />

      <section id="projects" aria-labelledby="featured-projects-heading" className="my-12 sm:my-16">
        <ScrollReveal>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <span className="editorial-kicker text-[var(--color-accent)]">
                01 / THE WORK
              </span>
              <h2 id="featured-projects-heading" className="editorial-heading mt-2 text-4xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
                Selected projects.
              </h2>
            </div>
            <Link href="/projects" className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]">
              All projects <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-4">
          {featuredProjects.map((project, index) => (
            <ScrollReveal key={project.slug} delay={index * 0.08}>
              <ProjectCard
                project={project}
                priority={index === 0}
                coverExists={checkProjectCoverExists(project.cover)}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section id="blog" aria-labelledby="latest-posts-heading" className="my-12 sm:my-16">
        <ScrollReveal>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <span className="editorial-kicker text-[var(--color-accent)]">02 / THE BLOG</span>
              <h2 id="latest-posts-heading" className="editorial-heading mt-2 text-4xl font-semibold tracking-tight text-[var(--color-fg)] sm:text-5xl">
                Notes from the lab.
              </h2>
            </div>
            <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]">
              All posts <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
            Short notes and longer thoughts about AI, technology, and what I’m learning along the way.
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-1 gap-4">
          {latestPosts.map((post, index) => (
            <ScrollReveal key={post.slug} delay={index * 0.08}>
              <BlogCard post={post} />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ScrollReveal><ShortAbout /></ScrollReveal>
      <ScrollReveal><ContactCTA /></ScrollReveal>
    </>
  );
}
