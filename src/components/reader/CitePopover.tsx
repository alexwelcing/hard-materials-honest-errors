import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import { references } from '@/content/references'

/** Reference lookup by citation number (built once at module load). */
const refByN = new Map(references.map((r) => [r.n, r]))

export interface CiteTarget {
  n: number
  /** Offset within the relatively-positioned prose wrapper. */
  x: number
  y: number
}

/**
 * Floating citation card, positioned absolutely inside the reader's relative
 * prose wrapper. Dependency-free: closes on outside pointerdown, Escape, or
 * any scroll. Rendered only while open.
 */
export default function CitePopover({ cite, onClose }: { cite: CiteTarget; onClose: () => void }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const ref = refByN.get(cite.n)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const onDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) onClose()
    }
    const onScroll = () => onClose()
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown, true)
    window.addEventListener('scroll', onScroll, { capture: true, passive: true })
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown, true)
      window.removeEventListener('scroll', onScroll, { capture: true })
    }
  }, [onClose])

  if (!ref) return null

  return (
    <div
      ref={boxRef}
      role="dialog"
      aria-label={`Reference ${ref.n}`}
      className="absolute z-30 w-72 max-w-[calc(100%-1rem)] rounded-sm border border-hairline bg-surface p-4"
      style={{ left: cite.x, top: cite.y }}
    >
      <p className="micro-label text-[10px] text-verdigris">
        [{ref.n}] · {ref.kind.toUpperCase()} · {ref.year}
      </p>
      <p className="mt-2 font-sans text-[12.5px] leading-relaxed text-ink-soft">{ref.gbt}</p>
      <div className="mt-3 flex items-center justify-between border-t border-hairline pt-2.5">
        <Link
          to={`/references#ref-${ref.n}`}
          onClick={onClose}
          className="micro-label text-[10px] text-accent hover:text-accent-deep"
        >
          REFERENCE LIBRARY
        </Link>
        <a
          href={ref.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open source for reference ${ref.n} in a new tab`}
          className="text-ink-faint transition-colors hover:text-accent"
        >
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
