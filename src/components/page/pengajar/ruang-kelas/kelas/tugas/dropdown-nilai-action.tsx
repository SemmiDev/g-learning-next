import { Button } from '@/components/ui'
import { BsPencil, BsThreeDots, BsTrash3 } from 'react-icons/bs'
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
        <div className="mb-2">
          <Dropdown.Item className="text-gray-dark">
            <BsPencil className="text-warning size-4 mr-2" />
            Ubah Nilai
          </Dropdown.Item>
        </div>
        <div className="mt-2 pt-2">
          <Dropdown.Item className="text-gray-dark">
            <BsTrash3 className="text-danger size-4 mr-2" />
            Hapus Nilai
          </Dropdown.Item>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
