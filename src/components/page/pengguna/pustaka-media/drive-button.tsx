import { PustakaMediaDriveType, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { FaArrowRight, FaGoogleDrive } from 'react-icons/fa'
import { Progressbar } from 'rizzui'

type DriveButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  drive: PustakaMediaDriveType
  active?: boolean
}

export default function DriveButton({
  drive,
  active = false,
  ...props
}: DriveButtonProps) {
  if (drive.id === 'GOOGLE_DRIVE' && !drive.active) {
    return (
      <button
        className="flex text-left rounded-lg border border-mute shadow-sm min-w-80 overflow-clip duration-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50/30"
        onClick={() => {
          location.href = routes.pengguna.googleDrive
        }}
      >
        <div className="flex flex-col items-stretch flex-1 gap-y-2.5 p-2">
          <div className="flex flex-wrap items-center gap-x-1">
            {drive.id === 'GOOGLE_DRIVE' && <FaGoogleDrive />}
            <Text
              weight="semibold"
              color={active ? 'primary' : 'gray'}
              variant={active ? 'default' : 'dark'}
              title={drive.name}
              className="truncate"
            >
              Google Drive
            </Text>
            <Text size="2xs" weight="semibold" color="danger">
              ( Belum Terhubung )
            </Text>
          </div>
          <div className="flex gap-x-1 text-success-dark">
            <Text size="sm" weight="semibold">
              Hubungkan Sekarang
            </Text>
            <FaArrowRight className="mt-1" />
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      className={cn(
        'flex text-left rounded-lg border border-mute shadow-sm min-w-80 overflow-clip duration-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-gray-50/30',
        { 'border-primary': active }
      )}
      {...props}
    >
      {active && <div className="w-1 h-full bg-primary"></div>}
      <div className="flex flex-col items-stretch flex-1 gap-y-1 p-2">
        <div className="flex justify-between gap-x-2">
          {drive.id === 'GOOGLE_DRIVE' ? (
            <div
              className="flex flex-wrap items-center gap-x-1"
              title={drive.name}
            >
              <Text
                weight="semibold"
                color={active ? 'primary' : 'gray'}
                variant={active ? 'default' : 'dark'}
                title={drive.name}
                className="flex flex-wrap items-center gap-x-1"
              >
                <FaGoogleDrive />
                Google Drive
              </Text>
              <Text size="2xs">{drive.name}</Text>
            </div>
          ) : (
            <Text
              weight="semibold"
              color={active ? 'primary' : 'gray'}
              variant={active ? 'default' : 'dark'}
              title={drive.name}
              className="truncate"
            >
              {drive.name}
            </Text>
          )}

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
          value={Math.round((drive.used / drive.size) * 100)}
        />
        <Text size="sm" weight="medium" variant="lighter">
          {formatBytes(drive.used, 2)} digunakan
        </Text>
      </div>
    </button>
  )
}
