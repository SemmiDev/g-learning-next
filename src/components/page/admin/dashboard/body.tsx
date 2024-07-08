'use client'

import { LuHome, LuUsers } from 'react-icons/lu'
import DashboardCountCard from './count-card'
import DashboardJatuhTempoCard from './jatuh-tempo-card'
import DashboardPenggunaanPaketInstansiCard from './penggunaan-paket-instansi-card'
import DashboardPenggunaanPaketPenggunaCard from './penggunaan-paket-pengguna-card'

export default function DashboardBody() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
            <DashboardCountCard
              label="Total Instansi"
              count="1.000"
              Icon={LuHome}
            />
            <DashboardCountCard
              label="Total Pengguna"
              count="3.400.000"
              Icon={LuUsers}
            />
          </div>
          <div className="min-h-96 bg-green-100">Kiri</div>
          <DashboardPenggunaanPaketInstansiCard />
        </div>
        <div className="flex flex-col flex-1 space-y-4">
          <DashboardJatuhTempoCard />
          <DashboardPenggunaanPaketPenggunaCard />
        </div>
      </div>
      <div className="bg-yellow-100 min-h-32">Bawah</div>
    </div>
  )
}
