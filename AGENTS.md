# AGENTS.md — AI Portfolio Website

Personal portfolio that showcases AI / machine learning projects.
Goal: a calm, readable site that visitors understand in 10 seconds, with a few tasteful interactive touches.

## 1. Stack (do not change without asking)

- Next.js (App Router) + TypeScript (strict) + Tailwind CSS
- `motion` (Framer Motion) for animation, `next-themes` for dark/light mode
- Icons: `lucide-react`
- Deploy: Vercel
- No backend, database, auth, or global state library. This is a static-first site.
- Add a new dependency only if the task cannot reasonably be done without it, and say why.

## 2. Pages

Main navigation has exactly four items: Home, Projects, Blog, About.

- `/` Home: hero, 3 featured projects, latest 3 blog posts, short about, contact CTA
- `/projects` All projects with tag filter
- `/projects/[slug]` Case study per project
- `/blog` All posts, newest first, with tag filter
- `/blog/[slug]` Single post
- `/about` Background, skills, timeline, and contact section (email + social links; a `mailto:` link is enough, no form backend)

There is no separate `/contact` page. Contact links also appear in the footer.

## 3. Content lives in data, not in components

- All project info is in `src/data/projects.ts`, typed with a `Project` interface:
  `slug, title, summary, problem, approach, results, techStack[], tags[], repoUrl?, demoUrl?, cover, images[], featured, year`
- Components only render data. To add a project, only edit the data file and add images.
- Never invent metrics, accuracy numbers, or achievements. If a value is missing, leave a clearly marked `TODO` and tell me.

### Blog content

- Posts are local MDX files in `content/blog/<slug>.mdx` with typed frontmatter:
  `title, description, date (ISO), tags[], cover?, draft?`
- Helpers in `src/lib/blog.ts`: `getAllPosts` (excludes drafts, newest first), `getPostBySlug`, `getAllBlogTags`. Compute reading time automatically.
- Generate pages statically (`generateStaticParams`). Style post content with a single shared prose style that follows the design principles (comfortable line length ~65-75 characters, readable code blocks).
- Keep it minimal: no CMS, database, comments, search, or newsletter unless I ask. Code blocks use build-time syntax highlighting, not client-side JS.
- Never write blog post content for me and present it as mine. Sample posts must be clearly marked as placeholders.

## 4. Design principles: easy on the eyes

