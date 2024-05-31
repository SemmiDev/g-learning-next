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
        'flex flex-col items-stretch text-left space-y-1 border-b border-b-gray-100 transition duration-200 p-3 hover:bg-gray-50',
        { 'bg-gray-50/80': active }
      )}
      {...props}
    >
      <div className="flex justify-between space-x-2">
        <Text
          weight="semibold"
          color={active ? 'primary' : 'gray'}
          variant={active ? 'default' : 'dark'}
          title={drive.name}
          className="truncate"
        >
          {drive.name}
        </Text>
        <Text weight="semibold" variant="lighter" className="whitespace-nowrap">
          {formatBytes(drive.size, 2)}
        </Text>
      </div>
      <Progressbar
        variant="solid"
        color="primary"
        value={Math.round((drive.used / drive.size) * 100)}
      />
      <Text size="sm" weight="medium" variant="lighter">
        {formatBytes(drive.used, 2)} digunakan
      </Text>
    </button>
  )
}
