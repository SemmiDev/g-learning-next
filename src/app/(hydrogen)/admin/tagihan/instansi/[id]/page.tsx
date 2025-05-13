import PembayaranTagihanInstansiBody from '@/components/pages/admin/tagihan/instansi/pembayaran/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { lihatTagihanInstansiAction } from '@/services/actions/admin/tagihan-instansi/lihat'
import { tablePembayaranTagihanInstansiAction } from '@/services/actions/admin/tagihan-instansi/pembayaran/table'
import { makeAsyncTableQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { notFound } from 'next/navigation'

export const metadata = {
  ...metaObject('Pembayaran Tagihan - Tagihan Instansi'),
}

const pageHeader = {
  title: 'Pembayaran Tagihan',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      href: routes.admin.tagihanInstansi,
      name: 'Tagihan Instansi',
    },
    {
      name: 'Pembayaran Tagihan',
    },
  ],
}

type PembayaranTagihanInstansiPageProps = {
  params: Promise<{ id: string }>
}

export default async function PembayaranTagihanInstansiPage({
  params,
}: PembayaranTagihanInstansiPageProps) {
  const queryClient = new QueryClient()

  const { id } = await params

  const { data, code } = await lihatTagihanInstansiAction(id)

  if (code === 404) return notFound()

  await queryClient.prefetchQuery({
    queryKey: ['admin.tagihan-instansi.pembayaran', id],
    queryFn: () => data ?? null,
  })

  await queryClient.prefetchQuery({
    queryKey: ['admin.tagihan-instansi.pembayaran.table', id],
    queryFn: makeAsyncTableQueryData(tablePembayaranTagihanInstansiAction, {
      params: { idTagihan: id },
    }),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PembayaranTagihanInstansiBody />
      </HydrationBoundary>
    </>
  )
}
