import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { checkProjectCoverExists } from "@/lib/project-server";
import Hero from "@/components/home/Hero";
import ShortAbout from "@/components/home/ShortAbout";
import ContactCTA from "@/components/home/ContactCTA";
import ProjectCard from "@/components/projects/ProjectCard";
import ScrollReveal from "@/components/common/ScrollReveal";

export const metadata: Metadata = {
  title: "Friend — AI Student & Portfolio",
  description:
    "AI student at the College of Computing, Khon Kaen University, exploring technology and useful AI solutions.",
};

const toolkitGroups = [
  { title: "Models", items: ["LLMs", "Transformers", "Diffusion", "Vision"] },
  { title: "Frameworks", items: ["PyTorch", "Hugging Face", "LangChain"] },
  { title: "Tools", items: ["Python", "Docker", "SQL", "Git"] },
  { title: "Cloud", items: ["AWS", "GCP", "MLOps"] },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

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

      <section aria-labelledby="toolkit-heading" className="toolkit-section">
        <div className="grid gap-3 sm:grid-cols-[.7fr_1.3fr] sm:items-end sm:gap-8">
          <div>
            <span className="editorial-kicker text-[var(--color-accent)]">02 / THE TOOLKIT</span>
            <h2 id="toolkit-heading" className="editorial-heading mt-2 text-4xl font-semibold text-[var(--color-fg)] sm:text-5xl">
              Notes from the lab.
            </h2>
          </div>
          <p className="max-w-xl text-xs leading-6 text-[var(--color-fg-muted)] sm:justify-self-end sm:text-sm">
            Sample toolkit from the reference design. Replace these examples with the tools you actually use.
          </p>
        </div>
        <div className="toolkit-grid">
          {toolkitGroups.map((group, index) => (
            <article className="toolkit-group" key={group.title}>
              <span className="editorial-kicker text-[var(--color-fg-muted)]">0{index + 1} / SAMPLE</span>
              <h3 className="toolkit-heading">{group.title}</h3>
              <div className="toolkit-tags">
                {group.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <ScrollReveal><ShortAbout /></ScrollReveal>
      <ScrollReveal><ContactCTA /></ScrollReveal>
    </>
  );
}
