'use client'

import {
  ActionIconTooltip,
  Button,
  Card,
  CardSeparator,
  TextBordered,
  TextSpan,
  Thumbnail,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/instansi/profil/detail/data'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { LuCamera } from 'react-icons/lu'
import UbahModal from './modal/ubah'
import UbahLogoModal from './modal/ubah-logo'

export default function ProfilDetailBody() {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const [showUbah, setShowUbah] = useState(false)
  const [ubahLogo, setUbahLogo] = useState(false)

  const { data } = useQuery({
    queryKey: ['instansi.profil'],
    queryFn: makeSimpleApiQueryData(dataProfilApi),
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
        <div className="flex flex-col gap-y-4 text-sm text-gray-dark px-2 py-3">
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
        </div>
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
  outlineClassName,
}: {
  label: string
  children?: ReactNode
  outline?: boolean
  outlineClassName?: string
}) {
  return (
    <div className="grid grid-cols-12 gap-y-1">
      <div className="col-span-12 sm:col-span-3 lg:col-span-2">
        <TextSpan weight="semibold">{label}</TextSpan>
      </div>
      <div className="col-span-12 sm:col-span-9 lg:col-span-10">
        {outline ? (
          <TextBordered className={outlineClassName}>{children}</TextBordered>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
