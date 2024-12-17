import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import CardSeparator from '../card-separator'
import Modal, { ModalProps } from '../modal'
import Text from '../text/text'
import ModalFooterButtons from './footer-buttons'

export type ModalInfoProps = Omit<ModalProps, 'children'> & {
  close?: string
  children?: ReactNode
  footerButtons?: ReactNode
}

export default function ModalInfo({
  title,
  desc = 'Sekedar info',
  size = 'sm',
  close = 'Tutup',
  onClose,
  headerClassName,
  children,
  footerButtons,
  ...props
}: ModalInfoProps) {
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
        cancel={close}
        onCancel={() => {
          onClose && onClose()
        }}
      >
        {footerButtons}
      </ModalFooterButtons>
    </Modal>
  )
}
