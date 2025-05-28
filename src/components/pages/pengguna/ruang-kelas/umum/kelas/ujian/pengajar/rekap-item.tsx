import { Badge, Text, TimeIndo } from '@/components/ui'
import cn from '@/utils/class-names'

type UjianItemType = {
  id: string
  judul: string
  waktuMulai?: string | null
  waktuSelesai?: string | null
}

type UjianItemProps = {
  sesi: UjianItemType
  idx: number
  active?: boolean
  open?: boolean
  onClick?: () => void
}

export default function PengajarRekapUjianItem({
  sesi,
  idx,
  active = false,
  open = false,
  onClick,
}: UjianItemProps) {
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
      <div className="flex justify-between items-center flex-wrap gap-1">
        <Text
          weight="semibold"
          color={active ? 'primary' : 'gray'}
          variant={active ? 'default' : 'dark'}
        >
          {sesi.judul || '-'}
        </Text>
        <Badge size="sm" color={open ? 'success' : 'danger'} variant="flat">
          {open ? 'Masih Buka' : 'Sudah Tutup'}
        </Badge>
      </div>
      <Text size="sm" weight="semibold" variant="lighter" className="mt-2">
        Jadwal pengerjaan
      </Text>
      <Text size="sm" weight="semibold" variant="dark">
        Mulai: <TimeIndo date={sesi.waktuMulai} format="datetime" empty="-" />
      </Text>
      <Text size="sm" weight="semibold" variant="dark">
        Sampai:{' '}
        <TimeIndo date={sesi.waktuSelesai} format="datetime" empty="-" />
      </Text>
    </div>
  )
}
