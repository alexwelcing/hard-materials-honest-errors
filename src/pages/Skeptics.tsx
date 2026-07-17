import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import SkepticCase from '@/components/skeptics/SkepticCase'
import { exhibits } from '@/content/exhibits'
import { REPORT_DATE } from '@/lib/report'

import { usePageTitle } from '@/lib/usePageTitle'
export default function Skeptics() {
  usePageTitle('Skeptic Register')
  const { rows } = exhibits.skeptics

  return (
    <>
      <PageHeader
        eyebrow="EXHIBIT · TABLE 20.1"
        title="The Skeptic Register"
        lede={`The strongest counter-evidence against this field's celebrated claims — and against this report — steel-manned, with resolution status as of ${REPORT_DATE}.`}
      >
        <p className="mt-4 font-sans text-[13.5px] text-ink-faint">
          Expanded argument in{' '}
          <Link
            to="/read/ch20"
            className="text-accent underline decoration-hairline underline-offset-2 hover:text-accent-deep"
          >
            Chapter 20 — The Skeptic Register
          </Link>
          .
        </p>
      </PageHeader>

      <main className="mx-auto max-w-[1100px] px-6 pb-24">
        <ol className="space-y-6">
          {rows.map((row, i) => (
            <li key={row[1]}>
              <SkepticCase index={i} row={row} />
            </li>
          ))}
        </ol>

        <p className="mt-12 max-w-measure font-serif text-[16px] leading-[1.75] text-ink-soft">
          The register applies inward too. Every quantitative claim in this report carries a
          source, a date, and a confidence flag — auditable in the{' '}
          <Link
            to="/references"
            className="text-accent underline decoration-hairline underline-offset-2 hover:text-accent-deep"
          >
            Reference Library
          </Link>
          .
        </p>
      </main>
    </>
  )
}
