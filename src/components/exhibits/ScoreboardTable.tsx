import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import type { ExhibitTable as ExhibitTableData } from '@/content/exhibits'
import { mathifyText } from '@/lib/mathHtml'
import { cn } from '@/lib/utils'

/** Readiness chip colors — ~15% alpha background, solid token text. */
const READY_CHIP: Record<string, string> = {
  H: 'bg-ready-h/15 text-ready-h',
  M: 'bg-ready-m/15 text-ready-m',
  L: 'bg-ready-l/15 text-ready-l',
}

/**
 * Custom renderer for the error-correction scoreboard (Table 3.2).
 * Like ExhibitTable, but the last column is a readiness code (H/M/L)
 * rendered as a chip, and row anchors are keyed to the first cell
 * (`row-N`) so search deep-links to /scoreboard#row-N.
 */
export default function ScoreboardTable({
  table,
  caption,
}: {
  table: ExhibitTableData
  caption?: string
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

  const cell = (s: string) => ({ __html: mathifyText(s) })
  const last = table.headers.length - 1

  return (
    <figure className="my-8">
      {caption && (
        <figcaption className="mb-3 max-w-measure font-sans text-[13px] leading-relaxed text-ink-soft">
          {caption}
        </figcaption>
      )}
      <div className="overflow-x-auto border-t border-b border-hairline">
        <table className="w-full border-collapse text-[14px] leading-[1.55]">
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
            {table.rows.map((row) => {
              const id = `row-${row[0]}`
              return (
                <tr
                  key={row[0]}
                  id={id}
                  className={cn(
                    'scroll-mt-24 transition-colors hover:bg-faint',
                    active === id && 'bg-faint',
                  )}
                >
                  {row.map((c, ci) =>
                    ci === last ? (
                      <td key={ci} className="border-b border-hairline px-3 py-2.5 align-top">
                        <span
                          className={cn(
                            'inline-flex h-6 w-6 items-center justify-center font-mono text-[12px] font-semibold',
                            READY_CHIP[c] ?? 'bg-faint text-ink-soft',
                          )}
                        >
                          {c}
                        </span>
                      </td>
                    ) : (
                      <td
                        key={ci}
                        className={cn(
                          'tabular border-b border-hairline px-3 py-2.5 align-top text-ink',
                          ci === 0 && 'font-mono text-[12.5px] text-ink-faint',
                        )}
                        dangerouslySetInnerHTML={cell(c)}
                      />
                    ),
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
