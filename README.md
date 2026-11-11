# AI Portfolio

Personal portfolio showcasing AI and machine learning projects, built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Getting started

```bash
pnpm install
pnpm dev      # http://localhost:3000
```

## Build & lint

```bash
pnpm lint
pnpm build
```

## Adding a project

1. Add an entry to `src/data/projects.ts` (see the `Project` interface at the top of that file).
2. Place cover and screenshots in `public/projects/<slug>/`.
3. That's it — the project will appear automatically on `/projects` and get its own page at `/projects/<slug>`.

## Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 (App Router) | Framework |
| TypeScript (strict) | Type safety |
| Tailwind CSS v4 | Styling |
| `motion` (Framer Motion) | Animation |
| `next-themes` | Dark / light mode |
| `lucide-react` | Icons |
| Vercel | Deploy |

