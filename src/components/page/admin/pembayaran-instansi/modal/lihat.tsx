import { lihatPembayaranInstansiAction } from '@/actions/admin/pembayaran-instansi/lihat'
import {
  Badge,
  CardSeparator,
  Loader,
  Modal,
  ModalFooterButtons,
  Text,
  TextBordered,
  TextSpan,
  Time,
} from '@/components/ui'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'

type DetailType = {
  nama: string
  username: string
  email?: string
  kontak?: string
}

type LihatModalProps = {
  id?: string
  setId(id?: string): void
}

export default function LihatModal({ id, setId }: LihatModalProps) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.pembayaran-instansi.table.lihat', id],
    queryFn: makeSimpleQueryDataWithId(lihatPembayaranInstansiAction, id),
  })

  return (
    <Modal
      title="Detail Invoice"
      isLoading={!isLoading && isFetching}
      color="info"
      isOpen={!!id}
      onClose={() => setId(undefined)}
    >
      {isLoading || !id ? (
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

      <ModalFooterButtons cancel="Tutup" onCancel={() => setId(undefined)} />
    </Modal>
  )
}
