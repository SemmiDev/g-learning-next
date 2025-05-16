'use client'

import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PengajarSesiPembelajaranBody from './pengajar-body'
import PesertaSesiPembelajaranBody from './peserta-body'

export default function SesiPembelajaranBody() {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
  })

  if (dataKelas?.peran === 'Pengajar') {
    return <PengajarSesiPembelajaranBody />
  } else if (dataKelas?.peran === 'Peserta') {
    return <PesertaSesiPembelajaranBody />
  }
}
