import { Button } from '@/components/ui'
import { BsThreeDots, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

export default function DropdownNilaiAction() {
  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <Button size="sm" variant="outline">
          <BsThreeDots size={18} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className="divide-y">
        <Dropdown.Item className="text-gray-dark">
          <BsTrash3 className="text-red mr-2 h-4 w-4" />
          Hapus Nilai
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}
