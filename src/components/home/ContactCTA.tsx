import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section aria-labelledby="contact-cta-heading" className="contact-preview -mx-4 mt-16 bg-[#2b1f1a] px-5 py-12 text-[#f3ebdd] sm:-mx-6 sm:px-10 sm:py-16 lg:px-14">
      <p className="editorial-kicker text-[#bfddf2]">04 / SAY HELLO</p>
      <div className="mt-5 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="contact-cta-heading" className="editorial-heading max-w-3xl text-5xl font-semibold leading-[.95] tracking-tight text-[#f3ebdd] sm:text-7xl">
            Have a project in mind?
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#d0c5b6] sm:text-base">
            I’m always happy to talk about thoughtful uses of AI and technology.
          </p>
        </div>
        <Link
          href="/about#contact"
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#bfddf2] px-5 py-2.5 text-sm font-semibold text-[#2b1f1a] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#bfddf2] sm:self-auto"
        >
          Let’s talk <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
