import PesertaAbsensiSection from './peserta/absensi-section'
import PesertaChartPersentaseKehadiranCard from './peserta/chart-persentase-kehadiran-card'

export default function PesertaPresensiBody() {
  return (
    <div className="flex flex-col-reverse gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <div className="flex flex-col w-full lg:w-7/12">
        <PesertaAbsensiSection />
      </div>
      <div className="flex flex-col flex-1">
        <PesertaChartPersentaseKehadiranCard className="lg:sticky lg:right-0 lg:top-24" />
      </div>
    </div>
  )
}
