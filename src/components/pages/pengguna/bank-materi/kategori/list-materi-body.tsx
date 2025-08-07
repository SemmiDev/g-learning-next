'use client'

import {
  Button,
  Card,
  ContentLoader,
  MateriItemType,
  ModalConfirm,
  Shimmer,
  Text,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { hapusBankMateriApi } from '@/services/api/pengguna/bank-materi/hapus'
import { lihatKategoriBankMateriApi } from '@/services/api/pengguna/bank-materi/kategori/lihat'
import { listBankMateriApi } from '@/services/api/pengguna/bank-materi/list'
import { handleActionWithToast } from '@/utils/action'
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { CgSpinner } from 'react-icons/cg'
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
  const { jwt, makeSimpleApiQueryData, processApi } = useSessionJwt()
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
    queryFn: makeSimpleApiQueryData(lihatKategoriBankMateriApi, idKategori),
  })

  const queryKey = ['pengguna.bank-materi.list', idKategori]

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listBankMateriApi({
          jwt,
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

  const handleHapus = async () => {
    if (!idHapus) return

    await handleActionWithToast(
      processApi(hapusBankMateriApi, idKategori, idHapus),
      {
        loading: 'Menghapus...',
        onSuccess: () => {
          setIdHapus(undefined)

          queryClient.invalidateQueries({ queryKey })
        },
      }
    )
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
          className="w-72 sm:w-96"
          inputClassName="bg-white dark:bg-transparent"
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
          Tambah Materi
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
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
              {list.map((materi) => (
                <MateriCard
                  key={materi.id}
                  materi={materi}
                  onEdit={(materi) => doShowUbah(materi.id)}
                  onDelete={(materi) => setIdHapus(materi.id)}
                  onDetail={(materi) => doShowLihat(materi.id)}
                  onShare={() => {
                    if (materi.type === 'materi') doShowShareMateri(materi)
                    else doShowShareTugas(materi)
                  }}
                  onExport={(materi) => {
                    window?.open(
                      `${process.env.NEXT_PUBLIC_API_URL}/kategori-bank-ajar/${kategori?.id}/bank-ajar/${materi.id}/export?access_token=${jwt}`,
                      '_blank'
                    )
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-72">
              <Text size="sm" weight="medium">
                {search ? 'Materi tidak ditemukan' : 'Belum ada materi'}
              </Text>
            </div>
          )}

          {hasNextPage && <ContentLoader ref={refSentry} className="py-4" />}
        </div>
      )}

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

function ListItemShimmer() {
  return (
    <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
      {[...Array(4)].map((_, idx) => (
        <Card key={idx} shadow="sm" rounded="lg" className="flex flex-col">
          <div className="flex items-center mb-2">
            <Shimmer className="size-12 mr-2" />
            <Shimmer className="h-4 w-5/12 my-1" />
          </div>
          <Shimmer className="h-3 w-5/12 my-1.5" />
          <Shimmer className="h-2 w-8/12 my-1" />
          <div className="flex gap-x-2 mt-2">
            <Shimmer className="h-8 flex-1" />
            <Shimmer className="h-8 flex-1" />
          </div>
        </Card>
      ))}
    </div>
  )
}
