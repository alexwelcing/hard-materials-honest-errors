import type { Chapter } from '@/content/chapters'

/**
 * Right rail — quiet per-chapter metadata and a thin vertical progress bar
 * (rust fill = fraction of the chapter body scrolled past).
 */
export default function ChapterAside({ chapter, progress }: { chapter: Chapter; progress: number }) {
  const pct = Math.round(Math.min(1, Math.max(0, progress)) * 100)
  return (
    <div>
      <p className="micro-label text-verdigris">PART {chapter.part}</p>
      <p className="mt-1.5 font-sans text-[13px] leading-snug text-ink">{chapter.partName}</p>

      <div className="mt-5 border-t border-hairline pt-4">
        <p className="micro-label text-[10px] text-ink-faint">WORDS</p>
        <p className="mt-1 font-mono text-[12px] tabular text-ink-soft">
          {chapter.wordCount.toLocaleString('en-US')}
        </p>
        <p className="micro-label mt-3.5 text-[10px] text-ink-faint">READING TIME</p>
        <p className="mt-1 font-mono text-[12px] tabular text-ink-soft">{chapter.readingTime} min</p>
      </div>

      <div className="mt-5 border-t border-hairline pt-4">
        <p className="micro-label text-[10px] text-ink-faint">PROGRESS</p>
        <div className="mt-2.5 flex items-end gap-3">
          <div
            className="relative h-36 w-[2px] bg-hairline"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label="Reading progress"
          >
            <div className="absolute left-0 top-0 w-full bg-accent" style={{ height: `${pct}%` }} />
          </div>
          <span className="font-mono text-[11px] tabular text-ink-faint">{pct}%</span>
        </div>
      </div>
    </div>
  )
}
