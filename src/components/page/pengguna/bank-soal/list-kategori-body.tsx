'use client'

import { hapusKategoriBankSoalAction } from '@/actions/pengguna/bank-soal/kategori/hapus'
import { listKategoriBankSoalAction } from '@/actions/pengguna/bank-soal/kategori/list'
import { Button, Loader, ModalConfirm, Text, Title } from '@/components/ui'
import { useHandleDelete } from '@/hooks/handle/use-handle-delete'
import { useInfiniteQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'
import KategoriCard, { KategoriType } from './kategori-card'
import TambahKategoriModal from './modal/tambah-kategori'
import UbahKategoriModal from './modal/ubah-kategori'

const queryKey = ['pengguna.bank-soal.kategori']

export default function ListKategoriSoalBody() {
  const [search, setSearch] = useState('')
  const [showModalTambah, setShowModalTambah] = useState(false)
  const [idUbah, setIdUbah] = useState<string>()

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listKategoriBankSoalAction({
          page,
          search,
        })

        return {
          list: (data?.list ?? []).map((item) => ({
            id: item.id,
            name: item.nama_kategori,
            count: item.total_bank_soal,
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

  useEffect(() => {
    if (search === '') {
      refetch()
      return
    }

    _.debounce(refetch, 250)()
  }, [refetch, search])

  const {
    handle: handleHapus,
    id: idHapus,
    setId: setIdHapus,
  } = useHandleDelete({
    action: hapusKategoriBankSoalAction,
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
        List Bank Soal
      </Title>
      <div className="flex justify-between">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Bank Soal"
          clearable={true}
          className="w-72 sm:w-96"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
        <Button
          size="sm"
          variant="outline-colorful"
          onClick={() => setShowModalTambah(true)}
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
              onEdit={(id) => setIdUbah(id)}
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

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => fetchNextPage()}>
            Tampilkan Lebih banyak
          </Button>
        </div>
      )}

      <TambahKategoriModal
        showModal={showModalTambah}
        setShowModal={setShowModalTambah}
      />
      <UbahKategoriModal id={idUbah} setId={setIdUbah} />

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
