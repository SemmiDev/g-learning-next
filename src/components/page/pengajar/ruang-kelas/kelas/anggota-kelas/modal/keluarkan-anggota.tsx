import { Button, CardSeparator, Modal, Text } from '@/components/ui'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'

export default function KeluarkanAnggotaModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  return (
    <Modal
      title="Keluarkan Anggota Kelas"
      size="sm"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <Text weight="semibold" variant="dark" className="text-center p-3">
        Apakah Anda yakin ingin mengeluarkan peserta ini dari kelas anda?
      </Text>

      <CardSeparator />

      <ModalFooterButtons
        buttons={
          <Button variant="solid" className="flex-1" color="danger">
            Ya
          </Button>
        }
        cancel="Tidak"
        onCancel={() => setShowModal(false)}
      />
    </Modal>
  )
}
