import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import type { ExhibitTable as ExhibitTableData } from '@/content/exhibits'
import { mathifyText } from '@/lib/mathHtml'
import { cn } from '@/lib/utils'

/**
 * Shared renderer for the report's exhibit tables (exhibits.ts).
 * - hairline-rule book styling, mono/tabular numerals, hover wash
 * - optional per-row anchors (`idPrefix`-1 … n) so search results deep-link
 * - the hash-targeted row gets a brief accent wash
 */
export default function ExhibitTable({
  table,
  idPrefix,
  caption,
  math = true,
  className,
}: {
  table: ExhibitTableData
  idPrefix?: string
  caption?: string
  math?: boolean
  className?: string
}) {
  const { hash } = useLocation()
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    setActive(id)
    const el = document.getElementById(id)
    el?.scrollIntoView({ block: 'center' })
  }, [hash])

  const cell = (s: string) => ({ __html: math ? mathifyText(s) : s })

  return (
    <figure className={cn('my-8', className)}>
      {caption && (
        <figcaption className="mb-3 max-w-measure font-sans text-[13px] leading-relaxed text-ink-soft">
          {caption}
        </figcaption>
      )}
      <div className="overflow-x-auto border-t border-b border-hairline">
        <table className="w-full border-collapse text-[14.5px] leading-[1.55]">
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th
                  key={i}
                  className="micro-label border-b border-hairline px-3 py-2.5 text-left align-bottom text-ink-soft"
                  dangerouslySetInnerHTML={cell(h)}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => {
              const id = idPrefix ? `${idPrefix}-${ri + 1}` : undefined
              return (
                <tr
                  key={ri}
                  id={id}
                  className={cn(
                    'scroll-mt-24 transition-colors hover:bg-faint',
                    active === id && 'bg-faint',
                  )}
                >
                  {row.map((c, ci) => (
                    <td
                      key={ci}
                      className="tabular border-b border-hairline px-3 py-2.5 align-top text-ink"
                      dangerouslySetInnerHTML={cell(c)}
                    />
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
