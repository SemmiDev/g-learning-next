import { Button, CardSeparator, Modal, Text } from '@/components/ui'

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
        Apakah Anda yakin ingin menngeluarkan peserta ini dari kelas anda?
      </Text>

      <CardSeparator />

      <div className="flex gap-x-2 p-3">
        <Button variant="solid" className="flex-1" color="danger">
          Ya
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setShowModal(false)}
        >
          Tidak
        </Button>
      </div>
    </Modal>
  )
}
