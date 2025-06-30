import {
  Loader,
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

  // const { data, isLoading, isFetching } = useQuery({
  //   queryKey: ['instansi.manajemen-prodi.table.lihat', id],
  //   queryFn: makeSimpleApiQueryData(lihatAdminApi, id ?? null),
  // })

  const isLoading = false

  return (
    <Modal
      title="Detail Admin Prodi"
      // isLoading={!isLoading && isFetching}
      color="info"
      isOpen={show}
      onClose={onHide}
    >
      {isLoading ? (
        <Loader height={336} />
      ) : (
        <div className="flex flex-col gap-4 p-3">
          <TextBordered label="Nama Lengkap">Susanti</TextBordered>
          <TextBordered label="Username">susan</TextBordered>
          <TextBordered label="Terakhir Login">
            <Time
              date={'2025-06-28T15:30:23.000Z'}
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
