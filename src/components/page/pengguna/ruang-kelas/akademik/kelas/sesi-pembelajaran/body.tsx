'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PengajarSesiPembelajaranBody from './pengajar-body'
import PesertaSesiPembelajaranBody from './peserta-body'

export default function SesiPembelajaranBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  if (dataKelas?.peran === 'Pengajar') {
    return <PengajarSesiPembelajaranBody kelas={dataKelas} />
  } else if (dataKelas?.peran === 'Peserta') {
    return <PesertaSesiPembelajaranBody kelas={dataKelas} />
  }
}
