import ListKategoriMateriBody from '@/components/page/pengguna/bank-materi/list-kategori-body'
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
  ],
}

export default function ListKategoriBankMateriPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListKategoriMateriBody />
    </>
  )
}
