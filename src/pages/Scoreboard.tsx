import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import ExhibitTable from '@/components/ExhibitTable'
import ScoreboardTable from '@/components/exhibits/ScoreboardTable'
import { exhibits } from '@/content/exhibits'

export default function Scoreboard() {
  return (
    <>
      <PageHeader
        eyebrow="EXHIBIT · TABLE 3.2"
        title="The Error-Correction Scoreboard"
        lede="The report's reference artifact: each failure mode, its verified current state, the demonstrated fix, the “solved” target, and a readiness grade — cited by all nine class chapters."
      >
        <p className="mt-4 font-sans text-[13px] text-ink-soft">
          Introduced in{' '}
          <Link to="/read/ch03" className="text-accent hover:text-accent-deep">
            Chapter 3 — the scoreboard and the taxonomy
          </Link>
          .
        </p>
      </PageHeader>

      <div className="mx-auto max-w-[1200px] px-6 pb-24">
        <p className="font-mono text-[12px] text-ink-faint">
          Readiness — <span className="font-semibold text-ready-h">H</span> = demonstrated ·{' '}
          <span className="font-semibold text-ready-m">M</span> = emerging ·{' '}
          <span className="font-semibold text-ready-l">L</span> = frontier
        </p>

        <ScoreboardTable
          table={exhibits.scoreboard}
          caption="Table 3.2 — ten failure modes: verified current state, demonstrated fix, “solved” target, and fix readiness (H/M/L)."
        />

        <section className="mt-16">
          <h2 className="font-display text-[28px] leading-[1.15] tracking-[-0.01em] text-ink">
            The nine error modes
          </h2>
          <ExhibitTable
            table={exhibits.taxonomy}
            idPrefix="mode"
            caption="Table 3.1 — error taxonomy: physical origin, typical magnitude, classes hit hardest."
          />
        </section>
      </div>
    </>
  )
}
