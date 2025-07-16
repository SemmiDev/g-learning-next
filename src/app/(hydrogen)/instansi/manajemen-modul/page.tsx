import ManajemenModulBody from '@/components/pages/instansi/manajemen-modul/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Manajemen Modul'),
}

const pageHeader = {
  title: 'Manajemen Modul',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Manajemen Modul',
    },
  ],
}

export default function ManajemenModulPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ManajemenModulBody />
    </>
  )
}
