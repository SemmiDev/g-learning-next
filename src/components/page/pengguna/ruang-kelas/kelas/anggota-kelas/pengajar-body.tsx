import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import PengajarPermintaanBergabungCard from './pengajar/permintaan-bergabung-card'
import PengajarPesertaCard from './pengajar/peserta-card'

export default function PengajarAnggotaKelasBody() {
  const queryClient = useQueryClient()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const dataKelas = queryClient.getQueryData<DataKelasType>([
    'pengguna.ruang-kelas.lihat',
    idKelas,
  ])

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
