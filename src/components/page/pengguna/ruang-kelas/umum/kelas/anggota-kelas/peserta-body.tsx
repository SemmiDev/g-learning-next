import PesertaDaftarAnggotaSection from './peserta/daftar-section'

export default function PesertaAnggotaKelasBody() {
  return (
    <div className="flex flex-wrap items-start space-y-8 mt-8 lg:space-x-6 lg:space-y-0">
      <PesertaDaftarAnggotaSection className="w-full lg:w-7/12" />
    </div>
  )
}
