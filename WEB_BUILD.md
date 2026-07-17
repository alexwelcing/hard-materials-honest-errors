# WEB_BUILD.md — Implementation contract for finishing "Hard Materials, Honest Errors"

You are implementing one or more pages of an existing Vite + React 19 + TS site. Read this fully before writing code.

## Ground rules
- Do NOT modify: `src/content/*` (generated data), `src/lib/report.ts`, `src/lib/search.ts`, `src/lib/readingState.ts`, `src/lib/theme.ts`, `src/lib/mathHtml.ts`, `src/index.css`, `tailwind.config.js`, `src/App.tsx`, `src/components/Layout.tsx`, `Topbar.tsx`, `Footer.tsx`, `ReportNavigator.tsx`, `SearchOverlay.tsx`, `src/pages/Home.tsx`, `src/components/home/*`, `src/components/ui/*`.
- Replace the `PageStub` usage in your assigned `src/pages/*.tsx` with the real implementation. You may add page-specific components under `src/components/<page>/`.
- No new npm dependencies. Available: react-router (v7, `import { Link, useLocation } from 'react-router'`), framer-motion, lucide-react, katex (via `@/lib/mathHtml`), minisearch (via `@/lib/search`), all `@/components/ui/*` (shadcn), `@/lib/utils` (`cn`).
- TypeScript strict: build runs `tsc -b && vite build`. No `any` leaks, no unused imports.
- Verify with `npx tsc -b` scoped mentally — do not run full builds yourself (the orchestrator builds).

## Design tokens ("The Reading Room")
- Colors (Tailwind classes): `bg-paper`, `bg-surface`, `bg-faint`, `text-ink`, `text-ink-soft`, `text-ink-faint`, `border-hairline`, `text-accent` (rust), `text-accent-deep`, `text-verdigris`, readiness `text-ready-h|m|l` (also `bg-` variants), flags `bg-flag-verified text-flag-verified-text`, `bg-flag-hedge text-flag-hedge-text`. Themes (paper/sepia/ink) are automatic via CSS vars — never hardcode hex.
- Fonts: `font-display` (Fraunces, headings), `font-serif` (Newsreader, long-form), `font-sans` (Inter, UI), `font-mono` (IBM Plex Mono, numerals/labels). Add `tabular` class for numeric columns.
- `.micro-label` = the uppercase 11px eyebrow style (use with `text-verdigris` or `text-ink-faint`).
- `max-w-measure` (70ch) for reading width; page shells use `mx-auto max-w-[1100px] px-6` (or 1200px for wide tables).
- Sharp corners (`rounded-sm` max), hairline borders, no cards-with-shadows aesthetic. Book-like, quiet, dense but breathable. Generous `mt-` rhythm.
- Existing shared components: `<PageHeader eyebrow title lede/>` (use for every exhibit page), `<ExhibitTable table={...} idPrefix="row" caption math/>`, `<ErrorBarGlyph/>`, `@/lib/mathHtml` (`mathifyHtml`, `mathifyText`).

## Data APIs
- `@/lib/report`: `chapters` (23), `PARTS` (6 parts with chapters), `getChapter(id)`, `chapterTitle(ch)`, `chapterShort(id)`, `EXHIBIT_LINKS`, `REPORT_DATE`, `REPORT_STATS`.
- Chapter shape: `{ id: 'ch01'…'ch23', number, title, part, partName, wordCount, readingTime, sections: [{ anchor, level, title, html }] }`. Section `html` contains: `<p>`, `<strong>`, `<em>`, `<sup class="cite" data-ref="N">[N]</sup>` citations, `<span class="math">$…$</span>`, tables in `<div class="tablewrap">`, `<blockquote>` case boxes. Some sections are heading-only (empty html). Level 2 = section heading, level 4 = sub-block.
- `@/content/exhibits` `exhibits`: `taxonomy`, `scoreboard` (rows end with readiness 'H'|'M'|'L'), `matrix`, `quadrant`, `chains: ChainCard[]` (11: id, title, readiness, sentence, unlock, discover, build, impacts[], solved, horizon, defenseHtml), `chainSummary`, `gates`, `phases`, `skeptics`, `nineNumbers`. All `ExhibitTable = { headers: string[]; rows: string[][] }`. Cells may contain raw TeX (`\lambda`, `\times`, `$…$`) — pass through `mathifyText` (ExhibitTable does this automatically).
- `@/content/references` `references: Reference[]` — 475: `{ n, gbt (GB/T 7714 citation string), url, kind: 'journal'|'preprint'|'policy'|'web'|'news', year, citedIn: [{ chapter, anchor, label, count }] }`.
- `@/content/glossary` `glossaryData`: `{ groups: [{ group, terms: [{ term, definition }] }], conversionBox: { title, text } }`.
- `@/lib/readingState`: `getReadProgressMap()`, `getChapterProgress(id)`, `setReadingSession({ chapterId, anchor?, progress })`.
- `@/lib/search` `stripHtml(html)` for plain text.

## Required anchors (search.ts deep-links into these — MUST exist)
- `/scoreboard#row-N` (scoreboard rows), `/matrix#row-N`, `/chains#chain-N`, `/roadmap#gate-N`, `/skeptics#case-N`, `/references#ref-N`, `/glossary#<slug>` where slug = `term.toLowerCase().replace(/[^a-z0-9]+/g, '-')`.
- `/contents#part-N`, `/about#shortcuts` (footer links to these).
- Anchor elements need `scroll-mt-24` (56px topbar + margin).

## Accessibility & behavior
- Semantic headings (one h1 per page via PageHeader), `aria-label`s on nav, keyboard-focusable interactive elements (`focus-visible` styles exist globally).
- Lenis smooth scroll is active site-wide (`anchors: true`); rely on native hash anchors.
- `no-print` class hides elements when printing.
- Framer-motion: subtle only (fade/rise ≤200ms), respect existing MotionConfig reducedMotion.

## Reference style
Look at `src/components/ReportNavigator.tsx`, `Footer.tsx`, `components/home/Hero.tsx` for tone: micro-label eyebrows, quiet hairlines, serif ledes, rust accents used sparingly.
