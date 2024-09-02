import { Card, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { angka } from '@/utils/text'
import { ComponentType } from 'react'
import { IconBaseProps } from 'react-icons/lib'

type DashboardCountCardProps = {
  label: string
  count: number
  Icon: ComponentType<IconBaseProps>
  iconFigureClassName?: string
}

export default function DashboardCountCard({
  label,
  count,
  Icon,
  iconFigureClassName,
}: DashboardCountCardProps) {
  return (
    <Card className="flex flex-col p-3 pb-2">
      <figure
        className={cn(
          'flex justify-center items-center size-12 bg-badge-blue rounded-md text-white mb-2',
          iconFigureClassName
        )}
      >
        <Icon size={24} />
      </figure>
      <Text size="sm" weight="medium" variant="lighter">
        {label}
      </Text>
      <Text size="1.5xl" weight="semibold" variant="dark">
        {angka(count)}
      </Text>
    </Card>
  )
}
