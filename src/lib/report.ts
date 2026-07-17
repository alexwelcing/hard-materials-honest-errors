import { chapters, type Chapter } from '@/content/chapters'

/** The report's six parts, in order (derived from chapters.ts). */
export const PARTS: { n: number; name: string; chapters: Chapter[] }[] = (() => {
  const map = new Map<number, { n: number; name: string; chapters: Chapter[] }>()
  for (const ch of chapters) {
    if (!map.has(ch.part)) map.set(ch.part, { n: ch.part, name: ch.partName, chapters: [] })
    map.get(ch.part)!.chapters.push(ch)
  }
  return [...map.values()].sort((a, b) => a.n - b.n)
})()

export const getChapter = (id: string) => chapters.find((c) => c.id === id)

/** Full display title: strips the leading "N. " and names ch01 after its role. */
export function chapterTitle(ch: Chapter): string {
  if (ch.id === 'ch01') return 'Executive Summary'
  return ch.title.replace(/^\d+\.\s*/, '')
}

/** Uppercase short label for breadcrumbs / eyebrows (e.g. `BATTERIES`). */
export const CHAPTER_SHORT: Record<string, string> = {
  ch01: 'EXECUTIVE SUMMARY',
  ch02: 'INTRODUCTION',
  ch03: 'METHODS',
  ch04: 'SUPERCONDUCTORS',
  ch05: 'CORRELATED OXIDES',
  ch06: 'HIGH-ENTROPY ALLOYS',
  ch07: 'BATTERIES',
  ch08: 'CATALYSTS',
  ch09: 'MAGNETS',
  ch10: 'FUSION & NUCLEAR',
  ch11: 'POROUS FRAMEWORKS & 2D',
  ch12: 'WBG SEMICONDUCTORS',
  ch13: 'MASTER MATRIX',
  ch14: 'STABILITY',
  ch15: 'DISCOVERY CHAINS',
  ch16: 'CHINA · 15FYP',
  ch17: 'US ALIGNMENT',
  ch18: 'ROADMAP',
  ch19: 'PARTNERSHIP',
  ch20: 'SKEPTIC REGISTER',
  ch21: 'RISK',
  ch22: 'CONCLUSION',
  ch23: 'GLOSSARY',
}

export const chapterShort = (id: string) => CHAPTER_SHORT[id] ?? id.toUpperCase()

/** Exhibit explorer pages, pinned at the top of the Report Navigator. */
export const EXHIBIT_LINKS: { route: string; label: string }[] = [
  { route: '/scoreboard', label: 'Error-Correction Scoreboard' },
  { route: '/matrix', label: 'Master Matrix' },
  { route: '/chains', label: 'Discovery Chains' },
  { route: '/roadmap', label: 'Phased Roadmap' },
  { route: '/skeptics', label: 'Skeptic Register' },
  { route: '/references', label: 'Reference Library' },
  { route: '/glossary', label: 'Glossary' },
]

export const REPORT_DATE = '2026-07-17'
export const REPORT_STATS = {
  chapters: 23,
  words: '≈49,000',
  references: 475,
  charts: 3,
}
