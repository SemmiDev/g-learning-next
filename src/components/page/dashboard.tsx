'use client'

import DashboardAdminBody from '@/components/page/admin/dashboard/body'
import DashboardInstansiBody from '@/components/page/instansi/dashboard/body'
import DashboardPengajarBody from '@/components/page/pengajar/dashboard/body'
import DashboardPenggunaBody from '@/components/page/pengguna/dashboard/body'
import DashboardPesertaBody from '@/components/page/peserta/dashboard/body'
import { useSession } from 'next-auth/react'

export default function DashboardBody() {
  const { data: session } = useSession()
  const level = session?.user?.level

  // console.log('current session', session)

  if (!session) return null

  if (level == 'Admin') {
    return <DashboardAdminBody />
  }

  if (level == 'Instansi') {
    return <DashboardInstansiBody />
  }

  if (level == 'Pengajar') {
    return <DashboardPengajarBody />
  }

  if (level == 'Peserta') {
    return <DashboardPesertaBody />
  }

  return <DashboardPenggunaBody />
}
