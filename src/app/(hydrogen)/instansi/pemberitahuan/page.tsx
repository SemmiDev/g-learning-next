import PageHeader from '@/components/shared/page-header'
import PemberitahuanBody from '@/components/shared/pemberitahuan/body'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Pemberitahuan'),
}

const pageHeader = {
  title: 'Pemberitahuan',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Pemberitahuan',
    },
  ],
}

export default function PemberitahuanPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <PemberitahuanBody />
    </>
  )
}
