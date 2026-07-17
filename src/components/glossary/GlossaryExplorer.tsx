import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'
import { glossaryData } from '@/content/glossary'
import { mathifyText } from '@/lib/mathHtml'

/** Slug scheme shared with search deep-links: /glossary#<slug>. */
export const glossarySlug = (term: string) =>
  term.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function GlossaryExplorer() {
  const [query, setQuery] = useState('')
  const location = useLocation()

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q === '') return glossaryData.groups
    return glossaryData.groups
      .map((g) => ({
        ...g,
        terms: g.terms.filter((t) =>
          `${t.term} ${t.definition}`.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.terms.length > 0)
  }, [query])

  const termCount = useMemo(() => groups.reduce((n, g) => n + g.terms.length, 0), [groups])

  // Search deep-links target /glossary#<slug>; make sure the row is in view on arrival.
  useEffect(() => {
    if (!location.hash) return
    const t = window.setTimeout(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ block: 'start' })
    }, 60)
    return () => window.clearTimeout(t)
  }, [location.hash])

  const conversionHtml = useMemo(() => {
    if (!glossaryData.conversionBox) return ''
    return glossaryData.conversionBox.text
      .split('\n')
      .map((line) => line.replace(/^>\s*/, '').trim())
      .filter((line) => line !== '')
      .map((line) => `<p>${mathifyText(line)}</p>`)
      .join('')
  }, [])

  return (
    <div>
      <div className="no-print border-b border-hairline pb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter terms and definitions…"
          aria-label="Filter glossary terms"
          className="h-11 w-full max-w-md border border-hairline bg-transparent px-3 font-sans text-[14px] text-ink outline-none placeholder:text-ink-faint focus-visible:border-accent"
        />
        <p className="mt-3 font-mono text-[12px] tabular text-ink-faint">
          {termCount} terms · {groups.length} groups
        </p>
      </div>

      {groups.length === 0 && (
        <p className="py-12 font-serif text-[15px] text-ink-soft">
          No glossary terms match this filter.
        </p>
      )}

      {groups.map((g) => (
        <section key={g.group} className="mt-12 first:mt-10">
          <h2 className="font-display text-[24px] leading-tight tracking-[-0.01em] text-ink">
            {g.group}
          </h2>
          <dl className="mt-4 border-t border-hairline">
            {g.terms.map((t) => (
              <div
                key={t.term}
                id={glossarySlug(t.term)}
                className="grid scroll-mt-24 gap-1 border-b border-hairline py-3.5 md:grid-cols-[240px_minmax(0,1fr)] md:gap-8"
              >
                <dt className="font-sans text-[14px] font-semibold text-ink">{t.term}</dt>
                <dd className="font-serif text-[15px] leading-[1.65] text-ink-soft">
                  {t.definition}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      {glossaryData.conversionBox && (
        <blockquote className="mt-14 border-l-[3px] border-verdigris bg-faint px-5 py-4">
          <p className="micro-label text-verdigris">{glossaryData.conversionBox.title}</p>
          <div
            className="mt-3 space-y-3 font-serif text-[15px] leading-[1.7] text-ink-soft"
            dangerouslySetInnerHTML={{ __html: conversionHtml }}
          />
        </blockquote>
      )}
    </div>
  )
}
