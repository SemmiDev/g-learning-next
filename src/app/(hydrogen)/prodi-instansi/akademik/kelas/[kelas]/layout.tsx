import KelasHeader from '@/components/pages/prodi-instansi/akademik/kelas/header'
import PageHeader from '@/components/shared/page-header'
import { Card, TabGroup } from '@/components/ui'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { lihatKelasAction } from '@/services/actions/prodi-instansi/akademik/kelas/lihat'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

export const metadata = {
  ...metaObject('Ruang Kelas'),
}

type KelasLayoutProps = {
  params: Promise<{ kelas: string }>
  children: ReactNode
}

export default async function KelasLayout({
  params,
  children,
}: KelasLayoutProps) {
  const queryClient = new QueryClient()

  const { kelas: idKelas } = await params

  const { data, code } = await lihatKelasAction(idKelas)

  if (code === 404 || code === 403) return notFound()

  await queryClient.setQueryData(
    ['prodi-instansi.akademik.kelas.lihat', idKelas],
    data
  )

  const pageHeader = {
    title: 'Kelas',
    breadcrumb: [
      {
        href: routes.dashboard,
        name: 'Dasbor',
      },
      {
        href: routes.prodiInstansi.akademik,
        name: 'Akademik',
      },
      {
        name: 'Kelas',
      },
      {
        name: data?.kelas.nama_kelas ?? '',
      },
    ],
  }

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Card className="flex flex-col">
          <KelasHeader />
          <TabGroup
            className="mt-2 mb-2"
            path={`${routes.prodiInstansi.kelasAkademik}/${idKelas}`}
            items={[
              {
                text: 'Sesi Pembelajaran',
                slugAlias: 'sesi-pembelajaran',
              },
              {
                text: 'Presensi',
                slug: 'presensi',
              },
              {
                text: 'Anggota Kelas',
                slug: 'anggota-kelas',
              },
            ]}
          />
        </Card>
        {children}
      </HydrationBoundary>
    </>
  )
}
