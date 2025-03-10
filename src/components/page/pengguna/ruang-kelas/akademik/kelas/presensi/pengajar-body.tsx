import PengajarChartPersentaseKehadiranCard from './pengajar/chart-persentase-kehadiran-card'
import PengajarKehadiranTerendahCard from './pengajar/kehadiran-terendah-card'
import PengajarRekapPresensiCard from './pengajar/rekap-card'

export default function PengajarPresensiBody() {
  return (
    <div className="grid grid-cols-3 gap-6 mt-8">
      <PengajarChartPersentaseKehadiranCard className="col-span-3 lg:col-span-1" />
      <PengajarKehadiranTerendahCard className="col-span-3 p-0 lg:col-span-2" />
      <PengajarRekapPresensiCard className="col-span-3" />
    </div>
  )
}
