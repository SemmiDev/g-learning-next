import { Text } from '@/components/ui'
import { ComponentType, ReactNode } from 'react'
import { IconBaseProps } from 'react-icons/lib'

type DetailItemProps = {
  Icon: ComponentType<IconBaseProps>
  label: string
  value: string
  actionIcon?: ReactNode
}

export default function HeaderItem({
  Icon,
  label,
  value,
  actionIcon,
}: DetailItemProps) {
  return (
    <div className="flex flex-col w-full border border-muted border-dashed rounded-lg gap-y-1 px-3 py-1.5 sm:w-fit">
      <div className="flex items-center">
        <Icon size={16} className="text-primary mr-1" />
        <Text size="sm" weight="medium" variant="lighter">
          {label}
        </Text>
        {actionIcon}
      </div>
      <Text weight="semibold" variant="dark" className="leading-4">
        {value}
      </Text>
    </div>
  )
}
