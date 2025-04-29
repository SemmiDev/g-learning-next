import {
  ActionIcon,
  FileIcon,
  isPreviewableFile,
  LinkOrDiv,
  PustakaMediaFileType,
  Time,
  Title,
} from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import { downloadFileUrl } from '@/utils/file-url'
import { googleDriveViewUrl, isGoogleDriveUrl } from '@/utils/google-drive-url'
import Link from 'next/link'
import {
  BsBoxArrowInUpRight,
  BsDownload,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { Dropdown } from 'rizzui'

type FileCardProps = {
  file: PustakaMediaFileType
  onFileClick?: (file: PustakaMediaFileType) => void
  onFolderClick?: (file: PustakaMediaFileType) => void
  onEdit?: (file: PustakaMediaFileType) => void
  onDelete?: (file: PustakaMediaFileType) => void
  pointer?: boolean
  className?: string
}

export default function FileCard({
  file,
  onFileClick,
  onFolderClick,
  onEdit,
  onDelete,
  pointer = true,
  className,
}: FileCardProps) {
  const isPreviewable = isPreviewableFile(file.link ?? '', file.extension)
  const linkingProps = {
    href:
      !file.folder && file.type === 'link' && !isPreviewable
        ? file.link
        : undefined,
    target: '_blank',
    onClick: () => {
      if (file.folder) {
        onFolderClick && onFolderClick(file)
      } else if (file.type !== 'link' || isPreviewable) {
        onFileClick && onFileClick(file)
      }
    },
  }
  const googleDrive = isGoogleDriveUrl(file.link ?? '')
  const googleDriveUrl = googleDriveViewUrl(file.link ?? '')

  return (
    <div
      className={cn(
        'relative bg-white rounded-lg border border-muted p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-muted/5',
        className
      )}
    >
      <LinkOrDiv
        className={cn({ 'cursor-pointer': pointer })}
        {...linkingProps}
      >
        <FileIcon file={file} googleDrive={googleDrive} className="mb-4" />
        <Title
          as="h4"
          size="base"
          weight="medium"
          variant="dark"
          className="truncate"
          title={file.name}
        >
          {file.name}
        </Title>
        {file.folder ? (
          <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
            <li>{file.fileCount} Berkas</li>
            <li>
              <GoDotFill size={10} />
            </li>
            <li>
              <Time date={file.time} format="date" />
            </li>
          </ul>
        ) : (
          <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
            <li>
              {file.size ? (
                formatBytes(file.size, 2)
              ) : (
                <Time date={file.time} format="date" />
              )}
            </li>
            {!!file.size && (
              <>
                <li>
                  <GoDotFill size={10} />
                </li>
                <li>
                  <Time date={file.time} format="date" />
                </li>
              </>
            )}
          </ul>
        )}
      </LinkOrDiv>
      <Dropdown placement="bottom-end" className="absolute top-2 right-2">
        <Dropdown.Trigger>
          <ActionIcon as="span" size="sm" variant="outline-hover">
            <BsThreeDotsVertical size={14} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Menu className="w-30 divide-y !py-0">
          <div className="py-2">
            {!file.folder && file.type !== 'link' && file.link && (
              <Link href={downloadFileUrl(file.link) ?? ''} target="_blank">
                <Dropdown.Item className="text-gray-dark">
                  <BsDownload className="text-primary size-4 mr-2" />
                  Unduh
                </Dropdown.Item>
              </Link>
            )}
            {!file.folder && file.link && !!googleDriveUrl && (
              <Link href={googleDriveUrl} target="_blank">
                <Dropdown.Item className="text-gray-dark">
                  <BsBoxArrowInUpRight className="text-info size-4 mr-2" />
                  Buka Berkas
                </Dropdown.Item>
              </Link>
            )}
            <Dropdown.Item
              className="text-gray-dark"
              onClick={() => onEdit && onEdit(file)}
            >
              <BsPencil className="text-warning size-4 mr-2" />
              Ubah
            </Dropdown.Item>
          </div>
          <div className="py-2">
            <Dropdown.Item
              className="text-gray-dark"
              onClick={() => onDelete && onDelete(file)}
            >
              <BsTrash3 className="text-danger size-4 mr-2" />
              Hapus
            </Dropdown.Item>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}
