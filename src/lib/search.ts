import MiniSearch from 'minisearch'
import { chapters } from '@/content/chapters'
import { glossaryData } from '@/content/glossary'
import { exhibits } from '@/content/exhibits'
import { loadAllChapterBodies, type SectionHtml } from '@/content/chapterBodies'
import { preloadReferences } from '@/lib/data'
import type { Reference } from '@/content/references'

export type SearchDocType = 'chapter' | 'reference' | 'glossary' | 'exhibit'

export interface SearchDoc {
  id: string
  type: SearchDocType
  title: string
  body: string
  /** Eyebrow tag, e.g. `CH 07 · §7.2.3` or `REF 019`. */
  eyebrow: string
  route: string
}

export const SEARCH_TYPE_LABELS: Record<SearchDocType, string> = {
  chapter: 'Chapters',
  reference: 'References',
  glossary: 'Glossary',
  exhibit: 'Exhibits',
}

const pad2 = (n: number) => String(n).padStart(2, '0')
const pad3 = (n: number) => String(n).padStart(3, '0')

/** Rendered chapter HTML → plain searchable text (tags, citation marks and LaTeX $…$ delimiters removed). */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[\d+\]/g, ' ')
    .replace(/\$\$/g, ' ')
    .replace(/\$/g, '')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const truncate = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s)

function buildDocs(bodies: Map<string, SectionHtml[]>, references: Reference[]): SearchDoc[] {
  const docs: SearchDoc[] = []

  for (const ch of chapters) {
    const htmlByAnchor = new Map((bodies.get(ch.id) ?? []).map((s) => [s.anchor, s.html]))
    for (const sec of ch.sections) {
      const secTitle = sec.title || ch.title
      docs.push({
        id: `chapter:${ch.id}:${sec.anchor}`,
        type: 'chapter',
        title: secTitle,
        body: `${ch.title} — ${stripHtml(htmlByAnchor.get(sec.anchor) ?? '')}`,
        eyebrow: `CH ${pad2(ch.number)} · §${secTitle.slice(0, 24)}`,
        route: `/read/${ch.id}#${sec.anchor}`,
      })
    }
  }

  for (const ref of references) {
    docs.push({
      id: `reference:${ref.n}`,
      type: 'reference',
      title: `[${ref.n}] ${truncate(ref.gbt, 96)}`,
      body: `${ref.gbt} ${ref.year} ${ref.kind}`,
      eyebrow: `REF ${pad3(ref.n)} · ${ref.kind.toUpperCase()}`,
      route: `/references#ref-${ref.n}`,
    })
  }

  for (const group of glossaryData.groups) {
    for (const term of group.terms) {
      docs.push({
        id: `glossary:${term.term}`,
        type: 'glossary',
        title: term.term,
        body: `${term.definition} (${group.group})`,
        eyebrow: `GLOSSARY · ${group.group.toUpperCase().slice(0, 28)}`,
        route: `/glossary#${encodeURIComponent(term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}`,
      })
    }
  }

  exhibits.scoreboard.rows.forEach((row) => {
    docs.push({
      id: `exhibit:scoreboard:${row[0]}`,
      type: 'exhibit',
      title: `Scoreboard — ${row[1]}`,
      body: stripHtml(row.slice(1).join(' ')),
      eyebrow: 'TABLE 3.2 · SCOREBOARD',
      route: `/scoreboard#row-${row[0]}`,
    })
  })
  for (const chain of exhibits.chains) {
    docs.push({
      id: `exhibit:chain:${chain.id}`,
      type: 'exhibit',
      title: `Chain ${chain.id} — ${chain.title}`,
      body: stripHtml(`${chain.sentence} ${chain.solved} ${chain.horizon}`),
      eyebrow: `CH 15 · CHAIN ${chain.id}`,
      route: `/chains#chain-${chain.id}`,
    })
  }
  exhibits.gates.rows.forEach((row, i) => {
    docs.push({
      id: `exhibit:gate:${i}`,
      type: 'exhibit',
      title: `Time gate — ${row[1] ?? row[0]}`,
      body: stripHtml(row.join(' ')),
      eyebrow: 'CH 18 · TIME-GATE',
      route: `/roadmap#gate-${i + 1}`,
    })
  })
  exhibits.skeptics.rows.forEach((row, i) => {
    docs.push({
      id: `exhibit:skeptic:${i}`,
      type: 'exhibit',
      title: `Skeptic register — ${truncate(row[0], 64)}`,
      body: stripHtml(row.join(' ')),
      eyebrow: 'TABLE 20.1 · SKEPTICS',
      route: `/skeptics#case-${i + 1}`,
    })
  })
  exhibits.matrix.rows.forEach((row, i) => {
    docs.push({
      id: `exhibit:matrix:${i}`,
      type: 'exhibit',
      title: `Matrix — ${row[0]}`,
      body: stripHtml(row.join(' ')),
      eyebrow: 'TABLE 13.1 · MATRIX',
      route: `/matrix#row-${i + 1}`,
    })
  })

  return docs
}

