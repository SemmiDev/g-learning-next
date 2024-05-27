import { BiTrashAlt } from 'react-icons/bi'
import { BsFileEarmarkFill } from 'react-icons/bs'
import ActionIcon from '../button/action-icon'
import Text from '../text/text'
import { UploadFileType } from './upload-file'
import { FileError } from 'react-dropzone'

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
        <figure className="flex justify-center items-center size-11 rounded-md bg-gray-50">
          <BsFileEarmarkFill size={20} className="text-green" />
        </figure>
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
          <BsFileEarmarkFill size={20} className="text-green" />
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
