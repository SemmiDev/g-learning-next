'use client'

import ChartPersentaseKehadiranCard from './chart-persentase-kehadiran-card'
import KehadiranTerendahCard from './kehadiran-terendah-card'
import RekapPresensiCard from './rekap-card'

export default function PresensiAkademikBody() {
  return (
    <div className="grid grid-cols-3 items-start gap-6 mt-8">
      <ChartPersentaseKehadiranCard className="col-span-3 lg:col-span-1" />
      <KehadiranTerendahCard className="col-span-3 p-0 lg:col-span-2" />
      <RekapPresensiCard className="col-span-3" />
    </div>
  )
}
