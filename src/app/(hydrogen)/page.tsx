import { cekKelengkapanProfilAction } from '@/actions/pengguna/dashboard/cek-kelengkapan-profil'
import DashboardBody from '@/components/page/dashboard'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/options'

export const metadata = {
  ...metaObject('Dasbor'),
}

const pageHeader = {
  title: 'Dasbor',
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const level = session?.user?.level

  if (level === 'Pengguna') {
    const { success, data } = await cekKelengkapanProfilAction()
    if (success && !data?.nik) {
      redirect(routes.pengguna.lengkapiProfil)
    }
  }

  return (
    <>
      <PageHeader title={pageHeader.title} />
      <DashboardBody />
    </>
  )
}
