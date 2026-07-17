import { mathifyText } from '@/lib/mathHtml'

/**
 * One Skeptic Register case card (Table 20.1 row).
 * Columns: Claim (as made) / Venue · year / Counter-evidence /
 * Resolution status / Lesson for this venture.
 * `id="case-N"` + scroll-mt-24: search deep-links land here.
 */
export default function SkepticCase({ index, row }: { index: number; row: string[] }) {
  const [claim, venue, counter, resolution, lesson] = row
  const num = String(index + 1).padStart(2, '0')

  return (
    <article id={`case-${index + 1}`} className="scroll-mt-24 border border-hairline">
      <header className="border-b border-hairline px-5 py-4">
        <p className="micro-label text-ink-faint">
          CASE {num} · {venue}
        </p>
        <h2
          className="mt-2 max-w-measure font-serif text-[17px] font-medium leading-[1.6] text-ink"
          dangerouslySetInnerHTML={{ __html: mathifyText(claim) }}
        />
      </header>

      <div className="grid md:grid-cols-2">
        <div className="border-b border-hairline px-5 py-4 md:border-b-0 md:border-r">
          <p className="micro-label text-ink-faint">Counter-evidence</p>
          <p
            className="mt-2 font-serif text-[15px] leading-[1.7] text-ink-soft"
            dangerouslySetInnerHTML={{ __html: mathifyText(counter) }}
          />
        </div>
        <div className="px-5 py-4">
          <p className="micro-label text-ink-faint">Resolution status as of 2026-07-17</p>
          <p
            className="mt-2 font-serif text-[15px] leading-[1.7] text-ink-soft"
            dangerouslySetInnerHTML={{ __html: mathifyText(resolution) }}
          />
        </div>
      </div>

      <footer className="border-t border-hairline px-5 py-4">
        <div className="border-l-[3px] border-verdigris bg-faint px-4 py-3">
          <p className="micro-label text-verdigris">Lesson for this venture</p>
          <p
            className="mt-1.5 font-serif text-[15px] italic leading-[1.65] text-ink"
            dangerouslySetInnerHTML={{ __html: mathifyText(lesson) }}
          />
        </div>
      </footer>
    </article>
  )
}
