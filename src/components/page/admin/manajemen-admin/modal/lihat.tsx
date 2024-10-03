import { lihatAdminAction } from '@/actions/admin/admin/lihat'
import {
  CardSeparator,
  Loader,
  Modal,
  ModalFooterButtons,
  TextBordered,
  Time,
} from '@/components/ui'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'

type LihatModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatModal({ id, show, onHide }: LihatModalProps) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.manajemen-admin.table.lihat', id],
    queryFn: makeSimpleQueryDataWithId(lihatAdminAction, id),
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
        <Loader height={336} />
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

      <CardSeparator />

      <ModalFooterButtons cancel="Tutup" onCancel={onHide} />
    </Modal>
  )
}
