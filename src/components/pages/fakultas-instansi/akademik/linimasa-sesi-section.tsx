import {
  Card,
  ContentLoader,
  DatePicker,
  Input,
  Select,
  SelectOptionType,
  Shimmer,
  Text,
  Title,
} from '@/components/ui'
import { useDebounceSearch } from '@/hooks/use-debounce-search'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listLinimasaSesiApi } from '@/services/api/fakultas-instansi/akademik/list-linimasa-sesi'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import SesiCard from './sesi-card'

const oneDay = 60 * 60 * 24 * 1000

const rentangWaktuOptions: SelectOptionType<string>[] = [
  'Hari Ini',
  'Minggu Ini',
  'Bulan Ini',
  'Rentang Waktu',
].map((option) => ({ label: option, value: option }))

type LinimasaSectionProps = {
  semester?: string
  className?: string
}

export default function LinimasaSesiSection({
  semester,
  className,
}: LinimasaSectionProps) {
  const { jwt } = useSessionJwt()
  const { inputSearch, setInputSearch, search } = useDebounceSearch('')

  const [rentangWaktu, setRentangWaktu] = useState<SelectOptionType<string>>(
    rentangWaktuOptions[0]
  )
  const [tanggalMulai, setTanggalMulai] = useState<Date | null>(null)
  const [tanggalSampai, setTanggalSampai] = useState<Date | null>(null)

  const queryKey = [
    'fakultas-instansi.kelas-akademik.list-kelas',
    semester,
    rentangWaktu,
    search,
    tanggalMulai,
    tanggalSampai,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      if (
        rentangWaktu?.value === 'Rentang Waktu' &&
        (!tanggalMulai || !tanggalSampai)
      )
        return {
          list: [],
          pagination: null,
        }

      const { data } = await listLinimasaSesiApi({
        jwt,
        page,
        search,
        semester: semester ?? undefined,
        rentangWaktu: rentangWaktu?.value,
        tanggalMulai: tanggalMulai
          ? moment(tanggalMulai).format('YYYY-MM-DD')
          : undefined,
        tanggalSampai: tanggalSampai
          ? moment(tanggalSampai).format('YYYY-MM-DD')
          : undefined,
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

  const list = data?.pages.flatMap((page) => page.list) ?? []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  return (
    <div className={cn('flex flex-col', className)}>
      <Title as="h5" weight="semibold" className="mb-2">
        Linimasa Sesi
      </Title>
      <div className="flex justify-between gap-2 flex-wrap">
        <Input
          placeholder="Cari Sesi Belajar"
          className="min-w-56 flex-1 xs:flex-none"
          inputClassName="bg-white dark:bg-transparent"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          clearable
          onClear={() => setInputSearch('')}
        />
        <Select
          placeholder="Rentang Waktu"
          options={rentangWaktuOptions}
          onChange={(item) => {
            if (!item) return

            setRentangWaktu(item)
          }}
          value={rentangWaktu}
          className="min-w-28 flex-1 xs:flex-none"
        />
      </div>
      {rentangWaktu?.value === 'Rentang Waktu' && (
        <div className="flex flex-col gap-y-2 mt-2 [&_.react-datepicker-popper]:z-[1000] xs:flex-row">
          <DatePicker
            placeholderText="Dari Tanggal"
            className="flex-1 xs:[&_.rizzui-input-container]:rounded-r-none"
            onChange={(val) => {
              setTanggalMulai(val)

              if (val && (!tanggalSampai || val > tanggalSampai)) {
                setTanggalSampai(val)
              }
            }}
            selected={tanggalMulai}
            showMonthDropdown
            showYearDropdown
            popperPlacement="right-start"
          />
          <DatePicker
            placeholderText="Sampai Tanggal"
            className="flex-1 xs:[&_.rizzui-input-container]:rounded-l-none"
            onChange={(val) => {
              setTanggalSampai(val)
            }}
            selected={tanggalSampai}
            showMonthDropdown
            showYearDropdown
            popperPlacement="left-start"
          />
        </div>
      )}

      {isLoading ? (
        <ShimmerSection />
      ) : (
        <>
          {list.length > 0 ? (
            <div className="flex flex-col gap-4 mt-4">
              {list.map((item) => (
                <SesiCard key={item.id} data={item} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-72">
              <Text size="sm" weight="medium">
                Belum ada sesi
              </Text>
            </div>
          )}

          {hasNextPage && <ContentLoader ref={refSentry} className="py-4" />}
        </>
      )}
    </div>
  )
}

function ShimmerSection() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {[...Array(5)].map((_, idx) => (
        <Card key={idx} className="flex flex-col p-0">
          <div className="flex justify-between items-center gap-x-2 gap-y-1 flex-wrap pt-2 px-2">
            <Shimmer className="h-5 w-28 my-0.5" />
            <Shimmer rounded="full" className="h-5 w-28" />
          </div>
          <div className="overflow-x-scroll no-scrollbar m-2">
            <div className="flex gap-x-3 gap-y-1.5 min-w-0 w-fit">
              <Shimmer className="h-4 w-32 my-0.5" />
              <Shimmer className="h-4 w-16 my-0.5" />
              <Shimmer className="h-4 w-16 my-0.5" />
              <Shimmer className="h-4 w-24 my-0.5" />
              <Shimmer className="h-4 w-16 my-0.5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
