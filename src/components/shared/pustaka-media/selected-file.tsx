import { ActionIcon, FileIcon, Text } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import { BsFillPlayBtnFill } from 'react-icons/bs'
import { MdClose } from 'react-icons/md'
import { FileItemType } from './file-button'

type SelectedFileProps = { file: FileItemType; onRemove?(): void }

export default function SelectedFile({ file, onRemove }: SelectedFileProps) {
  return (
    <div
      className="flex justify-between gap-2 rounded-sm border border-gray-50 cursor-auto p-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex space-x-2">
        <div className="flex items-center justify-center size-11 shrink-0 rounded-md bg-gray-50">
          {file.type === 'link-video' ? (
            <BsFillPlayBtnFill size={20} className="text-danger-dark" />
          ) : (
            <FileIcon filename={file.name} />
          )}
        </div>
        <div className="flex flex-col">
          <Text
            weight="semibold"
            variant="dark"
            title={file.name}
            className="text-ellipsis"
          >
            {file.name}
          </Text>
          <ul className="flex list-inside list-disc gap-3.5">
            <li className="list-none text-sm text-gray-lighter">
              {file.size ? formatBytes(file.size, 2) : file.time}
            </li>
            {file.size && (
              <li className="text-sm text-gray-lighter">{file.time}</li>
            )}
          </ul>
        </div>
      </div>
      <div className="flex space-x-1">
        <ActionIcon
          size="sm"
          variant="outline-hover-colorful"
          color="danger"
          onClick={() => onRemove && onRemove()}
        >
          <MdClose />
        </ActionIcon>
      </div>
    </div>
  )
}
