import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import { Menu, Search, MoreHorizontal, Printer, Info, Keyboard, Sun, Sunset, Moon } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import ReportNavigator from '@/components/ReportNavigator'
import SearchOverlay from '@/components/SearchOverlay'
import { useTheme, type Theme } from '@/lib/theme'
import { chapterShort } from '@/lib/report'
import { cn } from '@/lib/utils'

const ROUTE_LABELS: [RegExp, string][] = [
  [/^\/contents/, 'CONTENTS'],
  [/^\/scoreboard/, 'EXHIBIT · SCOREBOARD'],
  [/^\/matrix/, 'EXHIBIT · MASTER MATRIX'],
  [/^\/chains/, 'EXHIBIT · DISCOVERY CHAINS'],
  [/^\/roadmap/, 'EXHIBIT · ROADMAP'],
  [/^\/skeptics/, 'EXHIBIT · SKEPTIC REGISTER'],
  [/^\/references/, 'REFERENCE LIBRARY'],
  [/^\/glossary/, 'GLOSSARY'],
  [/^\/about/, 'ABOUT'],
]

function Breadcrumb() {
  const { pathname } = useLocation()
  const { chapterId } = useParams()
  let label: string | null = null
  if (chapterId) label = `CH ${chapterId.replace('ch', '')} · ${chapterShort(chapterId)}`
  else for (const [re, l] of ROUTE_LABELS) if (re.test(pathname)) label = l
  if (!label) return null
  return (
    <span className="micro-label hidden truncate text-ink-soft md:block" aria-live="polite">
      {label}
    </span>
  )
}

const THEMES: { key: Theme; label: string; icon: typeof Sun }[] = [
  { key: 'paper', label: 'Paper theme', icon: Sun },
  { key: 'sepia', label: 'Sepia theme', icon: Sunset },
  { key: 'ink', label: 'Ink dark theme', icon: Moon },
]

function ThemeSwitcher() {
  const [theme, setTheme] = useTheme()
  return (
    <div
      role="group"
      aria-label="Reading theme"
      className="flex items-center rounded-sm border border-hairline p-0.5"
    >
      {THEMES.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          title={label}
          aria-label={label}
          aria-pressed={theme === key}
          onClick={() => setTheme(key)}
          className={cn(
            'rounded-xs p-1.5 transition-colors',
            theme === key ? 'bg-faint text-accent' : 'text-ink-faint hover:text-ink',
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </button>
      ))}
    </div>
  )
}

/** 2px rust reading-progress hairline under the topbar on /read/* routes. */
function ReadingProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const doc = document.documentElement
        const max = doc.scrollHeight - doc.clientHeight
        setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent transition-transform duration-75"
      style={{ transform: `scaleX(${p})` }}
    />
  )
}

const SHORTCUTS: [string, string][] = [
  ['⌘K / Ctrl+K', 'Open search'],
  ['/', 'Open search'],
  ['↑ ↓', 'Move through results'],
  ['↵', 'Open highlighted result'],
  ['esc', 'Close overlay'],
]

export default function Topbar() {
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const { pathname } = useLocation()
  const isReadPage = pathname.startsWith('/read/')

  return (
    <>
      <header className="no-print sticky top-0 z-50 border-b border-hairline bg-surface/90 backdrop-blur">
        <div className="relative flex h-14 items-center gap-3 px-4">
          <Sheet open={navOpen} onOpenChange={setNavOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open report navigator"
                className="rounded-sm p-2 text-ink-soft hover:bg-faint hover:text-ink"
              >
                <Menu className="h-4 w-4" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] border-hairline bg-surface p-0" aria-describedby={undefined}>
              <SheetTitle className="sr-only">Report navigator</SheetTitle>
              <ReportNavigator onNavigate={() => setNavOpen(false)} />
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label="Hard Materials, Honest Errors — home">
            <img src="/mark.svg" alt="" width={20} height={20} className="shrink-0" />
            <span className="hidden truncate font-display text-[17px] leading-none text-ink sm:block">
              Hard Materials, Honest Errors
            </span>
          </Link>

          <div className="flex flex-1 justify-center">
            <Breadcrumb />
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search the report (⌘K)"
            className="flex items-center gap-2 rounded-sm border border-hairline px-2.5 py-1.5 text-ink-soft transition-colors hover:bg-faint hover:text-ink"
          >
            <Search className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden font-sans text-[13px] lg:block">Search</span>
            <kbd className="hidden lg:block">⌘K</kbd>
          </button>

          <ThemeSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="More actions"
                className="rounded-sm p-2 text-ink-soft hover:bg-faint hover:text-ink"
              >
                <MoreHorizontal className="h-4 w-4" aria-hidden />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-hairline bg-surface">
              <DropdownMenuItem onSelect={() => window.print()}>
                <Printer className="mr-2 h-3.5 w-3.5" aria-hidden /> Print
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShortcutsOpen(true)}>
                <Keyboard className="mr-2 h-3.5 w-3.5" aria-hidden /> Keyboard shortcuts
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-hairline" />
              <DropdownMenuItem asChild>
                <Link to="/about">
                  <Info className="mr-2 h-3.5 w-3.5" aria-hidden /> About the report
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isReadPage && <ReadingProgress />}
        </div>
      </header>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />

      <Dialog open={shortcutsOpen} onOpenChange={setShortcutsOpen}>
        <DialogContent className="max-w-[420px] border-hairline bg-surface" aria-describedby={undefined}>
          <DialogTitle className="font-display text-[19px] text-ink">Keyboard shortcuts</DialogTitle>
          <ul className="mt-2 space-y-2">
            {SHORTCUTS.map(([keys, action]) => (
              <li key={keys} className="flex items-center justify-between gap-4">
                <kbd>{keys}</kbd>
                <span className="font-sans text-[13px] text-ink-soft">{action}</span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  )
}
