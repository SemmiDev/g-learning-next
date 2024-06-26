import {
  Button,
  CardSeparator,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import Link from 'next/link'

export default function MulaiUjianModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  return (
    <Modal
      title="Mulai Ujian"
      size="sm"
      isOpen={showModal}
      headerClassName="[&_.modal-title]:text-lg"
      onClose={() => setShowModal(false)}
    >
      <div className="flex flex-col p-3">
        <Text weight="semibold" variant="dark" align="center">
          Apakah Anda yakin ingin memulai ujian?
        </Text>
        <div className="flex gap-x-2 mt-2">
          <div className="flex flex-col flex-1 bg-slight-blue rounded-md p-2">
            <Text size="xs" weight="medium">
              Jumlah Soal
            </Text>
            <Text weight="semibold" variant="dark">
              21 soal
            </Text>
          </div>
          <div className="flex flex-col flex-1 bg-slight-green rounded-md p-2">
            <Text size="xs" weight="medium">
              Durasi Pengerjaan
            </Text>
            <Text weight="semibold" variant="dark">
              90 menit
            </Text>
          </div>
        </div>
      </div>
      <CardSeparator />
      <ModalFooterButtons
        buttons={
          <Link
            href={`${routes.peserta.kelas}/diskusi/detail/ujian/kerjakan`}
            className="flex-1"
          >
            <Button className="w-full">Ya</Button>
          </Link>
        }
        cancel="Tidak"
        onCancel={() => setShowModal(false)}
      />
    </Modal>
  )
}
