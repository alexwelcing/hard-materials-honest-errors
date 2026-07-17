import PageHeader from '@/components/PageHeader'
import GlossaryExplorer from '@/components/glossary/GlossaryExplorer'

export default function Glossary() {
  return (
    <>
      <PageHeader
        eyebrow="APPARATUS"
        title="Glossary"
        lede="The report's working vocabulary, grouped by theme. One disambiguation up front: MAE means mean absolute error throughout; magnetocrystalline anisotropy energy is spelled out in full wherever it appears."
      />
      <div className="mx-auto max-w-[1100px] px-6 pb-24">
        <GlossaryExplorer />
      </div>
    </>
  )
}
