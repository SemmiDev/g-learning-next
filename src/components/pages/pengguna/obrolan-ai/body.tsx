'use client'

import ObrolanCard from './obrolan-card'
import RiwayatCard from './riwayat-card'

export default function ObrolanAiBody() {
  return (
    <div className="grid grid-cols-12 gap-4 items-start">
      <RiwayatCard className="col-span-12 md:col-span-3" />
      <ObrolanCard className="col-span-12 md:col-span-9" />
    </div>
  )
}
