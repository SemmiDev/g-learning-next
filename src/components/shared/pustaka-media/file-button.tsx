import { ActionIcon, FileIcon, ModalConfirm, Text } from '@/components/ui'
import { formatBytes } from '@/utils/bytes'
import { useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import { BsEye, BsFillPlayBtnFill } from 'react-icons/bs'
import { MdOutlineFileDownload } from 'react-icons/md'
import { Checkbox, Radio } from 'rizzui'

export type FileItemType = {
  id: string
  name: string
  size?: number | null
  time: string
  type: 'link-video' | 'file'
  link: string
}

export type FileButtonProps = {
  file: FileItemType
  checked?: boolean
  onChange?(val: boolean): void
  multiple: boolean
}

export default function FileButton({
  file,
  checked = false,
  onChange,
  multiple,
}: FileButtonProps) {
  const [showModalHapus, setShowModalHapus] = useState(false)

  return (
    <>
      <label className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-2.5 hover:bg-gray-50/50">
        {multiple ? (
          <Checkbox
            size="sm"
            className="px-3"
            iconClassName="h-4 top-0.5 left"
            checked={checked}
            onChange={(e) => {
              onChange && onChange(e.target.checked)
            }}
          />
        ) : (
          <Radio
            name="pustaka_media_radio"
            value={file.id}
            size="sm"
            className="px-3"
            checked={checked}
            onChange={() => onChange && onChange(true)}
          />
        )}
        <div className="flex flex-1 justify-between items-center space-x-2">
          <div className="flex space-x-2">
            <div className="flex size-11 items-center justify-center rounded-md shrink-0 bg-gray-50">
              {file.type === 'link-video' ? (
                <BsFillPlayBtnFill size={20} className="text-danger-dark" />
              ) : (
                <FileIcon filename={file.name} />
              )}
            </div>
            <div className="flex flex-col">
              <Text
                weight="semibold"
                variant="dark"
                title={file.name}
                className="truncate"
              >
                {file.name}
              </Text>
              <ul className="flex list-inside list-disc gap-3.5">
                <li className="list-none text-sm text-gray-lighter">
                  {file.size ? formatBytes(file.size, 2) : file.time}
                </li>
                {file.size && (
                  <li className="text-sm text-gray-lighter">{file.time}</li>
                )}
              </ul>
            </div>
          </div>
          <div className="flex space-x-1 pr-4">
            <ActionIcon
              size="sm"
              variant="outline-hover-colorful"
              onClick={(e) => e.stopPropagation()}
            >
              <BsEye />
            </ActionIcon>
            {file.type === 'file' && (
              <ActionIcon
                size="sm"
                variant="outline-hover-colorful"
                onClick={(e) => e.stopPropagation()}
              >
                <MdOutlineFileDownload />
              </ActionIcon>
            )}
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
      </label>

      <ModalConfirm
        title="Hapus Berkas"
        desc="Anda yakin ingin menghapus berkas ini?"
        isOpen={showModalHapus}
        onClose={() => setShowModalHapus(false)}
        onCancel={() => setShowModalHapus(false)}
        onConfirm={() => setShowModalHapus(false)}
      />
    </>
  )
}
