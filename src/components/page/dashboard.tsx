'use client'

import DashboardAdminBody from '@/components/page/admin/dashboard/body'
import DashboardInstansiBody from '@/components/page/instansi/dashboard/body'
import DashboardPengajarBody from '@/components/page/pengajar/dashboard/body'
import DashboardPenggunaBody from '@/components/page/pengguna/dashboard/body'
import DashboardPesertaBody from '@/components/page/peserta/dashboard/body'
import { useSession } from 'next-auth/react'

export default function DashboardBody() {
  const { data: session } = useSession()

  // console.log('current session', session)

  if (!session) return null

  if (session?.user?.level == 'Admin') {
    return <DashboardAdminBody />
  }

  if (session?.user?.level == 'Instansi') {
    return <DashboardInstansiBody />
  }

  if (session?.user?.level == 'Pengajar') {
    return <DashboardPengajarBody />
  }

  if (session?.user?.level == 'Peserta') {
    return <DashboardPesertaBody />
  }

  return <DashboardPenggunaBody />
}
