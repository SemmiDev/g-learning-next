import { tablePembayaranInstansiAction } from '@/actions/admin/pembayaran-instansi/table'
import PembayaranInstansiBody from '@/components/page/admin/pembayaran-instansi/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { makeAsyncTableQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Pembayaran Instansi'),
}

const pageHeader = {
  title: 'Pembayaran Instansi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Pembayaran Instansi',
    },
  ],
}

export default async function PembayaranInstansiPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['admin.pembayaran-instansi.table'],
    queryFn: makeAsyncTableQueryData(tablePembayaranInstansiAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PembayaranInstansiBody />
      </HydrationBoundary>
    </>
  )
}
