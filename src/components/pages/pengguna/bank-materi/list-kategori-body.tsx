'use client'

import {
  Button,
  Card,
  Loader,
  ModalConfirm,
  Shimmer,
  Text,
  Title,
} from '@/components/ui'
import { useHandleApiDelete } from '@/hooks/handle/use-handle-delete'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { hapusKategoriBankMateriApi } from '@/services/api/pengguna/bank-materi/kategori/hapus'
import { listKategoriBankMateriApi } from '@/services/api/pengguna/bank-materi/kategori/list'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { Input } from 'rizzui'
import KategoriCard, { KategoriType } from './kategori-card'
import TambahKategoriModal from './modal/tambah-kategori'
import UbahKategoriModal from './modal/ubah-kategori'

const queryKey = ['pengguna.bank-materi.kategori']

export default function ListKategoriMateriBody() {
  const { jwt } = useSessionJwt()

  const [search, setSearch] = useState('')
  const [showTambah, setShowTambah] = useState(false)
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listKategoriBankMateriApi({
          jwt,
          page,
          search,
        })

        return {
          list: (data?.list ?? []).map((item) => ({
            id: item.id,
            name: item.nama_kategori,
            count: item.total_materi,
          })) as KategoriType[],
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

  useDebounce(() => refetch(), search ? 250 : 0, [refetch, search])

  const {
    handle: handleHapus,
    id: idHapus,
    setId: setIdHapus,
  } = useHandleApiDelete({
    action: hapusKategoriBankMateriApi,
    refetchKey: queryKey,
  })

  return (
    <>
      <Title
        as="h4"
        size="1.5xl"
        weight="semibold"
        className="leading-tight mb-3"
      >
        List Bank Materi
      </Title>
      <div className="flex justify-between flex-wrap gap-2">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Bank Materi"
          className="w-72 sm:w-96"
          inputClassName="bg-white"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          clearable
          onClear={() => setSearch('')}
        />
        <Button
          size="sm"
          variant="outline-colorful"
          className="bg-white"
          onClick={() => setShowTambah(true)}
        >
          Tambah Kategori Baru
        </Button>
      </div>

      {isLoading ? (
        <ListItemShimmer />
      ) : (
        <div className="relative mt-4">
          {isFetching && (
            <div className="flex justify-center items-center absolute m-auto left-0 right-0 top-0 bottom-0 bg-white/50 rounded-lg z-10">
              <div className="size-10 rounded-full bg-transparent">
                <CgSpinner className="size-10 animate-spin text-primary" />
              </div>
            </div>
          )}
          {list.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {list.map((kategori) => (
                <KategoriCard
                  key={kategori.id}
                  kategori={kategori}
                  onEdit={(id) => doShowUbah(id)}
                  onDelete={(id) => setIdHapus(id)}
                  onExport={(materi) => {
                    window?.open(
                      `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${kategori?.id}/export?access_token=${jwt}`,
                      '_blank'
                    )
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-72">
              <Text size="sm" weight="medium">
                {search ? 'Kategori tidak ditemukan' : 'Belum ada kategori'}
              </Text>
            </div>
          )}

          {hasNextPage && <Loader ref={refSentry} className="py-4" />}
        </div>
      )}

      <TambahKategoriModal show={showTambah} setShow={setShowTambah} />

      <UbahKategoriModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

      <ModalConfirm
        title="Hapus Kategori"
        desc="Apakah Anda yakin ingin menghapus kategori ini?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}

function ListItemShimmer() {
  return (
    <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(5)].map((_, idx) => (
        <Card key={idx} shadow="sm" rounded="lg" className="flex flex-col">
          <Shimmer className="size-11 mb-4" />
          <Shimmer className="h-3 w-5/12 my-1.5" />
          <Shimmer className="h-2 w-8/12 my-1.5" />
        </Card>
      ))}
    </div>
  )
}
