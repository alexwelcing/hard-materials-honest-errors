import type { ReactNode } from 'react'
import ErrorBarGlyph from '@/components/ErrorBarGlyph'

/** Standard page opener for exhibit/reference pages: eyebrow, display title, lede. */
export default function PageHeader({
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
    <header className="mx-auto max-w-[1100px] px-6 pt-20 pb-10">
      <p className="micro-label text-verdigris">{eyebrow}</p>
      <h1 className="mt-3 font-display text-[40px] leading-[1.1] tracking-[-0.015em] text-ink md:text-[48px]">
        {title}
      </h1>
      <ErrorBarGlyph className="mt-5 text-ink-faint" width={72} />
      {lede && (
        <p className="mt-5 max-w-measure font-serif text-[18px] leading-[1.7] text-ink-soft">{lede}</p>
      )}
      {children}
    </header>
  )
}
