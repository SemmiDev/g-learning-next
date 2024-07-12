import DetailInstansiBody from '@/components/page/admin/list-instansi/detail/body'
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
      href: routes.admin.listInstansi,
      name: 'Instansi',
    },
    {
      name: 'Detail Instansi',
    },
  ],
}

export default function ListInstansiPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <DetailInstansiBody />
    </>
  )
}
