import { AbsenItemType } from '@/app/(hydrogen)/peserta/ruang-kelas/kelas/presensi/page'
import { Badge, Card, Text } from '@/components/ui'

type AbsensiCardProps = {
  listAbsen: AbsenItemType[]
}

export default function AbsensiCard({ listAbsen }: AbsensiCardProps) {
  return (
    <Card className="p-0">
      {listAbsen.map((item, idx) => (
        <div
          className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
          key={idx}
        >
          <div className="flex flex-col gap-y-1">
            <Text weight="semibold" variant="dark">
              {item.judul}
            </Text>
            <Text size="sm" weight="semibold" variant="lighter">
              {item.waktu}
            </Text>
          </div>
          <Badge
            size="sm"
            variant="solid"
            rounded="md"
            className={
              item.status === 'Izin'
                ? 'bg-badge-yellow'
                : item.status === 'Sakit'
                ? 'bg-badge-blue'
                : item.status === 'Alpha'
                ? 'bg-badge-red'
                : 'bg-badge-green'
            }
          >
            {item.status}
          </Badge>
        </div>
      ))}
    </Card>
  )
}
