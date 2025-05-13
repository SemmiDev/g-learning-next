'use client'

import DashboardAdminBody from '@/components/pages/admin/dashboard/body'
import DashboardInstansiBody from '@/components/pages/instansi/dashboard/body'
import DashboardPenggunaBody from '@/components/pages/pengguna/dashboard/body'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'

export default function DashboardBody() {
  const { level } = useSessionPengguna()

  switch (level) {
    case 'Admin':
      return <DashboardAdminBody />
    case 'Instansi':
      return <DashboardInstansiBody />
    case 'Pengguna':
      return <DashboardPenggunaBody />
    default:
      return null
  }
}
