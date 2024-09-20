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
import Link from 'next/link'

type FileListItemProps = {
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
  const linkingProps = {
    href: !file.folder && file.type === 'link' ? file.link : undefined,
    target: '_blank',
    onClick: () => {
      if (
        !file.folder &&
        file.type !== 'link' &&
        file.link &&
        isPreviewableFile(file.link, file.extension)
      ) {
        onPreview && onPreview(file)
      }
    },
  }

  const pointer =
    file.folder ||
    file.type === 'link' ||
    isPreviewableFile(file.name, file.extension)

  return (
    <div
      className={cn(
        'flex justify-between items-center bg-gray-50 rounded-md p-1',
        className
      )}
    >
      <div className="flex items-center">
        <figure className="flex justify-center items-center size-11">
          <FileIcon
            file={file}
            fullThumbnail={false}
            thumbnailClassName="-ms-1"
          />
        </figure>
        <div className="flex flex-col">
          <LinkOrDiv
            className={cn({ 'cursor-pointer': pointer })}
            {...linkingProps}
          >
            <Text size="sm" weight="semibold" color="primary">
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
      {download &&
        file.type !== 'link' &&
        (file.link ? (
          <Link href={file.link} target="_blank">
            <Button size="sm" variant="text" className="text-sm">
              Unduh
            </Button>
          </Link>
        ) : (
          <Button size="sm" variant="text" className="text-sm">
            Unduh
          </Button>
        ))}
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
