import { FileType } from '@/components/shared/pustaka-media/pustaka-media'
import iconFolder from '@public/icons/folder.svg'
import Image from 'next/image'
import {
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
} from 'react-icons/bs'
import { LuFileAudio, LuFileVideo } from 'react-icons/lu'
import Thumbnail from '../thumbnail'

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

export const FileIcon = ({ file }: { file: FileType }) => {
  return (
    <div className="flex size-11 items-center justify-center rounded-md bg-gray-50">
      {file.folder ? (
        <figure className="size-5">
          <Image src={iconFolder} alt="folder" />
        </figure>
      ) : file.type === 'image' ? (
        <Thumbnail
          src={file.link}
          alt="thumbnail"
          size={44}
          resize={100}
          rounded="md"
        />
      ) : (
        <Icon file={file} />
      )}
    </div>
  )
}
