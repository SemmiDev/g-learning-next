import { tableSesiUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/pengajar/table-sesi'
import { Button, Card, Shimmer, Text } from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useSetSearchParams } from '@/hooks/use-set-search-params'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { parseDate } from '@/utils/date'
import { useParams, useSearchParams } from 'next/navigation'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Input } from 'rizzui'
import PengajarRekapUjianDetailSesiSection from './pengajar/rekap-detail-sesi-section'
import PengajarRekapUjianItem from './pengajar/rekap-item'

type SortDataType = {
  title: string
  sort: {
    name: string
    order: 'asc' | 'desc'
  }
}

const sortData: SortDataType[] = [
  {
    title: 'Terbaru',
    sort: {
      name: 'created_at',
      order: 'desc',
    },
  },
  {
    title: 'Terlawas',
    sort: {
      name: 'created_at',
      order: 'asc',
    },
  },
]

export default function PengajarUjianBody() {
  const searchParams = useSearchParams()
  const setSearchParams = useSetSearchParams()

  const idSesiAktif = searchParams.get('sesi')
  const { kelas: idKelas }: { kelas: string } = useParams()

  const {
    data,
    isLoading,
    isFetching,
    page,
    perPage,
    onPageChange,
    totalData,
    sort,
    onSort,
    search,
    onSearch,
  } = useTableAsync({
    queryKey: ['pengguna.ruang-kelas.ujian.list-sesi', 'pengajar', idKelas],
    action: tableSesiUjianAction,
    initialSort: sortData[0].sort,
    actionParams: { idKelas },
  })

  const sorting = sortData.find(
    (item) => item.sort.name === sort?.name && item.sort.order === sort?.order
  )

  if (isLoading) return <ShimmerOuterCard className="mt-8" />

  return (
    <div className="flex flex-wrap gap-4 mt-8 lg:flex-nowrap">
      <div className="w-full lg:w-5/12">
        <div className="flex justify-between">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Sesi Ujian"
            clearable
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onClear={() => onSearch('')}
          />
          <Dropdown>
            <Dropdown.Trigger>
              <Button as="span" size="sm" variant="outline">
                {sorting && (
                  <>
                    {sorting?.title} <BsChevronDown className="ml-2 w-5" />
                  </>
                )}
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              {sortData.map((item) => (
                <Dropdown.Item
                  key={item.title}
                  className="justify-between"
                  onClick={() => onSort(item.sort.name, item.sort.order)}
                >
                  <Text size="sm" className="text-left">
                    {item.title}
                  </Text>{' '}
                  {sort?.name === item.sort.name &&
                    sort?.order === item.sort.order && <BsCheck size={18} />}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <Card className="p-0 mt-2">
          {/* TODO: hapus filter jika API sudah ada */}
          {data
            .filter((item) => item.aktifitas.tipe === 'Ujian')
            .map((item, idx) => {
              const waktuMulai = parseDate(item.aktifitas.waktu_mulai_ujian)
              const waktuSelesai = parseDate(item.aktifitas.waktu_selesai_ujian)

              return (
                <PengajarRekapUjianItem
                  key={item.aktifitas.id}
                  idx={idx}
                  /* TODO: penyesuaian data sesuai API jika sudah ada */
                  sesi={{
                    id: item.aktifitas.id,
                    judul: item.aktifitas.judul,
                    waktuMulai: item.aktifitas.waktu_mulai_ujian,
                    waktuSelesai: item.aktifitas.waktu_selesai_ujian,
                  }}
                  active={item.aktifitas.id === idSesiAktif}
                  open={
                    !!waktuMulai &&
                    !!waktuSelesai &&
                    waktuMulai <= new Date() &&
                    waktuSelesai >= new Date()
                  }
                  onClick={() => setSearchParams({ sesi: item.aktifitas.id })}
                />
              )
            })}
        </Card>

        <TablePagination
          isLoading={isFetching}
          current={page}
          pageSize={perPage}
          total={totalData}
          onChange={(page) => onPageChange(page)}
        />
      </div>

      <PengajarRekapUjianDetailSesiSection className="w-full lg:w-7/12" />
    </div>
  )
}

function ShimmerOuterCard({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-4 lg:flex-nowrap', className)}>
      <div className="w-full lg:w-5/12">
        <div className="flex justify-between space-x-2">
          <Shimmer className="h-7 w-5/12" />
          <Shimmer className="h-7 w-2/12" />
        </div>
        <ShimmerCard className="mt-2" />
      </div>
    </div>
  )
}

function ShimmerCard({
  count = 5,
  className,
}: {
  count?: number
  className?: string
}) {
  return (
    <Card className={cn('p-0', className)}>
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
        >
          <div className="flex flex-col space-y-2.5 flex-1 py-1.5">
            <div className="flex justify-between space-x-2">
              <Shimmer className="h-3 w-1/3" />
              <Shimmer className="h-6 w-10 rounded-full" />
            </div>
            <div className="flex flex-col space-y-2">
              <Shimmer className="h-2.5 w-1/3" />
              <Shimmer className="h-2.5 w-7/12" />
              <Shimmer className="h-2.5 w-8/12" />
            </div>
          </div>
        </div>
      ))}
    </Card>
  )
}
