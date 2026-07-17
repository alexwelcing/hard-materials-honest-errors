import type { Reference } from '@/content/references'

/**
 * References (334KB) stay out of the initial bundle: loaded once, on demand —
 * the reader prefetches on mount, the citation popover reads the warm cache.
 */
let promise: Promise<Reference[]> | null = null
let cache: Reference[] | null = null
let byN: Map<number, Reference> | null = null

export function preloadReferences(): Promise<Reference[]> {
  if (!promise) {
    promise = import('@/content/references').then((m) => {
      cache = m.references
      byN = new Map(m.references.map((r) => [r.n, r]))
      return cache
    })
  }
  return promise
}

/** Sync accessor; null until preloadReferences() has resolved. */
export const getReferenceSync = (n: number): Reference | undefined => byN?.get(n)
