import { ActionIcon, Modal, ModalFooterButtons } from '@/components/ui'
import toast from 'react-hot-toast'
import { MdOutlineContentCopy } from 'react-icons/md'
import { Input } from 'rizzui'

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
        <Input
          label="Kode Unik"
          value="XXXYZ"
          className="font-semibold text-gray-dark"
          readOnly
        />
        <Input
          label="Bagikan melalui link"
          value="https://glearning.id/XXXYZ"
          className="font-semibold text-gray-dark"
          suffix={
            <ActionIcon
              size="sm"
              variant="text"
              className="-me-2"
              onClick={async () => {
                await navigator.clipboard.writeText(
                  'https://glearning.id/XXXYZ'
                )
                toast.success('Link berhasil disalin.', {
                  position: 'bottom-center',
                })
              }}
            >
              <MdOutlineContentCopy />
            </ActionIcon>
          }
          readOnly
        />
      </div>

      <ModalFooterButtons
        cancel="Tutup"
        onCancel={() => setShowModal(false)}
        borderTop
      />
    </Modal>
  )
}
