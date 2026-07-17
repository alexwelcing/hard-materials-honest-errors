import type { ExhibitTable } from '@/content/exhibits'
import { mathifyText } from '@/lib/mathHtml'

/**
 * Time gates as a vertical timeline: hairline rule on the left, each gate a node
 * (id gate-N so search deep-links land here) — date, event, consequence.
 */
export default function GateTimeline({ gates }: { gates: ExhibitTable }) {
  return (
    <ol className="relative mt-10 ml-3 space-y-10 border-l border-hairline pl-8">
      {gates.rows.map((row, i) => (
        <li key={i} id={`gate-${i + 1}`} className="relative scroll-mt-24">
          <span
            aria-hidden
            className="absolute top-[6px] -left-[37px] h-[9px] w-[9px] rotate-45 border border-accent bg-paper"
          />
          <p
            className="tabular font-mono text-[13px] font-semibold text-accent"
            dangerouslySetInnerHTML={{ __html: mathifyText(row[0]) }}
          />
          <p
            className="mt-1.5 max-w-measure font-sans text-[15px] leading-relaxed font-medium text-ink"
            dangerouslySetInnerHTML={{ __html: mathifyText(row[1]) }}
          />
          <p
            className="mt-1.5 max-w-measure font-serif text-[15.5px] leading-[1.7] text-ink-soft"
            dangerouslySetInnerHTML={{ __html: mathifyText(row[2]) }}
          />
        </li>
      ))}
    </ol>
  )
}
