import HeaderCard from '@/components/page/instansi/profil/header-card'
import PageHeader from '@/components/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
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

export default function ProfilInstansiLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex flex-col space-y-4">
        <HeaderCard />
        {children}
      </div>
    </>
  )
}
