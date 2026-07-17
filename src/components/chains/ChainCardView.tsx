import type { ReactNode } from 'react'
import type { ChainCard } from '@/content/exhibits'
import { mathifyHtml, mathifyText } from '@/lib/mathHtml'
import { cn } from '@/lib/utils'

const READINESS_STYLES: Record<string, string> = {
  H: 'bg-ready-h/15 text-ready-h',
  M: 'bg-ready-m/15 text-ready-m',
  L: 'bg-ready-l/15 text-ready-l',
}

const READINESS_LABEL: Record<string, string> = {
  H: 'high',
  M: 'medium',
  L: 'low',
}

function html(s: string) {
  return { __html: mathifyText(s) }
}

/** Dashed connector between grammar boxes: vertical on mobile, horizontal on md+. */
function Connector() {
  return (
    <span aria-hidden className="flex items-center justify-center self-stretch py-1 md:w-9 md:py-0">
      <svg width="6" height="22" viewBox="0 0 6 22" fill="none" className="md:hidden">
        <line
          x1="3"
          y1="1"
          x2="3"
          y2="21"
          stroke="rgb(var(--accent))"
          strokeWidth="1.5"
          className="chain-dash-flow"
        />
      </svg>
      <svg width="36" height="6" viewBox="0 0 36 6" fill="none" className="hidden md:block">
        <line
          x1="1"
          y1="3"
          x2="35"
          y2="3"
          stroke="rgb(var(--accent))"
          strokeWidth="1.5"
          className="chain-dash-flow"
        />
      </svg>
    </span>
  )
}

function StepBox({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 flex-1 border border-hairline bg-surface p-3.5">
      <p className="micro-label text-[9px] text-verdigris">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  )
}

function StepText({ text }: { text: string }) {
  return (
    <p
      className="font-sans text-[13px] leading-relaxed text-ink"
      dangerouslySetInnerHTML={html(text || '—')}
    />
  )
}

/**
 * One discovery chain: header (number / title / readiness / horizon), the strict
 * chain sentence, the UNLOCK → DISCOVER → BUILD → IMPACT grammar diagram, the
 * current → solved target, and an expandable defense rendered from generated HTML.
 */
export default function ChainCardView({ chain }: { chain: ChainCard }) {
  const num = String(chain.id).padStart(2, '0')
  return (
    <article
      id={`chain-${chain.id}`}
      className="scroll-mt-24 border border-hairline bg-paper p-6 md:p-8"
    >
      <header className="flex flex-wrap items-start gap-x-4 gap-y-3">
        <span className="tabular bg-accent/10 px-2 py-1 font-mono text-[12px] font-semibold text-accent">
          {num}
        </span>
        <h3 className="min-w-0 flex-1 basis-60 font-sans text-[17px] leading-snug font-semibold text-ink">
          {chain.title}
        </h3>
        <span
          className={cn(
            'px-2 py-1 font-mono text-[11px] font-semibold',
            READINESS_STYLES[chain.readiness] ?? 'bg-faint text-ink-soft',
          )}
          aria-label={`Unlock readiness ${chain.readiness} (${READINESS_LABEL[chain.readiness] ?? 'unknown'})`}
        >
          {chain.readiness}
        </span>
        <span className="w-full font-mono text-[11.5px] leading-relaxed text-ink-faint md:w-auto md:max-w-[240px] md:text-right">
          {chain.horizon}
        </span>
      </header>

      <p
        className="mt-5 max-w-measure font-serif text-[17px] leading-relaxed text-ink italic"
        dangerouslySetInnerHTML={html(chain.sentence)}
      />

      <div className="mt-6 flex flex-col md:flex-row md:items-stretch">
        <StepBox label="UNLOCK">
          <StepText text={chain.unlock} />
        </StepBox>
        <Connector />
        <StepBox label="DISCOVER">
          <StepText text={chain.discover} />
        </StepBox>
        <Connector />
        <StepBox label="BUILD">
          <StepText text={chain.build} />
        </StepBox>
        <Connector />
        <StepBox label="IMPACT">
          <ul className="space-y-1.5">
            {chain.impacts.map((imp, i) => (
              <li key={i} className="flex gap-2 font-sans text-[13px] leading-relaxed text-ink">
                <span aria-hidden className="shrink-0 text-accent">
                  –
                </span>
                <span dangerouslySetInnerHTML={html(imp)} />
              </li>
            ))}
          </ul>
        </StepBox>
      </div>

      <p className="mt-6 border-t border-hairline pt-4 font-mono text-[12.5px] leading-relaxed text-ink-soft">
        <span className="micro-label mr-3 text-ink-faint">CURRENT → SOLVED</span>
        <span dangerouslySetInnerHTML={html(chain.solved)} />
      </p>

      <details className="group mt-4 border-t border-hairline pt-4">
        <summary className="micro-label inline-flex cursor-pointer items-center gap-2 text-verdigris transition-colors hover:text-accent">
          Why this is defensible
          <span aria-hidden className="font-mono text-[11px] transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div
          className="prose-report mt-3 text-[15px] leading-[1.7] text-ink-soft"
          dangerouslySetInnerHTML={{ __html: mathifyHtml(chain.defenseHtml) }}
        />
      </details>
    </article>
  )
}
