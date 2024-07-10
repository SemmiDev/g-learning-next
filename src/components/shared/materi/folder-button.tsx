import { ActionIcon, Text } from '@/components/ui'
import ModalConfirm from '@/components/ui/modal/confirm'
import { useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { BsFolderFill, BsPencil } from 'react-icons/bs'
import { LuFolderSearch } from 'react-icons/lu'

export type FolderItemType = {
  name: string
  count: number
}

export type FolderButtonProps = {
  folder: FolderItemType
  onOpen?(): void
}

export default function FolderButton({ folder, onOpen }: FolderButtonProps) {
  const [showModalHapus, setShowModalHapus] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center space-x-2 border-b border-b-gray-100 select-none transition duration-200 px-4 py-3 hover:bg-gray-50/50">
        <div className="flex space-x-2 cursor-pointer" onClick={onOpen}>
          <div className="flex size-11 items-center justify-center rounded-md bg-gray-50">
            <BsFolderFill size={20} className="text-primary-lighter" />
          </div>
          <div className="flex flex-col">
            <Text
              weight="semibold"
              variant="dark"
              title={folder.name}
              className="truncate"
            >
              {folder.name}
            </Text>
            <Text size="sm" variant="lighter">
              {folder.count} Materi
            </Text>
          </div>
        </div>
        <div className="flex space-x-1">
          <ActionIcon
            size="sm"
            variant="outline-hover-colorful"
            color="primary"
            onClick={onOpen}
          >
            <LuFolderSearch />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="outline-hover-colorful"
            color="warning"
            onClick={(e) => e.stopPropagation()}
          >
            <BsPencil />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="outline-hover-colorful"
            color="danger"
            onClick={(e) => {
              e.stopPropagation()
              setShowModalHapus(true)
            }}
          >
            <BiTrashAlt />
          </ActionIcon>
        </div>
      </div>

      <ModalConfirm
        title="Hapus Folder"
        desc="Anda yakin ingin menghapus folder ini?"
        isOpen={showModalHapus}
        onClose={() => setShowModalHapus(false)}
        onConfirm={() => setShowModalHapus(false)}
        closeOnCancel
      />
    </>
  )
}
