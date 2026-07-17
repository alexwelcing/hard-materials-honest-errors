import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Hero from '@/components/home/Hero'
import ChainFlowGlyph from '@/components/home/ChainFlowGlyph'
import ErrorBarGlyph from '@/components/ErrorBarGlyph'
import { exhibits } from '@/content/exhibits'

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number]
const pad2 = (n: number) => String(n).padStart(2, '0')

/** Scroll reveal — fade/rise once, per design §5 (Framer Motion; GSAP stays in the hero). */
function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-22% 0px' }}
      transition={{ duration: 0.55, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

/** Error figures scramble-in once: random digits settle left-to-right, 800ms easeOutQuart. */
function ScrambleText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduced = useReducedMotion()
  const [out, setOut] = useState(text)

  useEffect(() => {
    if (reduced || !inView) {
      setOut(text)
      return
    }
    let raf = 0
    const start = performance.now()
    const duration = 800
    const digitCount = (text.match(/\d/g) ?? []).length
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const p = 1 - Math.pow(1 - t, 4)
      const settled = Math.floor(p * digitCount)
      let di = 0
      setOut(
        text
          .split('')
          .map((c) => {
            if (!/\d/.test(c)) return c
            const idx = di++
            return idx < settled || t >= 1 ? c : String(Math.floor(Math.random() * 10))
          })
          .join(''),
      )
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, text])

  return (
    <span ref={ref} className={className}>
      {out}
    </span>
  )
}

const SUBS: Record<string, string> = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
  '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
}

/** Convert the corpus's inline LaTeX-ish markers to Unicode for card/gloss display. */
function cleanInline(s: string): string {
  return s
    .replace(/\\lambda/g, 'λ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\times/g, '×')
    .replace(/\\leq/g, '≤')
    .replace(/\\geq/g, '≥')
    .replace(/\\approx/g, '≈')
    .replace(/\\pm/g, '±')
    .replace(/\\,/g, ' ')
    .replace(/\{,\}/g, ',')
    .replace(/_\{([^}]*)\}/g, (_, g1: string) => g1.split('').map((c) => SUBS[c] ?? c).join(''))
    .replace(/_(\d)/g, (_, d: string) => SUBS[d] ?? d)
    .replace(/\$/g, '')
    .replace(/\\(.)/g, '$1')
}

/* ------------------------------------------------------------------ */
/* Section 2 — Thesis in three parts                                   */
/* ------------------------------------------------------------------ */

const THESIS = [
  {
    n: '01',
    lead: 'Error is the binding constraint',
    quote:
      'the classes Beijing and Washington name first are precisely the ones modern simulation handles worst.',
  },
  {
    n: '02',
    lead: 'Floors break under fidelity, not scale',
    quote:
      "MLIPs trained on DFT labels inherit DFT's systematic floors; a bigger model on the same labels asymptotes.",
  },
  {
    n: '03',
    lead: 'A level playing field, briefly open',
    quote:
      'the fixes are cheap, public, and unowned — a rare three-to-five-year window for a validation-first venture.',
  },
]

