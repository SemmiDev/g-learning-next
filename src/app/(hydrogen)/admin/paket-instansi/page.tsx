import PaketInstansiBody from '@/components/page/admin/paket-instansi/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Instansi'),
}

const pageHeader = {
  title: 'Paket Instansi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Paket Instansi',
    },
  ],
}

export default function PaketInstansiPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <PaketInstansiBody />
    </>
  )
}
