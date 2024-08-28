import { listPaketPenggunaAction } from '@/actions/admin/paket-pengguna/list'
import PaketPenggunaBody from '@/components/page/admin/paket-pengguna/body'
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
  ...metaObject('Pengguna'),
}

const pageHeader = {
  title: 'Paket Pengguna',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Paket Pengguna',
    },
  ],
}

export default async function PaketPenggunaPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['admin.paket-pengguna.list'],
    queryFn: makeAsyncTableQueryData(listPaketPenggunaAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PaketPenggunaBody />
      </HydrationBoundary>
    </>
  )
}
