import { ActionIcon, Text } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import { BsEye, BsFileEarmarkFill, BsFillPlayBtnFill } from 'react-icons/bs'
import { MdOutlineFileDownload } from 'react-icons/md'

export type FileItemType = {
  id: string
  name: string
  size?: number | null
  time: string
  icon: 'video' | 'file'
  link: string
}

type FileButtonProps = {
  file: FileItemType
}

export default function RecentFileItem({ file }: FileButtonProps) {
  return (
    <div className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 px-4 hover:bg-gray-50/50">
      <div className="flex flex-1 justify-between items-center space-x-2">
        <div className="flex space-x-2">
          <div className="flex size-11 items-center justify-center rounded-md shrink-0 bg-gray-50">
            {file.icon === 'video' ? (
              <BsFillPlayBtnFill size={20} className="text-red-dark" />
            ) : (
              <BsFileEarmarkFill size={20} className="text-purple-900/80" />
            )}
          </div>
          <div className="flex flex-col">
            <Text
              weight="semibold"
              variant="dark"
              title={file.name}
              className="truncate"
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
            onClick={(e) => e.stopPropagation()}
          >
            <BsEye />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="outline-hover-colorful"
            onClick={(e) => e.stopPropagation()}
          >
            <MdOutlineFileDownload />
          </ActionIcon>
        </div>
      </div>
    </div>
  )
}
