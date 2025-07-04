import {
  Button,
  CardSeparator,
  Loader,
  Modal,
  ModalFooterButtons,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatPenggunaApi } from '@/services/api/prodi-instansi/profil-instansi/pengguna/lihat'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { ReactNode, useState } from 'react'

type LihatModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatModal({ id, show, onHide }: LihatModalProps) {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['prodi-instansi.profil-instansi.pengguna.table.lihat', id],
    queryFn: makeSimpleApiQueryData(lihatPenggunaApi, id ?? null),
  })

  return (
    <Modal
      title="Detail Pengguna"
      isLoading={!isLoading && isFetching}
      isOpen={show}
      onClose={onHide}
    >
      {isLoading ? (
        <Loader height={440} />
      ) : (
        <>
          <div className="flex flex-col items-center p-3">
            <Thumbnail
              src={data?.foto}
              size={150}
              alt="foto profil"
              avatar={data?.nama}
              className="shrink-0 mb-2"
              bordered
              priority
            />
            <Title size="1.5xl" weight="semibold">
              {data?.nama}
            </Title>
            <Text size="sm" weight="semibold" variant="dark" className="mb-2">
              {data?.jenis_akun?.length ? data?.jenis_akun.join(', ') : '-'}
            </Text>
            <SanitizeHTML
              html={data?.bio || '-'}
              className="text-sm font-medium text-gray-dark text-center"
            />
          </div>

          <CardSeparator />

          <table className="mx-3">
            <tbody>
              <DataRow label="Username">{data?.username}</DataRow>
              <DataRow label="Kontak">{data?.hp || '-'}</DataRow>
              <DataRow label="Email">{data?.email || '-'}</DataRow>
              <DataRow label="Website">
                {data?.situs_web ? (
                  <Link href={data?.situs_web} target="_blank">
                    <Button variant="text-colorful" className="min-h-min p-0">
                      {data?.situs_web}
                    </Button>
                  </Link>
                ) : (
                  '-'
                )}
              </DataRow>
              <DataRow label="Jenis Kelamin">
                {data?.jenis_kelamin || '-'}
              </DataRow>
            </tbody>
          </table>
        </>
      )}

      <ModalFooterButtons cancel="Tutup" onCancel={onHide} borderTop />
    </Modal>
  )
}

function DataRow({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <tr>
      <td className="font-medium text-gray-lighter align-baseline text-right pe-5 py-2">
        {label}
      </td>
      <td className="font-semibold text-gray-dark py-2">{children}</td>
    </tr>
  )
}
