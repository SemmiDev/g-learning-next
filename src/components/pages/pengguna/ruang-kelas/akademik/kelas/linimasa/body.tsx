'use client'

import { lihatKelasAction } from '@/services/actions/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import LinimasaCardList from './card-list'
import JadwalCard from './jadwal-card'
import RingkasanKelasCard from './ringkasan-kelas-card'

export default function LinimasaBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  return (
    <div className="flex flex-col-reverse gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <LinimasaCardList kelas={dataKelas || undefined} className="lg:w-7/12" />

      <div className="flex flex-col flex-1 gap-y-6">
        <RingkasanKelasCard />
        <JadwalCard kelas={dataKelas || undefined} />
      </div>
    </div>
  )
}
