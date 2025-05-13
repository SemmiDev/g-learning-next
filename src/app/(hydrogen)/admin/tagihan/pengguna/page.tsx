import TagihanPenggunaBody from '@/components/pages/admin/tagihan/pengguna/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { tableTagihanPenggunaAction } from '@/services/actions/admin/tagihan-pengguna/table'
import { makeAsyncTableQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Tagihan Pengguna'),
}

const pageHeader = {
  title: 'Tagihan Pengguna',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Tagihan Pengguna',
    },
  ],
}

export default async function TagihanPenggunaPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['admin.tagihan-pengguna.table'],
    queryFn: makeAsyncTableQueryData(tableTagihanPenggunaAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TagihanPenggunaBody />
      </HydrationBoundary>
    </>
  )
}
