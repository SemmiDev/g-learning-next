import { metaObject } from '@/config/site.config'
import { routes } from '@/config/routes'
import PageHeader from '@/components/shared/page-header'
import { ReactNode } from 'react'
import { Badge } from 'rizzui'
import Card from '@/components/ui/card'
import Image from 'next/image'
import imageKelas from '@public/images/list-kelas.png'
import { TabGroup, Text, Title } from '@/components/ui'
import KelasHeaderAction from '@/components/page/pengajar/ruang-kelas/kelas/header-action'

export const metadata = {
  ...metaObject('Ruang Kelas'),
}

const pageHeader = {
  title: 'Ruang Kelas',
  breadcrumb: [
    {
      href: routes.dashboard,
      name: 'Dashboard',
    },
    {
      href: routes.ruangKelas,
      name: 'Ruang Kelas',
    },
    {
      name: 'Aljabar Linear',
    },
  ],
}

export default function KelasLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Card className="flex flex-col">
        <div className="flex justify-between items-start space-x-2">
          <div className="flex space-x-3">
            <div className="w-56 h-28 rounded overflow-clip">
              <Image
                src={imageKelas}
                alt="kelas"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex space-x-2 items-center">
                <Title as="h5" weight="semibold">
                  Aljabar Linier
                </Title>
                <Badge
                  size="sm"
                  color="success"
                  variant="flat"
                  className="text-[8px] leading-3 py-[.15rem]"
                >
                  Publik
                </Badge>
              </div>
              <Text size="sm">
                Kelas TI A | 3 SKS | 35 Mahasiswa | Senin, 13.00-14.35 | Rabu,
                13.00-14.35
              </Text>
              <Text size="sm" className="mt-2">
                Berikut adalah tempat untuk menulis deskripsi singkat terkait
                kelas yang telah dibuat
              </Text>
            </div>
          </div>
          <KelasHeaderAction />
        </div>
        <TabGroup
          className="mt-2 mb-2"
          path={routes.kelas}
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
    </>
  )
}
