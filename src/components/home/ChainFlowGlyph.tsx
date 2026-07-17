import { cn } from '@/lib/utils'

const NODES = ['UNLOCK', 'DISCOVER', 'BUILD', 'IMPACTS']

/**
 * ChainFlow glyph — four mono nodes joined by dashed connectors whose dashes
 * flow continuously (12s loop via .chain-dash-flow; still under reduced-motion).
 */
export default function ChainFlowGlyph({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-0', className)} aria-hidden>
      {NODES.map((n, i) => (
        <span key={n} className="flex items-center">
          {i > 0 && (
            <svg width="34" height="6" viewBox="0 0 34 6" fill="none" className="mx-1 shrink-0">
              <line
                x1="1"
                y1="3"
                x2="33"
                y2="3"
                stroke="rgb(var(--accent))"
                strokeWidth="1.5"
                className="chain-dash-flow"
              />
            </svg>
          )}
          <span className="micro-label border border-hairline bg-surface px-2 py-1 text-[9px] text-ink-soft">
            {n}
          </span>
        </span>
      ))}
    </span>
  )
}
