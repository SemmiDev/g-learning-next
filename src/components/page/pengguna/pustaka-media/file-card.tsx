import { ActionIcon, LinkOrDiv, Thumbnail, Time, Title } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import cn from '@/utils/class-names'
import iconFolder from '@public/icons/folder.svg'
import Image from 'next/image'
import Link from 'next/link'
import {
  BsDownload,
  BsFileEarmarkText,
  BsFileEarmarkZip,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypePdf,
  BsFiletypePpt,
  BsFiletypePptx,
  BsFiletypeSvg,
  BsFiletypeTxt,
  BsFiletypeXls,
  BsFiletypeXlsx,
  BsFillPlayBtnFill,
  BsGlobe,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { LuFileAudio, LuFileVideo } from 'react-icons/lu'
import { Dropdown } from 'rizzui'

export type FileType = {
  id: string
  name: string
  folder: boolean
  extension?: string
  fileCount?: number
  size?: number
  time: string
  type?: 'link' | 'audio' | 'video' | 'image'
  link?: string
  driveId?: string
}

const iconSize = 20 as const

const Icon = ({ file }: { file: FileType }) => {
  if (file.type === 'link') {
    if (file.link && file.link.match(/.*youtube.*/)) {
      return <BsFillPlayBtnFill size={iconSize} className="text-danger-dark" />
    } else {
      return <BsGlobe size={iconSize} className="text-success" />
    }
  }
  if (file.type === 'audio') {
    return <LuFileAudio size={iconSize} className="text-primary" />
  }
  if (file.type === 'video') {
    return <LuFileVideo size={iconSize} className="text-primary" />
  }

  const extension = file.extension ?? (file.link ?? file.name).split('.').pop()

  switch (extension) {
    case 'doc':
      return <BsFiletypeDoc size={iconSize} className="text-primary" />
    case 'docx':
      return <BsFiletypeDocx size={iconSize} className="text-primary" />
    case 'xls':
      return <BsFiletypeXls size={iconSize} className="text-success" />
    case 'xlsx':
      return <BsFiletypeXlsx size={iconSize} className="text-success" />
    case 'ppt':
      return <BsFiletypePpt size={iconSize} className="text-orange-600" />
    case 'pptx':
      return <BsFiletypePptx size={iconSize} className="text-orange-600" />
    case 'pdf':
      return <BsFiletypePdf size={iconSize} className="text-danger" />
    case 'txt':
      return <BsFiletypeTxt size={iconSize} className="text-danger" />
    case 'svg':
      return <BsFiletypeSvg size={iconSize} className="text-primary" />
    case 'zip':
    case 'rar':
    case '7zip':
    case 'gz':
      return <BsFileEarmarkZip size={iconSize} className="text-primary" />
    default:
      return <BsFileEarmarkText size={iconSize} className="text-primary" />
  }
}

const FileIcon = ({ file }: { file: FileType }) => {
  return (
    <div className="flex size-11 items-center justify-center rounded-md bg-gray-50">
      {file.folder ? (
        <figure className="size-5">
          <Image src={iconFolder} alt="folder" />
        </figure>
      ) : file.type === 'image' ? (
        <Thumbnail src={file.link} alt="thumbnail" size={44} rounded="md" />
      ) : (
        <Icon file={file} />
      )}
    </div>
  )
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
