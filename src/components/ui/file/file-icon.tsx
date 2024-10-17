'use client'

import { PustakaMediaFileType } from '@/components/shared/pustaka-media'
import cn from '@/utils/class-names'
import { isPlayableVideo } from '@/utils/media-check'
import iconFolder from '@public/icons/folder.svg'
import Image from 'next/image'
import {
  BsFileEarmarkText,
  BsFileEarmarkZip,
  BsFileImage,
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
} from 'react-icons/bs'
import { LuFileAudio, LuFileVideo } from 'react-icons/lu'
import Thumbnail from '../thumbnail'

const iconSize = 20 as const

export type FileIconType = {
  name?: string
  link?: string
  folder?: boolean
  extension?: string
  type?: PustakaMediaFileType['type']
}

const Icon = ({ file }: { file: FileIconType }) => {
  if (file.type === 'link') {
    if (file.link && isPlayableVideo(file.link)) {
      return (
        <BsFillPlayBtnFill
          size={iconSize}
          className={
            file.link.match(/.*youtube.*/) ? 'text-danger-dark' : 'text-primary'
          }
        />
      )
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

  const extension =
    file.extension ?? (file.link ?? file.name ?? '').split('.').pop()

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
    case 'jpg':
    case 'jpeg':
    case 'jfif':
    case 'png':
    case 'bmp':
      return <BsFileImage size={iconSize} className="text-primary" />
    case 'zip':
    case 'rar':
    case '7zip':
    case 'gz':
      return <BsFileEarmarkZip size={iconSize} className="text-primary" />
    default:
      return <BsFileEarmarkText size={iconSize} className="text-primary" />
  }
}

export type FileIconProps = {
  file: FileIconType
  fullThumbnail?: boolean
  className?: string
  thumbnailClassName?: string
}

export default function FileIcon({
  file,
  fullThumbnail = true,
  className,
  thumbnailClassName,
}: FileIconProps) {
  return (
    <div
      className={cn(
        'flex size-11 items-center justify-center rounded-md bg-gray-50 shrink-0',
        className
      )}
    >
      {file.folder ? (
        <figure className="size-5">
          <Image src={iconFolder} alt="folder" />
        </figure>
      ) : file.type === 'image' && file.link ? (
        <Thumbnail
          src={file.link}
          alt="thumbnail"
          size={fullThumbnail ? 44 : 36}
          resize={128}
          rounded="md"
          className={thumbnailClassName}
        />
      ) : (
        <Icon file={file} />
      )}
    </div>
  )
}
