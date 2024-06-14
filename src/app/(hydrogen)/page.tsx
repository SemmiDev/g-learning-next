import DashboardBody from '@/components/page/dashboard'
import PageHeader from '@/components/shared/page-header'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Dasbor'),
}

const pageHeader = {
  title: 'Dasbor',
}

export default async function Home() {
  return (
    <>
      <PageHeader title={pageHeader.title} />
      <DashboardBody />
    </>
  )
}
