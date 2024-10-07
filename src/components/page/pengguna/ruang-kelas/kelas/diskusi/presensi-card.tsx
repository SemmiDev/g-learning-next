import { Card, CardSeparator, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'

export default function PresensiCard({ className }: { className?: string }) {
  /* TODO: Tampilkan Data Presensi dari API */

  return (
    <>
      <Card className={cn('p-0', className)}>
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Presensi
        </Title>
        <CardSeparator />
        <div className="flex justify-between gap-5 px-2 py-3">
          <PresensiItem status="Hadir" jumlah={28} />
          <PresensiItem status="Sakit" jumlah={1} />
          <PresensiItem status="Izin" jumlah={0} />
          <PresensiItem status="Alpha" jumlah={1} />
        </div>
        <div className="flex justify-between px-2 pb-2">
          <Text size="sm" weight="medium" variant="lighter">
            Total keseluruhan presensi: <b>30</b>
          </Text>
          <Text size="sm" weight="medium" variant="lighter">
            Tingkat kehadiran: <span className="text-success">98%</span>
          </Text>
        </div>
      </Card>
    </>
  )
}

type PresensiItemProps = {
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alpha'
  jumlah: number
}
function PresensiItem({ status, jumlah }: PresensiItemProps) {
  let bgColor
  switch (status) {
    case 'Hadir':
      bgColor = 'bg-slight-green'
      break
    case 'Sakit':
      bgColor = 'bg-slight-blue'
      break
    case 'Izin':
      bgColor = 'bg-slight-yellow'
      break
    case 'Alpha':
      bgColor = 'bg-slight-red'
      break
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center rounded-md min-w-20 p-2',
        bgColor
      )}
    >
      <Text size="1.5xl" weight="semibold" variant="dark">
        {jumlah}
      </Text>
      <Text size="sm" weight="medium" variant="lighter">
        {status}
      </Text>
    </div>
  )
}
