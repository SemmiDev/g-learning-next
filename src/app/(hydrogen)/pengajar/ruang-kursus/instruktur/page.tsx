import RuangKursusInstrukturBody from '@/components/page/pengajar/ruang-kursus/instruktur/instruktur-body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { useSearchParams } from 'next/navigation'

export const metadata = {
  ...metaObject('Ruang Kursus - Instruktur'),
}

const pageHeader = {
  title: 'Ruang Kursus - Instruktur',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Ruang Kursus - Instruktur',
    },
  ],
}

export default function RuangKursusInstrukturPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <RuangKursusInstrukturBody />
    </>
  )
}
