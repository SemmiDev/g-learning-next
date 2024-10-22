import { Text } from '@/components/ui'
import cn from '@/utils/class-names'

type PengajarRekapPresensiItemProps = {
  active?: boolean
}

export default function PengajarRekapPresensiItem({
  active = false,
}: PengajarRekapPresensiItemProps) {
  return (
    <div
      className={cn(
        'cursor-pointer px-3 py-2 hover:bg-gray-50',
        active
          ? 'border-t-[3px] border-t-primary'
          : 'border-t border-t-gray-100'
      )}
    >
      <Text
        weight="semibold"
        className={cn(active ? 'text-primary' : 'text-gray-dark')}
      >
        Judul sesi absensi
      </Text>
      <Text size="sm" weight="semibold" variant="lighter">
        Kamis, 29 februari 2024, 23:59 WIB
      </Text>
    </div>
  )
}
