import { dataProfileAction, DataType } from '@/actions/pengguna/profil/data'
import UbahButton from '@/components/page/pengguna/profil/ubah-button'
import UbahFotoButton from '@/components/page/pengguna/profil/ubah-foto-button'
import UbahSandiButton from '@/components/page/pengguna/profil/ubah-sandi-button'
import PageHeader from '@/components/shared/page-header'
import {
  Button,
  Card,
  CardSeparator,
  TextBordered,
  TextSpan,
  Thumbnail,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { routes } from '@/config/routes'
import { metaObject } from '@/config/site.config'
import cn from '@/utils/class-names'
import defaultPhoto from '@public/images/default-profile.webp'
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

export default async function ProfilePage() {
  const res = await dataProfileAction()
  const data: DataType = res.data

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />

      <Card className="flex flex-col p-0">
        <div className="flex justify-between p-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            Profil Saya
          </Title>
          <UbahButton data={data} />
        </div>
        <CardSeparator />
        <table className="text-sm text-gray-dark m-2">
          <tbody>
            <DataRow label="Foto">
              <div className="inline-block relative">
                <UbahFotoButton />
                <Thumbnail
                  src={data?.foto || defaultPhoto}
                  size={150}
                  rounded="md"
                  alt="profil"
                  bordered
                  priority
                />
              </div>
            </DataRow>
            <DataRow label="Nama Lengkap" outline>
              {data?.nama || '-'}
            </DataRow>
            <DataRow label="Username" outline>
              {data?.username || '-'}
            </DataRow>
            <DataRow label="NIK" outline>
              {data?.nik || '-'}
            </DataRow>
            <DataRow
              label="Nama Instansi"
              outlineClassName="flex-col items-start"
              outline
            >
              {data?.instansi?.length
                ? data?.instansi?.map((item: string, idx: number) => (
                    <TextSpan key={idx}>{item}</TextSpan>
                  ))
                : '-'}
            </DataRow>
            <DataRow label="Sinkron" outline dark>
              Belum tersinkron
            </DataRow>
            <DataRow label="Nomor Kontak" outline>
              {data?.hp || '-'}
            </DataRow>
            <DataRow label="Email" outline>
              {data?.email?.length
                ? data?.email?.map((item: Record<string, string>) => (
                    <TextSpan key={item.id}>{item.email}</TextSpan>
                  ))
                : '-'}
            </DataRow>
            <DataRow label="Website" outline>
              {data?.situs_web ? (
                <Link href={data?.situs_web} target="_blank">
                  <Button variant="text-colorful" className="h-auto p-0">
                    {data?.situs_web}
                  </Button>
                </Link>
              ) : (
                '-'
              )}
            </DataRow>
            <DataRow label="Jenis Kelamin" outline>
              {data?.jenis_kelamin || '-'}
            </DataRow>
            <DataRow label="Bio" outline>
              <SanitizeHTML html={data?.bio || '-'} />
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
  dark,
  outline,
  outlineClassName,
}: {
  label: string
  children?: ReactNode
  dark?: boolean
  outline?: boolean
  outlineClassName?: string
}) {
  return (
    <tr className="[&>td]:py-2">
      <td className="w-40 font-semibold align-baseline">{label}</td>
      <td>
        {outline ? (
          <TextBordered
            className={cn({ 'bg-gray-100': dark }, outlineClassName)}
          >
            {children}
          </TextBordered>
        ) : (
          children
        )}
      </td>
    </tr>
  )
}
