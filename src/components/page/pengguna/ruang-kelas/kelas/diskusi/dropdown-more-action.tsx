import { Button } from '@/components/ui'
import { BsPencil, BsThreeDots, BsTrash3 } from 'react-icons/bs'
import { Dropdown } from 'rizzui'

type DropdownMoreActionProps = {
  showEdit?: boolean
  showDelete?: boolean
  onEdit?: () => void
  onDelete?: () => void
}

export default function DropdownMoreAction({
  showEdit,
  showDelete,
  onEdit,
  onDelete,
}: DropdownMoreActionProps) {
  if (!showEdit && !showDelete) return null

  return (
    <Dropdown placement="bottom-end">
      <Dropdown.Trigger>
        <Button as="span" size="sm" variant="text">
          <BsThreeDots size={18} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className="w-32 divide-y !py-0">
        {showEdit && (
          <div className="py-2">
            <Dropdown.Item className="text-gray-dark" onClick={onEdit}>
              <BsPencil className="text-warning mr-2 h-4 w-4" />
              Ubah
            </Dropdown.Item>
            {/* TODO: fitur bagikan ke kelas lain */}
            {/* <Dropdown.Item className="text-gray-dark">
            <PiShareFat className="text-primary mr-2 h-4 w-4" />
            Bagikan
          </Dropdown.Item> */}
          </div>
        )}
        {showDelete && (
          <div className="py-2">
            <Dropdown.Item className="text-gray-dark" onClick={onDelete}>
              <BsTrash3 className="text-danger mr-2 h-4 w-4" />
              Hapus
            </Dropdown.Item>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
