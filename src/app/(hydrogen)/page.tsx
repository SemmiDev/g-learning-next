import DashboardPengajarBody from '@/components/page/pengajar/dashboard/body'
import DashboardPesertaBody from '@/components/page/peserta/dashboard/body'
import PageHeader from '@/components/shared/page-header'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/options'

export const metadata = {
  ...metaObject('Dashboard'),
}

const pageHeader = {
  title: 'Dashboard',
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <PageHeader title={pageHeader.title} />
      {session?.level == 'Pengajar' ? (
        <DashboardPengajarBody />
      ) : (
        <DashboardPesertaBody />
      )}
    </>
  )
}
