import { lazy, Suspense } from 'react'
import { Routes, Route, Link } from 'react-router'
import { MotionConfig } from 'framer-motion'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import ErrorBarGlyph from '@/components/ErrorBarGlyph'

/* Route-level code splitting: every page (and the content it imports)
   compiles to its own chunk, fetched on first visit. Home stays eager —
   it is the landing page. */
const Contents = lazy(() => import('@/pages/Contents'))
const Read = lazy(() => import('@/pages/Read'))
const Scoreboard = lazy(() => import('@/pages/Scoreboard'))
const Matrix = lazy(() => import('@/pages/Matrix'))
const Chains = lazy(() => import('@/pages/Chains'))
const Roadmap = lazy(() => import('@/pages/Roadmap'))
const Skeptics = lazy(() => import('@/pages/Skeptics'))
const References = lazy(() => import('@/pages/References'))
const Glossary = lazy(() => import('@/pages/Glossary'))
const About = lazy(() => import('@/pages/About'))

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" aria-label="Loading page">
      <ErrorBarGlyph width={64} className="animate-pulse text-ink-faint" />
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-[820px] px-6 py-24">
      <p className="micro-label text-verdigris">404</p>
      <h1 className="mt-3 font-display text-[40px] tracking-[-0.015em] text-ink">Page not found</h1>
      <p className="mt-4 font-serif text-[19px] text-ink-soft">
        This page fell outside the error bars.{' '}
        <Link to="/" className="text-accent underline decoration-hairline underline-offset-4 hover:text-accent-deep">
          Return to the cover →
        </Link>
      </p>
    </div>
  )
}

/**
 * Routing contract (pattern B): Layout renders <Outlet/>, so every page route
 * is nested inside the layout route below — never passed as Layout children.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="contents"
            element={
              <Suspense fallback={<PageLoader />}>
                <Contents />
              </Suspense>
            }
          />
          <Route
            path="read/:chapterId"
            element={
              <Suspense fallback={<PageLoader />}>
                <Read />
              </Suspense>
            }
          />
          <Route
            path="scoreboard"
            element={
              <Suspense fallback={<PageLoader />}>
                <Scoreboard />
              </Suspense>
            }
          />
          <Route
            path="matrix"
            element={
              <Suspense fallback={<PageLoader />}>
                <Matrix />
              </Suspense>
            }
          />
          <Route
            path="chains"
            element={
              <Suspense fallback={<PageLoader />}>
                <Chains />
              </Suspense>
            }
          />
          <Route
            path="roadmap"
            element={
              <Suspense fallback={<PageLoader />}>
                <Roadmap />
              </Suspense>
            }
          />
          <Route
            path="skeptics"
            element={
              <Suspense fallback={<PageLoader />}>
                <Skeptics />
              </Suspense>
            }
          />
          <Route
            path="references"
            element={
              <Suspense fallback={<PageLoader />}>
                <References />
              </Suspense>
            }
          />
          <Route
            path="glossary"
            element={
              <Suspense fallback={<PageLoader />}>
                <Glossary />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  )
}
