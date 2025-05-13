import ListKategoriSoalBody from '@/components/pages/pengguna/bank-soal/list-kategori-body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

export const metadata = {
  ...metaObject('Bank Soal'),
}

const pageHeader = {
  title: 'Bank Soal',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Bank Soal',
    },
  ],
}

export default function ListKategoriBankSoalPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListKategoriSoalBody />
    </>
  )
}
