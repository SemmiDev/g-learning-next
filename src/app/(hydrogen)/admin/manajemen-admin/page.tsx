import { tableAdminAction } from '@/actions/admin/admin/table'
import ManajemenAdminBody from '@/components/page/admin/manajemen-admin/body'
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
  ...metaObject('Manajemen Admin'),
}

const pageHeader = {
  title: 'Manajemen Admin',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Manajemen Admin',
    },
  ],
}

export default async function ManajemenAdminPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['admin.manajemen-admin.table'],
    queryFn: makeAsyncTableQueryData(tableAdminAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ManajemenAdminBody />
      </HydrationBoundary>
    </>
  )
}
