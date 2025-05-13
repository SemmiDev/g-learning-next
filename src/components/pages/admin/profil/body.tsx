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
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/admin/profil/data'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { LuCamera } from 'react-icons/lu'
import UbahModal from './modal/ubah'
import UbahFotoModal from './modal/ubah-foto'
import UbahPasswordModal from './modal/ubah-password'

export default function ProfilBody() {
  const jwt = useSessionJwt()

  const [showUbah, setShowUbah] = useState(false)
  const [showFoto, setShowFoto] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { data } = useQuery({
    queryKey: ['admin.profil'],
    queryFn: makeSimpleQueryDataWithParams(dataProfilApi, jwt),
  })

  return (
    <>
      <Card className="flex flex-col p-0">
        <div className="flex justify-between p-2">
          <Title as="h4" size="1.5xl" weight="semibold">
            Profil Saya
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
          <DataRow label="Foto">
            <div className="inline-block relative">
              <ActionIconTooltip
                tooltip="Ganti Foto"
                size="sm"
                variant="flat"
                color="secondary"
                className="absolute top-1.5 right-1.5"
                onClick={() => setShowFoto(true)}
              >
                <LuCamera />
              </ActionIconTooltip>
              <Thumbnail
                src={data?.foto}
                size={150}
                rounded="md"
                alt="profil"
                avatar={data?.nama}
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
          <DataRow label="Jenis Kelamin" outline>
            {data?.jenis_kelamin || '-'}
          </DataRow>
          <DataRow label="Nomor kontak" outline>
            {data?.hp || '-'}
          </DataRow>
          <DataRow label="Kata sandi">
            <Button
              variant="outline"
              color="warning"
              onClick={() => setShowPassword(true)}
            >
              Ubah Kata Sandi
            </Button>
          </DataRow>
        </div>
      </Card>

      <UbahModal show={showUbah} setShow={setShowUbah} />

      <UbahPasswordModal show={showPassword} setShow={setShowPassword} />

      <UbahFotoModal show={showFoto} setShow={setShowFoto} />
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
