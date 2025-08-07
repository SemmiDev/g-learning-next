import {
  ContentLoader,
  Modal,
  ModalFooterButtons,
  TextBordered,
  Time,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatPembayaranTagihanPenggunaApi } from '@/services/api/admin/tagihan-pengguna/pembayaran/lihat'
import { rupiah } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

type LihatModalProps = {
  id: string | undefined
  show: boolean
  onHide: () => void
}

export default function LihatModal({ id, show, onHide }: LihatModalProps) {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const { id: idTagihan }: { id: string } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['admin.tagihan-pengguna.pembayaran.table.ubah', idTagihan, id],
    queryFn: makeSimpleApiQueryData(
      lihatPembayaranTagihanPenggunaApi,
      idTagihan,
      id ?? null
    ),
    enabled: !!id,
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
        <ContentLoader height={336} />
      ) : (
        <div className="flex flex-col gap-4 p-3">
          <TextBordered label="Nomor Pembayaran">
            {data?.nomor_pembayaran}
          </TextBordered>
          <TextBordered label="Tanggal Pembayaran">
            <Time date={data?.tanggal_pembayaran} empty="-" />
          </TextBordered>
          <TextBordered label="Nominal Pembayaran">
            {rupiah(data?.jumlah_pembayaran || 0)}
          </TextBordered>
          <TextBordered label="Jenis Pembayaran">
            {data?.jenis_pembayaran || '-'}
          </TextBordered>
        </div>
      )}

      <ModalFooterButtons cancel="Tutup" onCancel={onHide} borderTop />
    </Modal>
  )
}
