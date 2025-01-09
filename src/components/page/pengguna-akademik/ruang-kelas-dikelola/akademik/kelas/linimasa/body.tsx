'use client'

import LinimasaCardList from './card-list'
import JadwalCard from './jadwal-card'
import RingkasanKelasCard from './ringkasan-kelas-card'

export default function LinimasaBody() {
  return (
    <div className="flex flex-col-reverse gap-x-4 gap-y-6 mt-8 lg:flex-row">
      <LinimasaCardList className="lg:w-7/12" />

      <div className="flex flex-col flex-1 gap-y-6">
        <RingkasanKelasCard />
        <JadwalCard />
      </div>
    </div>
  )
}
