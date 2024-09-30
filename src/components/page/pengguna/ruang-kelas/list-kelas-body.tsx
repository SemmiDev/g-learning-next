'use client'

import { hapusKelasAction } from '@/actions/pengguna/ruang-kelas/hapus'
import { listKelasAction } from '@/actions/pengguna/ruang-kelas/list'
import { Button, Loader, ModalConfirm, Text, Title } from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import KelasCard from './kelas-card'
import BuatKelasModal from './modal/buat-kelas'
import PengaturanKelasModal from './modal/pengaturan-kelas'

const queryKey = ['pengguna.ruang-kelas.list']

export default function ListKelasBody() {
  const queryClient = useQueryClient()
  const [showModalBuatKelas, setShowModalBuatKelas] = useState(false)
  const [idPengaturan, setIdPengaturan] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()

  const { data, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
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

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <Title
            as="h4"
            size="1.5xl"
            weight="semibold"
            className="leading-tight mb-3"
          >
            Semua Kelas yang Dikelola
          </Title>
          <Text size="sm" weight="semibold" variant="lighter">
            Semua kelas yang Kamu buat dan bisa dikelola
          </Text>
        </div>
        <Button size="sm" onClick={() => setShowModalBuatKelas(true)}>
          Buat Kelas
        </Button>
      </div>
      {isLoading || (!list.length && isFetching) ? (
        <Loader height={300} />
      ) : list.length > 0 ? (
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
              onPengaturan={(id) => setIdPengaturan(id)}
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

      <BuatKelasModal
        showModal={showModalBuatKelas}
        setShowModal={setShowModalBuatKelas}
      />

      <PengaturanKelasModal id={idPengaturan} setId={setIdPengaturan} />

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
    </>
  )
}
