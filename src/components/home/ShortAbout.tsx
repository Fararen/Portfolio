import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ShortAbout() {
  return (
    <section aria-labelledby="short-about-heading" className="profile-preview my-16 border-y border-[var(--color-border)] py-12 sm:my-20 sm:py-16">
      <div className="grid gap-7 sm:grid-cols-[0.7fr_1.3fr] sm:items-start sm:gap-12">
        <div>
          <span className="editorial-kicker text-[var(--color-accent)]">03 / ABOUT</span>
          <h2 id="short-about-heading" className="editorial-heading mt-3 text-4xl font-semibold leading-tight text-[var(--color-fg)] sm:text-5xl">
            A human, actually.
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-fg)] sm:text-xl">
            I like my models rigorous and my explanations refreshingly normal.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-fg-muted)] sm:text-base">
            I’m interested in making powerful technology useful. I move between experiments, evaluation, and product thinking—because a model is only as good as the problem it helps solve.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex min-h-11 items-center gap-2 border-b border-[var(--color-fg)] pb-1 text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[#c46a4a] hover:text-[#a84f35]"
          >
            More about me <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
