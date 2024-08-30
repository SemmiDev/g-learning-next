'use client'

import { dataProfileAction } from '@/actions/admin/profil/data'
import {
  ActionIconTooltip,
  Button,
  Card,
  CardSeparator,
  TextBordered,
  Thumbnail,
  Title,
} from '@/components/ui'
import { makeSimpleQueryData } from '@/utils/query-data'
import defaultPhoto from '@public/images/default-profile.webp'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { LuCamera } from 'react-icons/lu'
import UbahModal from './modal/ubah'
import UbahFotoModal from './modal/ubah-foto'
import UbahPasswordModal from './modal/ubah-password'

export default function ProfileBody() {
  const [showUbahModal, setShowUbahModal] = useState(false)
  const [showFotoModal, setShowFotoModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const { data } = useQuery({
    queryKey: ['admin.profil'],
    queryFn: makeSimpleQueryData(dataProfileAction),
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
        <table className="text-sm text-gray-dark m-2">
          <tbody>
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
                onClick={() => setShowPasswordModal(true)}
              >
                Ubah Kata Sandi
              </Button>
            </DataRow>
          </tbody>
        </table>
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
