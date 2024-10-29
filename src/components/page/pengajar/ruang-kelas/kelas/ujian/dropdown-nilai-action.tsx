import { Button } from '@/components/ui'
import { BsThreeDots, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export default function DropdownNilaiAction() {
  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <Button as="span" size="sm" variant="outline">
          <BsThreeDots size={18} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className="divide-y">
        <Dropdown.Item className="text-gray-dark">
          <BsTrash3 className="text-danger size-4 mr-2" />
          Hapus Nilai
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
