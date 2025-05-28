import { ActionIconTooltip, Text } from '@/components/ui'
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
}

export default function KategoriButton({
  kategori,
  onOpen,
  onEdit,
}: KategoriButtonProps) {
  const handleOpen = () => onOpen && onOpen(kategori)

  return (
    <>
      <div
        className="flex justify-between items-center gap-x-2 border-b border-b-gray-100 select-none transition duration-200 px-4 py-3 hover:bg-gray-50/50"
        onDoubleClick={handleOpen}
      >
        <div
          className="flex gap-x-2 min-w-0 cursor-pointer pe-2"
          onClick={handleOpen}
        >
          <div className="flex size-9 items-center justify-center rounded-md bg-gray-50 shrink-0 xs:size-11">
            <BsFolderFill className="text-primary size-4 xs:size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <Text
              weight="semibold"
              variant="dark"
              title={kategori.name}
              className="truncate"
            >
              {kategori.name}
            </Text>
            <Text size="sm" variant="lighter" className="truncate">
              {kategori.count} Paket Soal
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 shrink-0">
          <ActionIconTooltip
            tooltip="Buka Kategori"
            size="sm"
            variant="outline-hover-colorful"
            color="primary"
            onClick={(e) => {
              e.stopPropagation()
              handleOpen()
            }}
          >
            <LuFolderSearch />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Ubah"
            size="sm"
            variant="outline-hover-colorful"
            color="warning"
            onClick={(e) => {
              e.stopPropagation()
              onEdit && onEdit(kategori)
            }}
          >
            <BsPencil />
          </ActionIconTooltip>
        </div>
      </div>
    </>
  )
}
