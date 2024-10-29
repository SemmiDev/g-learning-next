import { ActionIcon, Button, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { BiShareAlt } from 'react-icons/bi'
import {
  BsClipboardPlus,
  BsFileEarmarkRichtext,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { Dropdown } from 'rizzui'

export type MateriType = {
  id: string
  name: string
  desc: string
  time: string
  fileCount: number
  type: 'materi' | 'tugas'
}

type MateriCardProps = {
  materi: MateriType
  className?: string
  onShare?(): void
}

export default function MateriCard({
  materi,
  className,
  onShare,
}: MateriCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="flex justify-between items-start space-x-2 mb-2">
        <div className="flex items-center">
          <div
            className={cn(
              'flex size-12 items-center justify-center rounded-md mr-2',
              {
                'btn-item-green': materi.type === 'materi',
                'btn-item-violet': materi.type === 'tugas',
              }
            )}
          >
            {materi.type === 'tugas' ? (
              <BsClipboardPlus size={24} />
            ) : (
              <BsFileEarmarkRichtext size={24} />
            )}
          </div>
          <Title
            as="h4"
            size="base"
            weight="semibold"
            variant="dark"
            className="flex-1 line-clamp-2"
            title={materi.name}
          >
            {materi.name}
          </Title>
        </div>
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger>
            <ActionIcon as="span" size="sm" variant="outline-hover">
              <BsThreeDotsVertical size={14} />
            </ActionIcon>
          </Dropdown.Trigger>
          <Dropdown.Menu className="w-30 divide-y">
            <div className="mb-2">
              <Dropdown.Item className="text-gray-dark">
                <BsPencil className="text-orange size-4 mr-2" />
                Ubah
              </Dropdown.Item>
            </div>
            <div className="mt-2 pt-2">
              <Dropdown.Item className="text-gray-dark">
                <BsTrash3 className="text-danger size-4 mr-2" />
                Hapus
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
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

      <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter mb-2">
        <li>{materi.time}</li>
        <li>
          <GoDotFill size={10} />
        </li>
        <li>{materi.fileCount} berkas</li>
      </ul>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1" onClick={onShare}>
          <BiShareAlt className="mr-2" />
          <Text size="xs" weight="medium" className="text-nowrap">
            Bagikan {materi.type === 'tugas' ? 'Tugas' : 'Materi'}
          </Text>
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <Text size="xs" weight="medium">
            Detail
          </Text>
        </Button>
      </div>
    </div>
  )
}
