import { lihatPenggunaInstansiAction } from '@/actions/admin/instansi/pengguna/lihat'
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
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

type LihatModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatModal({ id, show, onHide }: LihatModalProps) {
  const { id: idInstansi }: { id: string } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.instansi.detail.table-pengguna.lihat', id],
    queryFn: async () => {
      if (!id) return null

      const { data } = await lihatPenggunaInstansiAction(idInstansi, id)

      return data
    },
  })

  return (
    <Modal
      title="Detail Pengguna"
      isLoading={!isLoading && isFetching}
      isOpen={show}
      onClose={onHide}
    >
      {isLoading ? (
        <Loader height={410} />
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
              {data?.tipe || '-'}
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
                    <Button variant="text-colorful" className="h-auto p-0">
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

      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={onHide} />
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
