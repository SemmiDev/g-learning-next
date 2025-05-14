'use client'

import {
  Card,
  Input,
  Loader,
  ModalConfirm,
  Shimmer,
  Text,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { gabungAnggotaKelasApi } from '@/services/api/pengguna/ruang-kelas/anggota-kelas/peserta/gabung'
import { listTemukanKelasApi } from '@/services/api/pengguna/temukan-kelas/list'
import { handleActionWithToast } from '@/utils/action'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import KelasCard from './kelas-card'

export default function TermukanKelasBody() {
  const jwt = useSessionJwt()
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const [kodeKelas, setKodeKelas] = useState<string>()

  const queryKey = ['pengguna.temukan-kelas']

  const { data, isLoading, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listTemukanKelasApi({ jwt, page, search })

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

  useDebounce(() => refetch(), search ? 250 : 0, [refetch, search])

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  const handleGabung = async () => {
    if (!kodeKelas) return

    await handleActionWithToast(gabungAnggotaKelasApi(jwt, kodeKelas), {
      loading: 'Mengajukan bergabung...',
      success: 'Berhasil mengajukan bergabung',
      onSuccess: () => {
        setKodeKelas(undefined)
        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  if (isLoading) return <CardListShimmer />

  return (
    <>
      <div className="flex flex-col gap-4">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Kelas Publik"
          className="w-72 sm:w-96"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          clearable
          onClear={() => setSearch('')}
        />

        {list.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.map((item) => (
              <KelasCard
                key={item.kelas.id}
                data={item}
                onGabung={(kode) => setKodeKelas(kode)}
              />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-72">
            <Text size="sm" weight="medium">
              Belum ada kelas publik
            </Text>
          </div>
        )}
      </div>

      {!isLoading && hasNextPage && <Loader ref={refSentry} className="py-4" />}

      <ModalConfirm
        title="Gabung Kelas"
        desc="Apakah Anda yakin ingin bergabung di kelas ini?"
        color="primary"
        isOpen={!!kodeKelas}
        onClose={() => setKodeKelas(undefined)}
        confirm="Gabung"
        onConfirm={handleGabung}
        confirmLoading
        cancel="Batal"
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}

function CardListShimmer() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, idx) => (
        <Card key={idx} className="h-fit">
          <Shimmer className="h-32" />
          <div className="flex justify-between items-start mt-2">
            <div className="flex flex-col flex-1 gap-y-2.5 py-1">
              <Shimmer className="h-4 w-6/12" />
              <Shimmer className="h-2.5 w-4/12" />
              <Shimmer className="h-2.5 w-7/12" />
            </div>
            <Shimmer className="h-[1.125rem] w-10 rounded-full" />
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
          <div className="flex gap-x-1 mt-2">
            {[...Array(3)].map((_, idx) => (
              <Shimmer key={idx} className="size-9" />
            ))}
          </div>
          <Shimmer className="h-8 w-full mt-2" />
        </Card>
      ))}
    </div>
  )
}
