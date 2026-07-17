import { Link } from 'react-router'
import PageHeader from '@/components/PageHeader'
import Section from '@/components/about/Section'
import StatStrip from '@/components/about/StatStrip'
import ShortcutsList from '@/components/about/ShortcutsList'
import ThemeSwatches from '@/components/about/ThemeSwatches'
import { REPORT_DATE } from '@/lib/report'

import { usePageTitle } from '@/lib/usePageTitle'
export default function About() {
  usePageTitle('About')
  return (
    <>
      <PageHeader eyebrow="COLOPHON" title="About this report" />

      <main className="mx-auto max-w-[1100px] px-6 pb-24">
        <Section title="What this is">
          <div className="max-w-measure space-y-4 font-serif text-[17px] leading-[1.75] text-ink-soft">
            <p>
              An independent-researcher position paper from Lupine Science: a
              meta-review of AI and <em>ab initio</em> simulation errors in nine classes of
              high-value hard materials, and the discovery roadmap those errors imply.
            </p>
            <p>
              It is written in the first person and deliberately evidence-dense, because the field
              it surveys carries a documented trust deficit. One note on vocabulary: throughout,
              MAE means <strong>mean absolute error</strong> — never the model architecture of the
              same initials.
            </p>
          </div>
        </Section>

        <Section title="By the numbers">
          <StatStrip />
        </Section>

        <Section title="Freshness">
          <div className="max-w-measure border-l-[3px] border-verdigris bg-faint px-5 py-4">
            <p className="font-serif text-[16px] leading-[1.75] text-ink-soft">
              Every program status, deadline, and price is stated as of{' '}
              <span className="tabular font-mono text-[14px] text-ink">{REPORT_DATE}</span>.
              Single-source claims are hedged inline rather than repeated as fact. Corrections,
              when needed, will be dated, public, and signed.
            </p>
          </div>
        </Section>

        <Section title="How to cite">
          <div className="max-w-measure">
            <div className="border border-hairline bg-surface px-5 py-4">
              <p className="font-mono text-[13px] leading-[1.9] text-ink">
                Lupine Science. Hard Materials, Honest Errors: a meta-review of AI and
                ab initio simulation errors in nine classes of high-value hard materials[EB/OL].
                2026.
              </p>
            </div>
            <p className="mt-3 font-serif text-[15px] leading-[1.7] text-ink-soft">
              The 475 individual sources, each with its own GB/T 7714 citation, live in the{' '}
              <Link
                to="/references"
                className="text-accent underline decoration-hairline underline-offset-2 hover:text-accent-deep"
              >
                Reference Library
              </Link>
              .
            </p>
          </div>
        </Section>

        <Section id="shortcuts" title="Keyboard shortcuts" className="scroll-mt-24">
          <div className="max-w-measure">
            <ShortcutsList />
          </div>
        </Section>

        <Section title="Reading themes">
          <ThemeSwatches />
        </Section>

        <p className="mt-16 border-t border-hairline pt-5 font-mono text-[12px] leading-[1.8] text-ink-faint">
          Built as a static site — Vite + React 19 + TypeScript + Tailwind. Set in Fraunces,
          Newsreader, Inter, and IBM Plex Mono; math by KaTeX; deployed on Netlify.
        </p>
      </main>
    </>
  )
}
