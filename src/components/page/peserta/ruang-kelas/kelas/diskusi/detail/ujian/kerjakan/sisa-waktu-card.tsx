import { Card, CardSeparator, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { remainingTimeFormat } from '@/utils/remaining-time-format'

type SisaWaktuCardProps = {
  sisaWaktu: number | undefined
  className?: string
}

export default function SisaWaktuCard({
  sisaWaktu,
  className,
}: SisaWaktuCardProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <Text weight="semibold" variant="dark" className="truncate mx-3 my-2">
        Sisa waktu pengerjaan
      </Text>
      <CardSeparator />
      <Text weight="semibold" variant="dark" className="mx-3 my-2">
        {sisaWaktu !== undefined ? remainingTimeFormat(sisaWaktu) : '-'}
      </Text>
    </Card>
  )
}
