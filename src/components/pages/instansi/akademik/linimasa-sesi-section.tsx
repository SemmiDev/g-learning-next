import { Input, Title } from '@/components/ui'
import { useDebounceSearch } from '@/hooks/use-debounce-search'
import cn from '@/utils/class-names'
import { PiMagnifyingGlass } from 'react-icons/pi'
import SesiCard from './sesi-card'

type LinimasaSectionProps = {
  className?: string
}

export default function LinimasaSesiSection({
  className,
}: LinimasaSectionProps) {
  const { inputSearch, setInputSearch, search } = useDebounceSearch('')

  return (
    <div className={cn('flex flex-col', className)}>
      <Title as="h5" weight="semibold">
        Linimasa Sesi
      </Title>
      <div className="flex justify-between gap-2 flex-wrap mt-2">
        <Input
          placeholder="Cari Kelas"
          className="min-w-56"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          clearable
          onClear={() => setInputSearch('')}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {[...Array(5)].map((_, idx) => (
          <SesiCard key={idx} />
        ))}
      </div>
    </div>
  )
}
