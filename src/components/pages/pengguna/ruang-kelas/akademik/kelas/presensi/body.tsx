'use client'

import { lihatKelasAction } from '@/services/actions/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PengajarPresensiBody from './pengajar-body'
import PesertaPresensiBody from './peserta-body'

export default function PresensiAkademikBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  if (dataKelas?.peran === 'Pengajar') {
    return <PengajarPresensiBody />
  } else if (dataKelas?.peran === 'Peserta') {
    return <PesertaPresensiBody />
  }
}
