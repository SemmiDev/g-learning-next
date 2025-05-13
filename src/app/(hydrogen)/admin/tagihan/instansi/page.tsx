import TagihanInstansiBody from '@/components/pages/admin/tagihan/instansi/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { tableTagihanInstansiAction } from '@/services/actions/admin/tagihan-instansi/table'
import { makeAsyncTableQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Tagihan Instansi'),
}

const pageHeader = {
  title: 'Tagihan Instansi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Tagihan Instansi',
    },
  ],
}

export default async function TagihanInstansiPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['admin.tagihan-instansi.table'],
    queryFn: makeAsyncTableQueryData(tableTagihanInstansiAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TagihanInstansiBody />
      </HydrationBoundary>
    </>
  )
}
