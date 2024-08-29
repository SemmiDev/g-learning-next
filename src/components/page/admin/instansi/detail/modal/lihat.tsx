import { lihatPenggunaInstansiAction } from '@/actions/admin/instansi/pengguna/lihat'
import {
  CardSeparator,
  Loader,
  Modal,
  ModalFooterButtons,
  Text,
  Title,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import imagePhoto from '@public/images/photo.png'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { ReactNode } from 'react'

type LihatModalProps = {
  id?: string
  setId(id?: string): void
}

export default function LihatModal({ id, setId }: LihatModalProps) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.instansi.detail.detail-pengguna', id],
    queryFn: makeSimpleQueryDataWithId(lihatPenggunaInstansiAction, id),
  })

  return (
    <Modal
      isLoading={!isLoading && isFetching}
      size="sm"
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading ? (
        <Loader height={410} />
      ) : (
        <>
          <div className="flex flex-col items-center p-3">
            <figure className="shrink-0 size-[150px] border border-muted rounded mb-2">
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
              {data?.tipe || '-'}
            </Text>
            <Text size="sm" weight="medium" variant="dark" align="center">
              <SanitizeHTML html={data?.bio || '-'} />
            </Text>
          </div>

          <CardSeparator />

          <table className="mx-3">
            <tbody>
              <DataRow label="Username">{data?.username}</DataRow>
              <DataRow label="Kontak">{data?.hp || '-'}</DataRow>
              <DataRow label="Email">{'-'}</DataRow>
              <DataRow label="Website">{data?.situs_web || '-'}</DataRow>
              <DataRow label="Jenis Kelamin">
                {data?.jenis_kelamin || '-'}
              </DataRow>
            </tbody>
          </table>
        </>
      )}

      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={() => setId(undefined)} />
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
