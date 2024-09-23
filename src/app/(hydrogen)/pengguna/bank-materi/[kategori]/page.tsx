import { lihatKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/lihat'
import ListMateriBody from '@/components/page/pengguna/bank-materi/folder/list-materi'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Bank Materi'),
}

type ListBankMateriPageProps = {
  params: { kategori: string }
}

export default async function ListBankMateriPage({
  params,
}: ListBankMateriPageProps) {
  const idKategori = params.kategori
  const queryClient = new QueryClient()

  const { data } = await lihatKategoriBankMateriAction(idKategori)

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
