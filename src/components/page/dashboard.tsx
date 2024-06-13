'use client'

import DashboardPengajarBody from '@/components/page/pengajar/dashboard/body'
import DashboardPesertaBody from '@/components/page/peserta/dashboard/body'
import { useSession } from 'next-auth/react'

export default function DashboardBody() {
  const { data: session } = useSession()

  if (!session) return null

  return session?.level == 'Pengajar' ? (
    <DashboardPengajarBody />
  ) : (
    <DashboardPesertaBody />
  )
}
