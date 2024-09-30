import ListKelasBody from '@/components/page/pengguna/ruang-kelas/list-kelas-body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Ruang Kelas'),
}

const pageHeader = {
  title: 'Ruang Kelas',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Ruang Kelas',
    },
  ],
}

export default function ListKelasPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListKelasBody />
    </>
  )
}
