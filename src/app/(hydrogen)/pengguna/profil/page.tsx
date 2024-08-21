import { dataProfileAction } from '@/actions/pengguna/profil/data'
import ProfilBody from '@/components/page/pengguna/profil/body'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'

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
  const { data } = await dataProfileAction()

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfilBody prefetchData={data} />
    </>
  )
}
