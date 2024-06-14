import KelolaSoalBody from '@/components/page/pengajar/bank-soal/folder/soal/container'
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
    {
      name: 'Aljabar Linear',
    },
    {
      name: 'Soal UTS',
    },
  ],
}

export default function BankSoalPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <KelolaSoalBody />
    </>
  )
}
