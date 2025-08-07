import {
  ContentLoader,
  Modal,
  ModalFooterButtons,
  TextBordered,
  Time,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAdminApi } from '@/services/api/admin/admin/lihat'
import { useQuery } from '@tanstack/react-query'

type LihatModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatModal({ id, show, onHide }: LihatModalProps) {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.manajemen-admin.table.lihat', id],
    queryFn: makeSimpleApiQueryData(lihatAdminApi, id ?? null),
  })

  return (
    <Modal
      title="Detail Admin"
      isLoading={!isLoading && isFetching}
      color="info"
      isOpen={show}
      onClose={onHide}
    >
      {isLoading ? (
        <ContentLoader height={336} />
      ) : (
        <div className="flex flex-col gap-4 p-3">
          <TextBordered label="Nama Lengkap">{data?.nama || '-'}</TextBordered>
          <TextBordered label="Username">{data?.username || '-'}</TextBordered>
          <TextBordered label="Nomor Kontak">{data?.hp || '-'}</TextBordered>
          <TextBordered label="Terakhir Login">
            <Time
              date={data?.terakhir_login}
              format="datetime"
              empty="-"
              seconds
            />
          </TextBordered>
        </div>
      )}

      <ModalFooterButtons cancel="Tutup" onCancel={onHide} borderTop />
    </Modal>
  )
}
