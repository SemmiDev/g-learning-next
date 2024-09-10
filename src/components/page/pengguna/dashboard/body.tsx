'use client'

import { dashboardCountAction } from '@/actions/pengguna/dashboard/count'
import { Card, CardSeparator, Title } from '@/components/ui'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import Calendar from 'react-calendar'
import { LuFileText, LuFolder, LuHome, LuUsers } from 'react-icons/lu'
import DashboardCountCard from './count-card'
import JadwalAkanDatangCard from './jadwal-akan-datang-card'
import KursusDiikutiCard from './kursus-diikuti-card'
import DashboardRecentFileCard from './recent-file-card'
import DashboardRuangPenyimpananCard from './ruang-penyimpanan-card'

export default function DashboardBody() {
  const { data } = useQuery({
    queryKey: ['pengguna.dashboard.count'],
    queryFn: makeSimpleQueryData(dashboardCountAction),
  })

  return (
    <div className="flex flex-col space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <DashboardCountCard
          label="Jumlah Kelas"
          count={data?.jumlah_kelas ?? 0}
          Icon={LuHome}
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

        <Card className="flex flex-col flex-1 p-0">
          <Title as="h4" weight="semibold" className="p-2">
            Kalender
          </Title>
          <CardSeparator />
          <div className="py-2 px-6">
            <Calendar
              prev2Label={false}
              next2Label={false}
              className="!w-full !border-0 !bg-transparent !font-inter !text-base"
            />
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <DashboardRuangPenyimpananCard />
        <DashboardRecentFileCard />
      </div>

      <KursusDiikutiCard className="flex flex-col w-full p-0" />
    </div>
  )
}
