import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import { Modal as RizModal, ModalProps as RizModalProps } from 'rizzui'
import ModalHeader, { ModalHeaderProps } from './modal/header'

export type ModalProps = Omit<RizModalProps, 'onClose'> &
  Omit<ModalHeaderProps, 'className'> & {
    children: ReactNode
    headerClassName?: string
    bodyClassName?: string
  }

export default function Modal({
  title,
  color,
  icon,
  desc,
  children,
  overlayClassName,
  containerClassName,
  headerClassName,
  bodyClassName,
  closeButton = true,
  onClose,
  ...props
}: ModalProps) {
  return (
    <RizModal
      overlayClassName={cn('cursor-auto', overlayClassName)}
      containerClassName={cn('overflow-clip', containerClassName)}
      onClose={onClose ?? (() => null)}
      {...props}
    >
      <ModalHeader
        {...{ title, color, icon, desc, closeButton, onClose }}
        className={headerClassName}
      />
      <div className={cn('modal-body', bodyClassName)}>{children}</div>
    </RizModal>
  )
}
