import { ActionIcon, Text, Time } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsCardChecklist } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { MdClose } from 'react-icons/md'
import { PaketSoalItemType } from './paket-soal-button'

type SelectedFileProps = { soal: PaketSoalItemType; onRemove?(): void }

export default function SelectedSoal({ soal, onRemove }: SelectedFileProps) {
  return (
    <div
      className="flex justify-between gap-2 rounded-sm border border-gray-50 w-full cursor-auto p-2 sm:w-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex gap-x-2">
        <div className="flex size-11 items-center justify-center rounded-md btn-item-blue shrink-0 mr-2">
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
              <Time date={soal.time} format="datetimeshort" />
            </li>
            <li>
              <GoDotFill size={10} />
            </li>
            <li
              title={
                soal.totalPilihan < soal.pilihanDigunakan
                  ? `Total soal (${soal.totalPilihan}) masih kurang dari jumlah soal digunakan (${soal.pilihanDigunakan})`
                  : ''
              }
            >
              {soal.pilihanDigunakan}/
              <span
                className={cn({
                  'text-danger': soal.totalPilihan < soal.pilihanDigunakan,
                })}
              >
                {soal.totalPilihan}
              </span>{' '}
              pilgan
            </li>
            <li>
              <GoDotFill size={10} />
            </li>
            <li>{soal.totalEsai} esai</li>
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
