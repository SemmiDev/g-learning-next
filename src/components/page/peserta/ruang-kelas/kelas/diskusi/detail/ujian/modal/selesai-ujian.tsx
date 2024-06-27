import {
  Button,
  CardSeparator,
  Modal,
  ModalFooterButtons,
  Text,
} from '@/components/ui'

type SelesaiUjianModalProps = {
  showModal?: boolean
  setShowModal(show: boolean): void
  onSelesaiUjian(): void
}

export default function SelesaiUjianModal({
  showModal = false,
  setShowModal,
  onSelesaiUjian,
}: SelesaiUjianModalProps) {
  return (
    <Modal
      title="Selesaikan Ujian"
      size="sm"
      isOpen={showModal}
      headerClassName="[&_.modal-title]:text-lg"
      onClose={() => setShowModal(false)}
    >
      <div className="flex flex-col p-3">
        <div className="flex gap-x-2 mt-1 mb-3">
          <div className="flex flex-col items-center flex-1 bg-slight-blue rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Jumlah soal
            </Text>
            <Text weight="semibold" variant="dark">
              21
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-green rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Sudah dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              18
            </Text>
          </div>
          <div className="flex flex-col items-center flex-1 bg-slight-red rounded-md px-4 py-2">
            <Text size="2xs" weight="medium" variant="lighter" align="center">
              Belum dijawab
            </Text>
            <Text weight="semibold" variant="dark">
              4
            </Text>
          </div>
        </div>
        <Text weight="semibold" variant="dark" align="center">
          Apakah Anda yakin ingin menyelesaikan ujian ini?
        </Text>
      </div>
      <CardSeparator />
      <ModalFooterButtons
        buttons={
          <div className="flex-1">
            <Button className="w-full" onClick={onSelesaiUjian}>
              Ya
            </Button>
          </div>
        }
        cancel="Tidak"
        onCancel={() => setShowModal(false)}
      />
    </Modal>
  )
}
