'use client'

import DashboardAdminBody from '@/components/page/admin/dashboard/body'
import DashboardInstansiBody from '@/components/page/instansi/dashboard/body'
import DashboardPengajarBody from '@/components/page/pengajar/dashboard/body'
import DashboardPenggunaBody from '@/components/page/pengguna/dashboard/body'
import DashboardPesertaBody from '@/components/page/peserta/dashboard/body'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'

export default function DashboardBody() {
  const { level } = useSessionPengguna()

  switch (level) {
    case 'Admin':
      return <DashboardAdminBody />
    case 'Instansi':
      return <DashboardInstansiBody />
    case 'Pengajar':
      return <DashboardPengajarBody />
    case 'Peserta':
      return <DashboardPesertaBody />
    case 'Pengguna':
      return <DashboardPenggunaBody />
    default:
      return null
  }
}
