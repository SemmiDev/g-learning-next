import { ActionIcon } from '@/components/ui'
import { BsThreeDotsVertical, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export default function DropdownNilaiAction() {
  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <ActionIcon as="span" size="sm" variant="outline">
          <BsThreeDotsVertical size={14} />
        </ActionIcon>
      </Dropdown.Trigger>
      <Dropdown.Menu className="divide-y">
        <Dropdown.Item className="text-gray-dark">
          <BsTrash3 className="text-danger mr-2 h-4 w-4" />
          Hapus Nilai
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
