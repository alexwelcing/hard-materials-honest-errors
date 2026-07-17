import { Fragment } from 'react'
import type { ExhibitTable as ExhibitTableData } from '@/content/exhibits'
import { mathifyText } from '@/lib/mathHtml'

/**
 * The wedge quadrant (exhibits.quadrant): a 2×2 strategic grid.
 * Rendered as a CSS grid, not a table — stacked micro-label row bands
 * on the left, column headers on top, four bordered serif panels.
 */
export default function WedgeQuadrant({ grid }: { grid: ExhibitTableData }) {
  const colHeaders = grid.headers.slice(1)
  const cell = (s: string) => ({ __html: mathifyText(s) })

  return (
    <div className="my-8 grid grid-cols-[9rem_1fr_1fr] border-t border-l border-hairline sm:grid-cols-[11rem_1fr_1fr]">
      {/* top-left corner: empty (band header column) */}
      <div className="border-r border-b border-hairline" />
      {colHeaders.map((h, i) => (
        <div
          key={i}
          className="micro-label border-r border-b border-hairline px-4 py-3 text-ink-soft"
        >
          {h}
        </div>
      ))}
      {grid.rows.map((row, ri) => (
        <Fragment key={ri}>
          <div className="flex items-center border-r border-b border-hairline px-3 py-4">
            <span className="micro-label leading-[1.6] text-verdigris">{row[0]}</span>
          </div>
          {row.slice(1).map((c, ci) => (
            <div
              key={ci}
              className="border-r border-b border-hairline px-4 py-4 font-serif text-[15px] leading-[1.65] text-ink"
              dangerouslySetInnerHTML={cell(c)}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
