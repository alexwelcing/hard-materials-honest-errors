import { useEffect, useState } from 'react'

/**
 * Scroll-spy over a list of anchor ids (chapter headings). The entry whose
 * element crosses the top "reading zone" of the viewport (below the 56px
 * topbar, above ~30% of the screen) becomes active. Re-runs when the chapter
 * changes (`resetKey`); `anchors` is memoized by the caller per chapter.
 */
export function useScrollSpy(anchors: string[], resetKey: string): string {
  const [active, setActive] = useState(anchors[0] ?? 'top')

  useEffect(() => {
    setActive(anchors[0] ?? 'top')
    const els = anchors
      .map((a) => document.getElementById(a))
      .filter((el): el is HTMLElement => el !== null)
    if (els.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    )
    for (const el of els) observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- anchors is stable per resetKey
  }, [resetKey])

  return active
}
