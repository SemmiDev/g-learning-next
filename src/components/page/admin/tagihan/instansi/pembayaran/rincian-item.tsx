import { Text, TextProps } from '@/components/ui'
import { ReactNode } from 'react'

type RincianItemProps = {
  label: string
  value?: ReactNode
  children?: ReactNode
  color?: TextProps['color']
  variant?: TextProps['variant']
}

export default function RincianItem({
  label,
  value,
  children,
  color = 'gray',
  variant = 'dark',
}: RincianItemProps) {
  return (
    <div className="flex flex-col">
      <Text size="sm" weight="medium" variant="lighter">
        {label}
      </Text>
      {children ?? (
        <Text size="1.5xl" weight="semibold" color={color} variant={variant}>
          {value || '-'}
        </Text>
      )}
    </div>
  )
}
