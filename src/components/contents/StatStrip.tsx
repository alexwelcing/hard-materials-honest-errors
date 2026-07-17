import { PARTS, REPORT_STATS } from '@/lib/report'

/** Four quiet numbers describing the whole report, hairline-separated. */
export default function StatStrip() {
  const allChapters = PARTS.flatMap((p) => p.chapters)
  const totalWords = allChapters.reduce((s, ch) => s + ch.wordCount, 0)
  const totalMinutes = allChapters.reduce((s, ch) => s + ch.readingTime, 0)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const stats: { label: string; value: string }[] = [
    { label: 'CHAPTERS', value: String(REPORT_STATS.chapters) },
    { label: 'WORDS', value: `≈${Math.round(totalWords / 1000)}k` },
    { label: 'READING TIME', value: `${hours}h ${String(minutes).padStart(2, '0')}m` },
    { label: 'REFERENCES', value: String(REPORT_STATS.references) },
  ]

  return (
    <dl className="grid grid-cols-2 divide-x divide-hairline border-y border-hairline md:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="px-5 py-4">
          <dt className="micro-label text-ink-faint">{s.label}</dt>
          <dd className="mt-2 font-mono text-[22px] tabular leading-none text-ink">{s.value}</dd>
        </div>
      ))}
    </dl>
  )
}
