'use client'

import { ContentLoader } from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listSesiPembelajaranApi } from '@/services/api/fakultas-instansi/akademik/kelas/sesi-pembelajaran/list'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import PesertaSesiItemCard from './sesi-item-card'

export default function SesiPembelajaranBody() {
  const { jwt } = useSessionJwt()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'fakultas-instansi.akademik.kelas.sesi-pembelajaran.list',
    idKelas,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listSesiPembelajaranApi({ jwt, page, idKelas })

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
    <div className="flex flex-col gap-y-2 mt-8 lg:w-7/12">
      {list.map((sesi, idx) => (
        <PesertaSesiItemCard key={idx} sesi={sesi} />
      ))}
      {!isLoading && hasNextPage && (
        <ContentLoader ref={refSentry} size="sm" className="py-4" />
      )}
    </div>
  )
}
