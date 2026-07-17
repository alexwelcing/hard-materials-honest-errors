import { Link } from 'react-router'
import { getChapter } from '@/lib/report'

const pad2 = (n: number) => String(n).padStart(2, '0')

interface ReadingPath {
  name: string
  description: string
  chapterIds: string[]
}

const PATHS: ReadingPath[] = [
  {
    name: 'THE ARGUMENT (45 MIN)',
    description: 'The thesis end-to-end: summary, method, the discovery grammar, and the phased commitment.',
    chapterIds: ['ch01', 'ch03', 'ch15', 'ch18'],
  },
  {
    name: 'THE EVIDENCE',
    description: 'The error audit itself: framing, benchmark floors across the classes, stability, and the master matrix.',
    chapterIds: ['ch02', 'ch04', 'ch07', 'ch09', 'ch13', 'ch14'],
  },
  {
    name: 'THE PROGRAM',
    description: 'From measured error to venture: policy demand, roadmap, partnership, dissent, and conclusion.',
    chapterIds: ['ch16', 'ch17', 'ch18', 'ch19', 'ch20', 'ch22'],
  },
]

/** Three curated routes through the report, each as linked chapter chips. */
export default function ReadingPaths() {
  return (
    <section aria-label="Guided reading paths" className="mt-10">
      <p className="micro-label text-verdigris">GUIDED READING PATHS</p>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {PATHS.map((path) => (
          <div key={path.name} className="border border-hairline px-5 py-4">
            <p className="micro-label text-ink-faint">{path.name}</p>
            <p className="mt-2.5 font-serif text-[14.5px] leading-[1.6] text-ink-soft">
              {path.description}
            </p>
            <p className="mt-3.5 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
              {path.chapterIds.map((id, i) => {
                const ch = getChapter(id)
                if (!ch) return null
                return (
                  <span key={id} className="flex items-center gap-1.5">
                    {i > 0 && (
                      <span aria-hidden className="font-mono text-[10px] text-ink-faint">
                        →
                      </span>
                    )}
                    <Link
                      to={`/read/${id}`}
                      className="border border-hairline px-1.5 py-0.5 font-mono text-[11px] tabular text-ink-soft hover:border-accent hover:text-accent-deep"
                    >
                      {pad2(ch.number)}
                    </Link>
                  </span>
                )
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
