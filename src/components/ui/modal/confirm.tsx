import cn from '@/utils/class-names'
import Button, { ButtonColors } from '../button/button'
import CardSeparator from '../card-separator'
import Modal, { ModalProps } from '../modal'
import Text from '../text/text'
import ModalFooterButtons from './footer-buttons'

export type ModalConfirmProps = Omit<ModalProps, 'children'> & {
  confirm?: string
  confirmColor?: ButtonColors
  onConfirm?(): void
  cancel?: string
  onCancel?(): void
  closeOnCancel?: boolean
}

export default function ModalConfirm({
  title,
  desc = 'Anda yakin?',
  size = 'sm',
  confirm = 'Ya',
  confirmColor = 'danger',
  onConfirm,
  cancel = 'Tidak',
  onCancel,
  closeOnCancel,
  onClose,
  headerClassName,
  ...props
}: ModalConfirmProps) {
  return (
    <Modal
      title={title}
      size={size}
      headerClassName={cn('[&_.modal-title]:text-lg', headerClassName)}
      onClose={onClose}
      closeButton={false}
      {...props}
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
            color={confirmColor}
            onClick={onConfirm}
          >
            {confirm}
          </Button>
        }
        cancel={cancel}
        onCancel={() => {
          onCancel && onCancel()
          closeOnCancel && onClose && onClose()
        }}
      />
    </Modal>
  )
}
