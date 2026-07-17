import type { ReactNode } from 'react'

/** Placeholder page used by route stubs; page agents replace these with the real implementations. */
export default function PageStub({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string
  title: string
  lede?: string
  children?: ReactNode
}) {
  return (
    <div className="mx-auto max-w-[820px] px-6 py-24">
      <p className="micro-label text-verdigris">{eyebrow}</p>
      <h1 className="mt-3 font-display text-[40px] leading-[1.1] tracking-[-0.015em] text-ink">{title}</h1>
      {lede && <p className="mt-4 max-w-measure font-serif text-[19px] leading-[1.72] text-ink-soft">{lede}</p>}
      {children}
      <div className="mt-10 border border-hairline bg-surface p-6">
        <p className="font-mono text-[12px] text-ink-faint">
          Scaffold route — implementation follows in the page build.
        </p>
      </div>
    </div>
  )
}
