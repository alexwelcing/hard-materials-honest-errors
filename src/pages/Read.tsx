import { useParams } from 'react-router'
import PageStub from '@/components/PageStub'
import { getChapter, chapterTitle, chapterShort } from '@/lib/report'

const pad2 = (n: number) => String(n).padStart(2, '0')

export default function Read() {
  const { chapterId } = useParams()
  const ch = chapterId ? getChapter(chapterId) : undefined
  if (!ch) {
    return <PageStub eyebrow="READER" title="Chapter not found" lede={`No chapter with id “${chapterId}”.`} />
  }
  return (
    <PageStub
      eyebrow={`CHAPTER ${pad2(ch.number)} · ${chapterShort(ch.id)}`}
      title={chapterTitle(ch)}
      lede={`${ch.wordCount.toLocaleString('en-US')} words · ${ch.readingTime} min read · Part ${ch.part} — ${ch.partName}. The three-rail reading experience (scroll-spy, citation popovers, prev/next, print) is built on this route.`}
    />
  )
}
