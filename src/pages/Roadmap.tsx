import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import ExhibitTable from '@/components/ExhibitTable'
import GateTimeline from '@/components/roadmap/GateTimeline'
import { exhibits } from '@/content/exhibits'
import { REPORT_DATE } from '@/lib/report'

import { usePageTitle } from '@/lib/usePageTitle'
export default function Roadmap() {
  usePageTitle('Phased Roadmap')
  return (
    <>
      <PageHeader
        eyebrow="EXHIBIT · CHAPTER 18"
        title="The Phased Roadmap"
        lede={`Error-correction milestones first, validation milestones second, discovery targets third — phased against hard external gates nobody controls. Every status, deadline, and program figure is stated as of ${REPORT_DATE}.`}
      >
        <p className="mt-4 font-sans text-[13px] text-ink-faint">
          Full argument in{' '}
          <Link
            to="/read/ch18"
            className="text-accent underline decoration-hairline underline-offset-2 hover:text-accent-deep hover:decoration-accent"
          >
            Chapter 18 — The phased roadmap
          </Link>
          .
        </p>
      </PageHeader>

      <section className="mx-auto max-w-[1100px] px-6" aria-labelledby="time-gates">
        <h2 id="time-gates" className="font-display text-[28px] tracking-[-0.01em] text-ink">
          Time gates
        </h2>
        <p className="mt-3 max-w-measure font-serif text-[16px] leading-[1.7] text-ink-soft">
          Ten dated events the plan must survive or exploit — ordered as the calendar orders them.
        </p>
        <GateTimeline gates={exhibits.gates} />
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24" aria-labelledby="phases">
        <h2 id="phases" className="mt-16 font-display text-[28px] tracking-[-0.01em] text-ink">
          Phases
        </h2>
        <ExhibitTable
          table={exhibits.phases}
          idPrefix="phase"
          caption="Three phases: months 0–24, years 2–5, years 5–10 — milestones, validation, discovery targets, funding/compute gates, hard external gates."
        />
        <p className="mt-8 max-w-measure font-serif text-[16px] leading-[1.7] text-ink-soft">
          The phases consume the{' '}
          <Link
            to="/chains"
            className="text-accent underline decoration-hairline underline-offset-2 hover:text-accent-deep hover:decoration-accent"
          >
            eleven discovery chains
          </Link>{' '}
          — each discovery target is a chain's solved figure, not a new promise. The gates slip
          independently of anything this program does; when one moves, the plan re-baselines around
          the new date rather than slipping silently.
        </p>
      </section>
    </>
  )
}
