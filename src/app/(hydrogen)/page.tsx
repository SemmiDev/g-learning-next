import DashboardBody from '@/components/page/pengajar/dashboard/body'
import PageHeader from '@/components/shared/page-header'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Dashboard'),
}

const pageHeader = {
  title: 'Dashboard',
}

export default async function Home() {
  return (
    <>
      <PageHeader title={pageHeader.title} />
      <DashboardBody />
    </>
  )
}
