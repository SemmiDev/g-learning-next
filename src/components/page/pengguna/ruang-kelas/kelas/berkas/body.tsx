'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PengajarBerkasBody from './pengajar-body'
import PesertaBerkasBody from './peserta-body'

export default function BerkasBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  if (dataKelas?.peran === 'Pengajar') {
    return <PengajarBerkasBody />
  } else if (dataKelas?.peran === 'Peserta') {
    return <PesertaBerkasBody />
  }
}
