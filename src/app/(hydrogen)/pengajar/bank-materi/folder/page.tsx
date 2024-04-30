import ListMateriBody from '@/components/page/pengajar/bank-materi/folder/list-materi'
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
    {
      name: 'Aljabar Linear',
    },
  ],
}

export default function ListFolderBankMateriPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListMateriBody />
    </>
  )
}
