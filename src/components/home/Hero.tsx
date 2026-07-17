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
 * Home hero — the site's single GSAP showpiece: contour line-drawing, word-split
 * headline, count-up stats, scroll parallax. Isolated here (no Framer Motion in
 * this component tree); all animation is skipped under prefers-reduced-motion.
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

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      /* Text choreography */
      tl.from('.hero-eyebrow', { opacity: 0, duration: 0.3 }, 0)
      tl.from('.hero-word', { y: 24, opacity: 0, duration: 0.7, stagger: 0.07 }, 0.05)
      tl.from(
        '.hero-underline-svg',
        { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'power2.out' },
        0.8,
      )
      tl.from(['.hero-standfirst', '.hero-meta'], { y: 12, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.35)
      tl.from('.hero-cta', { y: 12, opacity: 0, duration: 0.45, stagger: 0.1 }, 0.55)

      /* Count-up meta stats */
      root.querySelectorAll<HTMLElement>('.hero-count').forEach((el) => {
        const target = Number(el.dataset.value ?? '0')
        const comma = el.dataset.comma === 'true'
        const state = { n: 0 }
        tl.to(
          state,
          {
            n: target,
            duration: 1.1,
            ease: 'power2.out',
            onUpdate: () => {
              const v = Math.round(state.n)
              el.textContent = comma ? v.toLocaleString('en-US') : String(v)
            },
          },
          0.9,
        )
      })

      /* Contour line-drawing */
      const svg = contoursInnerRef.current?.querySelector('svg')
      if (svg) {
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

      /* Scroll (first 100vh only): contour parallax up 0.35×, content fades by 80% */
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
      {/* PES-contour backdrop: right-of-center on desktop, behind text at 40% below 900px */}
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-y-0 right-[-8%] flex w-[60%] items-center text-ink',
          'max-[900px]:right-auto max-[900px]:left-1/2 max-[900px]:w-[110%] max-[900px]:-translate-x-1/2 max-[900px]:opacity-40',
        )}
      >
        <div ref={contoursInnerRef} className="w-full" />
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-[1200px] items-center px-6 py-24">
        <div ref={contentRef} className="max-w-[640px]">
          <p className="hero-eyebrow micro-label text-verdigris">
            AN INDEPENDENT-RESEARCHER POSITION PAPER · LUPINE SCIENCE / CENTELLIC
          </p>

          <h1 className="mt-6 font-display text-[42px] font-[480] leading-[1.04] tracking-[-0.015em] text-ink sm:text-[54px] lg:text-[64px]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-word inline-block">Hard</span>{' '}
              <span className="hero-word inline-block">Materials,</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-word inline-block">Honest</span>{' '}
              <span className="hero-word inline-block">Errors</span>
            </span>
          </h1>
          <ErrorBarUnderline />

          <p className="hero-standfirst mt-6 max-w-[58ch] font-serif text-[21px] italic leading-[1.5] text-ink-soft">
            A meta-review of AI and <em>ab initio</em> simulation errors in nine classes of
            high-value hard materials, and the discovery roadmap they imply.
          </p>

          <p className="hero-meta mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[12px] tabular text-ink-soft">
            <span>
              <span className="hero-count" data-value="23">23</span> CHAPTERS
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>
              ≈<span className="hero-count" data-value="49000" data-comma="true">49,000</span> WORDS
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>
              <span className="hero-count" data-value="475">475</span> REFERENCES
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>
              <span className="hero-count" data-value="3">3</span> EXHIBIT CHARTS
            </span>
            <span aria-hidden className="text-ink-faint">·</span>
            <span>RESEARCH DATE 2026-07-17</span>
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
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
