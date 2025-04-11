'use client'

import cn from '@/utils/class-names'
import { ReactNode, useState } from 'react'
import { ButtonSubmit } from '..'
import { ButtonColors } from '../button/button'
import CardSeparator from '../card-separator'
import Text from '../text/text'
import ModalFooterButtons from './footer-buttons'
import Modal, { ModalProps } from './modal'

export type ModalConfirmProps = Omit<ModalProps, 'children' | 'desc'> & {
  confirm?: string
  confirmColor?: ButtonColors
  onConfirm?(): Promise<void> | void
  confirmLoading?: boolean
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
  confirmLoading,
  cancel = 'Tidak',
  onCancel,
  closeOnCancel,
  onClose,
  headerClassName,
  children,
  footerButtons,
  ...props
}: ModalConfirmProps) {
  const [isConfirming, setConfirming] = useState(false)

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
          <ButtonSubmit
            variant="solid"
            className="w-full"
            color={confirmColor}
            onClick={async () => {
              if (confirmLoading) setConfirming(true)

              onConfirm && (await onConfirm())

              if (confirmLoading) setConfirming(false)
            }}
            isSubmitting={isConfirming}
          >
            {confirm}
          </ButtonSubmit>
        </div>
        {footerButtons}
      </ModalFooterButtons>
    </Modal>
  )
}