- Layout: single centered column, max width ~1100px, generous whitespace, 8px spacing scale.
- Color: neutral base (off-white / near-black, not pure #fff / #000) plus ONE accent color. Define all colors as CSS variables / Tailwind tokens, with dark mode support.
- Contrast: body text must meet WCAG AA.
- Typography: one sans-serif family (e.g. Inter or Geist) plus optional mono for tech tags. Body 16–18px, line-height 1.6, clear heading hierarchy.
- Cards: soft radius (12–16px), subtle border, very light shadow. No heavy gradients behind text.
- Each page has one clear primary action. Don't crowd the screen.
- Mobile-first. Must look good at 360px, 768px, and 1280px.

## 5. Interactive touches (keep it to these, do not add more)

1. Hero: subtle animated gradient / soft glow background, plus a short typing or rotating-text effect for the role line.
2. Project cards: gentle hover lift with a slight tilt or image zoom.
3. Projects and Blog pages: tag filter (e.g. ML, NLP, CV, Anomaly Detection) with animated layout transition.
4. Scroll reveal: fade/slide-in sections once, not repeatedly.
5. Dark/light theme toggle with smooth transition.
6. Optional: a small interactive demo or visualization slot on a project page (only when I provide the demo).

Motion rules:
- Duration 150–400ms, ease-out. Nothing flashing, looping aggressively, or auto-playing with sound.
- Respect `prefers-reduced-motion`: disable or reduce all animation.
- Animation must never block reading or hurt performance (animate `transform` and `opacity` only).

## 6. Images and visual assets

Use real, relevant assets. Never placeholder image services.

**Sources**
- Do not use `placehold.co`, `via.placeholder.com`, `dummyimage.com`, `picsum.photos`, random image URLs, or any broken/deprecated image service.
- Use only committed files in `public/projects/<slug>/` (real screenshots, diagrams, charts), assets I approve, or stable URLs from an approved provider.
- Before using a third-party image, confirm its license and attribution requirements. Do not hotlink images from arbitrary websites.
- If an image is missing, use a neutral local placeholder component and tell me which file is needed.

**Quality**
- Images must match the actual project, feature, or interface they represent. No vague atmospheric stock images where visitors need to inspect a product or workflow.
- Use consistent aspect ratios for repeated cards/galleries. Set explicit `width`/`height` or CSS `aspect-ratio` to prevent layout shift.
- Use `next/image`, optimized formats (WebP/AVIF), lazy-load below the fold, `priority` only on the hero image.
- Do not put essential text only inside an image.

**Accessibility**
- Informative images get specific `alt` text describing their purpose in context.
- Decorative images use empty `alt=""`.

**Checks**
- Image paths resolve in the production build.
- Check mobile and desktop widths.
- No broken-image icons in loading, error, or empty states.

## 7. Accessibility

- Semantic HTML (`header`, `main`, `nav`, `section`, `footer`), one `h1` per page.
- Full keyboard navigation with visible focus rings.
- Interactive elements are real `button` / `a` elements with accessible names.
- Check color contrast in both themes.

## 8. SEO and performance

- Per-page `metadata` (title, description, Open Graph image), `sitemap.xml`, `robots.txt`.
- JSON-LD `Person` schema on the home page, `Article` schema on blog posts.
- `sitemap.xml` includes projects and blog posts. Add an RSS feed (`/blog/rss.xml`) for the blog.
- Target Lighthouse 90+ on Performance, Accessibility, Best Practices, SEO.
- Prefer Server Components; add `"use client"` only where interactivity requires it.
- Use `next/font`, avoid layout shift.

## 9. Scope: no over-engineering

- Only change what was asked. Simplest solution first. When unsure, ask.
- Do not: modify unrequested code, add abstractions without a concrete need, import unnecessary dependencies, rewrite whole files for small changes, or add error handling for impossible scenarios.
- Before delivering: confirm you changed only requested code, check whether a simpler approach exists, confirm no unrequested files were touched.

## 10. Honesty and verification

**Don't guess APIs**
- Before using any third-party library function, verify it exists in the installed version (check `package.json` and the docs). If you can't verify, mark it `// VERIFY: <library>.<symbol> against version X` and tell me.
- Never invent function signatures, parameter names, or return types. If a needed library isn't installed, propose installing it (with a specific version) before writing code that depends on it.

**Don't validate without evidence**
- Never say "looks good" or "this is correct" without checking against a spec or running it. Compiling is not the same as working.
- When asked "does this work?", list at least three failure modes first (empty input, boundary values, state/async assumptions), or say what you could not check.
- Match verification to risk: trivial change = syntax/lint check; logic change = manual trace or test; async/state change = write out the scenario.

**Report status truthfully**
- Answer "is it done?" based on what is verified, not what was attempted. "I wrote the code but did not run the build" is the correct answer when that is the case.
- If you don't know something, say "I do not know" or "I would need to verify X". Don't invent a plausible answer.

**Stay independent**
- If I invoke urgency ("ship it now"), state the trade-off once, then comply. Don't repeat the warning.
- Hold a technically sound recommendation if I push back. Change your mind only on new evidence, not repetition or pressure.
- Don't soften a real risk because I asked you to. If the risk is minor, say why.
- Name architectural trade-offs I didn't ask about (new dependency, async pattern, data structure choice) instead of burying them.

**Refactoring**
- Before refactoring, state the invariants of the existing code, then verify they still hold afterward. If there are no tests, propose a quick characterization test first, or mark the change "UNTESTED".

**Comments**
- No comments that restate what the code does. Only explain a non-obvious WHY (hidden constraint, workaround for a specific bug).
- No task-referencing comments ("added for issue X", "from review"). Those belong in commit messages.

## 11. Code rules

- TypeScript strict, no `any`. Small, clearly named components.
- Follow existing patterns in the repo before inventing new ones.

## 12. Definition of done

Before saying a task is finished, run and report results of:
1. `pnpm lint`
2. `pnpm build`
3. Quick visual check at mobile and desktop widths, in light and dark mode
4. Confirm no console errors and no broken images/links

Then summarize in a few lines: what changed, which files, what is verified vs not, and anything I need to provide (images, copy, links).

## 13. Deploy (Vercel)

- Deploy as a standard Next.js app on Vercel. Don't add custom server code, Edge Runtime, or middleware unless needed.
- Never commit secrets. Use environment variables, and keep `.env*` files in `.gitignore`.

## 14. Git

- Conventional commits: `feat:`, `fix:`, `style:`, `docs:`, `chore:`.
- Small, focused commits. Keep the README updated with how to run, build, and add a project.
