import HomePustakaMediaBody from '@/components/page/pengajar/pustaka-media/home-body'
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

export default function HomePustakaMediaPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HomePustakaMediaBody />
    </>
  )
}
