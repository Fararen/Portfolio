import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="home-hero relative grid items-center gap-8 sm:grid-cols-[1.15fr_.85fr]"
    >
      <div className="hero-copy relative z-10">
        <p className="editorial-kicker text-[var(--color-accent)]">AI ENGINEER · KHON KAEN, THAILAND</p>
        <h1 id="hero-title" className="hero-title mt-6 text-[clamp(4rem,11vw,8.5rem)] font-semibold leading-[.86] tracking-[-.07em] text-[var(--color-fg)]">
          Hello,
          <span className="hero-name block">I’m Friend.</span>
        </h1>
        <p className="hero-intro mt-7 max-w-xl text-xl leading-snug text-[var(--color-fg)] sm:text-2xl">
          An AI student building thoughtful solutions with technology.
        </p>
        <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--color-fg-muted)] sm:text-base">
          I study at the College of Computing, Khon Kaen University, and enjoy exploring artificial intelligence and building useful things for the future.
        </p>
        <Link
          href="/projects"
          className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#bfddf2] px-5 py-2.5 text-sm font-semibold text-[#2b1f1a] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#add1e8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          See my projects <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="hero-art relative mx-auto grid w-full max-w-sm place-items-center sm:max-w-md">
        <div className="hero-topography absolute inset-0" aria-hidden="true" />
        <div className="hero-arch relative z-10 grid w-[78%] place-items-center overflow-hidden rounded-t-[48%] border border-[var(--color-border)] bg-[#e5edf0] dark:bg-[#35434a]">
          <Image
            src="/images/friend-home.jpg"
            alt="Friend นั่งพักผ่อนบนม้านั่งริมสระน้ำ ท่ามกลางดอกไม้สีชมพู"
            width={768}
            height={1157}
            priority
            className="h-full w-full object-cover object-center"
          />
        </div>
        <p className="absolute bottom-0 right-0 z-20 max-w-40 rotate-3 bg-[#bfddf2] px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-wide text-[#2b1f1a] shadow-md sm:right-[-2%]">
          Curious by nature<br />Building with purpose
        </p>
      </div>
    </section>
  );
}
