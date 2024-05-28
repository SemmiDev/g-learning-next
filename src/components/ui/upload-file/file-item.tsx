import Image from 'next/image'
import { ReactNode } from 'react'
import { FileError } from 'react-dropzone'
import { BiTrashAlt } from 'react-icons/bi'
import {
  BsFileEarmarkText,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypePdf,
  BsFiletypePpt,
  BsFiletypePptx,
  BsFiletypeXls,
  BsFiletypeXlsx,
} from 'react-icons/bs'
import ActionIcon from '../button/action-icon'
import Text from '../text/text'
import { UploadFileType } from './upload-file'

const iconSize = 20

const IconWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <figure className="flex justify-center items-center size-11 rounded-md bg-gray-50">
      {children}
    </figure>
  )
}

const FileIcon = ({ file }: { file: UploadFileType }) => {
  let icon
  switch (file.name.split('.').pop()) {
    case 'doc':
      icon = <BsFiletypeDoc size={iconSize} className="text-primary" />
      break
    case 'docx':
      icon = <BsFiletypeDocx size={iconSize} className="text-primary" />
      break
    case 'xls':
      icon = <BsFiletypeXls size={iconSize} className="text-green" />
      break
    case 'xlsx':
      icon = <BsFiletypeXlsx size={iconSize} className="text-green" />
      break
    case 'ppt':
      icon = <BsFiletypePpt size={iconSize} className="text-orange-600" />
      break
    case 'pptx':
      icon = <BsFiletypePptx size={iconSize} className="text-orange-600" />
      break
    case 'pdf':
      icon = <BsFiletypePdf size={iconSize} className="text-red" />
      break
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'bmp':
      return (
        <figure className="flex justify-center size-11 rounded-md overflow-clip">
          <Image
            src={file.preview}
            alt={file.name}
            width={44}
            height={44}
            className="object-cover"
          />
        </figure>
      )
    default:
      icon = <BsFileEarmarkText size={iconSize} className="text-primary" />
      break
  }

  return <IconWrapper>{icon}</IconWrapper>
}

export const UploadFileItem = ({
  file,
  removeFile,
}: {
  file: UploadFileType
  removeFile(file: UploadFileType): void
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <FileIcon file={file} />
        <Text weight="semibold" variant="dark">
          {file.name}
        </Text>
      </div>
      <ActionIcon
        size="sm"
        variant="flat"
        color="danger"
        onClick={() => removeFile(file)}
      >
        <BiTrashAlt />
      </ActionIcon>
    </div>
  )
}

export const UploadFileItemRejected = ({
  file,
  errors,
}: {
  file: UploadFileType
  errors?: FileError[]
}) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <figure className="flex justify-center items-center size-11 rounded-md bg-gray-50">
          <FileIcon file={file} />
        </figure>
        <div className="flex flex-col">
          <Text weight="semibold" variant="dark" className="line-through">
            {file.name}
          </Text>
          {errors && (
            <Text size="xs" weight="semibold" color="danger">
              {errors[0].message}
            </Text>
          )}
        </div>
      </div>
    </div>
  )
}
