import {
  Card,
  Input,
  Select,
  SelectOptionType,
  Shimmer,
  Title,
} from '@/components/ui'
import { useDebounceSearch } from '@/hooks/use-debounce-search'
import cn from '@/utils/class-names'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import SesiCard from './sesi-card'

const rentangWaktuOptions: SelectOptionType<string | null>[] = [
  {
    value: null,
    label: 'Hari Ini',
  },
]

type LinimasaSectionProps = {
  className?: string
}

export default function LinimasaSesiSection({
  className,
}: LinimasaSectionProps) {
  const { inputSearch, setInputSearch, search } = useDebounceSearch('')

  const [rentangWaktu, setRentangWaktu] = useState<SelectOptionType<
    string | null
  > | null>(rentangWaktuOptions[0])

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  if (isLoading) return <ShimmerSection className={className} />

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="h-10 mb-4">
        <Title as="h4" size="1.5xl" weight="semibold" className="leading-tight">
          Kelas Akademik
        </Title>
      </div>
      <Title as="h5" weight="semibold" className="mb-2">
        Linimasa Sesi
      </Title>
      <div className="flex justify-between gap-2 flex-wrap">
        <Input
          placeholder="Cari Sesi Belajar"
          className="min-w-56 flex-1 xs:flex-none"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          clearable
          onClear={() => setInputSearch('')}
        />
        <Select
          placeholder="Rentang Waktu"
          options={rentangWaktuOptions}
          onChange={(item) => setRentangWaktu(item)}
          value={rentangWaktu}
          className="min-w-28 flex-1 xs:flex-none"
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

function ShimmerSection({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="h-10 mb-4">
        <Title as="h4" size="1.5xl" weight="semibold" className="leading-tight">
          Kelas Akademik
        </Title>
      </div>
      <Title as="h5" weight="semibold" className="mb-2">
        Linimasa Sesi
      </Title>
      <div className="flex justify-between gap-2 flex-wrap">
        <Shimmer className="h-10 min-w-56 flex-1 xs:flex-none" />
        <Shimmer className="h-10 min-w-28 flex-1 xs:flex-none" />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {[...Array(5)].map((_, idx) => (
          <Card key={idx} className={cn('flex flex-col p-0', className)}>
            <div className="flex justify-between items-center gap-x-2 gap-y-1 flex-wrap pt-2 px-2">
              <Shimmer className="h-5 w-28 my-0.5" />
              <Shimmer rounded="full" className="h-5 w-28" />
            </div>
            <div className="overflow-x-scroll no-scrollbar m-2">
              <div className="flex gap-x-3 gap-y-1.5 min-w-0 w-fit">
                <Shimmer className="h-4 w-32 my-0.5" />
                <Shimmer className="h-4 w-16 my-0.5" />
                <Shimmer className="h-4 w-16 my-0.5" />
                <Shimmer className="h-4 w-24 my-0.5" />
                <Shimmer className="h-4 w-16 my-0.5" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
