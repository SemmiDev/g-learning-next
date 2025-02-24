import { listSesiPembelajaranAction } from '@/actions/pengguna/ruang-kelas/sesi-pembelajaran/list'
import { ModalConfirm } from '@/components/ui'
import Loader from '@/components/ui/loader'
import { useShowModal } from '@/hooks/use-show-modal'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import UbahJenisAbsenSesiModal from './pengajar/modal/ubah-jenis-absen'
import UbahJudulSesiModal from './pengajar/modal/ubah-judul'
import SesiItemCard from './pengajar/sesi-item-card'

export default function PengajarSesiPembelajaranBody() {
  const [mulaiModal, setMulaiModal] = useState(false)
  const [akhiriModal, setAkhiriModal] = useState(false)
  const {
    show: showUbahJudul,
    key: keyUbahJudul,
    doShow: doShowUbahJudul,
    doHide: doHideUbahJudul,
  } = useShowModal<string>()
  const {
    show: showUbahAbsensi,
    key: keyUbahAbsensi,
    doShow: doShowUbahAbsensi,
    doHide: doHideUbahAbsensi,
  } = useShowModal<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.list',
    'pengajar',
    idKelas,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listSesiPembelajaranAction({ page, idKelas })

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

  const firstBelumMulai = list.find((item) => item.status === 'Belum Dibuka')

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  return (
    <>
      <div className="flex flex-col gap-y-2 mt-8 lg:w-7/12">
        {list.map((sesi, idx) => (
          <SesiItemCard
            key={idx}
            sesi={sesi}
            bisaMulai={sesi.id === firstBelumMulai?.id}
            onUbahJudul={() => doShowUbahJudul(sesi.id)}
            onUbahAbsensi={() => doShowUbahAbsensi(sesi.id)}
            onMulai={() => setMulaiModal(true)}
            onAkhiri={() => setAkhiriModal(true)}
          />
        ))}
        {!isLoading && hasNextPage && (
          <Loader ref={refSentry} size="sm" className="py-4" />
        )}
      </div>

      <UbahJudulSesiModal
        id={keyUbahJudul}
        show={showUbahJudul}
        onHide={doHideUbahJudul}
      />

      <UbahJenisAbsenSesiModal
        id={keyUbahAbsensi}
        show={showUbahAbsensi}
        onHide={doHideUbahAbsensi}
      />

      <ModalConfirm
        title="Mulai Sesi"
        isOpen={mulaiModal}
        onClose={() => setMulaiModal(false)}
        desc="Apakah anda yakin ingin memulai sesi pembelajaran?"
        confirm="Ya, mulai"
        closeOnCancel
        onConfirm={() => setMulaiModal(false)}
      />

      <ModalConfirm
        title="Akhiri Sesi"
        isOpen={akhiriModal}
        onClose={() => setAkhiriModal(false)}
        desc="Apakah anda yakin ingin mengakhiri sesi pembelajaran?"
        confirm="Ya, akhiri"
        closeOnCancel
      />
    </>
  )
}
