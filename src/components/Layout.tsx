import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import Topbar from '@/components/Topbar'
import Footer from '@/components/Footer'
import { prefersReducedMotion } from '@/lib/theme'

gsap.registerPlugin(ScrollTrigger)

/**
 * Site chrome. Routing contract: this Layout renders <Outlet/>, so App.tsx
 * MUST nest all page <Route>s inside a parent layout route (pattern B) —
 * never wrap <Routes> as children of Layout.
 *
 * The sticky 56px topbar stays in normal document flow, so the content slot
 * starts below it with no per-page offset bookkeeping.
 */
export default function Layout() {
  const { pathname, hash } = useLocation()

  /* Lenis smooth scrolling site-wide (lerp 0.11); off under reduced motion.
     Kept in sync with GSAP's ScrollTrigger for the home-hero scrub. */
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.11, anchors: true })
    lenis.on('scroll', ScrollTrigger.update)
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  /* New page → top of document (hash links handled by the browser/Lenis). */
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="flex min-h-[100dvh] flex-col bg-paper text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-surface focus:px-3 focus:py-2 focus:font-sans focus:text-[13px] focus:text-ink focus:shadow"
      >
        Skip to content
      </a>
      <Topbar />
      {/* Page transition: opacity 0→1, y 8→0, 180ms easeOut (design §5). */}
      <motion.main
        key={pathname}
        id="main-content"
        className="flex-1"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </div>
  )
}
