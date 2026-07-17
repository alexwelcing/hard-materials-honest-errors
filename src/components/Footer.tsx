import { Link } from 'react-router'
import { PARTS, EXHIBIT_LINKS, REPORT_DATE } from '@/lib/report'

export default function Footer() {
  return (
    <footer className="no-print border-t border-hairline bg-surface">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/mark.svg" alt="" width={20} height={20} />
            <span className="font-display text-[16px] text-ink">Hard Materials, Honest Errors</span>
          </div>
          <p className="mt-4 max-w-[38ch] font-serif text-[15px] leading-relaxed text-ink-soft">
            An independent-researcher position paper from Lupine Science / Centellic. A meta-review of
            AI and <em>ab initio</em> simulation errors in nine classes of high-value hard materials,
            and the discovery roadmap they imply.
          </p>
          <p className="mt-3 font-mono text-[12px] text-ink-faint">Research date {REPORT_DATE}</p>
        </div>

        <nav aria-label="Report map">
          <p className="micro-label text-verdigris">REPORT MAP</p>
          <ul className="mt-4 space-y-1.5">
            <li>
              <Link to="/contents" className="font-sans text-[13.5px] text-ink-soft hover:text-accent">
                Complete table of contents
              </Link>
            </li>
            {PARTS.map((p) => (
              <li key={p.n}>
                <Link
                  to={`/contents#part-${p.n}`}
                  className="font-sans text-[13.5px] text-ink-soft hover:text-accent"
                >
                  Part {p.n} · {p.name}
                  <span className="ml-2 font-mono text-[11px] text-ink-faint">
                    CH {String(p.chapters[0].number).padStart(2, '0')}–
                    {String(p.chapters[p.chapters.length - 1].number).padStart(2, '0')}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Reference and tools">
          <p className="micro-label text-verdigris">REFERENCE &amp; TOOLS</p>
          <ul className="mt-4 space-y-1.5">
            {EXHIBIT_LINKS.map((l) => (
              <li key={l.route}>
                <Link to={l.route} className="font-sans text-[13.5px] text-ink-soft hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => window.print()}
                className="font-sans text-[13.5px] text-ink-soft hover:text-accent"
              >
                Print
              </button>
            </li>
            <li>
              <Link to="/about#shortcuts" className="font-sans text-[13.5px] text-ink-soft hover:text-accent">
                Keyboard shortcuts
              </Link>
            </li>
            <li>
              <Link to="/about" className="font-sans text-[13.5px] text-ink-soft hover:text-accent">
                About &amp; how to cite
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-2 px-6 py-5 font-sans text-[12px] text-ink-soft md:flex-row md:items-center md:justify-between">
          <span>Every program status, deadline, and price is stated as of {REPORT_DATE}.</span>
          <span className="font-mono text-[11px] text-ink-faint">
            475 references · GB/T 7714-2015 · Set in Fraunces, Newsreader, Inter &amp; IBM Plex Mono
          </span>
        </div>
      </div>
    </footer>
  )
}
