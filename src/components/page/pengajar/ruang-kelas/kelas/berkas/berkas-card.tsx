import { ActionIcon, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { ReactNode } from 'react'
import { BsDownload, BsThreeDotsVertical } from 'react-icons/bs'
import { GrShare } from 'react-icons/gr'
import { Dropdown } from 'rizzui'

export type BerkasType = {
  name: string
  size: string
  time: string
  desc: string
  image: ReactNode
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
        'relative rounded-lg border border-muted bg-gray-0 p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-gray-50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="mb-4 flex size-11 items-center justify-center rounded-md bg-gray-100">
          <figure className="size-5">{file.image}</figure>
        </div>
        <div className="flex">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon size="sm" variant="outline-hover">
                <BsThreeDotsVertical size={14} />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-52">
              <Dropdown.Item className="text-gray-dark">
                <GrShare size={12} className="text-green-dark mr-2" />
                Buka Diskusi Terkait
              </Dropdown.Item>
              <Dropdown.Item className="text-gray-dark">
                <BsDownload size={14} className="text-blue-dark mr-2" />
                Download
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Title
        as="h4"
        size="base"
        weight="semibold"
        variant="dark"
        className="truncate"
      >
        {file.name}
      </Title>
      <ul className="flex list-inside list-disc gap-3.5">
        <li className="list-none text-sm text-gray-lighter">{file.size}</li>
        <li className="text-sm text-gray-lighter">{file.time}</li>
      </ul>
      <Text size="sm" className="truncate">
        {file.desc}
      </Text>
    </div>
  )
}
