import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PengajarPermintaanBergabungCard from './pengajar/permintaan-bergabung-card'
import PengajarPesertaCard from './pengajar/peserta-card'

export default function PengajarAnggotaKelasBody() {
  const { jwt } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryData(lihatKelasApi, jwt, idKelas),
  })

  return (
    <>
      <div className="flex flex-wrap-reverse items-start gap-x-6 gap-y-8 mt-8 lg:flex-wrap">
        <PengajarPesertaCard className="w-full lg:w-7/12" />

        {dataKelas?.kelas.tipe !== 'Akademik' && (
          <PengajarPermintaanBergabungCard className="w-full lg:w-4/12" />
        )}
      </div>
    </>
  )
}
