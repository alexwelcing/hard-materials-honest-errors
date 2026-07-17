import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import ExhibitTable from '@/components/ExhibitTable'
import ChainCardView from '@/components/chains/ChainCardView'
import { exhibits } from '@/content/exhibits'

import { usePageTitle } from '@/lib/usePageTitle'
export default function Chains() {
  usePageTitle('Discovery Chains')
  return (
    <>
      <PageHeader
        eyebrow="EXHIBIT Â· CHAPTER 15"
        title="Eleven Discovery Chains"
        lede="Every chain obeys a strict grammar: because we have unlocked a named error-correction capability â†’ we will discover X â†’ with X we build Y â†’ this impacts people in Z ways. No chain names a discovery date â€” each names the error that must fall, the figure that proves it fell, and the gate that pays for the fall."
      >
        <p className="mt-4 font-sans text-[13px] text-ink-faint">
          Full argument in{' '}
          <Link
            to="/read/ch15"
            className="text-accent underline decoration-hairline underline-offset-2 hover:text-accent-deep hover:decoration-accent"
          >
            Chapter 15 â€” Discovery chains
          </Link>
          .
        </p>
      </PageHeader>

      <section className="mx-auto max-w-[1100px] px-6" aria-label="Discovery chains">
        <div className="space-y-8">
          {exhibits.chains.map((chain) => (
            <ChainCardView key={chain.id} chain={chain} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-24" aria-labelledby="chains-at-a-glance">
        <h2
          id="chains-at-a-glance"
          className="mt-16 font-display text-[28px] tracking-[-0.01em] text-ink"
        >
          At a glance
        </h2>
        <ExhibitTable
          table={exhibits.chainSummary}
          idPrefix="summary"
          caption="All eleven chains at a glance: class, unlock readiness, anchor error figure, policy gate, horizon."
        />
      </section>
    </>
  )
}
