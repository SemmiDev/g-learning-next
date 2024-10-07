'use client'

import { loadMoreAction } from '@/actions/peserta/ruang-kelas/kelas'
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
import DaftarTugasCard from '@/components/page/peserta/ruang-kelas/kelas/diskusi/daftar-tugas-card'
import PresensiCard from '@/components/page/peserta/ruang-kelas/kelas/diskusi/presensi-card'
import { Fragment, useEffect, useState } from 'react'

type DataType = {
  name: string
  desc: string
}

export default function DiskusiPage() {
  const [data, setData] = useState<DataType[]>([])

  const loadData = async () => {
    const moreData = await loadMoreAction()
    setData((prev) => [...prev, ...moreData])
  }

  useEffect(() => {
    loadData()
  }, [])

  const cc = 7

  return (
    <div className="flex flex-col-reverse gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <div className="flex flex-col lg:w-7/12">
        <HeaderCard />

        <div>
          {data.map((val, idx) => (
            <Fragment key={idx}>
              {idx % cc === 0 ? (
                <Materi1Card className="mt-6" />
              ) : idx % cc === 1 ? (
                <TugasCard className="mt-6" />
              ) : idx % cc === 2 ? (
                <ConferenceCard className="mt-6" />
              ) : idx % cc === 3 ? (
                <UjianCard className="mt-6" />
              ) : idx % cc === 4 ? (
                <InformasiCard className="mt-6" />
              ) : idx % cc === 5 ? (
                <Materi2Card className="mt-6" />
              ) : (
                <Materi3Card className="mt-6" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <PresensiCard />
        <DaftarTugasCard className="mt-6" />
      </div>
    </div>
  )
}
