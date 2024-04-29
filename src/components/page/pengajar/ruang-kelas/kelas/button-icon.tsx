import { Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

type ButtonIconType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  title: string
  color: 'green' | 'violet' | 'blue' | 'red' | 'indigo'
  children: ReactNode
}

export default function ButtonIcon({
  title,
  color,
  children,
  ...props
}: ButtonIconType) {
  return (
    <button
      className="flex flex-col items-center active:enabled:translate-y-px"
      {...props}
    >
      <div
        className={cn(
          'flex justify-center items-center rounded p-4',
          `btn-item-${color}`
        )}
      >
        {children}
      </div>
      <Text size="xs" weight="semibold" variant="dark" className="mt-1">
        {title}
      </Text>
    </button>
  )
}
