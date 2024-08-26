import { tableInstansiAction } from '@/actions/admin/instansi/table'
import ListInstansiBody from '@/components/page/admin/instansi/body'
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
  ...metaObject('Instansi'),
}

const pageHeader = {
  title: 'Instansi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Instansi',
    },
  ],
}

export default async function ListInstansiPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['admin.instansi.table'],
    queryFn: async () => await makeAsyncTableQueryData(tableInstansiAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ListInstansiBody />
      </HydrationBoundary>
    </>
  )
}
