import TermukanKelasBody from '@/components/pages/pengguna/temukan-kelas/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Temukan Kelas'),
}

const pageHeader = {
  title: 'Temukan Kelas',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Temukan Kelas',
    },
  ],
}

export default function TermukanKelasPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <TermukanKelasBody />
    </>
  )
}
