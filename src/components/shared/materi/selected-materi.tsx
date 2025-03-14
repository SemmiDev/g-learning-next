import { ActionIcon, Text, Time } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsClipboardPlus, BsFileEarmarkRichtext } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { MdClose } from 'react-icons/md'
import { MateriItemType } from './materi-button'

type SelectedFileProps = { materi: MateriItemType; onRemove?(): void }

export default function SelectedMateri({
  materi,
  onRemove,
}: SelectedFileProps) {
  return (
    <div
      className="flex justify-between gap-2 rounded-sm border border-gray-50 w-full cursor-auto p-2 sm:w-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex gap-x-2">
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
            className="text-ellipsis"
          >
            {materi.name}
          </Text>
          <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
            <li>
              <Time date={materi.time} format="datetimeshort" />
            </li>
            <li>
              <GoDotFill size={10} />
            </li>
            <li>{materi.fileCount} berkas</li>
          </ul>
        </div>
      </div>
      <div className="flex gap-x-1">
        <ActionIcon
          size="sm"
          variant="outline-hover-colorful"
          color="danger"
          onClick={() => onRemove && onRemove()}
        >
          <MdClose />
        </ActionIcon>
      </div>
    </div>
  )
}
