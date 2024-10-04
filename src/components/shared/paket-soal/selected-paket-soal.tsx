import { ActionIcon, Text, Time } from '@/components/ui'
import { BsCardChecklist } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { MdClose } from 'react-icons/md'
import { PaketSoalItemType } from './paket-soal-button'

type SelectedFileProps = { soal: PaketSoalItemType; onRemove?(): void }

export default function SelectedSoal({ soal, onRemove }: SelectedFileProps) {
  return (
    <div
      className="flex justify-between gap-2 rounded-sm border border-gray-50 cursor-auto p-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex space-x-2">
        <div className="flex size-11 items-center justify-center rounded-md btn-item-blue mr-2">
          <BsCardChecklist size={22} />
        </div>
        <div className="flex flex-col">
          <Text
            weight="semibold"
            variant="dark"
            title={soal.name}
            className="text-ellipsis"
          >
            {soal.name}
          </Text>
          <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
            <li>
              <Time date={soal.time} format="datetime" />
            </li>
            <li>
              <GoDotFill size={10} />
            </li>
            <li>{soal.count} berkas</li>
          </ul>
        </div>
      </div>
      <div className="flex space-x-1">
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
