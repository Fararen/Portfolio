import Link from "next/link";
import { Mail, Rss } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-[var(--color-border)] py-12 text-sm text-[var(--color-fg-muted)]">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        {/* Brand / Copyright */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <Link
            href="/"
            className="font-semibold tracking-tight text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors"
          >
            Friend <span className="text-[#c46a4a]">✳</span>
          </Link>
          <p className="text-xs">
            © {currentYear} — AI student portfolio.
          </p>
        </div>

        {/* Contact links per AGENTS.md Section 2 */}
        <div className="flex items-center gap-5 text-[var(--color-fg-muted)]">
          <a
            href="mailto:rachaon555@gmail.com"
            aria-label="Email"
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
          <Link
            href="/blog/rss.xml"
            aria-label="RSS Feed"
            className="transition-colors hover:text-[var(--color-fg)]"
          >
            <Rss className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
