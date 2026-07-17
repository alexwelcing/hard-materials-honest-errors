import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Numbered About-page section: display h2 + content block. */
export default function Section({
  id,
  title,
  children,
  className,
}: {
  id?: string
  title: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn('mt-14', className)} aria-label={title}>
      <h2 className="font-display text-[24px] tracking-[-0.01em] text-ink">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}
