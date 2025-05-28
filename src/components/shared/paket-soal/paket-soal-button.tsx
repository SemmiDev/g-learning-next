import { ActionIconTooltip, LabelOrDiv, Text, Time } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsCardChecklist, BsPencil } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
import { LuEye } from 'react-icons/lu'
import { Radio } from 'rizzui'

export type PaketSoalItemType = {
  id: string
  name: string
  desc: string
  time: string
  pilihanDigunakan: number
  totalPilihan: number
  totalEsai: number
}

export type SoalButtonProps = {
  soal: PaketSoalItemType
  onDetail?: (soal: PaketSoalItemType) => void
  onEdit?: (soal: PaketSoalItemType) => void
  checked?: boolean
  onChange?(): void
  onDoubleClick?(): void
}

export default function SoalButton({
  soal,
  onDetail,
  onEdit,
  checked = false,
  onChange,
  onDoubleClick,
}: SoalButtonProps) {
  const selectable = soal.totalPilihan >= soal.pilihanDigunakan

  return (
    <LabelOrDiv
      label={selectable}
      className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50"
      onDoubleClick={() => onDoubleClick && onDoubleClick()}
    >
      {selectable ? (
        <Radio
          name="paket_soal_radio"
          value={soal.id}
          size="sm"
          className="px-4"
          checked={checked}
          onChange={() => onChange && onChange()}
        />
      ) : (
        <div className="w-[3.25rem]"></div>
      )}
      <div className="flex flex-1 justify-between items-center gap-x-2 min-w-0">
        <div className="flex items-center gap-x-2 min-w-0">
          <div className="flex size-9 items-center justify-center rounded-md btn-item-blue shrink-0 mr-1 xs:size-11">
            <BsCardChecklist className="size-4 xs:size-5" />
          </div>
          <div className="flex flex-col min-w-0">
            <Text
              weight="semibold"
              variant="dark"
              title={soal.name}
              className="line-clamp-2"
            >
              {soal.name}
            </Text>
            <ul className="flex flex-wrap items-center gap-x-1 text-sm text-gray-lighter">
              <li className="truncate">
                <Time date={soal.time} format="datetime" />
              </li>
              <li>
                <GoDotFill size={10} />
              </li>
              <li
                title={
                  soal.totalPilihan < soal.pilihanDigunakan
                    ? `Total soal pilihan ganda (${soal.totalPilihan}) masih kurang dari jumlah soal pilihan ganda digunakan (${soal.pilihanDigunakan})`
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
              <li className="truncate">{soal.totalEsai} esai</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 shrink-0 pr-4 xs:grid-cols-2">
          <ActionIconTooltip
            tooltip="Lihat"
            size="sm"
            variant="outline-hover-colorful"
            color="info"
            onClick={(e) => {
              e.stopPropagation()
              onDetail && onDetail(soal)
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
              onEdit && onEdit(soal)
            }}
          >
            <BsPencil />
          </ActionIconTooltip>
        </div>
      </div>
    </LabelOrDiv>
  )
}
