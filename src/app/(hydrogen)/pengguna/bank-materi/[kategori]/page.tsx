import ListMateriBody from '@/components/page/pengguna/bank-materi/folder/list-materi'
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
      name: 'Dasbor',
    },
    {
      name: 'Bank Materi',
    },
    {
      name: 'Aljabar Linear',
    },
  ],
}

type ListKategoriBankMateriPageProps = {
  params: { id: string }
}

export default function ListKategoriBankMateriPage({
  params,
}: ListKategoriBankMateriPageProps) {
  const id = params.id

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListMateriBody />
    </>
  )
}
