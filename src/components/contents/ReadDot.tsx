import { cn } from '@/lib/utils'
import { getChapterProgress } from '@/lib/readingState'

/** Read-state dot: hollow → half → filled by per-chapter scroll progress. */
export default function ReadDot({ chapterId }: { chapterId: string }) {
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
