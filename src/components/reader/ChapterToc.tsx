import { cn } from '@/lib/utils'

export interface TocEntry {
  anchor: string
  label: string
}

/**
 * Per-chapter table of contents — a quiet hairline-ruled list of hash links.
 * The active anchor (from the reader's IntersectionObserver scroll-spy) is
 * drawn in rust; everything else stays ink-faint until hover.
 */
export default function ChapterToc({
  entries,
  active,
  onNavigate,
  className,
}: {
  entries: TocEntry[]
  active: string
  onNavigate?: () => void
  className?: string
}) {
  return (
    <ul className={cn('space-y-0.5', className)}>
      {entries.map((e) => (
        <li key={e.anchor}>
          <a
            href={`#${e.anchor}`}
            onClick={onNavigate}
            className={cn(
              'block border-l-2 py-1 pl-3 font-sans text-[12.5px] leading-snug transition-colors',
              active === e.anchor
                ? 'border-accent text-accent'
                : 'border-transparent text-ink-faint hover:border-hairline hover:text-ink',
            )}
          >
            {e.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
