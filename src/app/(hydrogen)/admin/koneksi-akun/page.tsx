import KoneksiAkunBody from '@/components/pages/admin/koneksi-akun/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Koneksi Akun'),
}

const pageHeader = {
  title: 'Koneksi Akun',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Koneksi Akun',
    },
  ],
}

export default function KoneksiAkunPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <KoneksiAkunBody />
    </>
  )
}
