import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import { Modal as RizModal, ModalProps as RizModalProps } from 'rizzui'
import ModalHeader, { ModalHeaderProps } from './modal/header'

export type ModalProps = Omit<RizModalProps, 'onClose'> &
  Omit<ModalHeaderProps, 'className' | 'icon'> & {
    children: ReactNode
    headerClassName?: string
    headerIcon?: ModalHeaderProps['icon']
    bodyClassName?: string
  }

export default function Modal({
  title,
  color,
  headerIcon,
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
        {...{ title, color, desc, closeButton, onClose }}
        icon={headerIcon}
        className={headerClassName}
      />
      <div className={cn('modal-body', bodyClassName)}>{children}</div>
    </RizModal>
  )
}
