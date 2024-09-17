import { FileType } from '@/components/shared/pustaka-media/pustaka-media'
import { ActionIcon, FileIcon, LinkOrDiv, Time, Title } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import Link from 'next/link'
import {
  BsDownload,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { Dropdown } from 'rizzui'

type FileCardProps = {
  file: FileType
  onFolderClick?: (file: FileType) => void
  onEdit?: (file: FileType) => void
  onDelete?: (file: FileType) => void
  className?: string
}

export default function FileCard({
  file,
  onFolderClick,
  onEdit,
  onDelete,
  className,
}: FileCardProps) {
  const linkingProps = {
    href: file.link,
    target: '_blank',
    onClick: () => {
      file.folder && onFolderClick && onFolderClick(file)
    },
  }

  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="flex">
        <LinkOrDiv className="flex-1 h-[60px] cursor-pointer" {...linkingProps}>
          <FileIcon file={file} />
        </LinkOrDiv>
        <div className="flex flex-col">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon as="span" size="sm" variant="outline-hover">
                <BsThreeDotsVertical size={14} />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-30 divide-y !py-0">
              {!file.folder && file.type !== 'link' && file.link && (
                <div className="py-2">
                  <Link href={file.link} target="_blank">
                    <Dropdown.Item className="text-gray-dark">
                      <BsDownload className="text-primary mr-2 h-4 w-4" />
                      Unduh
                    </Dropdown.Item>
                  </Link>
                </div>
              )}
              <div className="py-2">
                <Dropdown.Item
                  className="text-gray-dark"
                  onClick={() => onEdit && onEdit(file)}
                >
                  <BsPencil className="text-warning mr-2 h-4 w-4" />
                  Ubah
                </Dropdown.Item>
              </div>
              <div className="py-2">
                <Dropdown.Item
                  className="text-gray-dark"
                  onClick={() => onDelete && onDelete(file)}
                >
                  <BsTrash3 className="text-danger mr-2 h-4 w-4" />
                  Hapus
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <LinkOrDiv className="flex-1 cursor-pointer" {...linkingProps} />
        </div>
      </div>
      <LinkOrDiv className="cursor-pointer" {...linkingProps}>
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
    </div>
  )
}
