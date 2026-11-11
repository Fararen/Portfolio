"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", number: "01", label: "Home" },
  { href: "/projects", number: "02", label: "Projects" },
  { href: "/blog", number: "03", label: "Blog" },
  { href: "/about", number: "04", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          aria-label="Friend, Home"
          className="shrink-0 text-sm font-semibold tracking-tight text-[var(--color-fg)] transition-colors hover:text-[var(--color-accent)]"
        >
          Friend<span className="text-[#c46a4a]">✳</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-2 text-[11px] text-[var(--color-fg-muted)] sm:gap-5 sm:text-xs">
            {navLinks.map(({ href, number, label }) => {
              const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-sm py-1 transition-colors hover:text-[var(--color-fg)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] ${
                      active ? "font-semibold text-[var(--color-fg)]" : ""
                    }`}
                  >
                    <span className="font-mono text-[9px] text-[var(--color-accent)] sm:text-[10px]">{number}</span>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <Link
            href="/about#contact"
            className="hidden rounded-md bg-[#d9eff8] px-3 py-1.5 text-[11px] font-semibold text-[#29445a] transition-colors hover:bg-[#c7e8f5] dark:bg-[#263b47] dark:text-[#d6eff8] dark:hover:bg-[#304c5a] sm:inline-flex"
          >
            Let’s talk
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
