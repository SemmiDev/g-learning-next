'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import DiskusiCardList from './card-list'
import DaftarTugasCard from './daftar-tugas-card'
import PresensiCard from './presensi-card'

export default function DiskusiBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
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
