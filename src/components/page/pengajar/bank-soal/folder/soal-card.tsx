import { ActionIcon, Button, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import Link from 'next/link'
import { BiShareAlt } from 'react-icons/bi'
import {
  BsFileEarmarkRichtext,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export type SoalType = {
  title: string
  desc: string
  time: string
  count: number
}

export default function SoalCard({
  soal,
  className,
}: {
  soal: SoalType
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="flex size-12 items-center justify-center rounded-md btn-item-green mr-2">
            <BsFileEarmarkRichtext size={24} />
          </div>
          <Title
            as="h4"
            size="base"
            weight="semibold"
            variant="dark"
            className="flex-1 line-clamp-2"
            title={soal.title}
          >
            {soal.title}
          </Title>
        </div>
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger>
            <ActionIcon size="sm" variant="outline-hover">
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

      <Text
        size="sm"
        weight="medium"
        variant="dark"
        className="line-clamp-2"
        title={soal.desc}
      >
        {soal.desc}
      </Text>

      <ul className="flex list-inside list-disc text-sm text-gray-lighter gap-3.5 mb-2">
        <li className="list-none">{soal.time}</li>
        <li>{soal.count} Soal</li>
      </ul>

      <div className="flex gap-2">
        <Button size="sm" className="flex-1">
          <BiShareAlt className="mr-2" />
          <Text size="xs" weight="medium" className="text-nowrap">
            Bagikan Soal
          </Text>
        </Button>
        <Link
          href={`${routes.pengajar.bankSoal}/folder/soal`}
          className="flex-1"
        >
          <Button size="sm" variant="outline" className="w-full">
            <Text size="xs" weight="medium">
              Detail
            </Text>
          </Button>
        </Link>
      </div>
    </div>
  )
}
