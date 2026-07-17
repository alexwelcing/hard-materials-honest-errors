import { useCallback, useEffect, useState } from 'react'

export type Theme = 'paper' | 'sepia' | 'ink'

const KEY = 'hmhe:theme'
const EVENT = 'hmhe:theme-change'

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'paper'
  const t = document.documentElement.dataset.theme
  return t === 'sepia' || t === 'ink' ? t : 'paper'
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* private mode — theme simply won't persist */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: theme }))
}

/** React binding for the reading theme (paper / sepia / ink), persisted to localStorage. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(getTheme)

  useEffect(() => {
    const onChange = (e: Event) => setThemeState((e as CustomEvent<Theme>).detail)
    window.addEventListener(EVENT, onChange)
    return () => window.removeEventListener(EVENT, onChange)
  }, [])

  const set = useCallback((t: Theme) => setTheme(t), [])
  return [theme, set]
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
