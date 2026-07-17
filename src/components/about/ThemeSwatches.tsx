import { useTheme, type Theme } from '@/lib/theme'
import { cn } from '@/lib/utils'

const THEMES: { key: Theme; name: string; blurb: string }[] = [
  { key: 'paper', name: 'Paper', blurb: 'the default reading light' },
  { key: 'sepia', name: 'Sepia', blurb: 'warmer, lower contrast' },
  { key: 'ink', name: 'Ink', blurb: 'dark, for late sessions' },
]

/**
 * Reading-theme switcher. Swatches use the live design tokens, so they
 * re-render in whichever theme is active; the active button gets an accent border.
 */
export default function ThemeSwatches() {
  const [theme, setTheme] = useTheme()

  return (
    <div>
      <div role="group" aria-label="Reading theme" className="flex flex-wrap gap-3">
        {THEMES.map(({ key, name, blurb }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTheme(key)}
            aria-pressed={theme === key}
            className={cn(
              'flex items-center gap-3 rounded-sm border bg-surface px-4 py-3 transition-colors',
              theme === key ? 'border-accent' : 'border-hairline hover:border-ink-faint',
            )}
          >
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-hairline bg-paper font-serif text-[15px] text-ink"
            >
              Aa
            </span>
            <span className="text-left">
              <span className="block font-sans text-[13.5px] font-medium text-ink">{name}</span>
              <span className="block font-sans text-[12px] text-ink-faint">{blurb}</span>
            </span>
          </button>
        ))}
      </div>
      <p className="mt-3 font-sans text-[12.5px] text-ink-faint">
        The choice persists between visits; the same switcher lives in the top bar.
      </p>
    </div>
  )
}
