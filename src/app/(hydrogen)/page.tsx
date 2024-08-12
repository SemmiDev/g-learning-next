import DashboardBody from '@/components/page/dashboard'
import PageHeader from '@/components/shared/page-header'
import { metaObject } from '@/config/site.config'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/options'

export const metadata = {
  ...metaObject('Dasbor'),
}

const pageHeader = {
  title: 'Dasbor',
}

export default async function Home() {
  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <>
      <PageHeader title={pageHeader.title} />
      <DashboardBody />
    </>
  )
}
