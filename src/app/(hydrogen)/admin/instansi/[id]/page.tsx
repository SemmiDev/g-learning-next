import { lihatInstansiAction } from '@/actions/admin/instansi/lihat'
import { tablePenggunaInstansiAction } from '@/actions/admin/instansi/pengguna/table'
import DetailInstansiBody from '@/components/page/admin/instansi/detail/body'
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
  ...metaObject('Detail Instansi - Instansi'),
}

const pageHeader = {
  title: 'Detail Instansi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      href: routes.admin.listInstansi,
      name: 'Instansi',
    },
    {
      name: 'Detail Instansi',
    },
  ],
}

type ListInstansiPageProps = {
  params: Promise<{ id: string }>
}

export default async function ListInstansiPage({
  params,
}: ListInstansiPageProps) {
  const queryClient = new QueryClient()

  const { id } = await params

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['admin.instansi.detail', id],
      queryFn: makeSimpleQueryDataWithId(lihatInstansiAction, id),
    }),
    queryClient.prefetchQuery({
      queryKey: ['admin.instansi.detail.table-pengguna', id],
      queryFn: makeAsyncTableQueryData(tablePenggunaInstansiAction, {
        params: { id },
      }),
    }),
  ])

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DetailInstansiBody />
      </HydrationBoundary>
    </>
  )
}
