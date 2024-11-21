import ListKelasBody from '@/components/page/pengguna/ruang-kelas/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { switchCaseObject } from '@/utils/switch-case'

export const metadata = {
  ...metaObject('Ruang Kelas'),
}

const pageHeader = {
  title: 'Ruang Kelas',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Ruang Kelas',
    },
  ],
}

type ListKelasPageProps = {
  searchParams: Promise<{ kategori: string }>
}

export default async function ListKelasPage({
  searchParams,
}: ListKelasPageProps) {
  const { kategori: kategoriParam } = await searchParams

  const kategori = switchCaseObject<'Dikelola' | 'Diikuti', undefined>(
    kategoriParam,
    {
      dikelola: 'Dikelola',
      diikuti: 'Diikuti',
    },
    undefined
  )

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListKelasBody kategori={kategori} />
    </>
  )
}
