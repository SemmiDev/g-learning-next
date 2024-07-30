import DashboardPenggunaCard from './pengguna-card'
import DashboardPenggunaDiblokirCard from './pengguna-diblokir-card'
import DashboardProfileCard from './profile-card'
import DashboardRiwayatPembayaranCard from './riwayat-pembayaran-card'
import DashboardTotalKelasCard from './total-kelas-card'
import DashboardTotalPenggunaCard from './total-pengguna-card'
import DashboardTotalRuangPenyimpananCard from './total-ruang-penyimpanan-card'

export default function DashboardBody() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex flex-col space-y-4 w-full lg:w-7/12">
        <DashboardProfileCard />
        <DashboardPenggunaCard />
        <DashboardRiwayatPembayaranCard />
      </div>
      <div className="flex flex-col space-y-4 flex-1 order-last lg:order-none">
        <DashboardTotalRuangPenyimpananCard />
        <DashboardTotalPenggunaCard />
        <DashboardTotalKelasCard />
      </div>
      <DashboardPenggunaDiblokirCard className="w-full" />
    </div>
  )
}
