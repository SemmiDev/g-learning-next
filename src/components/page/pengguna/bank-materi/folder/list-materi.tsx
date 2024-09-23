'use client'

import { hapusBankMateriAction } from '@/actions/pengguna/bank-materi/hapus'
import { listBankMateriAction } from '@/actions/pengguna/bank-materi/list'
import { Button, Loader, ModalConfirm, Text, Title } from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import _ from 'lodash'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Input } from 'rizzui'
import MateriCard, { MateriType } from './materi-card'
import LihatMateriModal from './modal/lihat-materi'
import ShareMateriModal from './modal/share-materi'
import TambahMateriModal from './modal/tambah-materi'
import UbahMateriModal from './modal/ubah-materi'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { lihatKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/lihat'

export default function ListMateriBody() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [shareMateri, setShareMateri] = useState<MateriType>()
  const [showModalTambah, setShowModalTambah] = useState(false)
  const [idLihat, setIdLihat] = useState<string>()
  const [idUbah, setIdUbah] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const { kategori: idKategori }: { kategori: string } = useParams()

  const { data: kategori } = useQuery({
    queryKey: ['pengguna.bank-materi.kategori.lihat', idKategori],
    queryFn: makeSimpleQueryDataWithId(
      lihatKategoriBankMateriAction,
      idKategori
    ),
  })

  const queryKey = ['pengguna.bank-materi.list', idKategori]

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listBankMateriAction({
          page,
          search,
          params: {
            idKategori,
          },
        })

        return {
          list: (data?.list ?? []).map((item) => ({
            id: item.bank_ajar.id,
            name: item.bank_ajar.judul,
            desc: item.bank_ajar.deskripsi,
            time: item.bank_ajar.created_at,
            fileCount: item.total_file_bank_ajar,
            type: item.bank_ajar.tipe === 'Materi' ? 'materi' : 'tugas',
          })) as MateriType[],
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

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusBankMateriAction(idKategori, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  return (
    <>
      <Title
        as="h4"
        size="1.5xl"
        weight="semibold"
        className="leading-tight mb-3"
      >
        Bank Materi {kategori?.nama_kategori ?? ''}
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
          onClick={() => setShowModalTambah(true)}
        >
          Tambah Materi
        </Button>
      </div>

      {isLoading || (!list.length && isFetching) ? (
        <Loader height={300} />
      ) : list.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
          {list.map((materi) => (
            <div key={materi.id}>
              <MateriCard
                materi={materi}
                onEdit={(materi) => setIdUbah(materi.id)}
                onDelete={(materi) => setIdHapus(materi.id)}
                onDetail={(materi) => setIdLihat(materi.id)}
                onShare={() => {
                  setShareMateri(materi)
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-72">
          <Text size="sm" weight="medium">
            {search ? 'Materi tidak ditemukan' : 'Belum ada materi'}
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

      <TambahMateriModal
        showModal={showModalTambah}
        setShowModal={setShowModalTambah}
      />

      <UbahMateriModal id={idUbah} setId={setIdUbah} />

      <LihatMateriModal id={idLihat} setId={setIdLihat} />

      <ModalConfirm
        title="Hapus Bank Materi"
        desc="Apakah Anda yakin ingin menghapus bank materi ini?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="help"
        closeOnCancel
      />

      <ShareMateriModal materi={shareMateri} setMateri={setShareMateri} />
    </>
  )
}
