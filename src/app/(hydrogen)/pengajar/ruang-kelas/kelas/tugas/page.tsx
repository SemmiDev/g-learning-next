'use client'

import ChartTugasRataCard from '@/components/page/pengajar/ruang-kelas/kelas/tugas/chart-rata-card'
import ChartTugasTertinggiCard from '@/components/page/pengajar/ruang-kelas/kelas/tugas/chart-tertinggi-card'
import RekapTugasCard from '@/components/page/pengajar/ruang-kelas/kelas/tugas/rekap-card'

export default function TugasPage() {
  const chartData = [
    { name: '01/03/24', value: 90 },
    { name: '02/03/24', value: 97 },
    { name: '03/03/24', value: 99 },
    { name: '04/03/24', value: 92 },
    { name: '05/03/24', value: 97 },
    { name: '06/03/24', value: 89 },
    { name: '07/03/24', value: 95 },
    { name: '08/03/24', value: 91 },
    { name: '09/03/24', value: 99 },
    { name: '10/03/24', value: 90 },
    { name: '11/03/24', value: 90 },
    { name: '12/03/24', value: 97 },
    { name: '13/03/24', value: 99 },
    { name: '14/03/24', value: 92 },
    { name: '15/03/24', value: 97 },
    { name: '16/03/24', value: 89 },
    { name: '17/03/24', value: 95 },
    { name: '18/03/24', value: 91 },
    { name: '19/03/24', value: 99 },
    { name: '20/03/24', value: 90 },
  ]

  return (
    <div className="flex flex-col gap-6 mt-8">
      <ChartTugasTertinggiCard data={chartData} />
      <ChartTugasRataCard data={chartData} />
      <RekapTugasCard />
    </div>
  )
}
