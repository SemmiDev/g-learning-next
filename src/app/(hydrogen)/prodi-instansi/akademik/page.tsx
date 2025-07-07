import AkademikBody from '@/components/pages/prodi-instansi/akademik/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Akademik'),
}

const pageHeader = {
  title: 'Akademik',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Akademik',
    },
  ],
}

export default function AkademikPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <AkademikBody />
    </>
  )
}
