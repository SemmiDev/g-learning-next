import { Card, Input, Select, SelectOptionType, Title } from '@/components/ui'
import { useDebounceSearch } from '@/hooks/use-debounce-search'
import cn from '@/utils/class-names'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import KelasCard from './kelas-card'

const jurusanOptions: SelectOptionType<string>[] = [
  {
    value: 'A',
    label: 'Jurusan A',
  },
  {
    value: 'B',
    label: 'Jurusan B',
  },
  {
    value: 'C',
    label: 'Jurusan C',
  },
]

type DaftarKelasCardProps = {
  className?: string
}

export default function DaftarKelasCard({ className }: DaftarKelasCardProps) {
  const { inputSearch, setInputSearch, search } = useDebounceSearch('')

  const [jurusan, setJurusan] = useState<SelectOptionType<string> | null>(null)

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <Title as="h5" weight="semibold" className="px-2 py-1.5">
        Daftar Kelas
      </Title>
      <div className="flex justify-between gap-2 flex-wrap p-2">
        <Input
          placeholder="Cari Kelas"
          className="min-w-56 flex-1 xs:flex-none"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          clearable
          onClear={() => setInputSearch('')}
        />
        <Select
          placeholder="Pilih Jurusan"
          options={jurusanOptions}
          onChange={(item) => setJurusan(item)}
          value={jurusan}
          className="min-w-48 flex-1 xs:flex-none"
          isClearable
        />
      </div>
      <div className="grid grid-cols-1 gap-5 flex-1 p-2 lg:grid-cols-2 xl:grid-cols-2">
        {[...Array(10)].map((_, idx) => (
          <KelasCard key={idx} />
        ))}
      </div>
    </Card>
  )
}
