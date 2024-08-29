import { lihatInstansiAction } from '@/actions/admin/instansi/lihat'
import DetailInstansiBody from '@/components/page/admin/instansi/detail/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
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
      href: routes.admin.listInstansi,
      name: 'Instansi',
    },
    {
      name: 'Detail Instansi',
    },
  ],
}

type ListInstansiPageProps = {
  params: { id: string }
}

export default async function ListInstansiPage({
  params,
}: ListInstansiPageProps) {
  const id = params.id

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['admin.instansi.detail', id],
    queryFn: makeSimpleQueryDataWithId(lihatInstansiAction, id),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DetailInstansiBody />
      </HydrationBoundary>
    </>
  )
}
