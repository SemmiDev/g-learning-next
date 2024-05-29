import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Ruang Kursus - Peserta'),
}

const pageHeader = {
  title: 'Ruang Kursus - Peserta',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Ruang Kursus - Peserta',
    },
  ],
}

export default function RuangKursusPesertaPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
    </>
  )
}
