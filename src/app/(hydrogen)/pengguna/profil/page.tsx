import { dataProfileAction } from '@/actions/pengguna/profil/data'
import ProfileBody from '@/components/page/pengguna/profil/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
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

export default async function ProfilePage() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['pengguna.profil'],
    queryFn: makeSimpleQueryData(dataProfileAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProfileBody />
      </HydrationBoundary>
    </>
  )
}
