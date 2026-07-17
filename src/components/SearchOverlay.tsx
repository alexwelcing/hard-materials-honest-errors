import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, CornerDownLeft } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import {
  searchReport,
  makeSnippet,
  ensureSearchIndex,
  getRecentSearches,
  addRecentSearch,
  SEARCH_TYPE_LABELS,
  type SearchDocType,
  type SearchHit,
} from '@/lib/search'

const FILTERS: { key: SearchDocType | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'chapter', label: 'Chapters' },
  { key: 'reference', label: 'References' },
  { key: 'glossary', label: 'Glossary' },
  { key: 'exhibit', label: 'Exhibits' },
]

const GROUP_ORDER: SearchDocType[] = ['chapter', 'reference', 'glossary', 'exhibit']

/** Open the palette from anywhere: window.dispatchEvent(new Event('hmhe:search-open')). */
export const SEARCH_OPEN_EVENT = 'hmhe:search-open'

export default function SearchOverlay({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<SearchDocType | 'all'>('all')
  const [active, setActive] = useState(0)
  const [recents, setRecents] = useState<string[]>([])
  const [indexSize, setIndexSize] = useState<number | null>(null)

  /* Build the search index on first open (async — content loads as chunks). */
  useEffect(() => {
    if (open && indexSize === null) {
      ensureSearchIndex().then(({ docs }) => setIndexSize(docs.length))
    }
  }, [open, indexSize])

  /* Global hotkeys: ⌘K / Ctrl+K toggles, `/` opens. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
        return
      }
      if (e.key === '/' && !open) {
        const el = document.activeElement as HTMLElement | null
        if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return
        e.preventDefault()
        onOpenChange(true)
      }
    }
    const onEvent = () => onOpenChange(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener(SEARCH_OPEN_EVENT, onEvent)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener(SEARCH_OPEN_EVENT, onEvent)
    }
  }, [open, onOpenChange])

  useEffect(() => {
    if (open) {
      setRecents(getRecentSearches())
      setActive(0)
      requestAnimationFrame(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      })
    }
  }, [open])

  const hits = useMemo(() => searchReport(query, filter), [query, filter, indexSize])

  const grouped = useMemo(() => {
    const groups: { type: SearchDocType; items: { hit: SearchHit; flat: number }[] }[] = []
    let flat = 0
    for (const type of GROUP_ORDER) {
      const items = hits
        .filter((h) => h.type === type)
        .slice(0, 12)
        .map((hit) => ({ hit, flat: flat++ }))
      if (items.length) groups.push({ type, items })
    }
    return groups
  }, [hits])

  const flatHits = useMemo(() => grouped.flatMap((g) => g.items.map((i) => i.hit)), [grouped])

  useEffect(() => setActive(0), [query, filter])

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-flat="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const openHit = useCallback(
    (hit: SearchHit) => {
      addRecentSearch(query)
      onOpenChange(false)
      navigate(hit.route)
    },
    [navigate, onOpenChange, query],
  )

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, flatHits.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const hit = flatHits[active]
      if (hit) openHit(hit)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="no-print top-[16%] max-w-[640px] translate-y-0 gap-0 overflow-hidden border-hairline bg-surface p-0 shadow-xl sm:rounded-md"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Search the report</DialogTitle>
        <div className="flex items-center gap-3 border-b border-hairline px-4">
          <Search className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            placeholder="Search chapters, references, glossary, exhibits…"
            aria-label="Search the report"
            className="h-12 flex-1 bg-transparent font-mono text-[15px] text-ink outline-none placeholder:text-ink-faint"
          />
          <kbd>esc</kbd>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 border-b border-hairline px-4 py-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              aria-pressed={filter === f.key}
              className={cn(
                'micro-label rounded-sm border px-2 py-1 transition-colors',
                filter === f.key
                  ? 'border-verdigris bg-verdigris/10 text-verdigris'
                  : 'border-hairline text-ink-soft hover:bg-faint',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div ref={listRef} className="max-h-[46vh] overflow-y-auto" data-lenis-prevent>
          {query.trim() === '' && recents.length > 0 && (
            <div className="px-4 py-3">
              <p className="micro-label text-ink-faint">RECENT SEARCHES</p>
              <ul className="mt-2">
                {recents.map((r) => (
                  <li key={r}>
                    <button
                      type="button"
                      onClick={() => setQuery(r)}
                      className="block w-full rounded-sm px-2 py-1.5 text-left font-mono text-[13px] text-ink-soft hover:bg-faint hover:text-ink"
                    >
                      {r}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {query.trim() !== '' && flatHits.length === 0 && (
            <p className="px-4 py-8 text-center font-serif text-[15px] italic text-ink-soft">
              Nothing in the report matches “{query}”.
            </p>
          )}

          {grouped.map((g) => (
            <div key={g.type} className="px-2 py-2">
              <p className="micro-label px-2 py-1 text-verdigris">{SEARCH_TYPE_LABELS[g.type].toUpperCase()}</p>
              <ul>
                {g.items.map(({ hit, flat }) => (
                  <li key={hit.id}>
                    <button
                      type="button"
                      data-flat={flat}
                      onClick={() => openHit(hit)}
                      onMouseMove={() => setActive(flat)}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-sm px-2 py-2 text-left',
                        flat === active ? 'bg-faint' : '',
                      )}
                    >
                      <span className="min-w-0 flex-1">
                        <span className="micro-label block text-[10px] text-ink-faint">{hit.eyebrow}</span>
                        <span className="mt-0.5 block truncate font-display text-[16px] leading-snug text-ink">
                          {hit.title}
                        </span>
                        <span
                          className="mt-0.5 line-clamp-2 block font-serif text-[13px] leading-snug text-ink-soft [&_mark]:rounded-sm [&_mark]:bg-accent/20 [&_mark]:px-0.5 [&_mark]:text-inherit"
                          dangerouslySetInnerHTML={{ __html: makeSnippet(hit) }}
                        />
                      </span>
                      {flat === active && (
                        <CornerDownLeft className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-faint" aria-hidden />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-hairline px-4 py-2">
          <span className="font-mono text-[11px] text-ink-faint">
            {indexSize === null ? 'Indexing…' : `${indexSize} documents indexed`}
          </span>
          <span className="font-mono text-[11px] text-ink-faint">↑↓ navigate · ↵ open · esc close</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
