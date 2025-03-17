import PesertaDaftarAnggotaSection from './peserta/daftar-section'

export default function PesertaAnggotaKelasBody() {
  return (
    <div className="flex flex-wrap items-start gap-y-8 mt-8 lg:gap-x-6 lg:gap-y-0">
      <PesertaDaftarAnggotaSection className="w-full lg:w-7/12" />
    </div>
  )
}
