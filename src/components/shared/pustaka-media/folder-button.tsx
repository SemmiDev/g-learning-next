import { ActionIconTooltip, Text } from '@/components/ui'
import { BiTrashAlt } from 'react-icons/bi'
import { BsFolderFill, BsPencil } from 'react-icons/bs'
import { LuFolderSearch } from 'react-icons/lu'
import { FileType } from './pustaka-media'

export type FolderButtonProps = {
  file: FileType
  onOpen?: (file: FileType) => void
  onEdit?: (file: FileType) => void
  onDelete?: (file: FileType) => void
}

export default function FolderButton({
  file,
  onOpen,
  onEdit,
  onDelete,
}: FolderButtonProps) {
  return (
    <>
      <div className="flex justify-between items-center gap-x-2 border-b border-b-gray-100 select-none transition duration-200 px-3 py-2.5 hover:bg-gray-50/50">
        <div
          className="flex gap-x-2 items-center flex-1 min-w-0 cursor-pointer"
          onClick={() => onOpen && onOpen(file)}
        >
          <div className="flex size-11 items-center justify-center shrink-0 rounded-md bg-gray-50 ms-8">
            <BsFolderFill size={20} className="text-primary" />
          </div>
          <div className="flex flex-col min-w-0">
            <Text
              weight="semibold"
              variant="dark"
              title={file.name}
              className="line-clamp-2"
            >
              {file.name}
            </Text>
            <Text size="sm" variant="lighter">
              {file.fileCount} Berkas
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 shrink-0 xs:grid-cols-3 sm:grid-cols-4">
          <ActionIconTooltip
            tooltip="Buka Folder"
            size="sm"
            variant="outline-hover-colorful"
            color="primary"
            onClick={() => onOpen && onOpen(file)}
          >
            <LuFolderSearch />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Ubah"
            size="sm"
            variant="outline-hover-colorful"
            color="warning"
            onClick={() => onEdit && onEdit(file)}
          >
            <BsPencil />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Hapus"
            size="sm"
            variant="outline-hover-colorful"
            color="danger"
            onClick={() => onDelete && onDelete(file)}
          >
            <BiTrashAlt />
          </ActionIconTooltip>
        </div>
      </div>
    </>
  )
}
