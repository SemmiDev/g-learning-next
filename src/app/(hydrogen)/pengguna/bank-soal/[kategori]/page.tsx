import { lihatKategoriBankSoalAction } from '@/actions/pengguna/bank-soal/kategori/lihat'
import ListSoalBody from '@/components/page/pengguna/bank-soal/kategori/list-soal-body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export const metadata = {
  ...metaObject('Bank Soal'),
}

type ListBankSoalPageProps = {
  params: Promise<{ kategori: string }>
}

export default async function ListBankSoalPage({
  params,
}: ListBankSoalPageProps) {
  const queryClient = new QueryClient()

  const { kategori: idKategori } = await params

  const { data, code } = await lihatKategoriBankSoalAction(idKategori)

  if (code === 404) return notFound()

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
