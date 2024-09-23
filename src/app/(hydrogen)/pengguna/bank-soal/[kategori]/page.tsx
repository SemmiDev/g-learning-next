import { lihatKategoriBankSoalAction } from '@/actions/pengguna/bank-soal/kategori/lihat'
import ListSoalBody from '@/components/page/pengguna/bank-soal/kategori/list-soal'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Bank Soal'),
}

type ListBankSoalPageProps = {
  params: { kategori: string }
}

export default async function ListBankSoalPage({
  params,
}: ListBankSoalPageProps) {
  const idKategori = params.kategori
  const queryClient = new QueryClient()

  const { data } = await lihatKategoriBankSoalAction(idKategori)

  await queryClient.prefetchQuery({
    queryKey: ['pengguna.bank-soal.kategori.lihat', idKategori],
    queryFn: async () => data,
  })

  const pageHeader = {
    title: 'Bank Soal',
    breadcrumb: [
      {
        href: routes.dashboard,
        name: 'Dasbor',
      },
      {
        href: routes.pengguna.bankSoal,
        name: 'Bank Soal',
      },
      {
        name: data?.nama_kategori ?? '',
      },
    ],
  }
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListSoalBody />
      </HydrationBoundary>
    </>
  )
}
