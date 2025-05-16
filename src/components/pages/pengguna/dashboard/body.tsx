'use client'

import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dashboardCountApi } from '@/services/api/pengguna/dashboard/count'
import { useQuery } from '@tanstack/react-query'
import { LuFileText, LuFolder, LuHouse, LuUsers } from 'react-icons/lu'
import DashboardCountCard from './count-card'
import JadwalAkanDatangCard from './jadwal-akan-datang-card'
import KalenderCard from './kalender'
import DashboardRecentFileCard from './recent-file-card'
import DashboardRuangPenyimpananCard from './ruang-penyimpanan-card'

export default function DashboardBody() {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { data } = useQuery({
    queryKey: ['pengguna.dashboard.count'],
    queryFn: makeSimpleApiQueryData(dashboardCountApi),
  })

  return (
    <div className="flex flex-col gap-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <DashboardCountCard
          label="Jumlah Kelas"
          count={data?.jumlah_kelas ?? 0}
          Icon={LuHouse}
        />
        <DashboardCountCard
          label="Jumlah Anggota Kelas"
          count={data?.jumlah_anggota_kelas ?? 0}
          Icon={LuUsers}
        />
        <DashboardCountCard
          label="Jumlah Bank Materi"
          count={data?.jumlah_bank_materi ?? 0}
          Icon={LuFileText}
        />
        <DashboardCountCard
          label="Jumlah Bank Soal"
          count={data?.jumlah_bank_soal ?? 0}
          Icon={LuFolder}
        />
      </div>

      <div className="flex flex-wrap items-baseline gap-4">
        <JadwalAkanDatangCard className="flex flex-col w-full p-0 lg:w-7/12" />
        <KalenderCard />
      </div>

      <div className="flex flex-wrap items-start gap-4">
        <DashboardRuangPenyimpananCard />
        <DashboardRecentFileCard />
      </div>

      {/* <KursusDiikutiCard className="flex flex-col w-full p-0" /> */}
    </div>
  )
}
