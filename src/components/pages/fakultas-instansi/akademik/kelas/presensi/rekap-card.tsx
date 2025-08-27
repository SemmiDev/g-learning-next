import {
  Button,
  Card,
  ContentLoader,
  Input,
  Shimmer,
  Text,
  Title,
} from '@/components/ui'
import { useInfiniteListAsync } from '@/hooks/use-infinite-list-async'
import { tableSesiAbsensiApi } from '@/services/api/fakultas-instansi/akademik/kelas/presensi/table-sesi-absensi'
import cn from '@/utils/class-names'
import { useParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Dropdown } from 'rizzui'
import RekapPresensiDetailSesiSection from './rekap-detail-sesi-section'
import RekapPresensiItem from './rekap-item'

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
      name: 'pertemuan',
      order: 'desc',
    },
  },
  {
    title: 'Terlawas',
    sort: {
      name: 'pertemuan',
      order: 'asc',
    },
  },
]

type RekapPresensiCardProps = {
  className?: string
}

export default function RekapPresensiCard({
  className,
}: RekapPresensiCardProps) {
  const [idSesiAktif, setIdSesiAktif] = useQueryState('sesi', {
    history: 'push',
  })

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
    queryKey: ['fakultas-instansi.akademik.kelas.presensi.list-sesi', idKelas],
    action: tableSesiAbsensiApi,
    initialSort: {
      name: 'pertemuan',
      order: 'desc',
    },
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

  if (isLoading) return <OuterCardShimmer className={className} />

  return (
    <Card className={className}>
      <Title as="h4" size="1.5xl" weight="semibold">
        Rekap Presensi Peserta
      </Title>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between gap-2 flex-wrap">
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
            <div className="lg:max-h-[49rem] lg:overflow-y-auto">
              {data.length > 0 ? (
                data.map((item, idx) => {
                  return (
                    <RekapPresensiItem
                      key={item.id}
                      idx={idx}
                      sesi={{
                        id: item.id,
                        judul: item.judul,
                        waktu: item.tanggal_realisasi || undefined,
                      }}
                      active={idSesiAktif === item.id}
                      onClick={() => setIdSesiAktif(item.id)}
                    />
                  )
                })
              ) : (
                <div className="flex items-center justify-center h-40">
                  <Text size="sm" weight="medium">
                    {search
                      ? 'Sesi belajar tidak ditemukan'
                      : 'Belum ada sesi belajar'}
                  </Text>
                </div>
              )}
            </div>

            {!isLoading && hasNextPage && (
              <ContentLoader ref={refSentry} className="py-4" />
            )}
          </Card>
        </div>

        {idSesiAktif && (
          <RekapPresensiDetailSesiSection className="w-full lg:w-7/12" />
        )}
      </div>
    </Card>
  )
}

function OuterCardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <div className="pt-1.5">
        <Shimmer className="h-7 w-1/4" />
      </div>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between gap-x-2 mb-4">
            <Shimmer className="h-7 w-5/12" />
            <Shimmer className="h-7 w-2/12" />
          </div>
          <CardShimmer />
        </div>
      </div>
    </Card>
  )
}

function CardShimmer({
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
          <div className="flex flex-col gap-y-3.5 flex-1 py-1.5">
            <Shimmer className="h-3 w-1/3" />
            <Shimmer className="h-2.5 w-1/2" />
          </div>
        </div>
      ))}
    </Card>
  )
}
