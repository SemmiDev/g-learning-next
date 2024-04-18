import PageHeader from '@/app/shared/page-header'
import ListKelasBody from '@/components/page/pengajar/ruang-kelas/list-kelas-body'
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
      name: 'Dashboard',
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
