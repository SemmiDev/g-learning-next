import { UjianItemType } from '@/app/(hydrogen)/peserta/ruang-kelas/kelas/ujian/page'
import { Button, Card, Text } from '@/components/ui'
import { Badge } from 'rizzui'

type UjianCardProps = {
  listUjian: UjianItemType[]
}

export default function UjianCard({ listUjian }: UjianCardProps) {
  return (
    <Card className="p-0">
      {listUjian.map((item, idx) => (
        <div
          className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
          key={idx}
        >
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              {item.judul}
            </Text>
            <Text size="sm" variant="lighter" className="mb-1">
              {item.keterangan}
            </Text>
            <Text size="sm" weight="semibold" variant="lighter">
              Batas waktu pengumpulan
            </Text>
            <Text size="sm" weight="semibold" variant="dark">
              {item.batasWaktu}
            </Text>
          </div>
          {item.status === 'Belum' ? (
            <Button size="sm">Kerjakan Ujian</Button>
          ) : (
            <Badge
              variant="solid"
              rounded="md"
              className={
                item.status === 'Sudah' ? 'bg-badge-green' : 'bg-badge-yellow'
              }
            >
              {item.status === 'Sudah' ? 'Cek Hasil Ujian' : 'Ulangi Ujian'}
            </Badge>
          )}
        </div>
      ))}
    </Card>
  )
}
