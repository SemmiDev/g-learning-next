import { listSesiAbsensiAction } from '@/services/api/pengguna/ruang-kelas/presensi/akademik/peserta/list-sesi-absensi'
import {
  Badge,
  Button,
  Card,
  Input,
  Loader,
  Shimmer,
  Text,
  TimeIndo,
} from '@/components/ui'
import { mustBe } from '@/utils/must-be'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { CgSpinner } from 'react-icons/cg'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { Dropdown } from 'rizzui'

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

type AbsenItemType = {
  judul: string
  waktu: string | undefined
  status: 'Hadir' | 'Izin' | 'Sakit' | 'Alpha' | undefined
}

export default function PesertaAbsensiSection() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortDataType['sort']>(sortData[0].sort)

  const { kelas: idKelas }: { kelas: string } = useParams()

  const {
    data,
    isLoading,
    isFetching,
    refetch,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      'pengguna.ruang-kelas.presensi.sesi-absensi',
      'peserta',
      idKelas,
    ],
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listSesiAbsensiAction({
        page,
        search,
        sort,
        idKelas,
      })

      return {
        list: (data?.list ?? []).map(
          (item) =>
            ({
              judul: item.judul,
              waktu: item.tanggal_realisasi,
              status: mustBe(
                item.status_absensi,
                ['Hadir', 'Izin', 'Sakit', 'Alpha'],
                undefined
              ),
            } as AbsenItemType)
        ),
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const list = data?.pages.flatMap((page) => page.list) || []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  useEffect(() => {
    refetch()
  }, [sort, refetch])

  useDebounce(() => refetch(), search ? 250 : 0, [refetch, search])

  const sorting = sortData.find(
    (item) => item.sort.name === sort?.name && item.sort.order === sort?.order
  )

  if (isLoading) return <SectionShimmer />

  return (
    <>
      <div className="flex justify-between gap-x-2 mb-4">
        <Input
          size="sm"
          type="search"
          placeholder="Cari sesi belajar"
          className="w-72 sm:w-96"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          clearable
          onClear={() => setSearch('')}
        />
        <Dropdown>
          <Dropdown.Trigger>
            <Button as="span" size="sm" variant="outline" className="bg-white">
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
                onClick={() =>
                  setSort({
                    name: item.sort.name,
                    order: item.sort.order,
                  })
                }
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

      {isLoading ? (
        <CardShimmer count={3} />
      ) : (
        <Card className="relative p-0">
          {isFetching && !isFetchingNextPage && (
            <div className="flex justify-center items-center absolute m-auto left-0 right-0 top-0 bottom-0 bg-black/10 rounded-md">
              <div className="size-10 rounded-full bg-transparent">
                <CgSpinner className="size-10 animate-spin text-primary" />
              </div>
            </div>
          )}
          {list.length > 0 ? (
            list.map((item, idx) => (
              <div
                className="flex justify-between items-center gap-x-2 p-2 [&:not(:last-child)]:border-b border-b-gray-100"
                key={idx}
              >
                <div className="flex flex-col gap-y-1">
                  <Text weight="semibold" variant="dark">
                    {item.judul}
                  </Text>
                  <Text size="sm" weight="semibold" variant="lighter">
                    <TimeIndo
                      date={item.waktu}
                      format="datetimeday"
                      empty="-"
                    />
                  </Text>
                </div>
                <Badge
                  size="sm"
                  variant="solid"
                  rounded="md"
                  className={
                    item.status === 'Hadir'
                      ? 'bg-badge-blue'
                      : item.status === 'Izin'
                      ? 'bg-badge-green'
                      : item.status === 'Sakit'
                      ? 'bg-badge-yellow'
                      : item.status === 'Alpha'
                      ? 'bg-badge-red'
                      : 'bg-gray-400'
                  }
                >
                  {item.status || '-'}
                </Badge>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-40">
              <Text size="sm" weight="medium">
                {search
                  ? 'Sesi belajar tidak ditemukan'
                  : 'Belum ada sesi belajar'}
              </Text>
            </div>
          )}

          {!isLoading && hasNextPage && (
            <Loader ref={refSentry} size="sm" className="py-4" />
          )}
        </Card>
      )}
    </>
  )
}

function SectionShimmer() {
  return (
    <>
      <div className="flex justify-between gap-x-2 mb-4">
        <Shimmer className="h-7 w-6/12" />
        <Shimmer className="h-7 w-2/12" />
      </div>
      <CardShimmer />
    </>
  )
}

function CardShimmer({ count = 5 }: { count?: number }) {
  return (
    <Card className="p-0">
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
        >
          <div className="flex flex-col gap-y-3.5 flex-1 py-1.5">
            <Shimmer className="h-3 w-1/4" />
            <Shimmer className="h-2.5 w-1/3" />
          </div>
          <Shimmer className="h-4 w-9" rounded="md" />
        </div>
      ))}
    </Card>
  )
}
