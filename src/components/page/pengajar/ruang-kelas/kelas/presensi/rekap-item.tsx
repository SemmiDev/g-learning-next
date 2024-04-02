import cn from '@/utils/class-names'
import { Text } from 'rizzui'

export default function RekapPresensiItem({
  active = false,
}: {
  active?: boolean
}) {
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
        className={cn(
          'text-base font-semibold',
          active ? 'text-primary' : 'text-gray-dark'
        )}
      >
        Judul sesi absensi
      </Text>
      <Text className="text-sm font-semibold text-gray-lighter">
        Kamis, 29 februari 2024, 23:59 WIB
      </Text>
    </div>
  )
}
