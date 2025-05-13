import ProfilBody from '@/components/pages/admin/profil/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { dataProfilAction } from '@/services/actions/admin/profile/data'
import { makeSimpleQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export const metadata = {
  ...metaObject('Profil'),
}

const pageHeader = {
  title: 'Profil',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Profil',
    },
  ],
}

export default async function ProfilPage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['admin.profil'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfilBody />
      </HydrationBoundary>
    </>
  )
}
