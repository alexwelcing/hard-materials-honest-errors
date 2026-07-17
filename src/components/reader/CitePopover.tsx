import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { ExternalLink } from 'lucide-react'
import { getReferenceSync } from '@/lib/data'

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
  const ref = getReferenceSync(cite.n)

  // Move focus into the dialog for keyboard/screen-reader users. On close,
  // restore focus to the citation button — looked up fresh by data-ref, since
  // the prose innerHTML subtree may have been re-created meanwhile.
  useEffect(() => {
    boxRef.current?.focus()
    return () => {
      const btn = document.querySelector(`button.cite[data-ref="${cite.n}"]`) as HTMLElement | null
      btn?.focus()
    }
  }, [cite.n])

  useEffect(() => {
    const openedAt = Date.now()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const onDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) onClose()
    }
    // Grace period: Lenis smooth-scroll may still be settling (e.g. after a
    // focus jump) when the popover opens — don't let that kill it instantly.
    const onScroll = () => {
      if (Date.now() - openedAt > 300) onClose()
    }
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
      tabIndex={-1}
      className="absolute z-30 w-72 max-w-[calc(100%-1rem)] rounded-sm border border-hairline bg-surface p-4 outline-none"
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
