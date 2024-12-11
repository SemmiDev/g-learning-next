'use client'

import { dashboardCountAction } from '@/actions/admin/dashboard/count'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { LuHouse, LuUsers } from 'react-icons/lu'
import DashboardCountCard from './count-card'
import DashboardJatuhTempoCard from './jatuh-tempo-card'
import DashboardPenggunaDiblokirCard from './pengguna-diblokir-card'
import DashboardPenggunaanPaketInstansiCard from './penggunaan-paket-instansi-card'
import DashboardPenggunaanPaketPenggunaCard from './penggunaan-paket-pengguna-card'
import DashboardPenggunaanPenyimpananCard from './penggunaan-penyimpanan-card'

export default function DashboardBody() {
  const { data } = useQuery({
    queryKey: ['admin.profil'],
    queryFn: makeSimpleQueryData(dashboardCountAction),
  })

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex flex-col flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-2">
            <DashboardCountCard
              label="Total Instansi"
              count={data?.total_instansi ?? 0}
              Icon={LuHouse}
              iconFigureClassName="bg-badge-blue"
            />
            <DashboardCountCard
              label="Total Pengguna"
              count={data?.total_pengguna ?? 0}
              Icon={LuUsers}
              iconFigureClassName="bg-badge-green"
            />
          </div>
          <DashboardPenggunaanPenyimpananCard />
        </div>
        <DashboardJatuhTempoCard className="flex-1" />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <DashboardPenggunaanPaketInstansiCard className="flex-1" />
        <DashboardPenggunaanPaketPenggunaCard className="flex-1" />
      </div>
      <DashboardPenggunaDiblokirCard />
    </div>
  )
}
