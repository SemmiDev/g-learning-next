'use client'

import { hapusBankMateriAction } from '@/actions/pengguna/bank-materi/hapus'
import { lihatKategoriBankMateriAction } from '@/actions/pengguna/bank-materi/kategori/lihat'
import { listBankMateriAction } from '@/actions/pengguna/bank-materi/list'
import {
  Button,
  Loader,
  MateriItemType,
  ModalConfirm,
  Text,
  Title,
} from '@/components/ui'
import { useShowModal } from '@/hooks/use-show-modal'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { useDebounce } from 'react-use'
import { Input } from 'rizzui'
import MateriCard from './materi-card'
import LihatMateriModal from './modal/lihat-materi'
import ShareMateriModal from './modal/share-materi'
import ShareTugasModal from './modal/share-tugas'
import TambahMateriModal from './modal/tambah-materi'
import UbahMateriModal from './modal/ubah-materi'

export default function ListMateriBody() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [showTambah, setShowTambah] = useState(false)
  const {
    show: showLihat,
    key: keyLihat,
    doShow: doShowLihat,
    doHide: doHideLihat,
  } = useShowModal<string>()
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()
  const {
    show: showShareMateri,
    key: keyShareMateri,
    doShow: doShowShareMateri,
    doHide: doHideShareMateri,
  } = useShowModal<MateriItemType>()
  const {
    show: showShareTugas,
    key: keyShareTugas,
    doShow: doShowShareTugas,
    doHide: doHideShareTugas,
  } = useShowModal<MateriItemType>()
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
            fileIds: item.daftar_file_bank_ajar.map((item) => item.id),
            type: item.bank_ajar.tipe === 'Materi' ? 'materi' : 'tugas',
          })) as MateriItemType[],
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
      <div className="flex justify-between flex-wrap gap-2">
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
          onClick={() => setShowTambah(true)}
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
                onEdit={(materi) => doShowUbah(materi.id)}
                onDelete={(materi) => setIdHapus(materi.id)}
                onDetail={(materi) => doShowLihat(materi.id)}
                onShare={() => {
                  if (materi.type === 'materi') doShowShareMateri(materi)
                  else doShowShareTugas(materi)
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

      {!isLoading && hasNextPage && <Loader ref={refSentry} className="py-4" />}

      <TambahMateriModal show={showTambah} setShow={setShowTambah} />

      <UbahMateriModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

      <LihatMateriModal show={showLihat} id={keyLihat} onHide={doHideLihat} />

      <ShareMateriModal
        show={showShareMateri}
        materi={keyShareMateri}
        onHide={doHideShareMateri}
      />

      <ShareTugasModal
        show={showShareTugas}
        materi={keyShareTugas}
        onHide={doHideShareTugas}
      />

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
    </>
  )
}
