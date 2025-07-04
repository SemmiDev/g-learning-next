'use client'

import {
  Card,
  CardSeparator,
  TextBordered,
  TextSpan,
  Thumbnail,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { dataProfilApi } from '@/services/api/prodi-instansi/profil-instansi/detail/data'
import { useQuery } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function ProfilDetailBody() {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { data } = useQuery({
    queryKey: ['prodi-instansi.profil-instansi'],
    queryFn: makeSimpleApiQueryData(dataProfilApi),
  })

  return (
    <Card className="flex flex-col p-0">
      <div className="p-2">
        <Title as="h4" size="1.5xl" weight="semibold">
          Detail Instansi
        </Title>
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
          <Thumbnail
            src={data?.instansi.logo}
            size={150}
            rounded="md"
            alt="logo instansi"
            avatar={data?.instansi?.nama}
            bordered
          />
        </DataRow>
      </div>
    </Card>
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
