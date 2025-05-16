import {
  Button,
  CardSeparator,
  Loader,
  Modal,
  ModalConfirm,
  ModalFooterButtons,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { bukaBlokirPenggunaApi } from '@/services/api/admin/pengguna/buka-blokir'
import { lihatPenggunaApi } from '@/services/api/admin/pengguna/lihat'
import { handleActionWithToast } from '@/utils/action'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const { jwt, makeSimpleApiQueryData, processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [idBukaBlokir, setIdBukaBlokir] = useState<string>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.pengguna.table.lihat', id],
    queryFn: makeSimpleApiQueryData(lihatPenggunaApi, id ?? null),
  })

  const handleBukaBlokir = async () => {
    if (!jwt || !id) return

    await handleActionWithToast(processApi(bukaBlokirPenggunaApi, id), {
      loading: 'Memproses...',
      onSuccess: () => {
        onHide()
        setIdBukaBlokir(undefined)

        queryClient.invalidateQueries({
          queryKey: ['admin.dashboard.table-pengguna-diblokir'],
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
              {data?.jenis_akun || '-'}
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
              <DataRow label="Website">{data?.situs_web || '-'}</DataRow>
              <DataRow label="Jenis Kelamin">
                {data?.jenis_kelamin || '-'}
              </DataRow>
              <DataRow label="Instansi">{data?.instansi || 'Umum'}</DataRow>
              <DataRow label="Paket">{data?.paket || '-'}</DataRow>
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
        desc="Yakin ingin membuka blokir pengguna ini?"
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
