'use client'

import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import DiskusiCardList from './card-list'
import DaftarTugasCard from './daftar-tugas-card'
import PresensiCard from './presensi-card'

export default function DiskusiBody() {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
  })

  return (
    <div className="flex flex-col-reverse gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <DiskusiCardList kelas={dataKelas || undefined} className="lg:w-7/12" />

      {dataKelas?.peran === 'Peserta' && (
        <div className="flex flex-col flex-1 gap-y-6">
          <PresensiCard />
          <DaftarTugasCard />
        </div>
      )}
    </div>
  )
}
