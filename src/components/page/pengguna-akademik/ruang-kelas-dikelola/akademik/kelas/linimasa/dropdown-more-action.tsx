import { ActionIcon, Button } from '@/components/ui'
import { BsPencil, BsThreeDots, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export default function DropdownMoreAction() {
  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <ActionIcon as="span" size="sm" variant="text">
          <BsThreeDots className="size-4" />
        </ActionIcon>
      </Dropdown.Trigger>
      <Dropdown.Menu className="w-32 divide-y !py-0">
        <div className="py-2">
          <Dropdown.Item className="text-gray-dark">
            <BsPencil className="text-warning size-4 mr-2" />
            Ubah
          </Dropdown.Item>
        </div>
        <div className="py-2">
          <Dropdown.Item className="text-gray-dark">
            <BsTrash3 className="text-danger size-4 mr-2" />
            Hapus
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
