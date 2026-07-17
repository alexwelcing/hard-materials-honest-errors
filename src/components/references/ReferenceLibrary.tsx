import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { ExternalLink } from 'lucide-react'
import { chapters } from '@/content/chapters'
import { references, type Reference } from '@/content/references'
import { cn } from '@/lib/utils'

const KINDS = ['journal', 'preprint', 'policy', 'web', 'news'] as const
type Kind = (typeof KINDS)[number]

const PAGE_SIZE = 100
const CITED_PREVIEW = 4

/** Chapter number → route id (ch01…ch23). */
const chapterIdByNumber = new Map(chapters.map((c) => [c.number, c.id]))

function CitedInLinks({ citedIn }: { citedIn: Reference['citedIn'] }) {
  const [expanded, setExpanded] = useState(false)
  const shown = expanded ? citedIn : citedIn.slice(0, CITED_PREVIEW)
  const hidden = citedIn.length - CITED_PREVIEW

  return (
    <div className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span className="micro-label text-ink-faint">Cited in</span>
      {shown.map((c, i) => {
        const chapterId = chapterIdByNumber.get(c.chapter)
        if (!chapterId) return null
        return (
          <Link
            key={`${c.chapter}-${c.anchor}-${i}`}
            to={`/read/${chapterId}#${c.anchor}`}
            className="font-sans text-[12.5px] text-ink-soft underline decoration-hairline underline-offset-2 hover:text-accent"
          >
            Ch. {c.chapter}
            {c.label ? ` §${c.label}` : ''}
          </Link>
        )
      })}
      {!expanded && hidden > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="font-sans text-[12.5px] text-accent hover:text-accent-deep"
        >
          +{hidden} more
        </button>
      )}
    </div>
  )
}

function ReferenceRow({ reference, highlighted }: { reference: Reference; highlighted: boolean }) {
  return (
    <li
      id={`ref-${reference.n}`}
      className={cn(
        'scroll-mt-24 border-b border-hairline py-4 transition-colors duration-700',
        highlighted && 'bg-faint',
      )}
    >
      <div className="flex gap-4">
        <span className="w-12 shrink-0 pt-px font-mono text-[13px] tabular text-accent">
          [{reference.n}]
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <p className="font-serif text-[15px] leading-[1.65] text-ink">{reference.gbt}</p>
            <div className="flex shrink-0 items-center gap-3 pt-0.5">
              <span className="micro-label border border-hairline px-2 py-0.5 text-ink-faint">
                {reference.kind}
              </span>
              <span className="font-mono text-[12px] tabular text-ink-faint">{reference.year}</span>
              {reference.url && (
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open source for reference ${reference.n}`}
                  className="text-ink-faint transition-colors hover:text-accent"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>
          {reference.citedIn.length > 0 && <CitedInLinks citedIn={reference.citedIn} />}
        </div>
      </div>
    </li>
  )
}

export default function ReferenceLibrary() {
  const [query, setQuery] = useState('')
  const [kind, setKind] = useState<Kind | 'all'>('all')
  const [showAll, setShowAll] = useState(false)
  const [highlight, setHighlight] = useState<number | null>(null)
  const location = useLocation()
  const handledHashRef = useRef<string>('')

  const counts = useMemo(() => {
    const map = new Map<string, number>()
    for (const r of references) map.set(r.kind, (map.get(r.kind) ?? 0) + 1)
    return map
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return references.filter(
      (r) =>
        (kind === 'all' || r.kind === kind) &&
        (q === '' || r.gbt.toLowerCase().includes(q)),
    )
  }, [query, kind])

  // Collapse back to the first page whenever the filter changes.
  useEffect(() => {
    setShowAll(false)
  }, [query, kind])

  // Deep-link support: #ref-N must be rendered, scrolled to, and briefly highlighted.
  useEffect(() => {
    const m = location.hash.match(/^#ref-(\d+)$/)
    if (!m || handledHashRef.current === location.hash) return
    const n = Number(m[1])
    const idx = filtered.findIndex((r) => r.n === n)
    if (idx === -1) return
    handledHashRef.current = location.hash
    if (idx >= PAGE_SIZE) setShowAll(true)
    const t = window.setTimeout(() => {
      const el = document.getElementById(`ref-${n}`)
      if (!el) return
      el.scrollIntoView({ block: 'start' })
      setHighlight(n)
      window.setTimeout(() => setHighlight((h) => (h === n ? null : h)), 2000)
    }, 80)
    return () => window.clearTimeout(t)
  }, [location.hash, filtered])

  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE)

  return (
    <div>
      <div className="no-print border-b border-hairline pb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter citations…"
          aria-label="Filter references by citation text"
          className="h-11 w-full max-w-md border border-hairline bg-transparent px-3 font-sans text-[14px] text-ink outline-none placeholder:text-ink-faint focus-visible:border-accent"
        />
        <div className="mt-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by source kind">
          <button
            type="button"
            aria-pressed={kind === 'all'}
            onClick={() => setKind('all')}
            className={cn(
              'micro-label border px-2.5 py-1 transition-colors',
              kind === 'all'
                ? 'border-accent text-accent'
                : 'border-hairline text-ink-faint hover:text-ink',
            )}
          >
            All · {references.length}
          </button>
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(kind === k ? 'all' : k)}
              className={cn(
                'micro-label border px-2.5 py-1 transition-colors',
                kind === k
                  ? 'border-accent text-accent'
                  : 'border-hairline text-ink-faint hover:text-ink',
              )}
            >
              {k} · {counts.get(k) ?? 0}
            </button>
          ))}
          <span className="ml-auto font-mono text-[12px] tabular text-ink-faint">
            {filtered.length} of {references.length}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 font-serif text-[15px] text-ink-soft">
          No references match this filter.
        </p>
      ) : (
        <ol className="border-t border-hairline">
          {visible.map((r) => (
            <ReferenceRow key={r.n} reference={r} highlighted={highlight === r.n} />
          ))}
        </ol>
      )}

      {!showAll && filtered.length > PAGE_SIZE && (
        <div className="no-print mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="micro-label border border-hairline px-4 py-2 text-ink-soft transition-colors hover:border-accent hover:text-accent"
          >
            Show all {filtered.length}
          </button>
        </div>
      )}
    </div>
  )
}
