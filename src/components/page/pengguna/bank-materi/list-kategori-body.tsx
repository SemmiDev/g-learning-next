'use client'

import { hapusKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/hapus'
import { listKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/list'
import { Button, ModalConfirm, Title } from '@/components/ui'
import { useHandleDelete } from '@/hooks/handle/use-handle-delete'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'
import KategoriCard, { KategoriType } from './kategori-card'
import TambahKategoriModal from './modal/tambah-kategori'
import UbahKategoriModal from './modal/ubah-kategori'

const queryKey = ['pengguna.bank-materi.kategori']

export default function ListKategoriMateriBody() {
  const [search, setSearch] = useState('')
  const [showModalTambahKategori, setShowModalTambahKategori] = useState(false)
  const [idUbah, setIdUbah] = useState<string>()

  const { data, refetch, hasNextPage, fetchNextPage } = useInfiniteQuery({
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
      <div className="flex justify-between">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Bank Materi"
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
          onClick={() => setShowModalTambahKategori(true)}
        >
          Tambah Kategori Baru
        </Button>
      </div>
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

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => fetchNextPage()}>
            Tampilkan Lebih banyak
          </Button>
        </div>
      )}

      <TambahKategoriModal
        showModal={showModalTambahKategori}
        setShowModal={setShowModalTambahKategori}
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
