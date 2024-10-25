import PesertaDaftarTugasSection from './peserta/daftar-section'

export default function PesertaTugasBody() {
  return (
    <div className="flex flex-col gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <div className="flex flex-col w-full lg:w-7/12">
        <PesertaDaftarTugasSection />
      </div>
    </div>
  )
}
