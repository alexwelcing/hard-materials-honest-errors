// Lazy per-chapter body loader. Keeps the 460KB of chapter html out of the
// initial bundle: each chapter compiles to its own chunk, fetched on first read.
import type { SectionHtml } from './bodies/ch01'

export type { SectionHtml }

const loaders = import.meta.glob<{ sections: SectionHtml[] }>('./bodies/ch*.ts')

const cache = new Map<string, Promise<SectionHtml[]>>()

/** Load (and cache) a chapter's body html sections, keyed by anchor. */
export function loadChapterBody(id: string): Promise<SectionHtml[]> {
  let p = cache.get(id)
  if (!p) {
    const loader = loaders[`./bodies/${id}.ts`]
    if (!loader) return Promise.resolve([])
    p = loader().then((m) => m.sections)
    cache.set(id, p)
  }
  return p
}

/** All bodies, for the search index (itself built lazily on first search). */
export function loadAllChapterBodies(): Promise<Map<string, SectionHtml[]>> {
  return Promise.all(
    Object.entries(loaders).map(([path, load]) =>
      load().then((m) => [path.replace('./bodies/', '').replace('.ts', ''), m.sections] as const),
    ),
  ).then((entries) => new Map(entries))
}
