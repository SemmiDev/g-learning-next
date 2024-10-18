import {
  Button,
  CardSeparator,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'

type MulaiUjianModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
  jumlahSoal: number | undefined
  durasi: number | undefined
}

export default function MulaiUjianModal({
  showModal = false,
  setShowModal,
  jumlahSoal,
  durasi,
}: MulaiUjianModalProps) {
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
          <div className="flex flex-col items-center flex-1 bg-slight-blue rounded-md p-2">
            <Text size="xs" weight="medium">
              Jumlah Soal
            </Text>
            <Text weight="semibold" variant="dark">
              {jumlahSoal || '-'} soal
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-green rounded-md p-2">
            <Text size="xs" weight="medium">
              Durasi Pengerjaan
            </Text>
            <Text weight="semibold" variant="dark">
              {durasi || '-'} menit
            </Text>
          </div>
        </div>
      </div>
      <CardSeparator />
      <ModalFooterButtons cancel="Tidak" onCancel={() => setShowModal(false)}>
        {/* TODO: tambahkan link ke halaman ujian jika sudah ada */}
        <div className="flex-1">
          <Button className="w-full">Ya</Button>
        </div>
      </ModalFooterButtons>
    </Modal>
  )
}
