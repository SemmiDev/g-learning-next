import PengaturanBody from '@/components/pages/instansi/pengaturan/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Pengaturan'),
}

const pageHeader = {
  title: 'Pengaturan',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Pengaturan',
    },
  ],
}

export default function PengaturanPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <PengaturanBody />
    </>
  )
}
