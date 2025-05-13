import ListPenggunaBody from '@/components/pages/admin/pengguna/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Pengguna'),
}

const pageHeader = {
  title: 'Pengguna',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Pengguna',
    },
  ],
}

export default function ListPenggunaPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListPenggunaBody />
    </>
  )
}
