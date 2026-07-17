/**
 * Keyboard shortcuts actually implemented in the app
 * (SearchOverlay.tsx global hotkeys + its result-list navigation).
 * Kept deliberately in sync with the Topbar shortcuts dialog.
 */
const SHORTCUTS: { keys: string[]; action: string }[] = [
  { keys: ['⌘K', 'Ctrl+K'], action: 'Toggle the search palette from anywhere' },
  { keys: ['/'], action: 'Open search (when not typing in a field)' },
  { keys: ['↑', '↓'], action: 'Move through search results' },
  { keys: ['↵'], action: 'Open the highlighted result' },
  { keys: ['esc'], action: 'Close the overlay' },
]

export default function ShortcutsList() {
  return (
    <div>
      <dl className="border-y border-hairline">
        {SHORTCUTS.map(({ keys, action }) => (
          <div
            key={action}
            className="flex items-baseline justify-between gap-6 border-b border-hairline py-2.5 last:border-b-0"
          >
            <dt className="flex shrink-0 gap-1.5">
              {keys.map((k) => (
                <kbd key={k}>{k}</kbd>
              ))}
            </dt>
            <dd className="text-right font-sans text-[13.5px] text-ink-soft">{action}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 font-sans text-[12.5px] leading-relaxed text-ink-faint">
        No other global hotkeys are implemented. Everything else — the theme switcher, the
        navigator, all menus — is keyboard-focusable with <kbd>Tab</kbd> and activated with{' '}
        <kbd>↵</kbd>.
      </p>
    </div>
  )
}
