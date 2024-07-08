'use client'

import DashboardAdminBody from '@/components/page/admin/dashboard/body'
import DashboardPengajarBody from '@/components/page/pengajar/dashboard/body'
import DashboardPesertaBody from '@/components/page/peserta/dashboard/body'
import { useSession } from 'next-auth/react'

export default function DashboardBody() {
  const { data: session } = useSession()

  if (!session) return null

  if (session?.level == 'Admin') {
    return <DashboardAdminBody />
  }

  if (session?.level == 'Pengajar') {
    return <DashboardPengajarBody />
  }

  return <DashboardPesertaBody />
}
