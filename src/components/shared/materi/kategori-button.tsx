import { ActionIcon, Text } from '@/components/ui'
import { BiTrashAlt } from 'react-icons/bi'
import { BsFolderFill, BsPencil } from 'react-icons/bs'
import { LuFolderSearch } from 'react-icons/lu'

export type KategoriItemType = {
  id: string
  name: string
  count: number
}

export type KategoriButtonProps = {
  kategori: KategoriItemType
  onOpen?: (kategori: KategoriItemType) => void
  onEdit?: (kategori: KategoriItemType) => void
  onDelete?: (kategori: KategoriItemType) => void
}

export default function KategoriButton({
  kategori,
  onOpen,
  onEdit,
  onDelete,
}: KategoriButtonProps) {
  const handleOpen = () => onOpen && onOpen(kategori)

  return (
    <>
      <div className="flex justify-between items-center space-x-2 border-b border-b-gray-100 select-none transition duration-200 px-4 py-3 hover:bg-gray-50/50">
        <div
          className="flex space-x-2 cursor-pointer pe-2"
          onClick={handleOpen}
        >
          <div className="flex size-11 items-center justify-center rounded-md bg-gray-50">
            <BsFolderFill size={20} className="text-primary" />
          </div>
          <div className="flex flex-col">
            <Text
              weight="semibold"
              variant="dark"
              title={kategori.name}
              className="truncate"
            >
              {kategori.name}
            </Text>
            <Text size="sm" variant="lighter">
              {kategori.count} Materi
            </Text>
          </div>
        </div>
        <div className="flex space-x-1">
          <ActionIcon
            size="sm"
            variant="outline-hover-colorful"
            color="primary"
            onClick={(e) => {
              e.stopPropagation()
              handleOpen()
            }}
          >
            <LuFolderSearch />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="outline-hover-colorful"
            color="warning"
            onClick={(e) => {
              e.stopPropagation()
              onEdit && onEdit(kategori)
            }}
          >
            <BsPencil />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="outline-hover-colorful"
            color="danger"
            onClick={(e) => {
              e.stopPropagation()
              onDelete && onDelete(kategori)
            }}
          >
            <BiTrashAlt />
          </ActionIcon>
        </div>
      </div>
    </>
  )
}
