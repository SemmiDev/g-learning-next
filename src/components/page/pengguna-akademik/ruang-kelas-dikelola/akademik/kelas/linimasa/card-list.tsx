import { Select, SelectOptionType, Text } from '@/components/ui'
import HeaderCard from './header-card'
import MateriCard from './list-item/materi-card'
import cn from '@/utils/class-names'
import SesiCard from './list-item/sesi-card'

const optionsFilter: SelectOptionType[] = [
  { label: 'Hari Ini', value: 'today' },
  { label: '3 Hari', value: '3days' },
  { label: '1 Minggu', value: 'week' },
  { label: '1 Bulan', value: 'month' },
]

type LinimasaCardListProps = {
  className?: string
}

export default function LinimasaCardList({ className }: LinimasaCardListProps) {
  return (
    <div className={cn('flex flex-col gap-y-6', className)}>
      <HeaderCard />

      <div className="flex items-center gap-x-2">
        <Text weight="semibold" variant="dark">
          Filter
        </Text>
        <Select
          placeholder="Filter"
          options={optionsFilter}
          defaultValue={optionsFilter[0]}
        />
      </div>

      <div className="flex flex-col gap-y-6">
        <MateriCard />
        <SesiCard />
      </div>
    </div>
  )
}
