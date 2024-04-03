import { Button } from '@/components/ui'
import { BsPencil, BsThreeDots, BsTrash3 } from 'react-icons/bs'
import { PiShareFat } from 'react-icons/pi'
import { Dropdown } from 'rizzui'

export default function DropdownMoreAction() {
  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <Button size="sm" variant="text">
          <BsThreeDots size={18} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className="divide-y">
        <div className="mb-2">
          <Dropdown.Item className="text-gray-dark">
            <BsPencil className="text-orange mr-2 h-4 w-4" />
            Ubah
          </Dropdown.Item>
          <Dropdown.Item className="text-gray-dark">
            <PiShareFat className="text-primary mr-2 h-4 w-4" />
            Bagikan
          </Dropdown.Item>
        </div>
        <div className="mt-2 pt-2">
          <Dropdown.Item className="text-gray-dark">
            <BsTrash3 className="text-red mr-2 h-4 w-4" />
            Hapus
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
