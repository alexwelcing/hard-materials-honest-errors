import { cn } from '@/lib/utils'

/**
 * The error-bar motif — a horizontal whisker rule with end ticks and a rust
 * center square (`—[■]—`). Used as logo, divider and ornament across the site.
 */
export default function ErrorBarGlyph({
  className,
  width = 64,
  title,
}: {
  className?: string
  width?: number
  title?: string
}) {
  const height = Math.round(width * 0.375)
  return (
    <svg
      viewBox="0 0 64 24"
      width={width}
      height={height}
      fill="none"
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn('text-ink', className)}
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        <line x1="4" y1="12" x2="60" y2="12" />
        <line x1="4" y1="6" x2="4" y2="18" />
        <line x1="60" y1="6" x2="60" y2="18" />
      </g>
      <rect x="28.5" y="8.5" width="7" height="7" fill="rgb(var(--accent))" />
    </svg>
  )
}
