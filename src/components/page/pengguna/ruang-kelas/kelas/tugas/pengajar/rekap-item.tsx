import { Badge, Text, TimeIndo } from '@/components/ui'
import cn from '@/utils/class-names'

type TugasItemType = {
  id: string
  judul: string
  batasWaktu?: string | null
  jumlah: number
}

type PengajarRekapTugasItemProps = {
  sesi: TugasItemType
  active?: boolean
  open?: boolean
  onClick?: () => void
}

export default function PengajarRekapTugasItem({
  sesi,
  active = false,
  open = false,
  onClick,
}: PengajarRekapTugasItemProps) {
  return (
    <div
      className={cn(
        'cursor-pointer px-3 py-2 hover:bg-gray-50',
        active
          ? 'border-t-[3px] border-t-primary'
          : 'border-t border-t-gray-100'
      )}
      onClick={onClick}
    >
      <div className="flex justify-between">
        <Text
          weight="semibold"
          color={active ? 'primary' : 'gray'}
          variant={active ? 'default' : 'dark'}
        >
          {sesi.judul}
        </Text>
        <Badge size="sm" color={open ? 'success' : 'danger'} variant="flat">
          {open ? 'Open' : 'Closed'}
        </Badge>
      </div>
      <Text size="sm" weight="semibold" variant="lighter" className="mt-2">
        Batas waktu pengumpulan
      </Text>
      <div className="flex justify-between">
        <Text size="sm" weight="semibold" variant="dark">
          <TimeIndo date={sesi.batasWaktu} format="datetime" empty="-" />
        </Text>
        <Text size="xs" weight="medium" variant="lighter">
          {sesi.jumlah} peserta mengumpulkan Tugas
        </Text>
      </div>
    </div>
  )
}
