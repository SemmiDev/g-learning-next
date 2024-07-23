import PaketPenggunaBody from '@/components/page/admin/paket-pengguna/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Pengguna'),
}

const pageHeader = {
  title: 'Paket Pengguna',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Paket Pengguna',
    },
  ],
}

export default function PaketPenggunaPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <PaketPenggunaBody />
    </>
  )
}
