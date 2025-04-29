'use client'

import {
  Button,
  FileIcon,
  isPreviewableFile,
  LinkOrDiv,
  PustakaMediaFileType,
  Text,
} from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { downloadFileUrl } from '@/utils/file-url'
import {
  googleDriveDownloadUrl,
  isGoogleDriveUrl,
} from '@/utils/google-drive-url'
import Link from 'next/link'

export type FileListItemProps = {
  file: PustakaMediaFileType
  onPreview?: (file: PustakaMediaFileType) => void
  download?: boolean
  className?: string
  onDelete?(): void
}

export default function FileListItem({
  file,
  onPreview,
  download = false,
  className,
  onDelete,
}: FileListItemProps) {
  const isPreviewable = isPreviewableFile(file.link ?? '', file.extension)
  const linkingProps = {
    href:
      !file.folder && file.type === 'link' && !isPreviewable
        ? file.link
        : undefined,
    target: '_blank',
    onClick: () => {
      if (
        !file.folder &&
        (file.type !== 'link' || isPreviewable) &&
        file.link
      ) {
        onPreview && onPreview(file)
      }
    },
  }

  const pointer =
    file.folder ||
    file.type === 'link' ||
    (!!file.link && isPreviewable && onPreview)

  const googleDrive = isGoogleDriveUrl(file.link ?? '')
  const googleDriveDownload = googleDriveDownloadUrl(file.link ?? '')

  return (
    <div
      className={cn(
        'flex justify-between items-center bg-gray-50 rounded-md p-1',
        className
      )}
    >
      <div className="flex items-center min-w-0">
        <figure className="flex justify-center items-center size-11">
          <FileIcon
            file={file}
            fullThumbnail={false}
            thumbnailClassName="-ms-1"
            googleDrive={googleDrive}
          />
        </figure>
        <div className="flex flex-col min-w-0">
          <LinkOrDiv
            className={cn({ 'cursor-pointer': pointer })}
            {...linkingProps}
          >
            <Text
              size="sm"
              weight="semibold"
              color="primary"
              className="truncate"
            >
              {file.name}
            </Text>
          </LinkOrDiv>
          {!!file.size && (
            <Text size="xs" variant="dark">
              {formatBytes(file.size)}
            </Text>
          )}
        </div>
      </div>
      {download && file.link && (
        <>
          {file.type !== 'link' ? (
            <Link href={downloadFileUrl(file.link) ?? ''} target="_blank">
              <Button as="span" size="sm" variant="text" className="text-sm">
                Unduh
              </Button>
            </Link>
          ) : (
            googleDriveDownload && (
              <Link href={googleDriveDownload} target="_blank">
                <Button as="span" size="sm" variant="text" className="text-sm">
                  Unduh
                </Button>
              </Link>
            )
          )}
        </>
      )}
      {onDelete && (
        <Button
          size="sm"
          variant="text"
          color="danger"
          className="text-sm"
          onClick={onDelete}
        >
          Hapus
        </Button>
      )}
    </div>
  )
}
