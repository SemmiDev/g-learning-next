'use client'

import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PengajarUjianBody from './pengajar-body'
import PesertaUjianBody from './peserta-body'

export default function UjianBody() {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
  })

  if (dataKelas?.peran === 'Pengajar') {
    return <PengajarUjianBody />
  } else if (dataKelas?.peran === 'Peserta') {
    return <PesertaUjianBody />
  }
}
