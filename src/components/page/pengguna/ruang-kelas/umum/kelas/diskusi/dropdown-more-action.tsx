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
          <BsThreeDots className="size-4" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu className="w-32 divide-y !py-0">
        {showEdit && (
          <div className="py-2">
            <Dropdown.Item className="text-gray-dark" onClick={onEdit}>
              <BsPencil className="text-warning size-4 mr-2" />
              Ubah
            </Dropdown.Item>
          </div>
        )}
        {showDelete && (
          <div className="py-2">
            <Dropdown.Item className="text-gray-dark" onClick={onDelete}>
              <BsTrash3 className="text-danger size-4 mr-2" />
              Hapus
            </Dropdown.Item>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
