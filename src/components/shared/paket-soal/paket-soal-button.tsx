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
  count: number
  total: number
}

export type SoalButtonProps = {
  soal: PaketSoalItemType
  onDetail?: (soal: PaketSoalItemType) => void
  onEdit?: (soal: PaketSoalItemType) => void
  checked?: boolean
  onChange?(): void
}

export default function SoalButton({
  soal,
  onDetail,
  onEdit,
  checked = false,
  onChange,
}: SoalButtonProps) {
  const selectable = soal.total >= soal.count

  return (
    <LabelOrDiv
      label={selectable}
      className="flex items-center border-b border-b-gray-100 select-none transition duration-200 py-3 hover:bg-gray-50/50"
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
      <div className="flex flex-1 justify-between items-center space-x-2">
        <div className="flex space-x-2">
          <div className="flex size-11 items-center justify-center rounded-md btn-item-blue mr-2">
            <BsCardChecklist size={22} />
          </div>
          <div className="flex flex-col">
            <Text
              weight="semibold"
              variant="dark"
              title={soal.name}
              className="truncate"
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
              <li
                title={
                  soal.total < soal.count
                    ? `Total soal (${soal.total}) masih kurang dari jumlah soal digunakan (${soal.count})`
                    : ''
                }
              >
                {soal.count}/
                <span
                  className={cn({ 'text-danger': soal.total < soal.count })}
                >
                  {soal.total}
                </span>{' '}
                soal
              </li>
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
