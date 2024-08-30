import { lihatPenggunaAction } from '@/actions/admin/pengguna/lihat'
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
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import defaultPhoto from '@public/images/default-profile.webp'
import { useQuery } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import BlokirModal from './blokir'

type LihatModalProps = {
  id?: string
  setId(id?: string): void
}

export default function LihatModal({ id, setId }: LihatModalProps) {
  const [idBlokir, setIdBlokir] = useState<string>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.pengguna.table.lihat', id],
    queryFn: makeSimpleQueryDataWithId(lihatPenggunaAction, id),
  })

  return (
    <Modal
      title="Detail Pengguna"
      isLoading={!isLoading && isFetching}
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading || !id ? (
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
            </tbody>
          </table>
        </>
      )}
      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={() => setId(undefined)}>
        <div className="flex-1">
          <Button
            variant="flat-colorful"
            color="danger"
            className="w-full"
            onClick={() => setIdBlokir(id)}
          >
            Blokir
          </Button>
        </div>
      </ModalFooterButtons>

      <BlokirModal id={idBlokir} setId={setIdBlokir} setIdLihat={setId} />
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
