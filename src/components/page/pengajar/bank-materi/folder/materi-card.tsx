import { Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import Image from 'next/image'
import { BsPencil, BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { ActionIcon, Dropdown } from 'rizzui'
import iconMateri from '@public/icons/materi.png'

export type MateriType = {
  title: string
  desc: string
  time: string
  fileCount: number
}

export default function MateriCard({
  materi,
  className,
}: {
  materi: MateriType
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-md active:bg-gray-50/30',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex mb-2">
          <div className="flex size-12 items-center justify-center rounded-md bg-gray-50 mr-2">
            <figure className="size-6">
              <Image src={iconMateri} alt="folder" />
            </figure>
          </div>
          <Title
            as="h4"
            size="base"
            weight="semibold"
            variant="dark"
            className="flex-1 line-clamp-2"
            title={materi.title}
          >
            {materi.title}
          </Title>
        </div>
        <div className="flex">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon size="sm" variant="text">
                <BsThreeDotsVertical size={14} />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-30 divide-y">
              <div className="mb-2">
                <Dropdown.Item className="text-gray-dark">
                  <BsPencil className="text-orange mr-2 h-4 w-4" />
                  Ubah
                </Dropdown.Item>
              </div>
              <div className="mt-2 pt-2">
                <Dropdown.Item className="text-gray-dark">
                  <BsTrash3 className="text-red mr-2 h-4 w-4" />
                  Hapus
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Text
        size="sm"
        weight="medium"
        variant="dark"
        className="line-clamp-2"
        title={materi.desc}
      >
        {materi.desc}
      </Text>
      <ul className="flex list-inside list-disc text-sm text-gray-lighter gap-3.5">
        <li className="list-none">{materi.time}</li>
        <li>{materi.fileCount} berkas</li>
      </ul>
    </div>
  )
}
