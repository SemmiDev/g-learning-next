'use client'

import { hapusKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/hapus'
import { listKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/list'
import { Button, Loader, ModalConfirm, Text, Title } from '@/components/ui'
import { useHandleDelete } from '@/hooks/handle/use-handle-delete'
import { useShowModal } from '@/hooks/use-show-modal'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { Input } from 'rizzui'
import KategoriCard, { KategoriType } from './kategori-card'
import TambahKategoriModal from './modal/tambah-kategori'
import UbahKategoriModal from './modal/ubah-kategori'

const queryKey = ['pengguna.bank-materi.kategori']

export default function ListKategoriMateriBody() {
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
        const { data } = await listKategoriBankMateriAction({
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
  } = useHandleDelete({
    action: hapusKategoriBankMateriAction,
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

      {isLoading || (!list.length && isFetching) ? (
        <Loader height={300} />
      ) : list.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((kategori) => (
            <KategoriCard
              key={kategori.id}
              kategori={kategori}
              onEdit={(id) => doShowUbah(id)}
              onDelete={(id) => setIdHapus(id)}
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

      {!isLoading && hasNextPage && <Loader ref={refSentry} className="py-4" />}

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
