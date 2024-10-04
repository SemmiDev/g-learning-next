import {
  ActionIconTooltip,
  LabelOrDiv,
  PustakaMediaFileType,
  Text,
  Time,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { BiTrashAlt } from 'react-icons/bi'
import {
  BsClipboardPlus,
  BsFileEarmarkRichtext,
  BsPencil,
} from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { LuEye } from 'react-icons/lu'
import { Radio } from 'rizzui'

export type MateriItemType = {
  id: string
  name: string
  desc: string
  time: string
  fileCount: number
  fileIds: string[]
  type: 'materi' | 'tugas'
}

export type MateriButtonProps = {
  materi: MateriItemType
  type?: MateriItemType['type']
  onDetail?: (materi: MateriItemType) => void
  onEdit?: (materi: MateriItemType) => void
  onDelete?: (materi: MateriItemType) => void
  checked?: boolean
  onChange?(): void
}

export default function MateriButton({
  materi,
  type,
  onDetail,
  onEdit,
  onDelete,
  checked = false,
  onChange,
}: MateriButtonProps) {
  const selectable = !type || materi.type === type

  return (
    <LabelOrDiv
      label={selectable}
      className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50"
    >
      {selectable ? (
        <Radio
          name="pustaka_media_radio"
          value={materi.id}
          size="sm"
          className="px-4"
          checked={checked}
          onChange={() => onChange && onChange()}
        />
      ) : (
        <div className="w-[3.25rem]"></div>
      )}
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
            <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
              <li>
                <Time date={materi.time} format="datetime" />
              </li>
              <li>
                <GoDotFill size={10} />
              </li>
              <li>{materi.fileCount} berkas</li>
            </ul>
          </div>
        </div>
        <div className="flex space-x-1 pr-4">
          <ActionIconTooltip
            tooltip="Lihat"
            size="sm"
            variant="outline-hover-colorful"
            color="info"
            onClick={(e) => {
              e.stopPropagation()
              onDetail && onDetail(materi)
            }}
          >
            <LuEye />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Ubah"
            size="sm"
            variant="outline-hover-colorful"
            color="warning"
            onClick={(e) => {
              e.stopPropagation()
              onEdit && onEdit(materi)
            }}
          >
            <BsPencil />
          </ActionIconTooltip>
          <ActionIconTooltip
            tooltip="Hapus"
            size="sm"
            variant="outline-hover-colorful"
            color="danger"
            onClick={(e) => {
              e.stopPropagation()
              onDelete && onDelete(materi)
            }}
          >
            <BiTrashAlt />
          </ActionIconTooltip>
        </div>
      </div>
    </LabelOrDiv>
  )
}
