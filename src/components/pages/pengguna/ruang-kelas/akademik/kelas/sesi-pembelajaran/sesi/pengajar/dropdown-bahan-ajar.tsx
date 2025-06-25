import { ActionIcon } from '@/components/ui'
import { BsPencil, BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

type DropdownBahanAjarProps = {
  onEdit?: () => void
  onDelete?: () => void
}

export default function DropdownBahanAjar({
  onEdit,
  onDelete,
}: DropdownBahanAjarProps) {
  return (
    <Dropdown placement="bottom-end" className="absolute top-2 right-2">
      <Dropdown.Trigger>
        <ActionIcon as="span" size="sm" variant="outline-hover">
          <BsThreeDotsVertical size={14} />
        </ActionIcon>
      </Dropdown.Trigger>
      <Dropdown.Menu className="w-auto divide-y !py-0">
        <div className="py-2">
          <Dropdown.Item className="text-gray-dark" onClick={onEdit}>
            <BsPencil className="text-warning size-4 mr-2" />
            Ubah
          </Dropdown.Item>
        </div>
        <div className="py-2">
          <Dropdown.Item className="text-gray-dark" onClick={onDelete}>
            <BsTrash3 className="text-danger size-4 mr-2" />
            Hapus
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
