import HeaderCard from '@/components/pages/prodi-instansi/profil-instansi/header-card'
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
import { ReactNode } from 'react'

export const metadata = {
  ...metaObject('Profil Instansi'),
}

const pageHeader = {
  title: 'Profil Instansi',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Profil Instansi',
    },
  ],
}

export default async function ProfilInstansiLayout({
  children,
}: {
  children: ReactNode
}) {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['prodi-instansi.profil-instansi'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex flex-col gap-y-4">
          <HeaderCard />
          {children}
        </div>
      </HydrationBoundary>
    </>
  )
}