function Thesis() {
  return (
    <section className="relative border-y border-hairline" aria-label="The claim">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-paper px-4">
        <ErrorBarGlyph width={72} />
      </div>
      <div className="mx-auto max-w-[820px] px-6 py-32">
        <Reveal>
          <p className="micro-label text-center text-verdigris">THE CLAIM — §1.1</p>
        </Reveal>
        <div className="mt-14 space-y-14">
          {THESIS.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.25}>
              <div className="flex gap-5">
                <span className="flex shrink-0 flex-col items-center pt-1.5">
                  <span className="font-mono text-[13px] tabular text-accent">{t.n}</span>
                  <motion.span
                    aria-hidden
                    className="mt-1.5 block h-[2px] w-[20px] origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-22% 0px' }}
                    transition={{ duration: 0.4, delay: i * 0.25 + 0.2, ease: EASE_OUT }}
                  />
                </span>
                <p className="font-display text-[22px] leading-[1.35] text-ink sm:text-[28px]">
                  <strong className="font-semibold">{t.lead}</strong>
                  <span className="text-ink-soft"> — “{t.quote}”</span>
                  <Link
                    to="/read/ch01"
                    className="ml-3 whitespace-nowrap font-mono text-[12px] text-accent hover:text-accent-deep"
                  >
                    §1.1 →
                  </Link>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 3 — The report in nine numbers (Table 1.1)                  */
/* ------------------------------------------------------------------ */

/** Headline error figures per class (verbatim fragments of Table 1.1), aligned
 *  by index with exhibits.nineNumbers.rows; each card links its class chapter. */
const NINE_META: { chapter: string; figure: string }[] = [
  { chapter: 'ch04', figure: 'λ 2.64 vs 1.84' },
  { chapter: 'ch05', figure: '~1 eV' },
  { chapter: 'ch06', figure: '4–5×' },
  { chapter: 'ch07', figure: '0.310–0.349 eV' },
  { chapter: 'ch08', figure: '0.2–0.4 eV' },
  { chapter: 'ch09', figure: '15–35%' },
  { chapter: 'ch10', figure: '240 ps' },
  { chapter: 'ch11', figure: '0.77–3.04×' },
  { chapter: 'ch12', figure: '~50%' },
]

function NineNumbers() {
  const rows = exhibits.nineNumbers.rows
  return (
    <section className="border-b border-hairline bg-surface" aria-label="The report in nine numbers">
      <div className="mx-auto max-w-[1200px] px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="micro-label text-verdigris">TABLE 1.1</p>
              <h2 className="mt-2 font-display text-[34px] tracking-[-0.015em] text-ink">
                The report in nine numbers
              </h2>
            </div>
            <Link
              to="/read/ch01"
              className="font-sans text-[14px] text-accent underline decoration-hairline underline-offset-4 hover:text-accent-deep hover:decoration-accent"
            >
              Read the executive summary →
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((row, i) => {
            const meta = NINE_META[i]
            const className = row[0].replace(/\s*\(Ch\.\s*\d+\)/, '')
            const chNum = meta.chapter.replace('ch', '')
            const chains = row[3]
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
            return (
              <Reveal key={row[0]} delay={(i % 3) * 0.06} y={28} className="h-full">
                <div className="flex h-full flex-col border border-hairline bg-paper p-5 transition-all duration-150 hover:-translate-y-0.5 hover:border-accent">
                  <Link to={`/read/${meta.chapter}`} className="block flex-1">
                    <p className="micro-label text-[10px] text-verdigris">
                      {className.toUpperCase()} · CH {chNum}
                    </p>
                    <p className="mt-3 font-display text-[26px] leading-none text-ink tabular">
                      <ScrambleText text={meta.figure} />
                    </p>
                    <p className="mt-3 font-serif text-[15px] leading-snug text-ink-soft">
                      {cleanInline(row[1])}
                    </p>
                  </Link>
                  {chains.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-hairline pt-3">
                      {chains.map((c) => (
                        <Link
                          key={c}
                          to={`/chains#chain-${c}`}
                          className="font-mono text-[10px] tracking-[0.08em] text-accent hover:text-accent-deep"
                        >
                          CHAIN {c} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 4 — Two flagship chains (pull-quote diptych)                */
/* ------------------------------------------------------------------ */

function FlagshipQuote({
  quote,
  caption,
  to,
}: {
  quote: string
  caption: string
  to: string
}) {
  return (
    <blockquote className="relative pl-8">
      <motion.span
        aria-hidden
        className="absolute bottom-1 left-0 top-1 w-[3px] origin-top bg-accent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-22% 0px' }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
      <p className="font-display text-[20px] italic leading-[1.45] text-ink sm:text-[24px]">
        “{quote}”
      </p>
      <footer className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-mono text-[11px] tracking-[0.08em] text-ink-soft">{caption}</span>
        <Link to={to} className="font-mono text-[11px] tracking-[0.08em] text-accent hover:text-accent-deep">
          TRACE THE CHAIN →
        </Link>
      </footer>
    </blockquote>
  )
}

function FlagshipChains() {
  const [chain1, chain2] = exhibits.chains
  /* Verbatim fragments of each chain's sentence (§1.3.1), compressed with an
     ellipsis exactly as the corpus presents the flagships. */
  const q1 = `Because we have unlocked ${chain1.unlock}, we will discover ${chain1.discover} … ${chain1.build}.`
  const q2 = `Because we have unlocked ${chain2.unlock}, we will discover NdFeB-class rare-earth-free magnets … ${chain2.build}.`
  return (
    <section aria-label="Two flagship discovery chains" className="mx-auto max-w-[900px] px-6 py-32">
      <Reveal>
        <FlagshipQuote
          quote={q1}
          caption={`CHAIN 1 · READINESS ${chain1.readiness} · GAP 0.310–0.349 eV → ≤40 meV`}
          to="/chains#chain-1"
        />
      </Reveal>
      <div className="my-16 flex justify-center">
        <ChainFlowGlyph />
      </div>
      <Reveal>
        <FlagshipQuote
          quote={q2}
          caption={`CHAIN 2 · READINESS ${chain2.readiness}`}
          to="/chains#chain-2"
        />
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-16 text-center">
          <Link
            to="/chains"
            className="font-sans text-[14px] text-accent underline decoration-hairline underline-offset-4 hover:text-accent-deep hover:decoration-accent"
          >
            Explore all eleven chains →
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 5 — Signature exhibits gallery (native SVG thumbnails)      */
/* ------------------------------------------------------------------ */

/** Mini before→after bars (three pairs, from the fix-stack data); after-bars
 *  re-run their morph on card hover. */
function FixStackThumb() {
  const rows = [
    { before: 180, after: 54 },
    { before: 140, after: 42 },
    { before: 104, after: 31 },
  ]
  return (
    <svg viewBox="0 0 220 72" className="h-[72px] w-[220px]" fill="none" aria-hidden>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(0 ${6 + i * 22})`}>
          <rect x="0" y="0" width={r.before} height="6" fill="rgb(var(--ink) / 0.22)" />
          <line x1={r.before} y1="-2" x2={r.before} y2="8" stroke="rgb(var(--ink) / 0.4)" strokeWidth="1" />
          <rect
            x="0"
            y="11"
            width={r.after}
            height="6"
            fill="rgb(var(--verdigris))"
            className="origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100"
          />
          <line x1={r.after} y1="9" x2={r.after} y2="19" stroke="rgb(var(--verdigris))" strokeWidth="1" />
        </g>
      ))}
    </svg>
  )
}

/** 9×7 micro-grid glyph with readiness dots. */
function MatrixThumb() {
  const dots: Record<number, string> = {
    4: 'h', 10: 'm', 18: 'l', 25: 'h', 33: 'm', 40: 'l', 48: 'h', 55: 'm', 61: 'l',
  }
  return (
    <svg viewBox="0 0 104 76" className="h-[72px] w-[100px]" fill="none" aria-hidden>
      {Array.from({ length: 63 }).map((_, i) => {
        const x = (i % 9) * 11 + 2
        const y = Math.floor(i / 9) * 11 + 2
        const d = dots[i]
        return d ? (
          <circle key={i} cx={x + 3.5} cy={y + 3.5} r="3.5" fill={`rgb(var(--ready-${d}))`} />
        ) : (
          <rect key={i} x={x} y={y} width="7" height="7" fill="rgb(var(--ink) / 0.12)" />
        )
      })}
    </svg>
  )
}

/** Mini roadmap: three phase bars against gate diamonds; gates pop on hover. */
function RoadmapThumb() {
  const gates = [30, 90, 150, 200]
  return (
    <svg viewBox="0 0 220 72" className="h-[72px] w-[220px]" fill="none" aria-hidden>
      <rect x="8" y="8" width="70" height="7" fill="rgb(var(--verdigris) / 0.75)" />
      <rect x="58" y="23" width="92" height="7" fill="rgb(var(--verdigris) / 0.45)" />
      <rect x="118" y="38" width="86" height="7" fill="rgb(var(--verdigris) / 0.25)" />
      <line x1="4" y1="60" x2="216" y2="60" stroke="rgb(var(--hairline))" strokeWidth="1" />
      {gates.map((gx, i) => (
        <rect
          key={gx}
          x="-4"
          y="-4"
          width="8"
          height="8"
          transform={`translate(${gx} 60) rotate(45)`}
          fill="rgb(var(--accent))"
          className="origin-center scale-75 transition-transform duration-300 group-hover:scale-110"
          style={{ transitionDelay: `${i * 50}ms` }}
        />
      ))}
    </svg>
  )
}

/** Seven skeptic status dots (corrected / contested / closed) from the register. */
function SkepticsThumb() {
  const colorFor = (status: string) => {
    const s = status.toLowerCase()
    if (s.startsWith('contested')) return 'rgb(var(--ready-m))'
    if (s.includes('correct')) return 'rgb(var(--accent))'
    return 'rgb(var(--ink-faint))'
  }
  return (
    <svg viewBox="0 0 220 72" className="h-[72px] w-[220px]" fill="none" aria-hidden>
      <line x1="12" y1="36" x2="208" y2="36" stroke="rgb(var(--hairline))" strokeWidth="1" />
      {exhibits.skeptics.rows.map((row, i) => (
        <circle
          key={i}
          cx={20 + i * 30}
          cy="36"
          r="7"
          fill={colorFor(row[3] ?? '')}
          className="origin-center scale-90 transition-transform duration-300 group-hover:scale-110"
          style={{ transitionDelay: `${i * 50}ms`, transformBox: 'fill-box' }}
        />
      ))}
    </svg>
  )
}

function ExhibitCard({
  to,
  badge,
  title,
  copy,
  thumb,
}: {
  to: string
  badge: string
  title: string
  copy: string
  thumb: ReactNode
}) {
  return (
    <Link
      to={to}
      className="group flex h-full flex-col border border-hairline bg-surface p-6 transition-all duration-150 hover:-translate-y-0.5 hover:border-accent"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="overflow-hidden">{thumb}</div>
        <span className="micro-label shrink-0 border border-hairline px-2 py-1 text-[9px] text-ink-soft">
          {badge}
        </span>
      </div>
      <h3 className="mt-6 font-display text-[22px] text-ink group-hover:text-accent-deep">{title}</h3>
      <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-soft">{copy}</p>
      <span className="mt-auto block pt-5 font-mono text-[11px] tracking-[0.08em] text-accent">
        OPEN EXHIBIT →
      </span>
    </Link>
  )
}

function ExhibitsGallery() {
  return (
    <section id="exhibits" aria-label="Signature exhibits" className="mx-auto max-w-[1200px] scroll-mt-20 px-6 py-24">
      <Reveal>
        <p className="micro-label text-verdigris">PURPOSE-BUILT VIEWS</p>
        <h2 className="mt-2 font-display text-[34px] tracking-[-0.015em] text-ink">
          Five exhibits, one library
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-12">
        <Reveal className="h-full md:col-span-6" y={32}>
          <ExhibitCard
            to="/scoreboard"
            badge="TABLE 3.2"
            title="The Error-Correction Scoreboard"
            copy="Ten failure modes, verified current states, demonstrated fixes, solved targets."
            thumb={<FixStackThumb />}
          />
        </Reveal>
        <Reveal className="h-full md:col-span-6" y={32} delay={0.07}>
          <ExhibitCard
            to="/matrix"
            badge="TABLE 13.1"
            title="The Master Matrix"
            copy="Nine classes × errors × CN/US priorities × fixes × impact."
            thumb={<MatrixThumb />}
          />
        </Reveal>
        <Reveal className="h-full md:col-span-4" y={32}>
          <ExhibitCard
            to="/chains"
            badge="CH 15"
            title="Discovery Chains"
            copy="Eleven falsifiable commitments in one grammar."
            thumb={<ChainFlowGlyph className="h-[72px] items-center" />}
          />
        </Reveal>
        <Reveal className="h-full md:col-span-4" y={32} delay={0.07}>
          <ExhibitCard
            to="/roadmap"
            badge="TABLES 18.1–18.2"
            title="Phased Roadmap"
            copy="Three phases against ten hard external gates, 2026–2040."
            thumb={<RoadmapThumb />}
          />
        </Reveal>
        <Reveal className="h-full md:col-span-4" y={32} delay={0.14}>
          <ExhibitCard
            to="/skeptics"
            badge="TABLE 20.1"
            title="The Skeptic Register"
            copy="Seven claims the field corrected itself — and what they cost this venture."
            thumb={<SkepticsThumb />}
          />
        </Reveal>
        <Reveal className="md:col-span-12" y={32}>
          <div className="grid border border-hairline bg-surface md:grid-cols-2">
            <Link to="/references" className="group p-6 transition-colors hover:bg-faint">
              <p className="micro-label text-[10px] text-verdigris">REFERENCE LIBRARY</p>
              <p className="mt-3 font-display text-[22px] text-ink group-hover:text-accent-deep">
                475 sources, every one traceable
              </p>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-soft">
                475 sources, GB/T 7714-2015, every one traceable to a citing section.
              </p>
              <span className="mt-4 block font-mono text-[11px] tracking-[0.08em] text-accent">
                OPEN THE LIBRARY →
              </span>
            </Link>
            <Link
              to="/glossary"
              className="group border-t border-hairline p-6 transition-colors hover:bg-faint md:border-l md:border-t-0"
            >
              <p className="micro-label text-[10px] text-verdigris">GLOSSARY</p>
              <p className="mt-3 font-display text-[22px] text-ink group-hover:text-accent-deep">
                The working vocabulary
              </p>
              <p className="mt-2 font-serif text-[15px] leading-relaxed text-ink-soft">
                Working-professional definitions, plus an energy-unit converter.
              </p>
              <span className="mt-4 block font-mono text-[11px] tracking-[0.08em] text-accent">
                LOOK UP A TERM →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 6 — Guided reading paths                                    */
/* ------------------------------------------------------------------ */

const PATHS: {
  id: string
  time: string
  title: string
  audience: string
  chip: string
  stops: { label: string; to: string }[]
}[] = [
  {
    id: 'A',
    time: '15 MINUTES',
    title: 'The Briefing',
    audience: 'For program managers and investors.',
    chip: '≈15 MIN · 4 STOPS',
    stops: [
      { label: 'Executive Summary', to: '/read/ch01' },
      { label: 'The report in nine numbers', to: '/read/ch01#1-2-1' },
      { label: 'Discovery Chains', to: '/chains' },
      { label: 'Phased Roadmap', to: '/roadmap' },
    ],
  },
  {
    id: 'B',
    time: '35 MINUTES',
    title: 'The Technical Case',
    audience: 'For computational peers.',
    chip: '≈35 MIN · 4 STOPS',
    stops: [
      { label: 'Methods & the Correction Stack', to: '/read/ch03' },
      { label: 'One class chapter — Batteries', to: '/read/ch07' },
      { label: 'Master Matrix', to: '/matrix' },
      { label: 'Skeptic Register', to: '/skeptics' },
    ],
  },
  {
    id: 'C',
    time: '25 MINUTES',
    title: 'Policy & Programs',
    audience: 'For CN/US program staff and TMS leaders.',
    chip: '≈25 MIN · 5 STOPS',
    stops: [
      { label: 'Master Matrix — CN/US columns', to: '/matrix' },
      { label: 'China: 15th Five-Year Plan', to: '/read/ch16' },
      { label: 'United States Alignment', to: '/read/ch17' },
      { label: 'Time-Gate Register', to: '/roadmap' },
      { label: 'Partnership & the Compute Ladder', to: '/read/ch19' },
    ],
  },
]

function ReadingPaths() {
  return (
    <section aria-label="Guided reading paths" className="border-t border-hairline bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 py-24">
        <Reveal>
          <p className="micro-label text-verdigris">GUIDED READING PATHS</p>
          <h2 className="mt-2 font-display text-[34px] tracking-[-0.015em] text-ink">
            Three ways in
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PATHS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12} y={28} className="h-full">
              <article className="flex h-full flex-col border border-hairline bg-paper p-6">
                <p className="micro-label text-verdigris">
                  PATH {p.id} — {p.time}
                </p>
                <h3 className="mt-2 font-display text-[22px] text-ink">{p.title}</h3>
                <p className="mt-1 font-sans text-[13px] text-ink-soft">{p.audience}</p>
                <ol className="mt-5 space-y-0.5">
                  {p.stops.map((s, j) => (
                    <li key={s.to + s.label}>
                      <Link
                        to={s.to}
                        className="group flex items-baseline gap-3 rounded-sm px-2 py-1.5 transition-all duration-150 hover:translate-x-2 hover:bg-faint"
                      >
                        <span className="font-mono text-[11px] tabular text-ink-faint group-hover:text-accent">
                          {pad2(j + 1)}
                        </span>
                        <span className="font-sans text-[14px] text-ink group-hover:text-accent-deep">
                          {s.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <p className="mt-auto pt-6">
                  <span className="inline-block border border-hairline px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-soft">
                    {p.chip}
                  </span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 7 — Closing band                                            */
/* ------------------------------------------------------------------ */

function ClosingBand() {
  return (
    <section aria-label="Closing" className="border-t border-hairline">
      <div className="mx-auto max-w-[760px] px-6 py-24 text-center">
        <Reveal>
          <div className="flex justify-center">
            <ErrorBarGlyph width={80} />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 font-display text-[24px] italic leading-[1.4] text-ink">
            “Everything here is dated, cited, and falsifiable — the error bars are the point.”
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10">
            <Link
              to="/read/ch01"
              className="inline-block rounded-sm bg-accent px-6 py-3 font-display text-[16px] text-paper transition-colors hover:bg-accent-deep"
            >
              Begin reading →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

import { usePageTitle } from '@/lib/usePageTitle'
export default function Home() {
  usePageTitle()
  return (
    <>
      <Hero />
      <Thesis />
      <NineNumbers />
      <FlagshipChains />
      <ExhibitsGallery />
      <ReadingPaths />
      <ClosingBand />
    </>
  )
}
