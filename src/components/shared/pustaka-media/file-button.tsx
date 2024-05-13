import { Text } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import { BiTrashAlt } from 'react-icons/bi'
import { BsEye, BsFileEarmarkFill, BsFillPlayBtnFill } from 'react-icons/bs'
import { MdOutlineFileDownload } from 'react-icons/md'
import { ActionIcon, Checkbox } from 'rizzui'

export type FileItemType = {
  id: string
  name: string
  size?: number | null
  time: string
  icon: 'video' | 'doc'
  link: string
}

export type FileButtonProps = {
  file: FileItemType
  checked?: boolean
  onChange?(val: boolean): void
}

export default function FileButton({
  file,
  checked = false,
  onChange,
}: FileButtonProps) {
  return (
    <label className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50">
      <Checkbox
        size="sm"
        className="px-4"
        iconClassName="h-4 top-0.5 left"
        checked={checked}
        onChange={(e) => {
          onChange && onChange(e.target.checked)
        }}
      />
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
        <div className="flex space-x-1 pr-4">
          <ActionIcon
            size="sm"
            variant="outline"
            className="border-0 hover:border"
            onClick={(e) => e.stopPropagation()}
          >
            <BsEye className="text-primary" />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="outline"
            className="border-0 hover:border"
            onClick={(e) => e.stopPropagation()}
          >
            <MdOutlineFileDownload className="text-primary" />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="outline"
            className="border-0 hover:border hover:border-red-500"
            onClick={(e) => e.stopPropagation()}
          >
            <BiTrashAlt className="text-red" />
          </ActionIcon>
        </div>
      </div>
    </label>
  )
}
