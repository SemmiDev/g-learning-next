'use client'

import { hapusBankSoalAction } from '@/actions/pengguna/bank-soal/hapus'
import { lihatKategoriBankSoalAction } from '@/actions/pengguna/bank-soal/kategori/lihat'
import { listBankSoalAction } from '@/actions/pengguna/bank-soal/list'
import { Button, Loader, ModalConfirm, Text, Title } from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
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
import TambahBankSoalModal from './modal/tambah-bank-soal'
import UbahBankSoalModal from './modal/ubah-bank-soal'
import SoalCard, { SoalType } from './soal-card'

export default function ListSoalBody() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [shareSoal, setShareSoal] = useState<SoalType>()
  const [showModalTambah, setShowModalTambah] = useState(false)
  const [idUbah, setIdUbah] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const { kategori: idKategori }: { kategori: string } = useParams()

  const { data: kategori } = useQuery({
    queryKey: ['pengguna.bank-soal.kategori.lihat', idKategori],
    queryFn: makeSimpleQueryDataWithId(lihatKategoriBankSoalAction, idKategori),
  })

  const queryKey = ['pengguna.bank-soal.list', idKategori]

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listBankSoalAction({
          page,
          search,
          params: {
            idKategori,
          },
        })

        return {
          list: (data?.list ?? []).map((item) => ({
            id: item.id,
            title: item.judul,
            desc: item.deskripsi,
            count: item.total_soal,
            time: item.created_at,
          })) as SoalType[],
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

    handleActionWithToast(hapusBankSoalAction(idKategori, idHapus), {
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
        Bank Soal {kategori?.nama_kategori ?? ''}
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
          Tambah Soal
        </Button>
      </div>

      {isLoading || (!list.length && isFetching) ? (
        <Loader height={300} />
      ) : list.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 mt-4 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4">
          {list.map((soal) => (
            <SoalCard
              key={soal.id}
              onEdit={(soal) => setIdUbah(soal.id)}
              onDelete={(soal) => setIdHapus(soal.id)}
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

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <Button onClick={() => fetchNextPage()}>
            Tampilkan Lebih banyak
          </Button>
        </div>
      )}

      <TambahBankSoalModal
        showModal={showModalTambah}
        setShowModal={setShowModalTambah}
      />

      <UbahBankSoalModal id={idUbah} setId={setIdUbah} />

      <ModalConfirm
        title="Hapus Bank Soal"
        desc="Apakah Anda yakin ingin menghapus bank soal ini?"
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
