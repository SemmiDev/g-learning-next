import UbahButton from '@/components/page/pengajar/profil/ubah-button'
import UbahFotoButton from '@/components/page/pengajar/profil/ubah-foto-button'
import UbahSandiButton from '@/components/page/pengajar/profil/ubah-sandi-button'
import PageHeader from '@/components/shared/page-header'
import {
  Button,
  Card,
  CardSeparator,
  TextBordered,
  Thumbnail,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import imagePhoto from '@public/images/photo.png'
import Link from 'next/link'
import { ReactNode } from 'react'

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

export default function ProfilPage() {
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
                <UbahFotoButton />
                <Thumbnail
                  src={imagePhoto}
                  size={150}
                  rounded="md"
                  alt="profil"
                  bordered
                />
              </div>
            </DataRow>
            <DataRow label="Nama Lengkap" outline>
              Annitsa Bestweden
            </DataRow>
            <DataRow label="Username" outline>
              anbes
            </DataRow>
            <DataRow label="NIK" outline>
              147122089920001
            </DataRow>
            <DataRow label="Nama Instansi" outline>
              UIN SUTRA Singapore
            </DataRow>
            <DataRow label="Sinkron" outline>
              Belum tersinkron
            </DataRow>
            <DataRow label="Nomor Kontak" outline>
              0812 3456 7890
            </DataRow>
            <DataRow label="Email" outline>
              email@email.com
            </DataRow>
            <DataRow label="Website" outline>
              <Link href="http://anbes.com" target="_blank">
                <Button variant="text-colorful" className="min-h-min p-0">
                  http://anbes.com
                </Button>
              </Link>
            </DataRow>
            <DataRow label="Jenis Kelamin" outline>
              Perempuan
            </DataRow>
            <DataRow label="Bio" outline>
              -
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
    <tr className="[&>td]:py-2">
      <td className="w-40 font-semibold align-baseline">{label}</td>
      <td>{outline ? <TextBordered>{children}</TextBordered> : children}</td>
    </tr>
  )
}
