import { listKelasAction } from '@/services/api/pengguna/ruang-kelas/list'
import { Loader, Shimmer, Text } from '@/components/ui'
import Card from '@/components/ui/card'
import { switchCaseObject } from '@/utils/switch-case'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import KelasCard from './kelas-card'

type ListKelasCardListProps = {
  semester: string | null
  className?: string
}

export default function ListKelasCardList({
  semester,
  className,
}: ListKelasCardListProps) {
  const { jenis: jenisKelas }: { jenis: string } = useParams()
  const kategori = switchCaseObject(
    jenisKelas,
    {
      dikelola: 'Dikelola',
      diikuti: 'Diikuti',
    },
    undefined
  ) as 'Dikelola' | 'Diikuti' | undefined

  const queryKey = ['pengguna.ruang-kelas.list', kategori, 'Akademik', semester]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listKelasAction({
        page,
        kategori,
        tipe: 'Akademik',
        semester: semester ?? undefined,
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

  if (isLoading) return <CardListShimmer />

  return (
    <>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 flex-1 lg:grid-cols-2 xl:grid-cols-2">
          {list.map((item) => (
            <KelasCard key={item.kelas.id} data={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center h-72">
          <Text size="sm" weight="medium">
            Belum ada kelas
          </Text>
        </div>
      )}

      {!isLoading && hasNextPage && <Loader ref={refSentry} className="py-4" />}
    </>
  )
}

function CardListShimmer() {
  return (
    <div className="grid grid-cols-1 gap-5 flex-1 lg:grid-cols-2 xl:grid-cols-2">
      {[...Array(4)].map((_, idx) => (
        <Card key={idx} className="h-fit">
          <Shimmer className="h-32" />
          <div className="flex justify-between items-start mt-2">
            <div className="flex flex-col flex-1 gap-y-2.5 py-1">
              <Shimmer className="h-4 w-6/12" />
              <Shimmer className="h-2.5 w-4/12" />
              <Shimmer className="h-2.5 w-7/12" />
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
          <div className="flex flex-col gap-y-1 mt-2">
            <div className="flex justify-between gap-x-2 py-1 mt-0.5">
              <Shimmer className="h-2.5 w-4/12" />
              <Shimmer className="h-2 w-1/12" />
            </div>
            <Shimmer rounded="none" className="h-2 w-full" />
          </div>
          <Shimmer className="h-8 w-full mt-2" />
        </Card>
      ))}
    </div>
  )
}
