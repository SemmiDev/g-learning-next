import PustakaMediaBody from '@/components/page/pengguna/pustaka-media/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Pustaka Media'),
}

const pageHeader = {
  title: 'Pustaka Media',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Pustaka Media',
    },
  ],
}

export default function PustakaMediaPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <PustakaMediaBody />
    </>
  )
}
