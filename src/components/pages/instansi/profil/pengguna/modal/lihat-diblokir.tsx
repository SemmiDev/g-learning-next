import { bukaBlokirPenggunaAction } from '@/services/api/instansi/profil/pengguna/buka-blokir'
import { lihatPenggunaAction } from '@/services/api/instansi/profil/pengguna/lihat'
import {
  Button,
  CardSeparator,
  Loader,
  Modal,
  ModalConfirm,
  ModalFooterButtons,
  Text,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import imagePhoto from '@public/images/photo.png'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'

type LihatModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatDiblokirModal({
  id,
  show,
  onHide,
}: LihatModalProps) {
  const queryClient = useQueryClient()
  const [idBukaBlokir, setIdBukaBlokir] = useState<string>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.pengguna.table.lihat', id],
    queryFn: makeSimpleQueryDataWithId(lihatPenggunaAction, id),
  })

  const handleBukaBlokir = () => {
    if (!id) return

    handleActionWithToast(bukaBlokirPenggunaAction(id), {
      loading: 'Memproses...',
      onSuccess: () => {
        onHide()
        setIdBukaBlokir(undefined)

        queryClient.invalidateQueries({
          queryKey: ['instansi.profil.pengguna.table'],
        })
        queryClient.invalidateQueries({
          queryKey: ['instansi.profil.pengguna.table-diblokir'],
        })
        queryClient.invalidateQueries({
          queryKey: ['instansi.dashboard.table-pengguna'],
        })
        queryClient.invalidateQueries({
          queryKey: ['instansi.dashboard.table-pengguna-diblokir'],
        })
      },
    })
  }

  return (
    <Modal
      title="Detail Pengguna yang Diblokir"
      isLoading={!isLoading && isFetching}
      isOpen={show}
      onClose={onHide}
    >
      {isLoading ? (
        <Loader height={512} />
      ) : (
        <>
          <div className="flex flex-col items-center p-3">
            <figure className="shrink-0 size-36 border border-muted rounded mb-2">
              <Image
                src={imagePhoto}
                alt="foto profil"
                className="object-contain"
              />
            </figure>
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
              <DataRow label="Alasan Diblokir">
                {data?.keterangan_blokir || '-'}
              </DataRow>
            </tbody>
          </table>
        </>
      )}

      <ModalFooterButtons cancel="Tutup" onCancel={onHide} borderTop>
        <div className="flex-1">
          <Button
            className="w-full"
            onClick={() => setIdBukaBlokir(id)}
            disabled={isLoading}
          >
            Buka Blokir
          </Button>
        </div>
      </ModalFooterButtons>

      <ModalConfirm
        title="Buka Blokir"
        desc="Yakin ingin membuka blokir pengguna ini di instansi anda?"
        confirmColor="primary"
        isOpen={!!idBukaBlokir}
        onConfirm={handleBukaBlokir}
        onClose={() => setIdBukaBlokir(undefined)}
        closeOnCancel
      />
    </Modal>
  )
}

function DataRow({ label, children }: { label: string; children?: ReactNode }) {
  return (
    <tr>
      <td className="w-32 font-medium text-gray-lighter align-baseline text-right pe-5 py-2">
        {label}
      </td>
      <td className="font-semibold text-gray-dark py-2">{children}</td>
    </tr>
  )
}
