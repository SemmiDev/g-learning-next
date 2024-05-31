import { ActionIcon, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import iconFolder from '@public/icons/folder.svg'
import Image from 'next/image'
import Link from 'next/link'
import { BsPencil, BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export type FolderType = {
  name: string
  count: number
}

export default function FolderCard({
  folder,
  className,
}: {
  folder: FolderType
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="mb-4 flex size-11 items-center justify-center rounded-md bg-gray-50">
          <figure className="size-5">
            <Image src={iconFolder} alt="folder" />
          </figure>
        </div>
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
      <Link href={`${routes.bankSoal}/folder`}>
        <Title
          as="h4"
          size="base"
          weight="medium"
          variant="dark"
          className="truncate"
          title={folder.name}
        >
          {folder.name}
        </Title>
        <Text size="sm" className="truncate">
          {folder.count} Bank Soal
        </Text>
      </Link>
    </div>
  )
}
