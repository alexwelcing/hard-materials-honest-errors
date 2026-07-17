import { Link } from 'react-router'

const BACK_MATTER: { route: string; label: string; note: string }[] = [
  { route: '/references', label: 'Reference Library', note: 'all 475 sources, GB/T 7714' },
  { route: '/glossary', label: 'Glossary', note: 'terms and units, by group' },
]

/** Closing row of back-matter exhibit links. */
export default function BackMatter() {
  return (
    <section aria-label="Back matter" className="mt-16 border-t border-hairline pt-6">
      <p className="micro-label text-ink-faint">BACK MATTER</p>
      <ul className="mt-3 space-y-1">
        {BACK_MATTER.map((l) => (
          <li key={l.route}>
            <Link
              to={l.route}
              className="group flex items-baseline gap-3 rounded-sm px-2 py-2 hover:bg-faint"
            >
              <span aria-hidden className="font-mono text-[11px] text-ink-faint group-hover:text-accent">
                →
              </span>
              <span className="font-sans text-[15px] text-ink group-hover:text-accent-deep">
                {l.label}
              </span>
              <span className="font-mono text-[11px] tabular text-ink-faint">{l.note}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
