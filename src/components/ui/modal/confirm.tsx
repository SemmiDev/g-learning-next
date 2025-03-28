import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import Button, { ButtonColors } from '../button/button'
import CardSeparator from '../card-separator'
import Text from '../text/text'
import ModalFooterButtons from './footer-buttons'
import Modal, { ModalProps } from './modal'

export type ModalConfirmProps = Omit<ModalProps, 'children' | 'desc'> & {
  confirm?: string
  confirmColor?: ButtonColors
  onConfirm?(): void
  cancel?: string
  onCancel?(): void
  closeOnCancel?: boolean
  children?: ReactNode
  desc?: string
  footerButtons?: ReactNode
}

export default function ModalConfirm({
  title,
  desc,
  size = 'sm',
  confirm = 'Ya',
  confirmColor,
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
  confirmColor =
    confirmColor ??
    (props.color === 'dark-gray' ||
      props.color === 'white' ||
      props.color === 'black')
      ? 'primary'
      : props.color

  return (
    <Modal
      title={title}
      size={size}
      headerClassName={cn('[&_.modal-title]:text-lg', headerClassName)}
      onClose={onClose}
      closeButton={false}
      {...props}
    >
      {!!desc && (
        <Text weight="semibold" variant="dark" className="text-center p-3">
          {desc}
        </Text>
      )}

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
