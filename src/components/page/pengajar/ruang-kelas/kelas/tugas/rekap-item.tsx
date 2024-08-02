import { Badge, Text } from '@/components/ui'
import cn from '@/utils/class-names'

export default function RekapTugasItem({
  active = false,
  open = false,
}: {
  active?: boolean
  open?: boolean
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
      <div className="flex justify-between">
        <Text
          weight="semibold"
          color={active ? 'primary' : 'gray'}
          variant={active ? 'default' : 'dark'}
        >
          Judul Tugas
        </Text>
        <Badge size="sm" color={open ? 'success' : 'danger'} variant="flat">
          {open ? 'Open' : 'Closed'}
        </Badge>
      </div>
      <Text size="sm" variant="lighter">
        Keterangan singkat terkait tugasnya
      </Text>
      <Text size="sm" weight="semibold" variant="lighter" className="mt-2">
        Batas waktu pengumpulan
      </Text>
      <div className="flex justify-between">
        <Text size="sm" weight="semibold" variant="dark">
          29 februari 2024, 23:59 WIB
        </Text>
        <Text size="xs" weight="medium" variant="lighter">
          2 peserta mengumpulkan Tugas
        </Text>
      </div>
    </div>
  )
}
