import { Button } from '@/components/ui'
import { BsPencil, BsThreeDots, BsTrash3 } from 'react-icons/bs'
import { PiShareFat } from 'react-icons/pi'
import { Dropdown } from 'rizzui'

export default function DropdownMoreAction() {
  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <Button as="span" size="sm" variant="text">
          <BsThreeDots size={18} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className="w-32 divide-y">
        <div className="mb-2">
          <Dropdown.Item className="text-gray-dark">
            <BsPencil className="text-warning size-4 mr-2" />
            Ubah
          </Dropdown.Item>
        </div>
        <div className="mt-2 pt-2">
          <Dropdown.Item className="text-gray-dark">
            <BsTrash3 className="text-danger size-4 mr-2" />
            Hapus
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
