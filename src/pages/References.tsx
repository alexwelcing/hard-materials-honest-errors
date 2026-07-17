import PageHeader from '@/components/PageHeader'
import ReferenceLibrary from '@/components/references/ReferenceLibrary'
import { REPORT_DATE } from '@/lib/report'

export default function References() {
  return (
    <>
      <PageHeader
        eyebrow="APPARATUS"
        title="Reference Library"
        lede={`All 475 sources cited in this report, formatted to GB/T 7714-2015 with tier-1 (T1) venues prioritized. Program statuses and access dates are stated as of the research date, ${REPORT_DATE}; each entry links back to the chapters and sections that cite it.`}
      />
      <div className="mx-auto max-w-[1100px] px-6 pb-24">
        <ReferenceLibrary />
      </div>
    </>
  )
}
