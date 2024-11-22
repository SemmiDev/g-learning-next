'use client'

import { dataProfilAction } from '@/actions/pengguna/profil/data'
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
import cn from '@/utils/class-names'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { LuCamera } from 'react-icons/lu'
import UbahPasswordModal from '../../admin/profil/modal/ubah-password'
import UbahModal from './modal/ubah'
import UbahFotoModal from './modal/ubah-foto'

export default function ProfilBody() {
  const [showUbahModal, setShowUbahModal] = useState(false)
  const [showFotoModal, setShowFotoModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const { data } = useQuery({
    queryKey: ['pengguna.profil'],
    queryFn: makeSimpleQueryData(dataProfilAction),
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
            onClick={() => setShowUbahModal(true)}
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
                onClick={() => setShowFotoModal(true)}
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
                <Button
                  as="span"
                  variant="text-colorful"
                  className="h-auto p-0"
                >
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
            <Button
              variant="outline"
              color="warning"
              onClick={() => setShowPasswordModal(true)}
            >
              Ubah Kata Sandi
            </Button>
          </DataRow>
        </div>
      </Card>

      <UbahModal showModal={showUbahModal} setShowModal={setShowUbahModal} />

      <UbahPasswordModal
        showModal={showPasswordModal}
        setShowModal={setShowPasswordModal}
      />

      <UbahFotoModal
        showModal={showFotoModal}
        setShowModal={setShowFotoModal}
      />
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
    <div className="grid grid-cols-12 gap-y-1">
      <div className="col-span-12 sm:col-span-3 lg:col-span-2">
        <TextSpan weight="semibold">{label}</TextSpan>
      </div>
      <div className="col-span-12 sm:col-span-9 lg:col-span-10">
        {outline ? (
          <TextBordered
            className={cn({ 'bg-gray-100': dark }, outlineClassName)}
          >
            {children}
          </TextBordered>
        ) : (
          children
        )}
      </div>
    </div>
  )
}
