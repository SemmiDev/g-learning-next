import { hapusKelasAction } from '@/actions/pengguna/ruang-kelas/hapus'
import { listKelasAction } from '@/actions/pengguna/ruang-kelas/list'
import { Loader, ModalConfirm, Shimmer, Text } from '@/components/ui'
import Card from '@/components/ui/card'
import { useSessionPengguna } from '@/hooks/use-session-pengguna'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import KelasCard from './kelas-card'
import PengaturanKelasModal from './modal/pengaturan-kelas'

const queryKey = ['pengguna.ruang-kelas.list']

export default function ListKelasCardList() {
  const { username } = useSessionPengguna()
  const queryClient = useQueryClient()
  const {
    show: showPengaturan,
    key: keyPengaturan,
    doShow: doShowPengaturan,
    doHide: doHidePengaturan,
  } = useShowModal<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listKelasAction({
        page,
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

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusKelasAction(idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

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
              id={item.kelas.id}
              program={item.kelas.nama_kelas}
              kelas={item.kelas.sub_judul}
              image={item.kelas.thumbnail ?? undefined}
              tipe={item.kelas.tipe}
              instansi={item.kelas.nama_instansi}
              instansiCentang={true}
              pengajar={item.nama_pemilik}
              jumlahPeserta={item.total_peserta}
              jadwal={
                item.jadwal && item.jadwal.length > 0
                  ? `${
                      item.jadwal[0].hari
                    }, ${item.jadwal[0].waktu_mulai.substring(
                      0,
                      5
                    )} - ${item.jadwal[0].waktu_sampai.substring(0, 5)}`
                  : '-'
              }
              onPengaturan={(id) => doShowPengaturan(id)}
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
            <div className="flex-1 space-y-2.5 py-1">
              <Shimmer className="h-4 w-6/12 mb-3" />
              <Shimmer className="h-2.5 w-9/12" />
              <Shimmer className="h-2.5 w-7/12" />
              <Shimmer className="h-2.5 w-7/12" />
            </div>
            <Shimmer className="h-[1.125rem] w-10 rounded-full" />
          </div>
          <div className="flex mt-2">
            <table className="border-collapse border border-gray-100 w-full">
              <tbody>
                <tr>
                  <td className="border border-gray-100 space-y-2 px-1 py-2.5">
                    <Shimmer className="h-2 w-1/2" />
                    <Shimmer className="h-2 w-10/12" />
                  </td>
                  <td className="border border-gray-100 space-y-2 px-1 py-2.5">
                    <Shimmer className="h-2 w-1/2" />
                    <Shimmer className="h-2 w-10/12" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex space-x-1 mt-2">
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
