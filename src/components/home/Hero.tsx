import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { getReadingSession } from '@/lib/readingState'
import { getChapter, chapterShort } from '@/lib/report'
import { prefersReducedMotion } from '@/lib/theme'
import { SEARCH_OPEN_EVENT } from '@/components/SearchOverlay'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Rust error-bar underline drawn under "Honest Errors". */
function ErrorBarUnderline() {
  return (
    <svg viewBox="0 0 320 20" className="hero-underline-svg block w-[min(320px,72%)]" fill="none" aria-hidden>
      <g stroke="rgb(var(--accent))" strokeWidth="2" strokeLinecap="square">
        <line x1="10" y1="10" x2="310" y2="10" />
        <line x1="10" y1="4" x2="10" y2="16" />
        <line x1="310" y1="4" x2="310" y2="16" />
      </g>
      <rect x="152" y="6" width="8" height="8" fill="rgb(var(--accent))" />
    </svg>
  )
}

function ResumeCard() {
  const session = getReadingSession()
  if (!session || session.progress >= 0.98) return null
  const ch = getChapter(session.chapterId)
  if (!ch) return null
  const pct = Math.round(session.progress * 100)
  return (
    <Link
      to={`/read/${session.chapterId}`}
      className="hero-cta mt-6 block max-w-[340px] border border-hairline bg-surface px-4 py-3 transition-colors hover:border-accent/60"
    >
      <span className="micro-label text-ink-soft">
        RESUME — CH {pad2(ch.number)} · {chapterShort(ch.id)} · {pct}% READ
      </span>
      <span className="mt-2 block h-[2px] bg-hairline">
        <span className="block h-full bg-accent" style={{ width: `${pct}%` }} />
      </span>
    </Link>
  )
}

/**
 * Count-up that always lands on the final value: setInterval-driven (not rAF,
 * not GSAP) with a hard completion timeout, so a stalled animation frame can
 * never leave a wrong number on screen. Markup starts at the final value.
 */
function CountUp({ value, comma = false }: { value: number; comma?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const final = comma ? value.toLocaleString('en-US') : String(value)
    const started = Date.now()
    const id = window.setInterval(() => {
      const t = Math.min(1, (Date.now() - started) / 1100)
      const eased = 1 - Math.pow(1 - t, 3)
      const n = Math.round(value * eased)
      el.textContent = comma ? n.toLocaleString('en-US') : String(n)
      if (t >= 1) {
        el.textContent = final
        window.clearInterval(id)
      }
    }, 33)
    const failsafe = window.setTimeout(() => {
      el.textContent = final
      window.clearInterval(id)
    }, 1600)
    return () => {
      window.clearInterval(id)
      window.clearTimeout(failsafe)
      el.textContent = final
    }
  }, [value, comma])
  return (
    <span ref={ref}>{comma ? value.toLocaleString('en-US') : value}</span>
  )
}

