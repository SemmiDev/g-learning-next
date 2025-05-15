'use client'

import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PengajarPresensiBody from './pengajar-body'
import PesertaPresensiBody from './peserta-body'

export default function PresensiAkademikBody() {
  const { jwt } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryData(lihatKelasApi, jwt, idKelas),
  })

  if (dataKelas?.peran === 'Pengajar') {
    return <PengajarPresensiBody />
  } else if (dataKelas?.peran === 'Peserta') {
    return <PesertaPresensiBody />
  }
}
