import { Text } from '@/components/ui'
import ModalConfirm from '@/components/ui/modal/confirm'
import { ButtonHTMLAttributes, DetailedHTMLProps, useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { BsFolderFill, BsPencil } from 'react-icons/bs'
import { ActionIcon } from 'rizzui'

export type FolderItemType = {
  name: string
  fileCount: number
}

export type FolderButtonProps = {
  folder: FolderItemType
  onOpen?(): void
}

export default function FolderButton({ folder, onOpen }: FolderButtonProps) {
  const [showModalHapus, setShowModalHapus] = useState(false)

  return (
    <>
      <div
        className="flex justify-between items-center space-x-2 border-b border-b-gray-100 select-none transition duration-200 px-4 py-3 hover:bg-gray-50/50"
        onDoubleClick={onOpen}
      >
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
              {folder.fileCount} Berkas
            </Text>
          </div>
        </div>
        <div className="flex space-x-1">
          <ActionIcon
            size="sm"
            variant="outline"
            className="border-0 hover:border hover:border-orange-500"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <BsPencil className="text-orange" />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="outline"
            className="border-0 hover:border hover:border-red-500"
            onClick={(e) => {
              e.stopPropagation()
              setShowModalHapus(true)
            }}
            onDoubleClick={(e) => e.stopPropagation()}
          >
            <BiTrashAlt className="text-red" />
          </ActionIcon>
        </div>
      </div>

      <ModalConfirm
        title="Hapus Folder"
        desc="Anda yakin ingin menghapus folder ini?"
        isOpen={showModalHapus}
        onClose={() => setShowModalHapus(false)}
        onCancel={() => setShowModalHapus(false)}
        onConfirm={() => setShowModalHapus(false)}
      />
    </>
  )
}
