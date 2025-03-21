import { lihatKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/lihat'
import ListMateriBody from '@/components/page/pengguna/bank-materi/kategori/list-materi-body'
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
  ...metaObject('Bank Materi'),
}

type ListBankMateriPageProps = {
  params: Promise<{ kategori: string }>
}

export default async function ListBankMateriPage({
  params,
}: ListBankMateriPageProps) {
  const queryClient = new QueryClient()

  const { kategori: idKategori } = await params

  const { data, code } = await lihatKategoriBankMateriAction(idKategori)

  if (code === 404) return notFound()

  await queryClient.prefetchQuery({
    queryKey: ['pengguna.bank-materi.kategori.lihat', idKategori],
    queryFn: async () => data,
  })

  const pageHeader = {
    title: 'Bank Materi',
    breadcrumb: [
      {
        href: routes.dashboard,
        name: 'Dasbor',
      },
      {
        href: routes.pengguna.bankMateri,
        name: 'Bank Materi',
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
        <ListMateriBody />
      </HydrationBoundary>
    </>
  )
}
