import PaketInstansiBody from '@/components/pages/admin/paket-instansi/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { listPaketInstansiAction } from '@/services/actions/admin/paket-instansi/list'
import { makeAsyncTableQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Paket Instansi'),
}

const pageHeader = {
  title: 'Paket Instansi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Paket Instansi',
    },
  ],
}

export default async function PaketInstansiPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['admin.paket-instansi.list'],
    queryFn: makeAsyncTableQueryData(listPaketInstansiAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PaketInstansiBody />
      </HydrationBoundary>
    </>
  )
}
