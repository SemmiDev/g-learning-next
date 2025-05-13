'use client'

import DetailCard from './detail-card'
import TablePenggunaCard from './table-pengguna-card'

export default function DetailInstansiBody() {
  return (
    <div className="flex flex-col gap-y-4">
      <DetailCard />
      <TablePenggunaCard />
    </div>
  )
}
