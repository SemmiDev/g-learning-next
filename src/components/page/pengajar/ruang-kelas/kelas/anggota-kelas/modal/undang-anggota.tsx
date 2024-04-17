import { Button, CardSeparator, Input, Modal } from '@/components/ui'
import { MdOutlineContentCopy } from 'react-icons/md'
import { ActionIcon } from 'rizzui'

export default function UndangAnggotaModal({
  showModal = false,
  setShowModal,
}: {
  showModal?: boolean
  setShowModal(show: boolean): void
}) {
  return (
    <Modal
      title="Undang Anggota Kelas"
      size="sm"
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={showModal}
      onClose={() => setShowModal(false)}
    >
      <div className="flex flex-col gap-4 p-3">
        <Input label="Kode Unik" value="XXXYZ" readOnly />
        <Input
          label="Bagikan melalui link"
          value="https://glearning.id/XXXYZ"
          suffix={
            <ActionIcon
              size="sm"
              variant="text"
              className="-me-2"
              onClick={() =>
                navigator.clipboard.writeText('https://glearning.id/XXXYZ')
              }
            >
              <MdOutlineContentCopy />
            </ActionIcon>
          }
          readOnly
        />
      </div>

      <CardSeparator />

      <div className="flex p-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => setShowModal(false)}
        >
          Tutup
        </Button>
      </div>
    </Modal>
  )
}
