import { ActionIcon, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsPencil, BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export type RiwayatItemType = {
  id: string
  judul: string
}

type RiwayatItemProps = {
  data: RiwayatItemType
  active?: boolean
  onClick?: (id: string) => void
  onRename?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export default function RiwayatItem({
  data,
  active,
  onClick,
  onRename,
  onDelete,
  className,
}: RiwayatItemProps) {
  return (
    <div
      className={cn(
        'flex items-start cursor-pointer hover:bg-gray-50/50',
        className,
        {
          'bg-blue-50/30 text-primary-dark': active,
        }
      )}
    >
      <div className="flex-grow min-w-0 p-2" onClick={() => onClick?.(data.id)}>
        <Text size="sm" weight="medium" className="line-clamp-1">
          {data.judul}
        </Text>
      </div>
      <Dropdown placement="bottom-start" className="mt-1">
        <Dropdown.Trigger>
          <ActionIcon as="span" size="sm" variant="outline-hover">
            <BsThreeDotsVertical size={14} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Menu className="w-36 divide-y !py-0">
          <div className="py-2">
            <Dropdown.Item
              className="text-gray-dark"
              onClick={() => onRename?.(data.id)}
            >
              <BsPencil className="text-orange size-4 mr-2" />
              Ganti Judul
            </Dropdown.Item>
          </div>
          <div className="py-2">
            <Dropdown.Item
              className="text-gray-dark"
              onClick={() => onDelete?.(data.id)}
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
