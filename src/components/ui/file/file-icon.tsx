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
} from 'react-icons/bs'

type FileIconProps = {
  filename: string
  iconSize?: number
}

export default function FileIcon({ filename, iconSize = 20 }: FileIconProps) {
  switch (filename.split('.').pop()) {
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
