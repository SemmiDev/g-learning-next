import { Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { ComponentType, Dispatch, SetStateAction } from 'react'
import { IconBaseProps } from 'react-icons/lib'

export default function TambahBahanPopoverItem({
  title,
  color,
  Icon,
  setOpen,
  onClick,
}: {
  title: string
  color: 'green' | 'violet' | 'blue' | 'red' | 'indigo'
  Icon: ComponentType<IconBaseProps>
  setOpen: Dispatch<SetStateAction<boolean>>
  onClick?: () => void
}) {
  return (
    <button
      className="flex gap-x-2 px-2 py-1 hover:bg-muted/40"
      onClick={() => {
        onClick && onClick()
        setOpen(false)
      }}
    >
      <div
        className={cn(
          'flex justify-center items-center size-[1.375rem] rounded-sm',
          `btn-item-${color}`
        )}
      >
        <Icon className="size-2.5" />
      </div>
      <Text size="sm" weight="semibold">
        {title}
      </Text>
    </button>
  )
}
