import AkademikBody from '@/components/pages/prodi-instansi/akademik/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { dataProfilAction } from '@/services/actions/prodi-instansi/profil-instansi/detail/data'
import { makeSimpleQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Akademik'),
}

const pageHeader = {
  title: 'Akademik',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Akademik',
    },
  ],
}

export default async function AkademikPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['prodi-instansi.profil-instansi'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AkademikBody />
      </HydrationBoundary>
    </>
  )
}
