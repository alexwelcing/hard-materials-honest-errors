import { useEffect } from 'react'

const BASE = 'Hard Materials, Honest Errors'

/** Per-route document title: `${title} — Hard Materials, Honest Errors`. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : BASE
    return () => {
      document.title = BASE
    }
  }, [title])
}
