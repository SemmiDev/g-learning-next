import DashboardPenggunaCard from './pengguna-card'
import DashboardProfileCard from './profile-card'
import DashboardRiwayatPembayaranCard from './riwayat-pembayaran-card'

export default function DashboardBody() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex flex-col space-y-4 w-full lg:w-7/12">
        <DashboardProfileCard />
        <DashboardPenggunaCard />
        <DashboardRiwayatPembayaranCard />
      </div>
      <div className="flex flex-col flex-1 bg-green-200">kanan</div>
    </div>
  )
}
