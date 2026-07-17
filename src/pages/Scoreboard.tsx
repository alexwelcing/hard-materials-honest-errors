import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import ExhibitTable from '@/components/ExhibitTable'
import ScoreboardTable from '@/components/exhibits/ScoreboardTable'
import { exhibits } from '@/content/exhibits'

import { usePageTitle } from '@/lib/usePageTitle'
export default function Scoreboard() {
  usePageTitle('Error-Correction Scoreboard')
  return (
    <>
      <PageHeader
        eyebrow="EXHIBIT Â· TABLE 3.2"
        title="The Error-Correction Scoreboard"
        lede="The report's reference artifact: each failure mode, its verified current state, the demonstrated fix, the â€œsolvedâ€ target, and a readiness grade â€” cited by all nine class chapters."
      >
        <p className="mt-4 font-sans text-[13px] text-ink-soft">
          Introduced in{' '}
          <Link to="/read/ch03" className="text-accent hover:text-accent-deep">
            Chapter 3 â€” the scoreboard and the taxonomy
          </Link>
          .
        </p>
      </PageHeader>

      <div className="mx-auto max-w-[1200px] px-6 pb-24">
        <p className="font-mono text-[12px] text-ink-faint">
          Readiness â€” <span className="font-semibold text-ready-h">H</span> = demonstrated Â·{' '}
          <span className="font-semibold text-ready-m">M</span> = emerging Â·{' '}
          <span className="font-semibold text-ready-l">L</span> = frontier
        </p>

        <ScoreboardTable
          table={exhibits.scoreboard}
          caption="Table 3.2 â€” ten failure modes: verified current state, demonstrated fix, â€œsolvedâ€ target, and fix readiness (H/M/L)."
        />

        <section className="mt-16">
          <h2 className="font-display text-[28px] leading-[1.15] tracking-[-0.01em] text-ink">
            The nine error modes
          </h2>
          <ExhibitTable
            table={exhibits.taxonomy}
            idPrefix="mode"
            caption="Table 3.1 â€” error taxonomy: physical origin, typical magnitude, classes hit hardest."
          />
        </section>
      </div>
    </>
  )
}
