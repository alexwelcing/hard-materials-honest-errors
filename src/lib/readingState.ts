/**
 * Reading-session state shared between the reader pages (writers) and the
 * home hero / report navigator (readers). Storage contract:
 *  - 'hmhe:reading'        → last ReadingSession (resume card on Home)
 *  - 'hmhe:read-progress'  → { [chapterId]: number } 0..1 per chapter (navigator dots)
 */
export interface ReadingSession {
  chapterId: string
  anchor?: string
  /** 0..1 fraction of the chapter read. */
  progress: number
}

const SESSION_KEY = 'hmhe:reading'
const PROGRESS_KEY = 'hmhe:read-progress'

export function getReadingSession(): ReadingSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as ReadingSession
    if (!s || typeof s.chapterId !== 'string' || typeof s.progress !== 'number') return null
    return s
  } catch {
    return null
  }
}

export function setReadingSession(session: ReadingSession) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    const map = getReadProgressMap()
    map[session.chapterId] = Math.max(map[session.chapterId] ?? 0, session.progress)
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(map))
  } catch {
    /* non-persistent */
  }
}

export function getReadProgressMap(): Record<string, number> {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    const m = raw ? (JSON.parse(raw) as unknown) : {}
    return m && typeof m === 'object' ? (m as Record<string, number>) : {}
  } catch {
    return {}
  }
}

export function getChapterProgress(chapterId: string): number {
  return getReadProgressMap()[chapterId] ?? 0
}
