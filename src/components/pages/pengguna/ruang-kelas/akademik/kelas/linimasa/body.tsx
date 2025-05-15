'use client'

import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import LinimasaCardList from './card-list'
import JadwalCard from './jadwal-card'
import RingkasanKelasCard from './ringkasan-kelas-card'

export default function LinimasaBody() {
  const { jwt } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryData(lihatKelasApi, jwt, idKelas),
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
