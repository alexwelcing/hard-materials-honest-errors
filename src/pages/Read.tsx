import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import { Printer } from 'lucide-react'
import PageStub from '@/components/PageStub'
import ErrorBarGlyph from '@/components/ErrorBarGlyph'
import ChapterToc, { type TocEntry } from '@/components/reader/ChapterToc'
import CitePopover, { type CiteTarget } from '@/components/reader/CitePopover'
import ChapterAside from '@/components/reader/ChapterAside'
import ChapterPager from '@/components/reader/ChapterPager'
import { useScrollSpy } from '@/components/reader/useScrollSpy'
import { getChapter, chapterTitle, chapterShort } from '@/lib/report'
import { chapters, type Chapter } from '@/content/chapters'
import { mathifyHtml } from '@/lib/mathHtml'
import { setReadingSession } from '@/lib/readingState'
import { cn } from '@/lib/utils'

const pad2 = (n: number) => String(n).padStart(2, '0')

export default function Read() {
  const { chapterId } = useParams()
  const ch = chapterId ? getChapter(chapterId) : undefined
  if (!ch) {
    return <PageStub eyebrow="READER" title="Chapter not found" lede={`No chapter with id “${chapterId}”.`} />
  }
  return <ChapterReader key={ch.id} chapter={ch} />
}

function ChapterReader({ chapter: ch }: { chapter: Chapter }) {
  const { hash } = useLocation()
  const proseWrapRef = useRef<HTMLDivElement>(null)
  const [cite, setCite] = useState<CiteTarget | null>(null)
  const [progress, setProgress] = useState(0)

  const index = chapters.findIndex((c) => c.id === ch.id)
  const prev = index > 0 ? chapters[index - 1] : undefined
  const next = index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined

  // Typeset all section HTML once per chapter.
  const sectionsHtml = useMemo(() => ch.sections.map((s) => mathifyHtml(s.html)), [ch])

  // TOC: an entry for the top, then every titled level-2 section.
  const toc = useMemo<TocEntry[]>(
    () => [
      { anchor: 'top', label: chapterTitle(ch) },
      ...ch.sections
        .filter((s) => s.level === 2 && s.title)
        .map((s) => ({ anchor: s.anchor, label: s.title })),
    ],
    [ch],
  )
  const spyAnchors = useMemo(() => toc.map((t) => t.anchor), [toc])
  const active = useScrollSpy(spyAnchors, ch.id)
  const activeRef = useRef(active)
  activeRef.current = active

  // Honor deep links (/read/:chapterId#anchor) on mount / hash change.
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      const raf = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView()
      })
      return () => cancelAnimationFrame(raf)
    }
    window.scrollTo(0, 0)
  }, [hash])

  // Reading progress → right-rail bar + persisted session (throttled ~400ms).
  useEffect(() => {
    let lastRun = 0
    let timer: number | undefined
    const measure = () => {
      const el = proseWrapRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1
      setProgress(p)
      setReadingSession({ chapterId: ch.id, anchor: activeRef.current, progress: p })
    }
    const onScroll = () => {
      const wait = 400 - (Date.now() - lastRun)
      if (wait <= 0) {
        lastRun = Date.now()
        measure()
      } else if (timer === undefined) {
        timer = window.setTimeout(() => {
          timer = undefined
          lastRun = Date.now()
          measure()
        }, wait)
      }
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [ch.id])

  // Citation popovers via click delegation on the prose container.
  const closeCite = useCallback(() => setCite(null), [])
  const onProseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const sup = (e.target as HTMLElement).closest('sup.cite')
    if (!sup || !proseWrapRef.current) return
    const n = Number(sup.getAttribute('data-ref'))
    if (!Number.isFinite(n)) return
    const sr = sup.getBoundingClientRect()
    const wr = proseWrapRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(sr.left - wr.left, wr.width - 296))
    setCite({ n, x, y: sr.bottom - wr.top + 8 })
  }

  return (
    <div className="mx-auto max-w-[1100px] px-6 py-16">
      <div className="xl:grid xl:grid-cols-[180px_minmax(0,1fr)_180px] xl:gap-12">
        {/* Left rail — per-chapter TOC with scroll-spy (xl only) */}
        <aside className="no-print hidden self-start xl:sticky xl:top-24 xl:block xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto">
          <p className="micro-label text-verdigris">IN THIS CHAPTER</p>
          <ChapterToc entries={toc} active={active} className="mt-3" />
        </aside>

        {/* Center column — header, body, pager */}
        <div className="min-w-0">
          <header id="top" className="scroll-mt-24">
            <p className="micro-label text-verdigris">
              CHAPTER {pad2(ch.number)} · {chapterShort(ch.id)}
            </p>
            <h1 className="mt-3 font-display text-[40px] leading-[1.08] tracking-[-0.015em] text-ink">
              {chapterTitle(ch)}
            </h1>
            <p className="mt-3 font-sans text-[14px] text-ink-soft">
              Part {ch.part} — {ch.partName}
            </p>
            <p className="mt-2 font-mono text-[12px] tabular text-ink-faint">
              {ch.wordCount.toLocaleString('en-US')} words · {ch.readingTime} min read
            </p>
            <div className="mt-6 flex items-center justify-between border-b border-hairline pb-6">
              <ErrorBarGlyph width={72} className="text-ink-faint" />
              <button
                type="button"
                onClick={() => window.print()}
                className="no-print micro-label flex items-center gap-1.5 text-ink-faint transition-colors hover:text-accent"
              >
                <Printer size={13} /> PRINT CHAPTER
              </button>
            </div>
          </header>

          {/* Collapsible TOC on smaller screens */}
          <details className="no-print mt-8 border border-hairline bg-surface px-4 py-3 xl:hidden">
            <summary className="micro-label cursor-pointer text-verdigris">IN THIS CHAPTER</summary>
            <ChapterToc entries={toc} active={active} className="mt-3" />
          </details>

          {/* Chapter body */}
          <div ref={proseWrapRef} className="relative">
            <div className="prose-report mt-10" onClick={onProseClick}>
              {ch.sections.map((s, i) => {
                const html = sectionsHtml[i]
                const opener = i === 0
                if (s.level === 2 && s.title) {
                  return (
                    <section key={s.anchor}>
                      <h2 id={s.anchor} className="scroll-mt-24">
                        {s.title}
                      </h2>
                      {html && (
                        <div
                          className={cn(opener && 'chapter-opener')}
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      )}
                    </section>
                  )
                }
                // Level-4 sub-blocks (numeric "titles") and untitled openers render html only.
                return (
                  <div
                    key={s.anchor}
                    id={s.anchor}
                    className={cn('scroll-mt-24', opener && 'chapter-opener')}
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                )
              })}
            </div>
            {cite && <CitePopover cite={cite} onClose={closeCite} />}
          </div>

          <ChapterPager prev={prev} next={next} />
        </div>

        {/* Right rail — quiet metadata + vertical progress (xl only) */}
        <aside className="no-print hidden self-start xl:sticky xl:top-24 xl:block">
          <ChapterAside chapter={ch} progress={progress} />
        </aside>
      </div>
    </div>
  )
}
