import { listUjianAction } from '@/actions/pengguna/ruang-kelas/ujian/peserta/list'
import {
  Button,
  Card,
  Input,
  Loader,
  Shimmer,
  Text,
  TimeIndo,
} from '@/components/ui'
import { stripHtml } from '@/utils/text'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
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

export default function PesertaDaftarUjianSection() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortDataType['sort']>(sortData[0].sort)

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['pengguna.ruang-kelas.ujian.daftar-ujian', 'peserta', idKelas],
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listUjianAction({
          page,
          search,
          sort,
          idKelas,
        })

        return {
          list: data?.list ?? [],
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

  if (isLoading) return <ShimmerSection />

  return (
    <>
      <div className="flex justify-between space-x-2 mb-4">
        <Input
          size="sm"
          type="search"
          placeholder="Cari sesi belajar"
          clearable
          className="w-72 sm:w-96"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
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

      {isFetching ? (
        <ShimmerCard count={3} />
      ) : (
        <Card className="p-0">
          {list.length > 0 ? (
            list.map((item) => {
              const strippedDesc = stripHtml(item.deskripsi ?? '')

              /* TODO: status ujian dan jadwal jika API sudah fix */
              const selesai = !!item.waktu_selesai
              const dalamJadwal = true

              return (
                <div
                  key={item.id_aktifitas}
                  className="flex justify-between items-center space-x-2 p-2 [&:not(:last-child)]:border-b border-b-gray-100"
                >
                  <div className="flex flex-col">
                    <Text weight="semibold" variant="dark">
                      {item.judul}
                    </Text>
                    <Text variant="lighter" className="line-clamp-2">
                      {strippedDesc.slice(0, 150)}
                      {strippedDesc.length > 150 && '...'}
                    </Text>
                    <Text size="sm" weight="semibold" variant="dark">
                      Mulai:{' '}
                      <TimeIndo date={item.jadwal_mulai} format="datetime" />
                    </Text>
                    <Text size="sm" weight="semibold" variant="dark">
                      Sampai:{' '}
                      <TimeIndo date={item.jadwal_selesai} format="datetime" />
                    </Text>
                  </div>
                  {/* TODO: cek status ujian dan jadwal, tambahkan link ke detail/pengerjaan ujian jika API sudah fix */}
                  <Button size="sm">Kerjakan Ujian</Button>
                </div>
              )
            })
          ) : (
            <div className="flex items-center justify-center h-40">
              <Text size="sm" weight="medium">
                {search ? 'Sesi tidak ditemukan' : 'Belum ada sesi'}
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

function ShimmerSection() {
  return (
    <>
      <div className="flex justify-between space-x-2 mb-4">
        <Shimmer className="h-7 w-6/12" />
        <Shimmer className="h-7 w-2/12" />
      </div>
      <ShimmerCard />
    </>
  )
}

function ShimmerCard({ count = 5 }: { count?: number }) {
  return (
    <Card className="p-0">
      {[...Array(count)].map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
        >
          <div className="flex flex-col space-y-3.5 flex-1 py-1.5">
            <Shimmer className="h-3 w-4/12" />
            <Shimmer className="h-2.5 w-7/12" />
            <Shimmer className="h-2.5 w-5/12" />
            <Shimmer className="h-2.5 w-5/12 !mt-2" />
          </div>
          <Shimmer className="h-7 w-24" rounded="md" />
        </div>
      ))}
    </Card>
  )
}
