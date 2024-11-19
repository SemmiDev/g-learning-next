import { Card, CardSeparator, Text } from '@/components/ui'
import cn from '@/utils/class-names'
import { zeroPad } from '@/utils/zero-pad'

type SisaWaktuCardProps = {
  sisaWaktu: number | undefined
  className?: string
}

export default function SisaWaktuCard({
  sisaWaktu,
  className,
}: SisaWaktuCardProps) {
  const formatSisaWaktu = (sisaWaktu: number) => {
    const hours = Math.floor(sisaWaktu / 3600)
    const minutes = Math.floor((sisaWaktu % 3600) / 60)
    const seconds = sisaWaktu % 60

    return `${zeroPad(hours)}:${zeroPad(minutes)}:${zeroPad(seconds)}`
  }

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <Text weight="semibold" variant="dark" className="truncate mx-3 my-2">
        Sisa waktu pengerjaan
      </Text>
      <CardSeparator />
      <Text weight="semibold" variant="dark" className="mx-3 my-2">
        {sisaWaktu !== undefined ? formatSisaWaktu(sisaWaktu) : '-'}
      </Text>
    </Card>
  )
}
