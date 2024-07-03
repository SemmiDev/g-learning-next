import { TugasItemType } from '@/app/(hydrogen)/peserta/ruang-kelas/kelas/tugas/page'
import { Button, Card, Text } from '@/components/ui'
import { Badge } from 'rizzui'

type TugasCardProps = {
  listTugas: TugasItemType[]
}

export default function TugasCard({ listTugas }: TugasCardProps) {
  return (
    <Card className="p-0">
      {listTugas.map((item, idx) => (
        <div
          className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
          key={idx}
        >
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              {item.judul}
            </Text>
            <Text variant="lighter">{item.keterangan}</Text>
            <Text size="sm" weight="semibold" variant="lighter">
              Batas waktu pengumpulan
            </Text>
            <Text size="sm" weight="semibold" variant="dark">
              {item.batasWaktu}
            </Text>
          </div>
          {item.status === 'Belum' ? (
            <Button size="sm">Kumpulkan Tugas</Button>
          ) : (
            <Badge
              variant="solid"
              rounded="md"
              className={
                item.status === 'Sudah' ? 'bg-badge-green' : 'bg-badge-red'
              }
            >
              {item.status === 'Sudah'
                ? 'Sudah Mengumpulkan'
                : 'Tidak Mengumpulkan'}
            </Badge>
          )}
        </div>
      ))}
    </Card>
  )
}
