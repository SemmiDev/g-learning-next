import { ActionIcon, ModalConfirm, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { useState } from 'react'
import { BiTrashAlt } from 'react-icons/bi'
import {
  BsClipboardPlus,
  BsFileEarmarkRichtext,
  BsPencil,
} from 'react-icons/bs'
import { Radio } from 'rizzui'

export type MateriItemType = {
  id: string
  name: string
  time: string
  fileCount: number
  type: 'materi' | 'tugas'
}

export type MateriButtonProps = {
  materi: MateriItemType
  checked?: boolean
  onChange?(): void
}

export default function MateriButton({
  materi,
  checked = false,
  onChange,
}: MateriButtonProps) {
  const [showModalHapus, setShowModalHapus] = useState(false)

  return (
    <>
      <label className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50">
        <Radio
          name="pustaka_media_radio"
          value={materi.id}
          size="sm"
          className="px-4"
          checked={checked}
          onChange={() => onChange && onChange()}
        />
        <div className="flex flex-1 justify-between items-center space-x-2">
          <div className="flex space-x-2">
            <div
              className={cn(
                'flex size-11 items-center justify-center rounded-md mr-2',
                {
                  'btn-item-green': materi.type === 'materi',
                  'btn-item-violet': materi.type === 'tugas',
                }
              )}
            >
              {materi.type === 'tugas' ? (
                <BsClipboardPlus size={22} />
              ) : (
                <BsFileEarmarkRichtext size={22} />
              )}
            </div>
            <div className="flex flex-col">
              <Text
                weight="semibold"
                variant="dark"
                title={materi.name}
                className="truncate"
              >
                {materi.name}
              </Text>
              <ul className="flex list-inside list-disc gap-3.5">
                <li className="list-none text-sm text-gray-lighter">
                  {materi.time}
                </li>
                <li className="text-sm text-gray-lighter">
                  {materi.fileCount} berkas
                </li>
              </ul>
            </div>
          </div>
          <div className="flex space-x-1 pr-4">
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
