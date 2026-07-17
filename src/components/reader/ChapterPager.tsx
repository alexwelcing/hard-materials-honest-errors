import { Link } from 'react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Chapter } from '@/content/chapters'
import { chapterTitle } from '@/lib/report'

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Previous / next chapter links along the chapters array order; hidden at the ends. */
export default function ChapterPager({ prev, next }: { prev?: Chapter; next?: Chapter }) {
  return (
    <nav
      aria-label="Chapter pagination"
      className="no-print mt-16 flex items-start justify-between gap-6 border-t border-hairline pt-8"
    >
      {prev ? (
        <Link to={`/read/${prev.id}`} className="group max-w-[45%]">
          <span className="micro-label flex items-center gap-1.5 text-ink-faint transition-colors group-hover:text-accent">
            <ArrowLeft size={12} /> PREVIOUS
          </span>
          <span className="mt-2 block font-display text-[18px] leading-snug text-ink transition-colors group-hover:text-accent-deep">
            {pad2(prev.number)} · {chapterTitle(prev)}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link to={`/read/${next.id}`} className="group ml-auto max-w-[45%] text-right">
          <span className="micro-label flex items-center justify-end gap-1.5 text-ink-faint transition-colors group-hover:text-accent">
            NEXT <ArrowRight size={12} />
          </span>
          <span className="mt-2 block font-display text-[18px] leading-snug text-ink transition-colors group-hover:text-accent-deep">
            {pad2(next.number)} · {chapterTitle(next)}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
