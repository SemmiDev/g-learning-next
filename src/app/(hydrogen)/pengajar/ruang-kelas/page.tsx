import PageHeader from '@/app/shared/page-header'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import imageKelas from '@public/images/list-kelas.png'
import CardKelas from '@/components/page/pengajar/ruang-kelas/card-kelas'
import { Button, Text, Title } from '@/components/ui'

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
      name: 'Ruang Kelas',
    },
  ],
}

export default function ListKelasPage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className="flex justify-between items-center">
        <div>
          <Title as="h5" className="leading-tight font-semibold">
            Semua Kelas
          </Title>
          <Text size="xs" className="text-gray-300">
            Semua kelas akademik yang anda
          </Text>
        </div>
        <Button size="sm">Tambah Kelas</Button>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(10)].map((e, i) => {
          return <CardKelas key={i} image={imageKelas} />
        })}
      </div>
    </>
  )
}
