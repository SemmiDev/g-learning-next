import DataFotoButton from '@/components/page/admin/profil/data-foto-button'
import UbahButton from '@/components/page/admin/profil/ubah-button'
import UbahSandiButton from '@/components/page/admin/profil/ubah-sandi-button'
import PageHeader from '@/components/shared/page-header'
import {
  Card,
  CardSeparator,
  TextBordered,
  Thumbnail,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import { ReactNode } from 'react'
import imagePhoto from '@public/images/photo.png'

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

export default function ProfilePage() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Card className="flex flex-col p-0">
        <div className="flex justify-between p-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            Profil Saya
          </Title>
          <UbahButton />
        </div>
        <CardSeparator />
        <table className="text-sm text-gray-dark m-2">
          <tbody>
            <DataRow label="Foto">
              <div className="inline-block relative">
                <DataFotoButton />
                <Thumbnail
                  src={imagePhoto}
                  size={150}
                  rounded="md"
                  alt="profil"
                  bordered
                />
              </div>
              <DataFotoButton />
            </DataRow>
            <DataRow label="Nama Lengkap" outline>
              Nama Asli
            </DataRow>
            <DataRow label="Username" outline>
              Username
            </DataRow>
            <DataRow label="Email" outline>
              admin@gmail.com
            </DataRow>
            <DataRow label="Nomor kontak" outline>
              0812 3456 7890
            </DataRow>
            <DataRow label="Kata sandi">
              <UbahSandiButton />
            </DataRow>
          </tbody>
        </table>
      </Card>
    </>
  )
}

function DataRow({
  label,
  children,
  outline,
}: {
  label: string
  children?: ReactNode
  outline?: boolean
}) {
  return (
    <tr>
      <td className="w-40 font-semibold align-baseline py-2">{label}</td>
      <td className="py-2">
        {outline ? <TextBordered>{children}</TextBordered> : children}
      </td>
    </tr>
  )
}
