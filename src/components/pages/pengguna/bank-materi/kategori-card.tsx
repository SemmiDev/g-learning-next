import { ActionIcon, Text, Title } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import iconFolder from '@public/icons/folder.svg'
import Image from 'next/image'
import Link from 'next/link'
import { BsPencil, BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { RiFileExcel2Line } from 'react-icons/ri'
import { Dropdown } from 'rizzui'

export type KategoriType = {
  id: string
  name: string
  count: number
}

type KategoriCardProps = {
  kategori: KategoriType
  onEdit?: (id: string) => void
  onExport?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export default function KategoriCard({
  kategori,
  onEdit,
  onExport,
  onDelete,
  className,
}: KategoriCardProps) {
  return (
    <div
      className={cn(
        'relative bg-white rounded-lg border border-muted shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-muted/5',
        className
      )}
    >
      <Link
        href={`${routes.pengguna.bankMateri}/${kategori.id}`}
        className="flex flex-col p-2"
      >
        <div className="flex size-11 items-center justify-center rounded-md bg-gray-50 mb-4">
          <figure className="size-5">
            <Image src={iconFolder} alt="folder" />
          </figure>
        </div>
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
          {kategori.count} Materi
        </Text>
      </Link>
      <Dropdown placement="bottom-end" className="absolute top-2 right-2">
        <Dropdown.Trigger>
          <ActionIcon as="span" size="sm" variant="outline-hover">
            <BsThreeDotsVertical size={14} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Menu className="w-auto divide-y !py-0">
          <div className="py-2">
            <Dropdown.Item
              className="text-gray-dark"
              onClick={() => onEdit?.(kategori.id)}
            >
              <BsPencil className="text-warning size-4 mr-2" />
              Ubah
            </Dropdown.Item>
            {kategori.count > 0 && (
              <Dropdown.Item
                className="text-gray-dark"
                onClick={() => onExport?.(kategori.id)}
              >
                <RiFileExcel2Line className="text-success size-4 mr-2" />
                Ekspor
              </Dropdown.Item>
            )}
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
    </div>
  )
}
