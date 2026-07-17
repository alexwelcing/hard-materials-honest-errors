import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import ExhibitTable from '@/components/ExhibitTable'
import WedgeQuadrant from '@/components/exhibits/WedgeQuadrant'
import { exhibits } from '@/content/exhibits'

const CROSS_LINKS = [
  { to: '/chains', label: 'CHAINS' },
  { to: '/scoreboard', label: 'SCOREBOARD' },
  { to: '/roadmap', label: 'ROADMAP' },
  { to: '/read/ch13', label: 'CHAPTER 13' },
]

import { usePageTitle } from '@/lib/usePageTitle'
export default function Matrix() {
  usePageTitle('Master Matrix')
  return (
    <>
      <PageHeader
        eyebrow="EXHIBIT · TABLE 13.1"
        title="The Master Meta-Review Matrix"
        lede="Nine classes × dominant error modes × quantified error × CN/US policy priority × fix readiness × impact domain — the report's synthesis artifact."
      >
        <nav aria-label="Related exhibits" className="mt-6 flex flex-wrap gap-2">
          {CROSS_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="border border-hairline px-2.5 py-1 font-mono text-[11px] tracking-[0.08em] text-ink-soft transition-colors hover:border-verdigris hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </PageHeader>

      <div className="mx-auto max-w-[1200px] px-6 pb-24">
        <ExhibitTable
          table={exhibits.matrix}
          idPrefix="row"
          caption="Table 13.1 — the master meta-review matrix: nine admitted classes against their dominant error modes, headline quantified errors, CN/US policy priorities, fix readiness with named levers, and impact domains."
          className="[&_table]:text-[13.5px]"
        />

        <section className="mt-16">
          <h2 className="font-display text-[28px] leading-[1.15] tracking-[-0.01em] text-ink">
            The nine numbers
          </h2>
          <ExhibitTable
            table={exhibits.nineNumbers}
            idPrefix="nine"
            caption="One headline quantified error per admitted class — the single number each class chapter is built around, with its corpus source and the discovery chain it anchors."
          />
        </section>

        <section className="mt-16">
          <h2 className="font-display text-[28px] leading-[1.15] tracking-[-0.01em] text-ink">
            The wedge quadrant
          </h2>
          <p className="mt-3 max-w-measure font-serif text-[16px] leading-[1.7] text-ink-soft">
            Simulation difficulty and strategic value turn out to be correlated: the classes whose
            errors are deepest in the physics are often the ones whose demand is gated on programs
            rather than pulled by industry today. Read each cell as a posture, not a ranking.
          </p>
          <WedgeQuadrant grid={exhibits.quadrant} />
        </section>
      </div>
    </>
  )
}
