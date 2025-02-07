import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import KelasHeader from '@/components/page/pengguna/ruang-kelas/umum/kelas/header'
import PageHeader from '@/components/shared/page-header'
import { Card, TabGroup } from '@/components/ui'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
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

  await queryClient.prefetchQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: async () => data,
  })

  const jenisKelas = data?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = data?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'
  const ruangKelasUrl = routes.pengguna.ruangKelas[jenisKelas][tipeKelas]

  const pageHeader = {
    title: 'Ruang Kelas',
    breadcrumb: [
      {
        href: routes.dashboard,
        name: 'Dasbor',
      },
      {
        href: routes.pengguna.ruangKelas[jenisKelas].default,
        name: 'Ruang Kelas',
      },
      {
        href: ruangKelasUrl,
        name: data?.peran === 'Pengajar' ? 'Kelas Dikelola' : 'Kelas Diikuti',
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
            path={`${ruangKelasUrl}/${idKelas}`}
            items={[
              {
                text: 'Diskusi',
                slugAlias: 'diskusi',
              },
              {
                text: 'Presensi',
                slug: 'presensi',
              },
              {
                text: 'Tugas',
                slug: 'tugas',
              },
              {
                text: 'Ujian',
                slug: 'ujian',
              },
              {
                text: 'Berkas',
                slug: 'berkas',
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
