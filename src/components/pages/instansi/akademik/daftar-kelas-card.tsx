import {
  Card,
  Input,
  Loader,
  SelectOptionType,
  Shimmer,
  Text,
  Title,
} from '@/components/ui'
import AsyncPaginateSelect from '@/components/ui/select/async-paginate'
import { useDebounceSearch } from '@/hooks/use-debounce-search'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listKelasApi } from '@/services/api/instansi/akademik/list-kelas'
import { jurusanSelectDataApi } from '@/services/api/instansi/async-select/jurusan'
import cn from '@/utils/class-names'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import KelasCard from './kelas-card'

type DaftarKelasCardProps = {
  semester?: string
  className?: string
}

export default function DaftarKelasCard({
  semester,
  className,
}: DaftarKelasCardProps) {
  const { jwt } = useSessionJwt()
  const { inputSearch, setInputSearch, search } = useDebounceSearch('')

  const [jurusan, setJurusan] = useState<SelectOptionType<string> | null>()

  const queryKey = [
    'instansi.kelas-akademik.list-kelas',
    semester,
    jurusan,
    search,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listKelasApi({
        jwt,
        page,
        search,
        semester: semester ?? undefined,
        idSms: jurusan?.value ?? undefined,
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
    <Card className={cn('flex flex-col p-0', className)}>
      <Title as="h5" weight="semibold" className="px-2 py-1.5">
        Daftar Kelas
      </Title>
      <div className="flex justify-between gap-2 flex-wrap p-2">
        <Input
          placeholder="Cari Kelas"
          className="min-w-56 flex-1 xs:flex-none"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          clearable
          onClear={() => setInputSearch('')}
        />
        <AsyncPaginateSelect
          placeholder="Pilih Jurusan"
          action={jurusanSelectDataApi}
          construct={(data) => ({
            label: data.nm_lemb,
            value: data.id_sms,
          })}
          onChange={(data) => {
            if (!data?.value) setJurusan(undefined)
            else setJurusan(data)
          }}
          value={jurusan}
          className="min-w-48 flex-1 xs:flex-none"
          isClearable
        />
      </div>

      {isLoading ? (
        <ShimmerSection />
      ) : (
        <>
          {list.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 p-2 lg:grid-cols-2 xl:grid-cols-2">
              {list.map((item) => (
                <KelasCard key={item.kelas.id} data={item} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-72">
              <Text size="sm" weight="medium">
                Belum ada kelas
              </Text>
            </div>
          )}

          {!isLoading && hasNextPage && (
            <Loader ref={refSentry} className="py-4" />
          )}
        </>
      )}
    </Card>
  )
}

function ShimmerSection() {
  return (
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
  )
}
