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
import { deskripsiSemester } from '@/utils/semester'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import KelasCard from './kelas-card'

const currentYear = new Date().getFullYear()

const semesterOptions: SelectOptionType<string | null>[] = [
  {
    value: null,
    label: 'Semester Aktif',
  },
  ...[...Array(10)].map((_, idx) => {
    const semester = `${currentYear - Math.floor(idx / 2)}${
      (idx % 2) % 2 == 0 ? 2 : 1
    }`

    return {
      value: semester,
      label: deskripsiSemester(semester),
    }
  }),
]

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

export default function DaftarKelasSection({
  className,
}: DaftarKelasCardProps) {
  const { inputSearch, setInputSearch, search } = useDebounceSearch('')

  const [semester, setSemester] = useState<SelectOptionType<string | null>>(
    semesterOptions[0]
  )
  const [jurusan, setJurusan] = useState<SelectOptionType<string> | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }, [])

  if (isLoading) return <ShimmerSection className={className} />

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex justify-end mb-4">
        <Select
          placeholder="Semester Aktif"
          options={semesterOptions}
          onChange={(item) => {
            if (item) setSemester(item)
          }}
          value={semester}
          className="min-w-48 flex-1 xs:flex-none"
        />
      </div>

      <Card className="flex flex-col p-0">
        <Title as="h5" weight="semibold" className="px-2 py-1.5">
          Daftar Kelas
        </Title>
        <div className="flex justify-between gap-2 flex-wrap p-2">
          <Input
            placeholder="Cari Kelas"
            className="min-w-56 flex-1 xs:flex-none"
            inputClassName="bg-white"
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
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
    </div>
  )
}

function ShimmerSection({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <div className="flex justify-end mb-4">
        <Shimmer className="h-10 w-48" />
      </div>

      <Card className="flex flex-col p-0">
        <div className="px-2 py-2">
          <Shimmer className="h-6 w-28" />
        </div>
        <div className="flex justify-between gap-2 flex-wrap p-2">
          <Shimmer className="h-10 min-w-56 flex-1 xs:flex-none" />
          <Shimmer className="h-10 min-w-48 flex-1 xs:flex-none" />
        </div>
        <div className="grid grid-cols-1 gap-5 flex-1 p-2 lg:grid-cols-2 xl:grid-cols-2">
          {[...Array(4)].map((_, idx) => (
            <Card key={idx} className="h-fit">
              <Shimmer className="h-32" />
              <div className="flex justify-between items-start mt-2">
                <div className="flex flex-col flex-1 gap-y-2.5 py-1">
                  <Shimmer className="h-4 w-6/12" />
                  <Shimmer className="h-2.5 w-4/12" />
                  <Shimmer className="h-2.5 w-7/12" />
                  <Shimmer className="h-2.5 w-7/12" />
                </div>
              </div>
              <div className="flex mt-2">
                <table className="border-collapse border border-gray-100 w-full">
                  <tbody>
                    <tr>
                      <td className="border border-gray-100">
                        <div className="flex flex-col gap-y-2 px-1 py-2.5">
                          <Shimmer className="h-2 w-1/2" />
                          <Shimmer className="h-2 w-10/12" />
                        </div>
                      </td>
                      <td className="border border-gray-100">
                        <div className="flex flex-col gap-y-2 px-1 py-2.5">
                          <Shimmer className="h-2 w-1/2" />
                          <Shimmer className="h-2 w-10/12" />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex flex-col gap-y-1 mt-2">
                  <div className="flex justify-between gap-x-2 py-1 mt-0.5">
                    <Shimmer className="h-2.5 w-4/12" />
                    <Shimmer className="h-2 w-1/12" />
                  </div>
                  <Shimmer rounded="none" className="h-2 w-full" />
                </div>
              ))}
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
}
