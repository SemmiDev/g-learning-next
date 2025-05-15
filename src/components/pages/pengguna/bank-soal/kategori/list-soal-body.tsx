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
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { duplikatBankSoalApi } from '@/services/api/pengguna/bank-soal/duplikat'
import { hapusBankSoalApi } from '@/services/api/pengguna/bank-soal/hapus'
import { lihatKategoriBankSoalApi } from '@/services/api/pengguna/bank-soal/kategori/lihat'
import { listBankSoalApi } from '@/services/api/pengguna/bank-soal/list'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
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
import ShareBankSoalModal from './modal/share-soal-ujian'
import TambahBankSoalModal from './modal/tambah-bank-soal'
import UbahBankSoalModal from './modal/ubah-bank-soal'
import SoalCard, { SoalType } from './soal-card'

export default function ListSoalBody() {
  const { jwt } = useSessionJwt()
  const queryClient = useQueryClient()

  const [search, setSearch] = useState('')
  const {
    show: showShareSoalUjian,
    key: keyShareSoalUjian,
    doShow: doShowShareSoalUjian,
    doHide: doHideShareSoalUjian,
  } = useShowModal<SoalType>()
  const [showTambah, setShowTambah] = useState(false)
  const {
    show: showUbah,
    key: keyUbah,
    doShow: doShowUbah,
    doHide: doHideUbah,
  } = useShowModal<string>()
  const [idDuplikat, setIdDuplikat] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const { kategori: idKategori }: { kategori: string } = useParams()

  const { data: kategori } = useQuery({
    queryKey: ['pengguna.bank-soal.kategori.lihat', idKategori],
    queryFn: makeSimpleQueryDataWithParams(
      lihatKategoriBankSoalApi,
      jwt,
      idKategori
    ),
  })

  const queryKey = ['pengguna.bank-soal.list', idKategori]

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listBankSoalApi({
          jwt,
          page,
          search,
          params: {
            idKategori,
          },
        })

        return {
          list: (data?.list ?? []).map(
            (item) =>
              ({
                id: item.id,
                title: item.judul,
                desc: item.deskripsi,
                time: item.created_at,
                pilihanDigunakan: item.jumlah_soal_yang_digunakan,
                totalPilihan: item.total_soal_pilihan_ganda,
                totalEsai: item.total_soal_essay,
                used: !!item.total_aktifitas,
              } as SoalType)
          ),
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

  const handleDuplikat = () => {
    if (!idDuplikat) return

    handleActionWithToast(duplikatBankSoalApi(jwt, idKategori, idDuplikat), {
      loading: 'Menduplikat...',
      onStart: () => setIdDuplikat(undefined),
      onSuccess: () => queryClient.invalidateQueries({ queryKey }),
    })
  }

  const handleHapus = () => {
    if (!idHapus) return

    handleActionWithToast(hapusBankSoalApi(jwt, idKategori, idHapus), {
      loading: 'Menghapus...',
      onStart: () => setIdHapus(undefined),
      onSuccess: () => queryClient.invalidateQueries({ queryKey }),
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
        List Paket Soal - {kategori?.nama_kategori ?? ''}
      </Title>
      <div className="flex justify-between flex-wrap gap-2">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Paket Soal"
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
          Tambah Paket Soal
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
              {list.map((soal) => (
                <SoalCard
                  key={soal.id}
                  onShare={(soal) => doShowShareSoalUjian(soal)}
                  onEdit={(soal) => doShowUbah(soal.id)}
                  onDuplicate={(soal) => setIdDuplikat(soal.id)}
                  onDelete={
                    !soal.used ? (soal) => setIdHapus(soal.id) : undefined
                  }
                  soal={soal}
                />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-72">
              <Text size="sm" weight="medium">
                {search ? 'Soal tidak ditemukan' : 'Belum ada soal'}
              </Text>
            </div>
          )}

          {hasNextPage && <Loader ref={refSentry} className="py-4" />}
        </div>
      )}

      <TambahBankSoalModal show={showTambah} setShow={setShowTambah} />

      <UbahBankSoalModal show={showUbah} id={keyUbah} onHide={doHideUbah} />

      <ShareBankSoalModal
        show={showShareSoalUjian}
        soal={keyShareSoalUjian}
        onHide={doHideShareSoalUjian}
      />

      <ModalConfirm
        title="Duplikat Paket Soal"
        desc="Apakah Anda yakin ingin menduplikat paket soal ini?"
        color="info"
        isOpen={!!idDuplikat}
        onClose={() => setIdDuplikat(undefined)}
        onConfirm={handleDuplikat}
        headerIcon="help"
        confirm="Duplikat"
        cancel="Batal"
        closeOnCancel
      />

      <ModalConfirm
        title="Hapus Paket Soal"
        desc="Apakah Anda yakin ingin menghapus paket soal ini?"
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
          <Shimmer className="h-2 w-10/12 my-1" />
          <div className="flex gap-x-2 mt-2">
            <Shimmer className="h-8 flex-1" />
            <Shimmer className="h-8 flex-1" />
          </div>
        </Card>
      ))}
    </div>
  )
}
