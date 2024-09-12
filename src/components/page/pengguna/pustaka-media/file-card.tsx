import { ActionIcon, LinkOrDiv, Time, Title } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import iconFolder from '@public/icons/folder.svg'
import Image from 'next/image'
import Link from 'next/link'
import {
  BsDownload,
  BsFileEarmarkText,
  BsFileImage,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypePdf,
  BsFiletypePpt,
  BsFiletypePptx,
  BsFiletypeXls,
  BsFiletypeXlsx,
  BsFillPlayBtnFill,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export type FileType = {
  id: string
  name: string
  type: 'file' | 'folder'
  extension?: string
  fileCount?: number
  size?: number
  time: string
  icon?: 'video' | 'file'
  link?: string
  driveId?: string
}

const iconSize = 20 as const

const FileIcon = ({ file }: { file: FileType }) => {
  if (file.icon == 'video') {
    return <BsFillPlayBtnFill size={iconSize} className="text-danger-dark" />
  }

  const extension = file.extension ?? (file.link ?? file.name).split('.').pop()

  let icon
  switch (extension) {
    case 'doc':
      icon = <BsFiletypeDoc size={iconSize} className="text-primary" />
      break
    case 'docx':
      icon = <BsFiletypeDocx size={iconSize} className="text-primary" />
      break
    case 'xls':
      icon = <BsFiletypeXls size={iconSize} className="text-success" />
      break
    case 'xlsx':
      icon = <BsFiletypeXlsx size={iconSize} className="text-success" />
      break
    case 'ppt':
      icon = <BsFiletypePpt size={iconSize} className="text-orange-600" />
      break
    case 'pptx':
      icon = <BsFiletypePptx size={iconSize} className="text-orange-600" />
      break
    case 'pdf':
      icon = <BsFiletypePdf size={iconSize} className="text-danger" />
      break
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'bmp':
      icon = <BsFileImage size={iconSize} className="text-primary" />
      break
    default:
      icon = <BsFileEarmarkText size={iconSize} className="text-primary" />
      break
  }

  return icon
}

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
      file.type === 'folder' && onFolderClick && onFolderClick(file)
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
          <div className="flex size-11 items-center justify-center rounded-md bg-gray-50">
            {file.type == 'folder' ? (
              <figure className="size-5">
                <Image src={iconFolder} alt="folder" />
              </figure>
            ) : (
              <FileIcon file={file} />
            )}
          </div>
        </LinkOrDiv>
        <div className="flex flex-col">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon as="span" size="sm" variant="outline-hover">
                <BsThreeDotsVertical size={14} />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-30 divide-y">
              {file.type == 'file' && file.icon == 'file' && file.link && (
                <div className="mb-2">
                  <Link href={file.link} target="_blank">
                    <Dropdown.Item className="text-gray-dark">
                      <BsDownload className="text-primary mr-2 h-4 w-4" />
                      Unduh
                    </Dropdown.Item>
                  </Link>
                </div>
              )}
              {file.type == 'folder' && (
                <div className="mb-2">
                  <Dropdown.Item
                    className="text-gray-dark"
                    onClick={() => onEdit && onEdit(file)}
                  >
                    <BsPencil className="text-warning mr-2 h-4 w-4" />
                    Ubah
                  </Dropdown.Item>
                </div>
              )}
              <div
                className={cn({
                  'mt-2 pt-2':
                    file.type == 'folder' ||
                    (file.type == 'file' && file.icon == 'file' && file.link),
                })}
              >
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
        {file.type == 'folder' ? (
          <ul className="flex list-inside list-disc gap-3.5">
            <li className="list-none text-sm text-gray-lighter">
              {file.fileCount} Berkas
            </li>
            <li className="text-sm text-gray-lighter">
              <Time date={file.time} format="date" />
            </li>
          </ul>
        ) : (
          <ul className="flex list-inside list-disc gap-3.5">
            <li className="list-none text-sm text-gray-lighter">
              {file.size ? (
                formatBytes(file.size, 2)
              ) : (
                <Time date={file.time} format="date" />
              )}
            </li>
            {!!file.size && (
              <li className="text-sm text-gray-lighter">
                <Time date={file.time} format="date" />
              </li>
            )}
          </ul>
        )}
      </LinkOrDiv>
    </div>
  )
}