let cached: { mini: MiniSearch<SearchDoc>; docs: SearchDoc[] } | null = null
let building: Promise<{ mini: MiniSearch<SearchDoc>; docs: SearchDoc[] }> | null = null

/**
 * The index (~855 docs) is built lazily on first search, pulling chapter
 * bodies and references in as their own chunks — neither ships in the
 * initial bundle. searchReport returns [] until this resolves.
 */
export function ensureSearchIndex() {
  if (cached) return Promise.resolve(cached)
  if (!building) {
    building = Promise.all([loadAllChapterBodies(), preloadReferences()]).then(
      ([bodies, references]) => {
        const docs = buildDocs(bodies, references)
        const mini = new MiniSearch<SearchDoc>({
          fields: ['title', 'body', 'eyebrow'],
          storeFields: ['type', 'title', 'eyebrow', 'route', 'body'],
          searchOptions: { prefix: true, fuzzy: 0.15, boost: { title: 3 } },
        })
        mini.addAll(docs)
        cached = { mini, docs }
        return cached
      },
    )
  }
  return building
}

export const searchIndexReady = () => cached !== null

export interface SearchHit {
  id: string
  type: SearchDocType
  title: string
  eyebrow: string
  route: string
  score: number
  terms: string[]
  body: string
}

export function searchReport(query: string, filter: SearchDocType | 'all' = 'all'): SearchHit[] {
  if (!cached) return []
  const { mini } = cached
  const q = query.trim()
  if (!q) return []
  const results = mini.search(q, {
    prefix: true,
    fuzzy: 0.15,
    boost: { title: 3 },
    filter: (r) => filter === 'all' || r.type === filter,
  })
  return results.slice(0, 40).map((r) => ({
    id: String(r.id),
    type: r.type as SearchDocType,
    title: String(r.title ?? ''),
    eyebrow: String(r.eyebrow ?? ''),
    route: String(r.route ?? '/'),
    score: r.score,
    terms: r.terms,
    body: String(r.body ?? ''),
  }))
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** ~140-char context snippet centered on the first match, matched terms wrapped in <mark>. */
export function makeSnippet(hit: SearchHit, length = 140): string {
  const body = hit.body
  const terms = hit.terms.filter((t) => t.length > 1)
  let first = -1
  for (const t of terms) {
    const i = body.toLowerCase().indexOf(t.toLowerCase())
    if (i !== -1 && (first === -1 || i < first)) first = i
  }
  let start = 0
  if (first > length / 2) start = first - Math.floor(length / 2)
  let snippet = body.slice(start, start + length)
  if (start > 0) snippet = '…' + snippet
  if (start + length < body.length) snippet += '…'
  let html = escapeHtml(snippet)
  for (const t of terms) {
    try {
      html = html.replace(new RegExp(`(${escapeRe(escapeHtml(t))}\\w*)`, 'gi'), '<mark>$1</mark>')
    } catch {
      /* malformed term — skip highlighting */
    }
  }
  return html
}

/* ---- Recent searches (localStorage) ---- */
const RECENT_KEY = 'hmhe:recent-searches'

export function getRecentSearches(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY)
    const arr = raw ? (JSON.parse(raw) as unknown) : []
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === 'string').slice(0, 6) : []
  } catch {
    return []
  }
}

export function addRecentSearch(q: string) {
  const query = q.trim()
  if (!query) return
  try {
    const next = [query, ...getRecentSearches().filter((x) => x !== query)].slice(0, 6)
    localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  } catch {
    /* non-persistent — fine */
  }
}
