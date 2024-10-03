'use client'

import { dataProfilAction } from '@/actions/instansi/profil/detail/data'
import {
  ActionIconTooltip,
  Button,
  Card,
  CardSeparator,
  TextBordered,
  Thumbnail,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { LuCamera } from 'react-icons/lu'
import UbahModal from './modal/ubah'
import UbahLogoModal from './modal/ubah-logo'

export default function ProfilDetailBody() {
  const [showUbah, setShowUbah] = useState(false)
  const [ubahLogo, setUbahLogo] = useState(false)

  const { data } = useQuery({
    queryKey: ['instansi.profil'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  return (
    <>
      <Card className="flex flex-col p-0">
        <div className="flex justify-between p-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            Detail Instansi
          </Title>
          <Button
            size="sm"
            variant="outline"
            color="warning"
            onClick={() => setShowUbah(true)}
          >
            Ubah Data
          </Button>
        </div>
        <CardSeparator />
        <table className="text-sm text-gray-dark m-2">
          <tbody>
            <DataRow label="Nama Instansi" outline>
              {data?.instansi.nama || '-'}
            </DataRow>
            <DataRow label="Nama Pimpinan" outline>
              {data?.instansi.nama_pimpinan || '-'}
            </DataRow>
            <DataRow label="Kontak Pimpinan" outline>
              {data?.instansi.telepon_pimpinan || '-'}
            </DataRow>
            <DataRow label="Alamat Instansi" outline>
              {data?.instansi.alamat || '-'}
            </DataRow>
            <DataRow label="Kontak Instansi" outline>
              {data?.instansi.telepon_instansi || '-'}
            </DataRow>
            <DataRow label="Bio" outline>
              <SanitizeHTML html={data?.instansi.bio || '-'} />
            </DataRow>
            <DataRow label="Logo Instansi">
              <div className="inline-block relative">
                <ActionIconTooltip
                  tooltip="Ganti Logo"
                  size="sm"
                  variant="flat"
                  color="secondary"
                  className="absolute top-1.5 right-1.5"
                  onClick={() => setUbahLogo(true)}
                >
                  <LuCamera />
                </ActionIconTooltip>
                <Thumbnail
                  src={data?.instansi.logo}
                  size={150}
                  rounded="md"
                  alt="logo instansi"
                  avatar={data?.instansi?.nama}
                  bordered
                />
              </div>
            </DataRow>
          </tbody>
        </table>
      </Card>

      <UbahModal show={showUbah} setShow={setShowUbah} />

      <UbahLogoModal show={ubahLogo} setShow={setUbahLogo} />
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
      <td className="">
        {outline ? <TextBordered>{children}</TextBordered> : children}
      </td>
    </tr>
  )
}
