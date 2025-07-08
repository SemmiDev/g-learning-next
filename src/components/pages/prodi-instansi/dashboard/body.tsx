import DashboardPenggunaCard from './pengguna-card'
import DashboardProfilCard from './profil-card'
import DashboardTotalKelasCard from './total-kelas-card'
import DashboardTotalPenggunaCard from './total-pengguna-card'
import DashboardTotalRuangPenyimpananCard from './total-ruang-penyimpanan-card'

export default function DashboardBody() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col gap-y-4 w-full lg:w-7/12">
        <DashboardProfilCard />
        <DashboardPenggunaCard />
      </div>
      <div className="flex flex-col gap-y-4 flex-1 order-last lg:order-none">
        {/* <DashboardKaryawanTerbaikCard /> */}
        <DashboardTotalRuangPenyimpananCard />
        <DashboardTotalPenggunaCard />
        <DashboardTotalKelasCard />
      </div>
    </div>
  )
}
