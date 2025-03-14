import { Card, Text } from '@/components/ui'
import { ComponentType } from 'react'
import { IconBaseProps } from 'react-icons/lib'

type DashboardCountCardProps = {
  label: string
  count: string
  Icon: ComponentType<IconBaseProps>
}

export default function DashboardCountCard({
  Icon,
  label,
  count,
}: DashboardCountCardProps) {
  return (
    <Card className="flex gap-x-2 py-3 px-2">
      <figure className="flex justify-center items-center size-12 bg-primary rounded-md text-white">
        <Icon size={24} />
      </figure>
      <div className="flex flex-col gap-y-1">
        <Text size="sm" weight="medium" variant="lighter">
          {label}
        </Text>
        <Text size="xl" weight="semibold" variant="dark" className="leading-4">
          {count}
        </Text>
      </div>
    </Card>
  )
}
