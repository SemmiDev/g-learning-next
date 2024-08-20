import DashboardBody from '@/components/page/dashboard'
import PageHeader from '@/components/shared/page-header'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'
import { cekKelengkapanProfil } from '@/actions/pengguna/dashboard/cek-kelengkapan-profil'

export const metadata = {
  ...metaObject('Dasbor'),
}

const pageHeader = {
  title: 'Dasbor',
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session?.user?.level === 'Pengguna') {
    const { success, data } = await cekKelengkapanProfil()
    if (success && !data.nik) {
      redirect(routes.pengguna.lengkapiProfile)
    }
  }

  return (
    <>
      <PageHeader title={pageHeader.title} />
      <DashboardBody />
    </>
  )
}
