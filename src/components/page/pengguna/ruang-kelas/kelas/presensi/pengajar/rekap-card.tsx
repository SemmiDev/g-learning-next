import { tableSesiAbsensiAction } from '@/actions/pengguna/ruang-kelas/presensi/pengajar/table-sesi-absensi'
import { Button, Card, Input, Shimmer, Text, Title } from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useSetSearchParams } from '@/hooks/use-set-search-params'
import { useTableAsync } from '@/hooks/use-table-async'
import { mustBe } from '@/utils/must-be'
import { useParams, useSearchParams } from 'next/navigation'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'
import PengajarRekapPresensiDetailSesiSection from './rekap-detail-sesi-section'
import PengajarRekapPresensiItem from './rekap-item'
import cn from '@/utils/class-names'

const sortData = {
  terbaru: 'Terbaru',
  terlawas: 'Terlawas',
}

type SortDataType = keyof typeof sortData

type PengajarRekapPresensiCardProps = {
  className?: string
}

export default function PengajarRekapPresensiCard({
  className,
}: PengajarRekapPresensiCardProps) {
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
    queryKey: [
      'pengguna.ruang-kelas.presensi.list-sesi-absensi',
      'pengajar',
      idKelas,
    ],
    action: tableSesiAbsensiAction,
    /* TODO: initial sorting jika API sudah fix */
    initialSort: {},
    actionParams: { idKelas },
  })

  if (isLoading) return <ShimmerOuterCard className={className} />

  return (
    <Card className={className}>
      <Title as="h4" size="1.5xl" weight="semibold">
        Rekap Presensi Peserta
      </Title>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between">
            <Input
              size="sm"
              type="search"
              placeholder="Cari sesi belajar"
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
                  {
                    sortData[
                      mustBe(
                        sort?.name,
                        ['terbaru', 'terlawas'] as const,
                        'terbaru'
                      )
                    ]
                  }{' '}
                  <BsChevronDown className="ml-2 w-5" />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                {Object.keys(sortData).map((key) => (
                  <Dropdown.Item
                    key={key}
                    className="justify-between"
                    /* TODO: aksi sorting jika API sudah fix */
                    onClick={() => {}}
                  >
                    <Text size="sm">{sortData[key as SortDataType]}</Text>{' '}
                    {(sort?.name ?? 'terbaru') === key && <BsCheck size={18} />}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {isFetching ? (
            <ShimmerCard count={3} className="mt-2" />
          ) : (
            <Card className="p-0 mt-2">
              {data.map((item) => {
                return (
                  <PengajarRekapPresensiItem
                    key={item.id}
                    sesi={{
                      id: item.id,
                      judul: item.judul,
                      waktu: item.created_at,
                    }}
                    active={idSesiAktif === item.id}
                    onClick={() => setSearchParams('sesi', item.id)}
                  />
                )
              })}
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
        {idSesiAktif && (
          <PengajarRekapPresensiDetailSesiSection className="w-full lg:w-7/12" />
        )}
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
            <Shimmer className="h-3 w-1/3" />
            <Shimmer className="h-2.5 w-1/2" />
          </div>
        </div>
      ))}
    </Card>
  )
}
