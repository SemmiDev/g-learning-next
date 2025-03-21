import { Text } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { Progressbar } from 'rizzui'

export type DriveItemType = {
  name: string
  used: number
  size: number
}

type DriveButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  drive: DriveItemType
  active?: boolean
}

export default function DriveButton({
  drive,
  active = false,
  ...props
}: DriveButtonProps) {
  return (
    <button
      className={cn(
        'flex text-left rounded-lg border border-muted shadow-sm min-w-80 overflow-clip duration-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50/30',
        { 'border-primary': active }
      )}
      {...props}
    >
      {active && <div className="w-1 h-full bg-primary"></div>}
      <div className="flex flex-col items-stretch flex-1 gap-y-1 p-2">
        <div className="flex justify-between gap-x-2">
          <Text
            weight="semibold"
            color={active ? 'primary' : 'gray'}
            variant={active ? 'default' : 'dark'}
            title={drive.name}
            className="truncate"
          >
            {drive.name}
          </Text>
          <Text
            weight="semibold"
            variant="lighter"
            className="whitespace-nowrap"
          >
            {formatBytes(drive.size, 2)}
          </Text>
        </div>
        <Progressbar
          variant="solid"
          color="primary"
          className="gap-0"
          value={Math.round((drive.used / drive.size) * 100)}
        />
        <Text size="sm" weight="medium" variant="lighter">
          {formatBytes(drive.used, 2)} digunakan
        </Text>
      </div>
    </button>
  )
}
