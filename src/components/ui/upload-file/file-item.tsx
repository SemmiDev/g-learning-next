import Image from 'next/image'
import { ReactNode } from 'react'
import { FileError } from 'react-dropzone'
import { BiTrashAlt } from 'react-icons/bi'
import ActionIcon from '../button/action-icon'
import Text from '../text/text'
import { UploadFileType } from './upload-file'
import { FileIcon } from '../file/file-icon'
import { isImageExt } from '@/utils/media-check'

const IconWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <figure className="flex justify-center items-center size-11 rounded-md bg-gray-50">
      {children}
    </figure>
  )
}

const FileUploadIcon = ({ file }: { file: UploadFileType }) => {
  if (isImageExt(file.name ?? '')) {
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
  }

  return (
    <IconWrapper>
      <FileIcon file={{ name: file.name }} />
    </IconWrapper>
  )
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
        <FileUploadIcon file={file} />
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
          <FileUploadIcon file={file} />
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
