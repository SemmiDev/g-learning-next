import { tableSesiTugasAction } from '@/actions/pengguna/ruang-kelas/tugas/pengajar/table-sesi-tugas'
import { Button, Card, Shimmer, Text, Title } from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useSetSearchParams } from '@/hooks/use-set-search-params'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { parseDate } from '@/utils/date'
import { useParams, useSearchParams } from 'next/navigation'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Input } from 'rizzui'
import PengajarRekapTugasDetailSesiSection from './rekap-detail-sesi-section'
import RekapTugasItem from './rekap-item'

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

type PengajarRekapTugasCardProps = {
  className?: string
}

export default function PengajarRekapTugasCard({
  className,
}: PengajarRekapTugasCardProps) {
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
    queryKey: ['pengguna.ruang-kelas.tugas.list-sesi', 'pengajar', idKelas],
    action: tableSesiTugasAction,
    initialSort: sortData[0].sort,
    actionParams: { idKelas },
  })

  const sorting = sortData.find(
    (item) => item.sort.name === sort?.name && item.sort.order === sort?.order
  )

  if (isLoading) return <ShimmerOuterCard className={className} />

  return (
    <Card className="col-span-3">
      <Title as="h4" size="1.5xl" weight="semibold">
        Rekap Tugas Peserta
      </Title>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between">
            <Input
              size="sm"
              type="search"
              placeholder="Cari sesi tugas"
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

          {isFetching ? (
            <ShimmerCard count={3} className="mt-2" />
          ) : (
            <Card className="p-0 mt-2">
              {data.length > 0 ? (
                data.map((item, idx) => {
                  const batasWaktu = parseDate(item.batas_waktu)

                  return (
                    <RekapTugasItem
                      key={item.id}
                      idx={idx}
                      sesi={{
                        id: item.id,
                        judul: item.judul,
                        batasWaktu: item.batas_waktu,
                        jumlah: item.total_pengumpulan_tugas,
                      }}
                      active={idSesiAktif === item.id}
                      open={!batasWaktu || batasWaktu >= new Date()}
                      onClick={() => setSearchParams({ sesi: item.id })}
                    />
                  )
                })
              ) : (
                <div className="flex items-center justify-center h-40">
                  <Text size="sm" weight="medium">
                    {search ? 'Sesi tidak ditemukan' : 'Belum ada sesi'}
                  </Text>
                </div>
              )}
            </Card>
          )}

          <TablePagination
            isLoading={isFetching}
            current={page}
            pageSize={perPage}
            total={totalData}
            onChange={(page) => onPageChange(page)}
          />
        </div>

        <PengajarRekapTugasDetailSesiSection className="w-full lg:w-7/12" />
      </div>
    </Card>
  )
}

function ShimmerOuterCard({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <div className="pt-1.5">
        <Shimmer className="h-7 w-1/4" />
      </div>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between space-x-2 mb-4">
            <Shimmer className="h-7 w-5/12" />
            <Shimmer className="h-7 w-2/12" />
          </div>
          <ShimmerCard />
        </div>
      </div>
    </Card>
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
          <div className="flex flex-col space-y-3.5 flex-1 py-1.5">
            <div className="flex justify-between space-x-2">
              <Shimmer className="h-3 w-1/3" />
              <Shimmer className="h-6 w-10 rounded-full" />
            </div>
            <div className="flex justify-between items-center space-x-2">
              <div className="flex flex-col space-y-2 w-5/12">
                <Shimmer className="h-2.5 w-11/12" />
                <Shimmer className="h-2.5 w-full" />
              </div>
              <Shimmer className="h-2.5 w-5/12" />
            </div>
          </div>
        </div>
      ))}
    </Card>
  )
}
