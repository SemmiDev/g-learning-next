import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import { Modal as RizModal, ModalProps as RizModalProps } from 'rizzui'
import ModalHeader, { ModalHeaderProps } from './header'

export type ModalProps = Omit<RizModalProps, 'onClose'> &
  Omit<
    ModalHeaderProps,
    'title' | 'isLoading' | 'className' | 'icon' | 'customIcon'
  > & {
    title?: string
    isLoading?: boolean
    children: ReactNode
    fixedHeader?: boolean
    headerClassName?: string
    headerIcon?: ModalHeaderProps['icon']
    headerCustomIcon?: ModalHeaderProps['customIcon']
    bodyClassName?: string
    overflow?: boolean
  }

export default function Modal({
  title,
  isLoading,
  color,
  headerIcon,
  headerCustomIcon,
  desc,
  children,
  size = 'md',
  rounded,
  fixedHeader,
  overlayClassName,
  headerClassName,
  bodyClassName,
  containerClassName,
  className,
  overflow,
  closeButton = true,
  onClose,
  ...props
}: ModalProps) {
  return (
    <RizModal
      onClose={onClose ?? (() => null)}
      size={size}
      rounded={rounded}
      className={cn(
        {
          '[&_.rizzui-modal-overlay~div]:overflow-visible': overflow,
        },
        '[&>div.min-h-screen]:min-h-dvh',
        className
      )}
      overlayClassName={cn('cursor-auto', overlayClassName)}
      containerClassName={cn(
        'flex flex-col',
        {
          'min-h-dvh': size === 'full',
          'max-h-dvh': fixedHeader,
        },
        containerClassName
      )}
      {...props}
    >
      {title && (
        <ModalHeader
          {...{ title, isLoading, color, desc, closeButton, onClose }}
          icon={headerIcon}
          customIcon={headerCustomIcon}
          className={headerClassName}
          modalSize={size}
          rounded={rounded}
        />
      )}
      <div
        className={cn(
          'modal-body flex flex-col flex-1 min-h-0',
          fixedHeader ? ' overflow-y-auto' : null,
          bodyClassName
        )}
      >
        {children}
      </div>
    </RizModal>
  )
}
