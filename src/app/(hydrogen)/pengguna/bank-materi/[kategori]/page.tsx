import { listBankMateriAction } from '@/actions/pengguna/bank-materi/list'
import ListMateriBody from '@/components/page/pengguna/bank-materi/folder/list-materi'
import { MateriType } from '@/components/page/pengguna/bank-materi/folder/materi-card'
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

type ListKategoriBankMateriPageProps = {
  params: { id: string }
}

export default async function ListKategoriBankMateriPage({
  params,
}: ListKategoriBankMateriPageProps) {
  const idKategori = params.id

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['pengguna.bank-materi.list', idKategori],
    queryFn: async () => {
      const { data } = await listBankMateriAction({
        params: {
          idKategori,
        },
      })

      return {
        list: (data?.list ?? []).map((item) => ({
          id: item.bank_ajar.id,
          name: item.bank_ajar.judul,
          desc: item.bank_ajar.deskripsi,
          time: item.bank_ajar.created_at,
          fileCount: item.total_file_bank_ajar,
          type: item.bank_ajar.tipe === 'Materi' ? 'materi' : 'tugas',
        })) as MateriType[],
        pagination: data?.pagination,
      }
    },
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListMateriBody />
      </HydrationBoundary>
    </>
  )
}
