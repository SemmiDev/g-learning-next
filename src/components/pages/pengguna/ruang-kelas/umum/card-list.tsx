import { Loader, ModalConfirm, Shimmer, Text } from '@/components/ui'
import Card from '@/components/ui/card'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { hapusKelasApi } from '@/services/api/pengguna/ruang-kelas/hapus'
import { keluarKelasApi } from '@/services/api/pengguna/ruang-kelas/keluar'
import { listKelasApi } from '@/services/api/pengguna/ruang-kelas/list'
import { handleActionWithToast } from '@/utils/action'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import KelasCard from './kelas-card'
import PengaturanKelasModal from './modal/pengaturan-kelas'
import UndangKelasModal from './modal/undang-kelas'

type ListKelasCardListProps = {
  kategori: 'Dikelola' | 'Diikuti' | undefined
  search: string
}

export default function ListKelasCardList({
  kategori,
  search,
}: ListKelasCardListProps) {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const {
    show: showPengaturan,
    key: keyPengaturan,
    doShow: doShowPengaturan,
    doHide: doHidePengaturan,
  } = useShowModal<string>()
  const {
    show: showUndang,
    key: keyUndang,
    doShow: doShowUndang,
    doHide: doHideUndang,
  } = useShowModal<string>()
  const [idKeluar, setIdKeluar] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const queryKey = ['pengguna.ruang-kelas.list', kategori, 'Umum', search]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listKelasApi({
        jwt,
        page,
        kategori,
        tipe: 'Umum',
        search,
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

  const handleHapus = async () => {
    if (!idHapus) return

    await handleActionWithToast(processApi(hapusKelasApi, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  const handleKeluar = async () => {
    if (!idKeluar) return

    await handleActionWithToast(processApi(keluarKelasApi, idKeluar), {
      loading: 'Keluar kelas...',
      onSuccess: () => {
        setIdKeluar(undefined)

        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  if (isLoading) return <CardListShimmer />

  return (
    <>
      {list.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((item) => (
            <KelasCard
              key={item.kelas.id}
              data={item}
              onPengaturan={(id) => doShowPengaturan(id)}
              onUndang={(id) => doShowUndang(id)}
              onKeluar={(id) => setIdKeluar(id)}
              onDelete={(id) => setIdHapus(id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-72">
          <Text size="sm" weight="medium">
            Belum ada kelas
          </Text>
        </div>
      )}

      {!isLoading && hasNextPage && <Loader ref={refSentry} className="py-4" />}

      <ModalConfirm
        title="Keluar Kelas"
        desc="Apakah Anda yakin ingin keluar dari kelas ini?"
        color="danger"
        isOpen={!!idKeluar}
        onClose={() => setIdKeluar(undefined)}
        onConfirm={handleKeluar}
        headerIcon="help"
        closeOnCancel
      />

      <ModalConfirm
        title="Hapus Kelas"
        desc="Apakah Anda yakin ingin menghapus kelas ini?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="help"
        closeOnCancel
      />

      <PengaturanKelasModal
        show={showPengaturan}
        id={keyPengaturan}
        onHide={doHidePengaturan}
      />

      <UndangKelasModal
        show={showUndang}
        id={keyUndang}
        onHide={doHideUndang}
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
