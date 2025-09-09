import {
  Button,
  Card,
  ContentLoader,
  Modal,
  Shimmer,
  Text,
} from '@/components/ui'
import { useInfiniteListAsync } from '@/hooks/use-infinite-list-async'
import { useMinViewportSize } from '@/hooks/viewport-size/use-min-size'
import { tableSesiUjianApi } from '@/services/api/pengguna/ruang-kelas/ujian/pengajar/table-sesi'
import cn from '@/utils/class-names'
import { betweenTime } from '@/utils/time'
import { useParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useEffect, useState } from 'react'
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
  const atMinSizeLg = useMinViewportSize('lg')
  const [idSesiAktif, setIdSesiAktif] = useQueryState('sesi', {
    history: 'push',
  })

  const [showModalDetail, setShowModalDetail] = useState(false)

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
    action: tableSesiUjianApi,
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

  const handleTutupDetail = () => {
    setShowModalDetail(false)
    setTimeout(() => setIdSesiAktif(null), 250)
  }

  useEffect(() => {
    setShowModalDetail(!atMinSizeLg && !!idSesiAktif)
  }, [atMinSizeLg, idSesiAktif])

  if (isLoading) return <OuterCardShimmer className="mt-8" />

  return (
    <>
      <div className="flex flex-wrap gap-4 mt-8 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between">
            <Input
              size="sm"
              type="search"
              placeholder="Cari Sesi Ujian"
              inputClassName="bg-white dark:bg-transparent"
              prefix={
                <PiMagnifyingGlass size={20} className="text-gray-lighter" />
              }
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              clearable
              onClear={() => onSearch('')}
            />
            <Dropdown>
              <Dropdown.Trigger>
                <Button
                  as="span"
                  size="sm"
                  variant="outline"
                  className="bg-white"
                >
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
                data.map((item, idx) => (
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
                    open={betweenTime(
                      item.waktu_mulai_ujian,
                      item.waktu_selesai_ujian
                    )}
                    onClick={() =>
                      setIdSesiAktif(idSesiAktif !== item.id ? item.id : null)
                    }
                  />
                ))
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
              <ContentLoader ref={refSentry} className="py-4" />
            )}
          </Card>
        </div>

        {idSesiAktif && atMinSizeLg && (
          <PengajarRekapUjianDetailSesiSection className="w-full lg:w-7/12" />
        )}
      </div>

      <Modal
        size="full"
        title="Detail Rekap Ujian"
        isOpen={showModalDetail}
        onClose={handleTutupDetail}
      >
        <PengajarRekapUjianDetailSesiSection inModal />
      </Modal>
    </>
  )
}

function OuterCardShimmer({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-4 lg:flex-nowrap', className)}>
      <div className="w-full lg:w-5/12">
        <div className="flex justify-between gap-x-2">
          <Shimmer className="h-7 w-5/12" />
          <Shimmer className="h-7 w-2/12" />
        </div>
        <CardShimmer className="mt-2" />
      </div>
    </div>
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
          <div className="flex flex-col gap-y-2.5 flex-1 py-1.5">
            <div className="flex justify-between gap-x-2">
              <Shimmer className="h-3 w-1/3" />
              <Shimmer className="h-6 w-10 rounded-full" />
            </div>
            <div className="flex flex-col gap-y-2">
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
