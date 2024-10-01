'use client'

import { loadMoreAction } from '@/actions/pengajar/ruang-kelas/kelas'
import { Fragment, useEffect, useState } from 'react'
import useInfiniteScroll, {
  ScrollDirection,
} from 'react-easy-infinite-scroll-hook'
import { useQuery } from '@tanstack/react-query'
import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { useParams } from 'next/navigation'
import HeaderPengajarCard from './diskusi/pengajar-header-card'
import MateriCard from './diskusi/materi-card'
import TugasCard from './diskusi/tugas-card'
import ConferenceCard from './diskusi/conference-card'
import UjianCard from './diskusi/ujian-card'
import InformasiCard from './diskusi/informasi-card'
import PengajarHeaderCard from './diskusi/pengajar-header-card'
import PesertaHeaderCard from './diskusi/peserta-header-card'

type DataType = {
  name: string
  desc: string
}

export default function DiskusiBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: async () => {
      const { data } = await lihatKelasAction(idKelas)
      return data
    },
  })

  const [hasMore, setHasMore] = useState(true)
  const [data, setData] = useState<DataType[]>([])

  const loadData = async () => {
    const moreData = await loadMoreAction()
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
    rowCount: data.length,
    hasMore: { down: hasMore },
  })

  const cc = 5

  return (
    <div className="flex flex-col lg:w-7/12">
      {dataKelas?.peran === 'Pengajar' ? (
        <PengajarHeaderCard className="mt-8" />
      ) : (
        <PesertaHeaderCard className="mt-8" />
      )}

      <div ref={ref as any}>
        {data.map((val, idx) => (
          <Fragment key={idx}>
            {idx % cc === 0 ? (
              <MateriCard className="mt-6" />
            ) : idx % cc === 1 ? (
              <TugasCard className="mt-6" />
            ) : idx % cc === 2 ? (
              <ConferenceCard className="mt-6" />
            ) : idx % cc === 3 ? (
              <UjianCard className="mt-6" />
            ) : idx % cc === 4 ? (
              <InformasiCard className="mt-6" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
