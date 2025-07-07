import { Text, TimeIndo } from '@/components/ui'
import cn from '@/utils/class-names'

type PresensiItemType = {
  id: string
  judul: string
  waktu?: string
}

type RekapPresensiItemProps = {
  sesi: PresensiItemType
  idx: number
  active?: boolean
  onClick?: () => void
}

export default function RekapPresensiItem({
  sesi,
  idx,
  active = false,
  onClick,
}: RekapPresensiItemProps) {
  return (
    <div
      className={cn(
        'cursor-pointer px-3 py-2 hover:bg-gray-50/50',
        active
          ? 'border-t-[3px] border-t-primary'
          : idx > 0
          ? 'border-t border-t-gray-100'
          : null
      )}
      onClick={onClick}
    >
      <Text
        weight="semibold"
        className={cn(active ? 'text-primary' : 'text-gray-dark')}
      >
        {sesi.judul}
      </Text>
      <Text size="sm" weight="semibold" variant="lighter">
        <TimeIndo date={sesi.waktu} format="datetimeday" empty="-" />
      </Text>
    </div>
  )
}
