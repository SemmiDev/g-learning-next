import { tableSesiUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/pengajar/table-sesi'
import { Button, Card, Loader, Shimmer, Text } from '@/components/ui'
import { useInfiniteListAsync } from '@/hooks/use-infinite-list-async'
import { useSetSearchParams } from '@/hooks/use-set-search-params'
import cn from '@/utils/class-names'
import { parseDate } from '@/utils/date'
import { useParams, useSearchParams } from 'next/navigation'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
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
    sort,
    onSort,
    search,
    onSearch,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteListAsync({
    queryKey: ['pengguna.ruang-kelas.ujian.list-sesi', 'pengajar', idKelas],
    action: tableSesiUjianAction,
    initialSort: sortData[0].sort,
    actionParams: { idKelas },
  })

  const sorting = sortData.find(
    (item) => item.sort.name === sort?.name && item.sort.order === sort?.order
  )

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

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

        <Card className="relative p-0 mt-2">
          {isFetching && (
            <div className="flex justify-center items-center absolute m-auto left-0 right-0 top-0 bottom-0 bg-black/10 rounded-md">
              <div className="size-10 rounded-full bg-transparent">
                <CgSpinner className="size-10 animate-spin text-primary" />
              </div>
            </div>
          )}
          <div className="lg:max-h-[58rem] lg:overflow-y-auto">
            {data.length > 0 ? (
              data.map((item, idx) => {
                const waktuMulai = parseDate(item.waktu_mulai_ujian)
                const waktuSelesai = parseDate(item.waktu_selesai_ujian)

                return (
                  <PengajarRekapUjianItem
                    key={item.id}
                    idx={idx}
                    sesi={{
                      id: item.id,
                      judul: item.judul,
                      waktuMulai: item.waktu_mulai_ujian,
                      waktuSelesai: item.waktu_selesai_ujian,
                    }}
                    active={item.id === idSesiAktif}
                    open={
                      !!waktuMulai &&
                      !!waktuSelesai &&
                      waktuMulai <= new Date() &&
                      waktuSelesai >= new Date()
                    }
                    onClick={() => setSearchParams({ sesi: item.id })}
                  />
                )
              })
            ) : (
              <div className="flex items-center justify-center h-40">
                <Text size="sm" weight="medium">
                  {search
                    ? 'Sesi ujian tidak ditemukan'
                    : 'Belum ada sesi ujian'}
                </Text>
              </div>
            )}
          </div>

          {!isLoading && hasNextPage && (
            <Loader ref={refSentry} className="py-4" />
          )}
        </Card>
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
