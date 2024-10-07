import { ActionIcon, FileIcon, Text, Time } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import { GoDotFill } from 'react-icons/go'
import { MdClose } from 'react-icons/md'
import { FileType } from './pustaka-media'

type SelectedFileProps = { file: FileType; onRemove?(): void }

export default function SelectedFile({ file, onRemove }: SelectedFileProps) {
  return (
    <div
      className="flex justify-between gap-2 rounded-sm border border-gray-50 w-full cursor-auto p-2 sm:w-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex space-x-2">
        <FileIcon file={file} />
        <div className="flex flex-col">
          <Text
            weight="semibold"
            variant="dark"
            title={file.name}
            className="text-ellipsis"
          >
            {file.name}
          </Text>
          <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
            <li>
              {file.size ? (
                formatBytes(file.size, 2)
              ) : (
                <Time date={file.time} />
              )}
            </li>
            {!!file.size && (
              <>
                <li>
                  <GoDotFill size={10} />
                </li>
                <li>
                  <Time date={file.time} format="dateshort" />
                </li>
              </>
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
