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
    <Card className="flex flex-col p-3">
      <figure className="flex justify-center items-center size-12 bg-primary rounded-md text-white mb-3">
        <Icon size={24} />
      </figure>
      <Text size="sm" weight="medium" variant="lighter">
        {label}
      </Text>
      <Text size="1.5xl" weight="semibold" variant="dark">
        {count}
      </Text>
    </Card>
  )
}
