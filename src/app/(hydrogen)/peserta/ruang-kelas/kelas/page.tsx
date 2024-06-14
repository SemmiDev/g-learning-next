'use client'

import { loadMore } from '@/actions/peserta/ruang-kelas/kelas'
import {
  ConferenceCard,
  HeaderCard,
  InformasiCard,
  Materi1Card,
  Materi2Card,
  Materi3Card,
  TugasCard,
  UjianCard,
} from '@/components/page/peserta/ruang-kelas/kelas/diskusi'
import { useEffect, useState } from 'react'
import useInfiniteScroll, {
  ScrollDirection,
} from 'react-easy-infinite-scroll-hook'

type dataType = {
  name: string
  desc: string
}

export default function DiskusiPage() {
  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState<dataType[]>([])

  const loadData = async () => {
    const moreData = await loadMore()
    setData((prev) => [...prev, ...moreData])
  }

  const loadNext = async (direction: ScrollDirection) => {
    if (direction === 'down') {
      await loadData()
    }

    if (data.length > 20) {
      setHasMore(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const ref = useInfiniteScroll({
    next: loadNext,
    windowScroll: true,
    rowCount: 100,
    hasMore: { down: hasMore },
  })

  const cc = 7

  return (
    <div className="flex flex-col lg:w-7/12">
      <HeaderCard className="mt-8" />

      <div ref={ref as any}>
        {data.map((val, idx) => (
          <div className="Row" key={idx}>
            {idx % cc === 0 ? (
              <Materi1Card className="mt-8" />
            ) : idx % cc === 1 ? (
              <TugasCard className="mt-8" />
            ) : idx % cc === 2 ? (
              <ConferenceCard className="mt-8" />
            ) : idx % cc === 3 ? (
              <UjianCard className="mt-8" />
            ) : idx % cc === 4 ? (
              <InformasiCard className="mt-8" />
            ) : idx % cc === 5 ? (
              <Materi2Card className="mt-8" />
            ) : (
              <Materi3Card className="mt-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
