import { ActionIcon, Button } from '@/components/ui'
import cn from '@/utils/class-names'
import {
  BsPencil,
  BsThreeDots,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { Dropdown } from 'rizzui'

type RiwayatItemProps = {
  active?: boolean
  onClick?: () => void
  onRename?: () => void
  onDelete?: () => void
}

export default function RiwayatItem({
  active,
  onClick,
  onRename,
  onDelete,
}: RiwayatItemProps) {
  return (
    <div
      className={cn(
        'flex justify-between items-start cursor-pointer hover:bg-gray-50/50',
        {
          'bg-blue-50/30 text-primary-dark': active,
        }
      )}
    >
      <div className="truncate p-2" onClick={onClick}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
        aliquam odit incidunt officiis a? Minima expedita, nesciunt enim
        adipisci quo consequuntur optio, ipsum, et natus sed est rem in esse?
      </div>
      <Dropdown placement="bottom-start" className="mt-1">
        <Dropdown.Trigger>
          <ActionIcon as="span" size="sm" variant="outline-hover">
            <BsThreeDotsVertical size={14} />
          </ActionIcon>
        </Dropdown.Trigger>
        <Dropdown.Menu className="w-30 divide-y !py-0">
          <div className="py-2">
            <Dropdown.Item
              className="text-gray-dark"
              onClick={() => onRename?.()}
            >
              <BsPencil className="text-orange size-4 mr-2" />
              Ganti Nama
            </Dropdown.Item>
          </div>
          <div className="py-2">
            <Dropdown.Item
              className="text-gray-dark"
              onClick={() => onDelete?.()}
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
