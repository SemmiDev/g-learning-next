import { Card, CardSeparator, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { useState } from 'react'
import RiwayatItem from './riwayat-item'

type RiwayatCardProps = {
  className?: string
}

export default function RiwayatCard({ className }: RiwayatCardProps) {
  const [activeIdx, setActiveIdx] = useState<number>()

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <Title as="h5" weight="semibold" className="px-2 py-1.5">
        Riwayat Obrolan
      </Title>
      <CardSeparator />
      <div className="flex flex-col">
        {[...Array(3)].map((_, idx) => (
          <RiwayatItem
            key={idx}
            active={activeIdx === idx}
            onClick={() => setActiveIdx(idx)}
          />
        ))}
      </div>
    </Card>
  )
}
