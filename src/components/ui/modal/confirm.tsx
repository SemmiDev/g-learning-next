import cn from '@/utils/class-names'
import Button, { ButtonColors } from '../button/button'
import CardSeparator from '../card-separator'
import Modal, { ModalProps } from '../modal'
import Text from '../text/text'
import ModalFooterButtons from './footer-buttons'
import { ReactNode } from 'react'

export type ModalConfirmProps = Omit<ModalProps, 'children'> & {
  confirm?: string
  confirmColor?: ButtonColors
  onConfirm?(): void
  cancel?: string
  onCancel?(): void
  closeOnCancel?: boolean
  children?: ReactNode
  footerButtons?: ReactNode
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
  children,
  footerButtons,
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

      {children}

      <CardSeparator />

      <ModalFooterButtons
        cancel={cancel}
        onCancel={() => {
          onCancel && onCancel()
          closeOnCancel && onClose && onClose()
        }}
      >
        <div className="flex-1">
          <Button
            variant="solid"
            className="w-full"
            color={confirmColor}
            onClick={onConfirm}
          >
            {confirm}
          </Button>
        </div>
        {footerButtons}
      </ModalFooterButtons>
    </Modal>
  )
}
