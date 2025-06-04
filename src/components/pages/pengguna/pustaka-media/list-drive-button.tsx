import { Card, PustakaMediaDriveType, Shimmer } from '@/components/ui'
import cn from '@/utils/class-names'
import DriveButton from './drive-button'

type ListDriveButtonProps = {
  drives: PustakaMediaDriveType[]
  activeDrive: string | undefined
  isLoading?: boolean
  onClick?: (id: string) => void
  onUnlinkDrive?: (email: string) => void
  className?: string
}

export default function ListDriveButton({
  drives,
  activeDrive,
  isLoading,
  onClick,
  onUnlinkDrive,
  className,
}: ListDriveButtonProps) {
  if (isLoading) return <ListShimmer className={className} />

  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      {drives.map((drive) => (
        <DriveButton
          key={drive.id}
          drive={drive}
          active={activeDrive === drive.id}
          onClick={() => onClick?.(drive.id)}
          onUnlinkDrive={() => onUnlinkDrive?.(drive.name)}
        />
      ))}
    </div>
  )
}

function ListShimmer({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-4', className)}>
      {[...Array(2)].map((_, idx) => (
        <Card
          key={idx}
          rounded="lg"
          className="flex flex-col items-stretch w-80 gap-y-1 p-2"
        >
          <div className="flex justify-between gap-x-2 py-1.5">
            <Shimmer className="h-3 w-7/12" />
            <Shimmer className="h-3 w-8" />
          </div>
          <Shimmer className="h-2 w-12/12" />
          <Shimmer className="h-2 w-4/12 my-1.5" />
        </Card>
      ))}
    </div>
  )
}
