import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import { Modal as RizModal, ModalProps as RizModalProps } from 'rizzui'
import ModalHeader, { ModalHeaderProps } from './modal/header'

export type ModalProps = Omit<RizModalProps, 'onClose'> & {
  title: string
  desc?: string
  color?: ModalHeaderProps['color']
  children: ReactNode
  headerClassName?: string
  bodyClassName?: string
  onClose?(): void
}

export default function Modal({
  title,
  color,
  desc,
  children,
  overlayClassName,
  containerClassName,
  headerClassName,
  bodyClassName,
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
        title={title}
        color={color}
        desc={desc}
        onClose={onClose}
        className={headerClassName}
      />
      <div className={cn('modal-body', bodyClassName)}>{children}</div>
    </RizModal>
  )
}
