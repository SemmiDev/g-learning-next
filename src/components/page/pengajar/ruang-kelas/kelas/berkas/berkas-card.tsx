import { ActionIcon, FileIcon, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsDownload, BsThreeDotsVertical } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { GrShare } from 'react-icons/gr'
import { Dropdown } from 'rizzui'

export type BerkasType = {
  name: string
  size: string
  time: string
  desc: string
}

export default function BerkasCard({
  file,
  className,
}: {
  file: any
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted bg-gray-0 p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <figure className="flex items-center justify-center size-11 rounded-md bg-gray-50 mb-4">
          <FileIcon file={file} />
        </figure>
        <div className="flex">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon as="span" size="sm" variant="outline-hover">
                <BsThreeDotsVertical size={14} />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-52">
              <Dropdown.Item className="text-gray-dark">
                <GrShare size={12} className="text-success-dark mr-2" />
                Buka Diskusi Terkait
              </Dropdown.Item>
              <Dropdown.Item className="text-gray-dark">
                <BsDownload size={14} className="text-info-dark mr-2" />
                Download
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Text
        weight="semibold"
        variant="dark"
        title={file.name}
        className="truncate"
      >
        {file.name}
      </Text>
      <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
        <li>{file.size}</li>
        <li>
          <GoDotFill size={10} />
        </li>
        <li>{file.time}</li>
      </ul>
      <Text size="sm" title={file.desc} className="truncate">
        {file.desc}
      </Text>
    </div>
  )
}
