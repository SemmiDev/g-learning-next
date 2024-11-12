import { lihatTagihanPenggunaAction } from '@/actions/admin/tagihan-pengguna/lihat'
import { tablePembayaranTagihanPenggunaAction } from '@/actions/admin/tagihan-pengguna/pembayaran/table'
import PembayaranTagihanPenggunaBody from '@/components/page/admin/tagihan/pengguna/pembayaran/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import {
  makeAsyncTableQueryData,
  makeSimpleQueryDataWithId,
} from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Pembayaran Tagihan - Tagihan Pengguna'),
}

const pageHeader = {
  title: 'Pembayaran Tagihan',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      href: routes.admin.tagihanPengguna,
      name: 'Tagihan Pengguna',
    },
    {
      name: 'Pembayaran Tagihan',
    },
  ],
}

type PembayaranTagihanPenggunaPageProps = {
  params: Promise<{ id: string }>
}

export default async function PembayaranTagihanPenggunaPage({
  params,
}: PembayaranTagihanPenggunaPageProps) {
  const queryClient = new QueryClient()

  const { id } = await params

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['admin.tagihan-pengguna.pembayaran', id],
      queryFn: makeSimpleQueryDataWithId(lihatTagihanPenggunaAction, id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['admin.tagihan-pengguna.pembayaran.table', id],
      queryFn: makeAsyncTableQueryData(tablePembayaranTagihanPenggunaAction, {
        params: { idTagihan: id },
      }),
    }),
  ])

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PembayaranTagihanPenggunaBody />
      </HydrationBoundary>
    </>
  )
}
