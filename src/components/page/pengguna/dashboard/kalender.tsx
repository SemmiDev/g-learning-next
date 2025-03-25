import { Card, CardSeparator, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import Calendar from 'react-calendar'

type KalenderCardProps = {
  className?: string
}

export default function KalenderCard({ className }: KalenderCardProps) {
  return (
    <Card className={cn('flex flex-col flex-1 min-w-0 p-0', className)}>
      <Title as="h4" weight="semibold" className="p-2">
        Kalender
      </Title>
      <CardSeparator />
      <div className="py-2 px-6">
        <Calendar
          prev2Label={false}
          next2Label={false}
          locale="id-ID"
          className="!w-full !border-0 !bg-transparent !font-inter !text-base"
        />
      </div>
    </Card>
  )
}
