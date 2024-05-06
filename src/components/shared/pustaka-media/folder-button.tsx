import { Text } from '@/components/ui'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { BsFolderFill } from 'react-icons/bs'

export type FolderItemType = {
  name: string
  fileCount: number
}

export type FolderButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  folder: FolderItemType
}

export default function FolderButton({ folder, ...props }: FolderButtonProps) {
  return (
    <button
      className="flex space-x-2 text-left border-b border-b-gray-100 px-4 py-3 hover:bg-gray-50/50"
      {...props}
    >
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
    </button>
  )
}
