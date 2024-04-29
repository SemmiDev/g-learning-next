import { Button, CardSeparator, Modal, Text } from '@/components/ui'
import ModalFooterButtons from '@/components/ui/modal/footer-buttons'
import { ModalSize } from 'rizzui'

export default function ModalConfirm({
  title,
  desc = 'Anda yakin?',
  size = 'sm',
  isOpen = false,
  confirm = 'Ya',
  onConfirm,
  cancel = 'Tidak',
  onCancel,
  onClose,
}: {
  title: string
  desc?: string
  size?: ModalSize
  isOpen?: boolean
  confirm?: string
  onConfirm?(): void
  cancel?: string
  onCancel?(): void
  onClose(): void
}) {
  return (
    <Modal
      title={title}
      size={size}
      headerClassName="[&_.modal-title]:text-lg"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Text weight="semibold" variant="dark" className="text-center p-3">
        {desc}
      </Text>

      <CardSeparator />

      <ModalFooterButtons
        buttons={
          <Button
            variant="solid"
            className="flex-1"
            color="danger"
            onClick={onConfirm}
          >
            {confirm}
          </Button>
        }
        cancel={cancel}
        onCancel={onCancel}
      />
    </Modal>
  )
}
