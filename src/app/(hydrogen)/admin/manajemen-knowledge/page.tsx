import ManajemenKnowledgeBody from '@/components/pages/admin/manajemen-knowledge/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Manajemen Knowledge'),
}

const pageHeader = {
  title: 'Manajemen Knowledge',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Manajemen Knowledge',
    },
  ],
}

export default function ManajemenModulPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ManajemenKnowledgeBody />
    </>
  )
}
