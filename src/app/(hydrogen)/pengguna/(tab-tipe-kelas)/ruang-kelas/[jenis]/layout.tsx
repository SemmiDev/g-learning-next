import PageHeader from '@/components/shared/page-header'
import { TabGroup } from '@/components/ui'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { mustBe } from '@/utils/must-be'
import { notFound } from 'next/navigation'
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

export default async function RuangKelasDikelolaLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ jenis: string }>
}) {
  const jenis = (await params).jenis

  const listJenis = ['dikelola', 'diikuti'] as const

  const jenisKelas = mustBe(jenis, listJenis, null)

  if (jenisKelas === null) {
    notFound()
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <>
        <TabGroup
          className="mb-4"
          path={routes.pengguna.ruangKelas[jenisKelas ?? 'dikelola'].default}
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
