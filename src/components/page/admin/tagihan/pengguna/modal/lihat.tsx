import { lihatTagihanPenggunaAction } from '@/actions/admin/tagihan-pengguna/lihat'
import {
  Loader,
  Modal,
  ModalFooterButtons,
  TextBordered,
  TextSpan,
  Time,
} from '@/components/ui'
import { NAMA_BULAN } from '@/config/const'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { rupiah } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'

type LihatModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatModal({ id, show, onHide }: LihatModalProps) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.tagihan-pengguna.table.lihat', id],
    queryFn: makeSimpleQueryDataWithId(lihatTagihanPenggunaAction, id),
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
          <TextBordered label="Nomor Tagihan">
            {data?.nomor_invoice}
          </TextBordered>
          <TextBordered label="Pengguna">
            {data?.nama_pengguna || '-'}
          </TextBordered>
          <TextBordered label="Tanggal Ditagihkan">
            <Time date={data?.tanggal_tagihan} empty="-" />
          </TextBordered>
          <div className="flex flex-wrap gap-2">
            <TextBordered label="Bulan Tagihan" className="flex-1">
              {!!data?.bulan_tagihan
                ? NAMA_BULAN[data?.bulan_tagihan - 1]
                : '-'}
            </TextBordered>
            <TextBordered label="Tahun Tagihan" className="flex-1">
              {data?.tahun_tagihan || '-'}
            </TextBordered>
          </div>
          <TextBordered label="Jenis Paket">
            {data?.nama_paket || '-'}
          </TextBordered>
          <TextBordered label="Total Tagihan">
            {rupiah(data?.total_tagihan || 0)}
          </TextBordered>
          <TextBordered label="Status">
            <TextSpan
              size="sm"
              weight="semibold"
              color={data?.status_tagihan === 'Lunas' ? 'success' : 'danger'}
            >
              {data?.status_tagihan || '-'}
            </TextSpan>
          </TextBordered>
        </div>
      )}

      <ModalFooterButtons cancel="Tutup" onCancel={onHide} borderTop />
    </Modal>
  )
}
