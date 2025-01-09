import PageHeader from '@/components/shared/page-header'
import { Badge, Card, TabGroup, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import imageKelas from '@public/images/list-kelas.png'
import Image from 'next/image'
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
      href: routes.pengajar.ruangKelas,
      name: 'Ruang Kelas',
    },
    {
      name: 'Aljabar Linear',
    },
  ],
}

export default function RuangKelasLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Card className="flex flex-col">
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
        <TabGroup
          className="mt-2 mb-2"
          path={`${routes.penggunaAkademik.ruangKelasDikelola}/akademik/kelas`}
          items={[
            {
              text: 'Linimasa',
              slugAlias: 'linimasa',
            },
            {
              text: 'Sesi Pembelajaran',
              slug: 'sesi-pembelajaran',
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