/**
 * Home hero — the site's cover. Readability contract: all text is fully
 * rendered without JavaScript; the headline reveal is a self-completing CSS
 * animation. GSAP owns only the decorative contour line-drawing and the
 * scroll parallax — never the legibility of the title.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const contoursInnerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [svgReady, setSvgReady] = useState(false)

  /* Inline the PES-contour art so its loops can be line-drawn. */
  useEffect(() => {
    let cancelled = false
    fetch('/hero-contours.svg')
      .then((r) => r.text())
      .then((text) => {
        if (cancelled || !contoursInnerRef.current) return
        contoursInnerRef.current.innerHTML = text
        const svg = contoursInnerRef.current.querySelector('svg')
        svg?.setAttribute('class', 'h-auto w-full')
        svg?.setAttribute('aria-hidden', 'true')
        setSvgReady(true)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const root = rootRef.current
      if (!root) return

      /* Decorative only: contour line-drawing. Text is NOT animated here. */
      const svg = contoursInnerRef.current?.querySelector('svg')
      if (svg) {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        const loops = svg.querySelectorAll<SVGPathElement>('path:not(.migration-path)')
        loops.forEach((p) => {
          const len = p.getTotalLength()
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len })
        })
        tl.to(loops, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: 0.09 }, 0.2)

        const mig = svg.querySelector<SVGPathElement>('.migration-path')
        const node = svg.querySelector<SVGCircleElement>('.saddle-node')
        if (mig) {
          const len = mig.getTotalLength()
          const dashed = mig.getAttribute('stroke-dasharray') ?? '0.5 8.5'
          gsap.set(mig, { strokeDasharray: len, strokeDashoffset: len })
          tl.to(mig, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' }, '-=0.9')
          tl.set(mig, { strokeDasharray: dashed, strokeDashoffset: 0 })
        }
        if (node) {
          gsap.set(node, { opacity: 0, scale: 1, svgOrigin: '600 450' })
          tl.to(node, { opacity: 1, duration: 0.2 })
          tl.to(node, { scale: 1.6, duration: 0.2, ease: 'power2.out' })
          tl.to(node, { scale: 1, duration: 0.2, ease: 'power2.in' })
        }
      }

      /* Scroll (first 100vh only): contour parallax up 0.35×, content fades out */
      if (contoursInnerRef.current) {
        gsap.to(contoursInnerRef.current, {
          y: () => -0.35 * window.innerHeight,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: '80% top', scrub: true },
        })
      }
    },
    { scope: rootRef, dependencies: [svgReady] },
  )

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-paper"
      style={{ minHeight: 'max(680px, 100dvh)' }}
      aria-label="Report cover"
    >
      {/* PES-contour backdrop: right-of-center on desktop, left edge masked so
          it never fights the headline; faint and centered on mobile. */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0 right-[-12%] flex w-[55%] items-center text-ink/70',
          '[mask-image:linear-gradient(to_right,transparent,black_38%)]',
          'max-[900px]:right-auto max-[900px]:left-1/2 max-[900px]:top-auto max-[900px]:bottom-0 max-[900px]:h-[55%] max-[900px]:w-[110%] max-[900px]:-translate-x-1/2 max-[900px]:opacity-30',
        )}
      >
        <div ref={contoursInnerRef} className="w-full" />
      </div>

      {/* Paper scrim guaranteeing text contrast over any stray art */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--paper))_0%,rgb(var(--paper))_45%,rgb(var(--paper)/0.75)_62%,transparent_85%)] max-[900px]:bg-[linear-gradient(to_bottom,rgb(var(--paper))_0%,rgb(var(--paper))_55%,rgb(var(--paper)/0.6)_75%,transparent_100%)]"
      />

      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-[1200px] items-center px-6 py-24">
        <div ref={contentRef} className="max-w-[640px]">
          <p className="hero-reveal micro-label text-verdigris" style={{ '--hero-delay': '0ms' } as React.CSSProperties}>
            AN INDEPENDENT-RESEARCHER POSITION PAPER · LUPINE SCIENCE
          </p>

          <h1 className="mt-6 font-display text-[42px] font-[480] leading-[1.04] tracking-[-0.015em] text-ink sm:text-[54px] lg:text-[64px]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-reveal inline-block" style={{ '--hero-delay': '80ms' } as React.CSSProperties}>
                Hard
              </span>{' '}
              <span className="hero-reveal inline-block" style={{ '--hero-delay': '150ms' } as React.CSSProperties}>
                Materials,
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-reveal inline-block" style={{ '--hero-delay': '230ms' } as React.CSSProperties}>
                Honest
              </span>{' '}
              <span className="hero-reveal inline-block" style={{ '--hero-delay': '300ms' } as React.CSSProperties}>
                Errors
              </span>
            </span>
          </h1>
          <div className="hero-reveal" style={{ '--hero-delay': '420ms' } as React.CSSProperties}>
            <ErrorBarUnderline />
          </div>

          <p
            className="hero-reveal mt-6 max-w-[58ch] font-serif text-[21px] italic leading-[1.5] text-ink-soft"
            style={{ '--hero-delay': '380ms' } as React.CSSProperties}
          >
            A meta-review of AI and <em>ab initio</em> simulation errors in nine classes of
            high-value hard materials, and the discovery roadmap they imply.
          </p>

          <p
            className="hero-reveal mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] tabular text-ink-soft"
            style={{ '--hero-delay': '470ms' } as React.CSSProperties}
          >
            <span>
              <CountUp value={23} /> CHAPTERS
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>
              ≈<CountUp value={49000} comma /> WORDS
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>
              <CountUp value={475} /> REFERENCES
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>
              <CountUp value={3} /> EXHIBIT CHARTS
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>RESEARCH DATE 2026-07-17</span>
          </p>

          <div
            className="hero-reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
            style={{ '--hero-delay': '560ms' } as React.CSSProperties}
          >
            <Link
              to="/read/ch01"
              className="hero-cta rounded-sm bg-accent px-6 py-3 font-display text-[16px] text-paper transition-colors hover:bg-accent-deep"
            >
              Begin reading →
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(SEARCH_OPEN_EVENT))}
              className="hero-cta flex items-center gap-2.5 rounded-sm border border-hairline px-5 py-3 font-sans text-[14px] text-ink transition-colors hover:bg-faint"
            >
              Search the report <kbd>⌘K</kbd>
            </button>
            <a
              href="#exhibits"
              className="hero-cta font-sans text-[14px] text-accent underline decoration-hairline underline-offset-4 hover:text-accent-deep hover:decoration-accent"
            >
              Browse the exhibits ↓
            </a>
          </div>

          <ResumeCard />
        </div>
      </div>
    </section>
  )
}
