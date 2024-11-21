import ListKelasBody from '@/components/page/pengguna/ruang-kelas/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { switchCaseObject } from '@/utils/switch-case'

export const metadata = {
  ...metaObject('Ruang Kelas'),
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

  const pageHeader = {
    title: 'Ruang Kelas',
    breadcrumb: [
      {
        href: routes.dashboard,
        name: 'Dasbor',
      },
      ...(kategori
        ? [
            {
              href: routes.pengguna.ruangKelas,
              name: 'Ruang Kelas',
            },
            {
              name: `Kelas ${kategori}`,
            },
          ]
        : [
            {
              name: 'Ruang Kelas',
            },
          ]),
    ],
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ListKelasBody kategori={kategori} />
    </>
  )
}
