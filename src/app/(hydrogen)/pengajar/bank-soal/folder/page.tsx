import ListSoalBody from '@/components/page/pengajar/bank-soal/folder/list-soal'
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
      name: 'Dashboard',
    },
    {
      name: 'Bank Soal',
    },
    {
      name: 'Aljabar Linear',
    },
  ],
}

export default function ListFolderBankSoalPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListSoalBody />
    </>
  )
}
