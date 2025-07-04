import DashboardBody from '@/components/pages/dashboard'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { dataProfilAction as dataProfilInstansiAction } from '@/services/actions/instansi/profil/detail/data'
import { cekKelengkapanProfilAction } from '@/services/actions/pengguna/dashboard/cek-kelengkapan-profil'
import { dataProfilAction as dataProfilProdiInstansiAction } from '@/services/actions/prodi-instansi/profil-instansi/detail/data'
import { makeSimpleQueryData } from '@/utils/query-data'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/options'

export const metadata = {
  ...metaObject('Dasbor'),
}

const pageHeader = {
  title: 'Dasbor',
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const level = session?.user?.level

  if (level === 'Pengguna') {
    const { success, data } = await cekKelengkapanProfilAction()
    if (success && !data?.nik) {
      redirect(routes.pengguna.lengkapiProfil)
    }
  }

  const queryClient = new QueryClient()

  if (level === 'Instansi') {
    await queryClient.prefetchQuery({
      queryKey: ['instansi.profil'],
      queryFn: makeSimpleQueryData(dataProfilInstansiAction),
    })
  } else if (level === 'Prodi') {
    await queryClient.prefetchQuery({
      queryKey: ['prodi-instansi.profil'],
      queryFn: makeSimpleQueryData(dataProfilProdiInstansiAction),
    })
  }

  return (
    <>
      <PageHeader title={pageHeader.title} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardBody />
      </HydrationBoundary>
    </>
  )
}
