import { Text } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react'
import { Progressbar } from 'rizzui'
import { DriveType } from './pustaka-media'
import { FaGoogleDrive } from 'react-icons/fa'
import toast from 'react-hot-toast'
import ModalInfo from '@/components/ui/modal/info'
import { set } from 'date-fns'

type DriveButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  drive: DriveType
  active?: boolean
}

export default function DriveButton({
  drive,
  active = false,
  ...props
}: DriveButtonProps) {
  if (drive.id === 'GOOGLE_DRIVE' && !drive.active) {
    const [showInfo, setShowInfo] = useState(false)

    return (
      <>
        <button
          className="flex flex-col items-stretch text-left space-y-1 border-b border-b-gray-100 transition duration-200 p-3 hover:bg-gray-50/50"
          onClick={() => setShowInfo(true)}
        >
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
        </button>

        <ModalInfo
          title="Google Drive"
          desc="Untuk menggunakan Google Drive, anda harus terhubung terlebih dahulu. Silahkan menuju halaman pustaka media untuk menghubungkan Google Drive."
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
        />
      </>
    )
  }

  return (
    <button
      className={cn(
        'flex flex-col items-stretch text-left space-y-1 border-b border-b-gray-100 transition duration-200 p-3 hover:bg-gray-50/50',
        { 'bg-blue-50/50': active }
      )}
      {...props}
    >
      <div className="flex justify-between space-x-2">
        {drive.id === 'GOOGLE_DRIVE' ? (
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
          variant={active ? 'default' : 'lighter'}
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
      <Text size="sm" weight="medium" variant={active ? 'default' : 'lighter'}>
        {formatBytes(drive.used, 2)} digunakan
      </Text>
    </button>
  )
}
