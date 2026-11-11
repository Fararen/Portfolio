import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Friend, an AI student at the College of Computing, Khon Kaen University.",
};

const interests = ["Artificial intelligence", "Technology", "Useful solutions"];

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-5xl">
      <header className="border-b border-[var(--color-border)] pb-12 sm:pb-16">
        <span className="editorial-kicker text-[var(--color-accent)]">02 / ABOUT</span>
        <h1 className="editorial-heading mt-4 text-5xl font-semibold leading-[.96] tracking-tight text-[var(--color-fg)] sm:text-7xl">
          A human, actually.
        </h1>
        <p className="mt-7 max-w-3xl text-xl leading-relaxed text-[var(--color-fg)] sm:text-2xl">
          I like my models rigorous and my explanations refreshingly normal.
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-fg-muted)] sm:text-base">
          I’m an AI student at the College of Computing, Khon Kaen University, passionate about artificial intelligence, technology, and building useful solutions for the future.
        </p>
      </header>

      <section aria-labelledby="about-interests" className="grid gap-7 border-b border-[var(--color-border)] py-10 sm:grid-cols-[.7fr_1.3fr] sm:gap-12 sm:py-14">
        <div>
          <span className="editorial-kicker text-[var(--color-accent)]">01 / THE INTERESTS</span>
          <h2 id="about-interests" className="editorial-heading mt-3 text-3xl font-semibold text-[var(--color-fg)] sm:text-4xl">
            Things I care about.
          </h2>
        </div>
        <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {interests.map((interest, index) => (
            <li key={interest} className="flex items-center gap-4 py-4 text-base text-[var(--color-fg)] sm:text-lg">
              <span className="font-mono text-xs text-[var(--color-accent)]">0{index + 1}</span>
              {interest}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="about-education" className="grid gap-7 py-10 sm:grid-cols-[.7fr_1.3fr] sm:gap-12 sm:py-14">
        <div>
          <span className="editorial-kicker text-[var(--color-accent)]">02 / EDUCATION</span>
          <h2 id="about-education" className="editorial-heading mt-3 text-3xl font-semibold text-[var(--color-fg)] sm:text-4xl">
            Where I’m learning.
          </h2>
        </div>
        <div className="border-l-2 border-[#c46a4a] pl-5 sm:pl-7">
          <p className="editorial-heading text-2xl font-semibold text-[var(--color-fg)] sm:text-3xl">
            College of Computing
          </p>
          <p className="mt-2 text-[var(--color-fg-muted)]">Khon Kaen University</p>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-section-heading" className="scroll-mt-24 bg-[#2b1f1a] px-5 py-10 text-[#f3ebdd] sm:px-10 sm:py-14">
        <span className="editorial-kicker text-[#bfddf2]">03 / SAY HELLO</span>
        <h2 id="contact-section-heading" className="editorial-heading mt-4 text-4xl font-semibold text-[#f3ebdd] sm:text-6xl">
          Have a project in mind?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[#d0c5b6] sm:text-base">
          I’d love to hear what you’re working on.
        </p>
        <a
          href="mailto:rachaon555@gmail.com"
          className="mt-6 inline-flex min-h-11 flex-wrap items-center gap-2 text-lg font-semibold text-[#bfddf2] underline decoration-1 underline-offset-4 transition-colors hover:text-white sm:text-2xl"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
          rachaon555@gmail.com
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <Link href="/projects" className="mt-8 flex min-h-11 w-fit items-center gap-2 rounded-full border border-[#d0c5b6]/60 px-4 py-2 text-sm text-[#f3ebdd] transition-colors hover:bg-[#f3ebdd] hover:text-[#2b1f1a]">
          Explore my projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </article>
  );
}
