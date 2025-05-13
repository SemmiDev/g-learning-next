'use client'

import { dataProfilAction } from '@/services/actions/pengguna/profil/data'
import { kirimEmailVerifikasiAction } from '@/services/api/pengguna/profil/kirim-email-verifikasi'
import {
  ActionIconTooltip,
  Badge,
  Button,
  Card,
  CardSeparator,
  ModalConfirm,
  Text,
  TextBordered,
  TextSpan,
  Thumbnail,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { LuCamera } from 'react-icons/lu'
import { RiMailSendLine } from 'react-icons/ri'
import UbahModal from './modal/ubah'
import UbahFotoModal from './modal/ubah-foto'
import UbahPasswordModal from './modal/ubah-password'

type EmailType = {
  id: string
  email: string
}

export default function ProfilBody() {
  const [showUbah, setShowUbah] = useState(false)
  const [showFoto, setShowFoto] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [emailVerifikasi, setEmailVerifikasi] = useState<EmailType>()

  const { data } = useQuery({
    queryKey: ['pengguna.profil'],
    queryFn: makeSimpleQueryData(dataProfilAction),
  })

  const handleKirimEmailVerifikasi = async () => {
    if (!emailVerifikasi) return

    handleActionWithToast(kirimEmailVerifikasiAction(emailVerifikasi?.id), {
      loading: 'Mengirim email...',
      onStart: () => setEmailVerifikasi(undefined),
    })
  }

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
              ? data?.email?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center flex-wrap gap-x-2 gap-y-1"
                  >
                    <TextSpan>{item.email}</TextSpan>
                    <Badge
                      size="sm"
                      variant="flat"
                      color={item.status_aktif ? 'primary' : 'danger'}
                    >
                      {item.status_aktif ? 'Aktif' : 'Belum Aktif'}
                    </Badge>
                    {!item.status_aktif && (
                      <Button
                        size="sm"
                        color="success"
                        onClick={() => setEmailVerifikasi(item)}
                      >
                        <RiMailSendLine className="size-4 me-1" />
                        Kirim Email Verifikasi
                      </Button>
                    )}
                  </div>
                ))
              : '-'}
          </DataRow>
          <DataRow label="Website" outline>
            {data?.situs_web ? (
              <Link href={data?.situs_web} target="_blank">
                <Button
                  as="span"
                  variant="text-colorful"
                  className="min-h-0 p-0"
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

      <ModalConfirm
        title="Kirim Email Verifikasi"
        color="info"
        size="md"
        isOpen={!!emailVerifikasi}
        onClose={() => setEmailVerifikasi(undefined)}
        onConfirm={handleKirimEmailVerifikasi}
        headerIcon="help"
        confirm="Kirim Sekarang"
        cancel="Batal"
        closeOnCancel
      >
        <Text weight="medium" variant="dark" className="text-center p-3">
          Kamu akan mendapatkan email untuk melakukan verifikasi email di
          akunmu. Email verifikasi akan dikirimkan ke alamat email{' '}
          <TextSpan weight="bold">{emailVerifikasi?.email}</TextSpan>. Silahkan
          cek email kamu untuk melakukan verifikasi email.
        </Text>
      </ModalConfirm>
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
