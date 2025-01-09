import { Card, CardSeparator, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { Progressbar } from 'rizzui'

type RingkasanKelasCardProps = {
  className?: string
}

export default function RingkasanKelasCard({
  className,
}: RingkasanKelasCardProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <Title as="h5" weight="semibold" className="px-2 py-1.5">
        Ringkasan Kelas
      </Title>
      <CardSeparator />
      <div className="flex flex-col gap-y-2 px-2 py-3">
        <ProgressItem
          label="Sesi Pembelajaran"
          value="10/16"
          persen={Math.round((10 / 16) * 100)}
        />
        <ProgressItem label="Kehadiran Peserta" value="50%" persen={50} />
        <ProgressItem label="Kehadiran Pengajar" value="85%" persen={85} />
      </div>
    </Card>
  )
}

function ProgressItem({
  label,
  value,
  persen,
}: {
  label: string
  value: string
  persen: number
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex justify-between gap-x-2">
        <Text size="sm" weight="semibold">
          {label}
        </Text>
        <Text size="sm" weight="semibold">
          {value}
        </Text>
      </div>
      <Progressbar
        variant="solid"
        color="success"
        rounded="none"
        className="gap-0"
        value={persen}
      />
    </div>
  )
}
