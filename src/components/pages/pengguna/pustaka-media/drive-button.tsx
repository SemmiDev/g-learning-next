import { ActionIconTooltip, PustakaMediaDriveType, Text } from '@/components/ui'
import { GOOGLE_PICKER } from '@/config/const'
import { routes } from '@/config/routes'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import googleDriveIcon from '@public/icons/google-drive.png'
import Image from 'next/image'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { BsX } from 'react-icons/bs'
import { FaArrowRight } from 'react-icons/fa'
import { Progressbar } from 'rizzui'

type DriveButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  drive: PustakaMediaDriveType
  active?: boolean
  onUnlinkDrive?: () => void
}

export default function DriveButton({
  drive,
  active = false,
  onUnlinkDrive,
  ...props
}: DriveButtonProps) {
  if (drive.id === 'GOOGLE_DRIVE' && !drive.active) {
    return (
      <button
        className="flex bg-white text-left rounded-lg border border-muted shadow-sm min-w-80 overflow-clip duration-200 transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-muted/5"
        onClick={() => {
          location.href = routes.pengguna.googleDrive
        }}
      >
        <div className="flex flex-col items-stretch flex-1 gap-y-2.5 p-2">
          <div className="flex flex-wrap items-center gap-x-1">
            {drive.id === 'GOOGLE_DRIVE' && (
              <Image
                src={googleDriveIcon}
                alt="Google Drive"
                width={16}
                height={16}
              />
            )}
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
        'flex bg-white text-left rounded-lg border border-muted shadow-sm min-w-80 overflow-clip duration-200 transition-all [&:not(:has(.unlink-drive:hover)):hover]:-translate-y-0.5 [&:not(:has(.unlink-drive:hover)):hover]:shadow-md [&:not(:has(.unlink-drive:hover)):hover]:bg-muted/5',
        { 'border-primary': active }
      )}
      {...props}
    >
      {active && <div className="w-1 h-full bg-primary"></div>}
      {drive.id === 'GOOGLE_DRIVE' && GOOGLE_PICKER ? (
        <div className="flex justify-between flex-1 gap-x-2 p-2">
          <div className="flex flex-col" title={drive.name}>
            <Text
              size="lg"
              weight="semibold"
              color={active ? 'primary' : 'gray'}
              variant={active ? 'default' : 'dark'}
              title={drive.name}
              className="flex flex-wrap items-center gap-x-1"
            >
              <Image
                src={googleDriveIcon}
                alt="Google Drive"
                width={16}
                height={16}
                className="me-1"
              />
              Google Drive
            </Text>
            <Text size="sm" weight="medium" variant="lighter" className="ms-7">
              {drive.name}
            </Text>
          </div>
          <ActionIconTooltip
            as="span"
            tooltip="Lepas Tautan Google Drive"
            size="sm"
            variant="outline-hover-colorful"
            color="danger"
            className="unlink-drive"
            onClick={(e) => {
              e.stopPropagation()
              onUnlinkDrive?.()
            }}
          >
            <BsX />
          </ActionIconTooltip>
        </div>
      ) : (
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
                  <Image
                    src={googleDriveIcon}
                    alt="Google Drive"
                    width={16}
                    height={16}
                  />
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
            className="gap-0"
            value={Math.round((drive.used / drive.size) * 100)}
          />
          <Text size="sm" weight="medium" variant="lighter">
            {formatBytes(drive.used, 2)} digunakan
          </Text>
        </div>
      )}
    </button>
  )
}
