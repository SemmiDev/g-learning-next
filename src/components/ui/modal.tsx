import { Modal as RizModal, ModalProps as RizModalProps } from 'rizzui'
import ModalHeader from './modal/header'
import { ReactNode } from 'react'
import cn from '@/utils/class-names'

type ModalProps = RizModalProps & {
  title: string
  desc?: string
  children: ReactNode
  headerClassName?: string
  bodyClassName?: string
}

export default function Modal({
  title,
  desc,
  children,
  overlayClassName,
  containerClassName,
  headerClassName,
  bodyClassName,
  ...props
}: ModalProps) {
  return (
    <RizModal
      size="lg"
      overlayClassName={cn('cursor-auto', overlayClassName)}
      containerClassName={cn('overflow-clip', containerClassName)}
      {...props}
    >
      <ModalHeader
        title={title}
        desc={desc}
        onClose={props.onClose}
        className={headerClassName}
      />
      <div className={cn('modal-body', bodyClassName)}>{children}</div>
    </RizModal>
  )
}
