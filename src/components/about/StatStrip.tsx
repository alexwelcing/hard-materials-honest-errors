import { REPORT_DATE, REPORT_STATS } from '@/lib/report'

const STATS: [string, string][] = [
  [String(REPORT_STATS.chapters), 'Chapters'],
  [REPORT_STATS.words, 'Words'],
  [String(REPORT_STATS.references), 'References'],
  [String(REPORT_STATS.charts), 'Charts'],
  [REPORT_DATE, 'Research date'],
]

/** "By the numbers" — mono tabular values with hairline separators. */
export default function StatStrip() {
  return (
    <dl className="grid grid-cols-1 divide-y divide-hairline border border-hairline sm:grid-cols-5 sm:divide-x sm:divide-y-0">
      {STATS.map(([value, label]) => (
        <div key={label} className="px-5 py-4">
          <dt className="micro-label text-ink-faint">{label}</dt>
          <dd className="tabular mt-1.5 font-mono text-[20px] leading-none text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  )
}
