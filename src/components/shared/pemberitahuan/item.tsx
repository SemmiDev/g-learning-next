import { Badge, Text, Time } from '@/components/ui'
import cn from '@/utils/class-names'

type PemberitahuanItemProps = {
  judul: string
  deskripsi: string
  waktu: string
  dibaca?: boolean
}

export default function PemberitahuanItem({
  judul,
  deskripsi,
  waktu,
  dibaca,
}: PemberitahuanItemProps) {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  oneWeekAgo.setHours(0, 0, 0, 0)

  const date = new Date(waktu)
  date.setHours(0, 0, 0, 0)

  return (
    <div
      className={cn(
        'flex justify-between items-center gap-x-2 border-b border-muted px-2.5 py-2',
        {
          'bg-gray-50/40': dibaca,
        }
      )}
    >
      <div className="flex flex-col">
        <Text size="sm" weight="semibold" variant="dark">
          {judul}
        </Text>
        <Text size="2xs" weight="medium" variant="lighter">
          {deskripsi}
        </Text>
      </div>
      <div className="flex gap-x-1 items-baseline">
        <Text size="xs" weight="bold" className="leading-3">
          {date < oneWeekAgo ? (
            <Time date={waktu} />
          ) : (
            <Time date={waktu} fromNow />
          )}
        </Text>
        {!dibaca && <Badge color="danger" renderAsDot />}
      </div>
    </div>
  )
}
