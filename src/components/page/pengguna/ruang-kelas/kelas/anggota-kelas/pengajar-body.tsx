import PengajarPermintaanBergabungCard from './pengajar/permintaan-bergabung-card'
import PengajarPesertaCard from './pengajar/peserta-card'

export default function PengajarAnggotaKelasBody() {
  return (
    <>
      <div className="flex flex-wrap items-start space-y-8 mt-8 lg:space-x-6 lg:space-y-0">
        <PengajarPesertaCard className="w-full lg:w-7/12" />
        <PengajarPermintaanBergabungCard className="w-full lg:w-4/12" />
      </div>
    </>
  )
}
