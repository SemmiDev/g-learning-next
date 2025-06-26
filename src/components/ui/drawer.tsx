import cn from '@/utils/class-names'
import { PropsWithChildren } from 'react'
import { Drawer as RizDrawer, type DrawerProps as RizDrawerProps } from 'rizzui'

export type DrawerProps = PropsWithChildren<RizDrawerProps>

export default function Drawer({
  overlayClassName,
  containerClassName,
  className,
  ...props
}: DrawerProps) {
  return (
    <RizDrawer
      overlayClassName={cn(
        overlayClassName,
        'cursor-default dark:bg-opacity-40 dark:backdrop-blur-md'
      )}
      containerClassName={cn(containerClassName, 'dark:bg-gray-100')}
      className={cn(className, 'z-[9990]')}
      {...props}
    />
  )
}
