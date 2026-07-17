import PageHeader from '@/components/PageHeader'
import StatStrip from '@/components/contents/StatStrip'
import ReadingPaths from '@/components/contents/ReadingPaths'
import PartSection from '@/components/contents/PartSection'
import BackMatter from '@/components/contents/BackMatter'
import { PARTS, REPORT_DATE, REPORT_STATS } from '@/lib/report'

import { usePageTitle } from '@/lib/usePageTitle'
export default function Contents() {
  usePageTitle('Contents')
  return (
    <div className="pb-24">
      <PageHeader
        eyebrow="REPORT MAP"
        title="Contents"
        lede={`The complete map of the report: ${REPORT_STATS.chapters} chapters in six parts, ${REPORT_STATS.words} words, and ${REPORT_STATS.references} references, researched as of ${REPORT_DATE}. Jump to a part, follow a guided path, or pick up where the read-state dots left off.`}
      />
      <main className="mx-auto max-w-[1100px] px-6">
        <StatStrip />
        <ReadingPaths />
        {PARTS.map((part) => (
          <PartSection key={part.n} part={part} />
        ))}
        <BackMatter />
      </main>
    </div>
  )
}
