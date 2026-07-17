import { Link, useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { PARTS, EXHIBIT_LINKS, chapterTitle } from '@/lib/report'
import { getChapterProgress } from '@/lib/readingState'

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Read-state dot: hollow → half → filled by per-chapter scroll progress. */
function ReadDot({ chapterId }: { chapterId: string }) {
  const p = getChapterProgress(chapterId)
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block h-[7px] w-[7px] shrink-0 rounded-full border',
        p >= 0.98
          ? 'border-accent bg-accent'
          : p > 0.02
            ? 'border-accent bg-[linear-gradient(90deg,rgb(var(--accent))_50%,transparent_50%)]'
            : 'border-ink-faint bg-transparent',
      )}
    />
  )
}

/**
 * Report Navigator content — the full 23-chapter tree grouped in 6 parts with
 * the exhibit explorers pinned on top. Rendered inside the Topbar drawer on
 * every page; reading pages may also render it as a persistent left rail.
 */
export default function ReportNavigator({ onNavigate }: { onNavigate?: () => void }) {
  const { pathname } = useLocation()
  return (
    <nav aria-label="Report navigator" className="flex h-full flex-col overflow-y-auto">
      <div className="px-5 pb-4 pt-5">
        <p className="micro-label text-verdigris">EXHIBITS</p>
        <ul className="mt-2.5 space-y-0.5">
          {EXHIBIT_LINKS.map((l) => (
            <li key={l.route}>
              <Link
                to={l.route}
                onClick={onNavigate}
                className={cn(
                  'block rounded-sm px-2 py-1.5 font-sans text-[13.5px] text-ink hover:bg-faint',
                  pathname === l.route && 'bg-faint text-accent',
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-5 border-t border-hairline" />
      <div className="flex-1 px-5 py-4">
        <p className="micro-label text-verdigris">THE REPORT · 23 CHAPTERS</p>
        {PARTS.map((part) => (
          <div key={part.n} className="mt-4">
            <p className="micro-label px-2 text-[10px] text-ink-faint">
              PART {part.n} · {part.name.toUpperCase()}
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {part.chapters.map((ch) => (
                <li key={ch.id}>
                  <Link
                    to={`/read/${ch.id}`}
                    onClick={onNavigate}
                    className={cn(
                      'group flex items-baseline gap-2 rounded-sm px-2 py-1.5 hover:bg-faint',
                      pathname === `/read/${ch.id}` && 'bg-faint',
                    )}
                  >
                    <ReadDot chapterId={ch.id} />
                    <span className="font-mono text-[11px] tabular text-ink-faint">{pad2(ch.number)}</span>
                    <span className="flex-1 font-sans text-[13.5px] leading-snug text-ink group-hover:text-accent-deep">
                      {chapterTitle(ch)}
                    </span>
                    <span className="font-mono text-[10px] tabular text-ink-faint">
                      {(ch.wordCount / 1000).toFixed(1)}k
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  )
}
