import RuangKelasDikelolaBody from '@/components/page/pengguna-akademik/ruang-kelas-dikelola/body'
import PageHeader from '@/components/shared/page-header'
import { TabGroup } from '@/components/ui'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { ReactNode } from 'react'

export const metadata = {
  ...metaObject('Ruang Kelas'),
}

const pageHeader = {
  title: 'Ruang Kelas',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dasbor',
    },
    {
      name: 'Ruang Kelas',
    },
  ],
}

export default function RuangKelasDikelolaLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <>
        <TabGroup
          className="mb-4"
          path={routes.penggunaAkademik.ruangKelasDikelola}
          items={[
            {
              text: 'Kelas Akademik',
              slugAlias: 'akademik',
            },
            {
              text: 'Kelas Umum',
              slug: 'umum',
            },
          ]}
        />
        {children}
      </>
    </>
  )
}
