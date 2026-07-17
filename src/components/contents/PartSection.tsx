import { useState } from 'react'
import { Link } from 'react-router'
import { chapterTitle } from '@/lib/report'
import type { Chapter, SectionMeta } from '@/content/chapters'
import ReadDot from './ReadDot'

const pad2 = (n: number) => String(n).padStart(2, '0')

/** Level-2 section titles with real headings, linkable by anchor. */
const tocSections = (ch: Chapter): SectionMeta[] =>
  ch.sections.filter((s) => s.level === 2 && s.title.trim().length > 0)

/** One chapter row: read dot, number, title, mono meta; sections behind an expander. */
function ChapterRow({ ch }: { ch: Chapter }) {
  const [open, setOpen] = useState(false)
  const sections = tocSections(ch)

  return (
    <li className="border-b border-hairline last:border-b-0">
      <Link
        to={`/read/${ch.id}`}
        className="group flex items-baseline gap-3 rounded-sm px-2 py-3 hover:bg-faint"
      >
        <ReadDot chapterId={ch.id} />
        <span className="font-mono text-[12px] tabular text-ink-faint">{pad2(ch.number)}</span>
        <span className="flex-1 font-sans text-[15px] leading-snug text-ink group-hover:text-accent-deep">
          {chapterTitle(ch)}
        </span>
        <span className="font-mono text-[11px] tabular text-ink-faint">
          {(ch.wordCount / 1000).toFixed(1)}k · {ch.readingTime} min
        </span>
      </Link>
      {sections.length > 0 && (
        <div className="px-2 pb-2.5">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-[38px] font-mono text-[11px] tabular text-ink-faint hover:text-accent-deep"
          >
            {open ? '−' : '+'} {sections.length} section{sections.length === 1 ? '' : 's'}
          </button>
          {open && (
            <ul className="ml-[38px] mt-1.5 space-y-0.5 border-l border-hairline pl-3">
              {sections.map((s) => (
                <li key={s.anchor}>
                  <Link
                    to={`/read/${ch.id}#${s.anchor}`}
                    className="group/sec flex items-baseline gap-2 rounded-sm py-0.5"
                  >
                    <span aria-hidden className="font-mono text-[11px] text-ink-faint group-hover/sec:text-accent">
                      #
                    </span>
                    <span className="font-sans text-[13px] leading-snug text-ink-soft group-hover/sec:text-accent-deep">
                      {s.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  )
}

/** A report part: heading plus its chapter rows, anchored for footer deep-links. */
export default function PartSection({
  part,
}: {
  part: { n: number; name: string; chapters: Chapter[] }
}) {
  return (
    <section id={`part-${part.n}`} className="mt-14 scroll-mt-24">
      <p className="micro-label text-verdigris">PART {part.n}</p>
      <h2 className="mt-2 font-display text-[26px] leading-tight tracking-[-0.01em] text-ink">
        {part.name}
      </h2>
      <p className="mt-1 font-mono text-[11px] tabular text-ink-faint">
        {part.chapters.length} chapter{part.chapters.length === 1 ? '' : 's'} ·{' '}
        {part.chapters.reduce((s, ch) => s + ch.readingTime, 0)} min
      </p>
      <ul className="mt-5 border-t border-hairline">
        {part.chapters.map((ch) => (
          <ChapterRow key={ch.id} ch={ch} />
        ))}
      </ul>
    </section>
  )
}
