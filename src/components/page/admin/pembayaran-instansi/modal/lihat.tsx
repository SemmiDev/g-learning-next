import { lihatPembayaranInstansiAction } from '@/actions/admin/pembayaran-instansi/lihat'
import {
  CardSeparator,
  Loader,
  Modal,
  ModalFooterButtons,
  TextBordered,
  TextSpan,
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
    queryKey: ['admin.pembayaran-instansi.table.lihat', id],
    queryFn: makeSimpleQueryDataWithId(lihatPembayaranInstansiAction, id),
  })

  return (
    <Modal
      title="Detail Invoice"
      isLoading={!isLoading && isFetching}
      color="info"
      isOpen={show}
      onClose={onHide}
    >
      {isLoading ? (
        <Loader height={582} />
      ) : (
        <div className="flex flex-col gap-4 p-3">
          <TextBordered label="No. Invoice">{data?.nomor_invoice}</TextBordered>
          <TextBordered label="No. Pesanan">{data?.nomor_pesanan}</TextBordered>
          <TextBordered label="Instansi">
            {data?.nama_instansi || '-'}
          </TextBordered>
          <TextBordered label="Jenis Paket">
            {data?.nama_paket || '-'}
          </TextBordered>
          <TextBordered label="Jenis Pembayaran">
            {data?.jenis_pembayaran || '-'}
          </TextBordered>
          <TextBordered label="Status">
            <TextSpan
              size="sm"
              weight="semibold"
              color={data?.status === 'Lunas' ? 'success' : 'danger'}
            >
              {data?.status || '-'}
            </TextSpan>
          </TextBordered>
          <TextBordered label="Tanggal Pembayaran">
            <Time
              date={data?.tanggal_pembayaran}
              format="dateday"
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
