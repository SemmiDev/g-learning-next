import ListInstansiBody from '@/components/page/admin/list-instansi/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Instansi'),
}

const pageHeader = {
  title: 'Instansi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'List Instansi',
    },
  ],
}

export default function ListInstansiPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListInstansiBody />
    </>
  )
}
