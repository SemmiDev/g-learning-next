import { ModalSize } from 'rizzui'
import Button, { ButtonColorProp } from '../button/button'
import CardSeparator from '../card-separator'
import Modal, { ModalProps } from '../modal'
import ModalFooterButtons from './footer-buttons'
import { Without } from '@/utils/without-type'
import cn from '@/utils/class-names'
import Text from '../text/text'

export type ModalConfirmProps = Without<ModalProps, 'children'> & {
  title: string
  desc?: string
  confirm?: string
  confirmColor?: ButtonColorProp
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
  headerClassName,
  ...props
}: ModalConfirmProps) {
  return (
    <Modal
      title={title}
      size={size}
      headerClassName={cn('[&_.modal-title]:text-lg', headerClassName)}
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
            color="danger"
            onClick={onConfirm}
          >
            {confirm}
          </Button>
        }
        cancel={cancel}
        onCancel={() => {
          onCancel && onCancel()
        }}
      />
    </Modal>
  )
}
