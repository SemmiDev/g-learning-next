import { ActionIcon, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import iconFolder from '@public/icons/folder.svg'
import Image from 'next/image'
import Link from 'next/link'
import { BsPencil, BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export type KategoriType = {
  id: string
  name: string
  count: number
}

type KategoriCardProps = {
  kategori: KategoriType
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export default function KategoriCard({
  kategori,
  onEdit,
  onDelete,
  className,
}: KategoriCardProps) {
  const linkingProps = {
    href: `${routes.pengguna.bankSoal}/${kategori.id}`,
  }

  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted p-2 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md',
        className
      )}
    >
      <div className="flex">
        <Link className="flex-1 h-[60px]" {...linkingProps}>
          <div className="flex size-11 items-center justify-center rounded-md bg-gray-50">
            <figure className="size-5">
              <Image src={iconFolder} alt="folder" />
            </figure>
          </div>
        </Link>
        <div className="flex flex-col">
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon as="span" size="sm" variant="outline-hover">
                <BsThreeDotsVertical size={14} />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-30 divide-y !py-0">
              <div className="py-2">
                <Dropdown.Item
                  className="text-gray-dark"
                  onClick={() => onEdit && onEdit(kategori.id)}
                >
                  <BsPencil className="text-warning size-4 mr-2" />
                  Ubah
                </Dropdown.Item>
              </div>
              <div className="py-2">
                <Dropdown.Item
                  className="text-gray-dark"
                  onClick={() => onDelete && onDelete(kategori.id)}
                >
                  <BsTrash3 className="text-danger size-4 mr-2" />
                  Hapus
                </Dropdown.Item>
              </div>
            </Dropdown.Menu>
          </Dropdown>
          <Link className="flex-1" {...linkingProps} />
        </div>
      </div>
      <Link {...linkingProps}>
        <Title
          as="h4"
          size="base"
          weight="medium"
          variant="dark"
          className="truncate"
          title={kategori.name}
        >
          {kategori.name}
        </Title>
        <Text size="sm" className="truncate">
          {kategori.count} Paket Soal
        </Text>
      </Link>
    </div>
  )
}
