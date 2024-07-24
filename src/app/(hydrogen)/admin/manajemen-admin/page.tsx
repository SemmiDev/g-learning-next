import ManajemenAdminBody from '@/components/page/admin/manajemen-admin/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Manajemen Admin'),
}

const pageHeader = {
  title: 'Manajemen Admin',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Manajemen Admin',
    },
  ],
}

export default function ManajemenAdminPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ManajemenAdminBody />
    </>
  )
}
