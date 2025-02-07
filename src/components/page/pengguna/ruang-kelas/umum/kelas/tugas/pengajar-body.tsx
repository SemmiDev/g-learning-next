import PengajarChartSection from './pengajar/chart-section'
import PengajarRekapTugasCard from './pengajar/rekap-card'

export default function PengajarTugasBody() {
  return (
    <div className="flex flex-col gap-6 mt-8">
      <PengajarChartSection />
      <PengajarRekapTugasCard />
    </div>
  )
}
