import ListFolderMateriBody from '@/components/page/pengajar/bank-materi/list-folder-body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Bank Materi'),
}

const pageHeader = {
  title: 'Bank Materi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      name: 'Bank Materi',
    },
  ],
}

export default function ListFolderBankMateriPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListFolderMateriBody />
    </>
  )
}
