import { Routes, Route, Link } from 'react-router'
import { MotionConfig } from 'framer-motion'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Contents from '@/pages/Contents'
import Read from '@/pages/Read'
import Scoreboard from '@/pages/Scoreboard'
import Matrix from '@/pages/Matrix'
import Chains from '@/pages/Chains'
import Roadmap from '@/pages/Roadmap'
import Skeptics from '@/pages/Skeptics'
import References from '@/pages/References'
import Glossary from '@/pages/Glossary'
import About from '@/pages/About'

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
          <Route path="contents" element={<Contents />} />
          <Route path="read/:chapterId" element={<Read />} />
          <Route path="scoreboard" element={<Scoreboard />} />
          <Route path="matrix" element={<Matrix />} />
          <Route path="chains" element={<Chains />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="skeptics" element={<Skeptics />} />
          <Route path="references" element={<References />} />
          <Route path="glossary" element={<Glossary />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </MotionConfig>
  )
}
