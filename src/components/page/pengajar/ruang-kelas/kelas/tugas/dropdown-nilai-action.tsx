import { Button } from '@/components/ui'
import { BsPencil, BsThreeDots, BsTrash3 } from 'react-icons/bs'
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
        <div className="mb-2">
          <Dropdown.Item className="text-gray-dark">
            <BsPencil className="text-warning mr-2 h-4 w-4" />
            Ubah Nilai
          </Dropdown.Item>
        </div>
        <div className="mt-2 pt-2">
          <Dropdown.Item className="text-gray-dark">
            <BsTrash3 className="text-danger mr-2 h-4 w-4" />
            Hapus Nilai
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
