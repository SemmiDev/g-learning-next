import { Button, ModalConfirm } from '@/components/ui'
import Loader from '@/components/ui/loader'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { listSesiPembelajaranApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/list'
import { akhiriSesiApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/akhiri-sesi'
import { hapusSesiApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/hapus-sesi'
import { handleActionWithToast } from '@/utils/action'
import { useRouter } from '@bprogress/next/app'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import TambahSesiModal from './pengajar/modal/tambah-sesi'
import UbahJenisAbsenSesiModal from './pengajar/modal/ubah-jenis-absen'
import UbahJudulSesiModal from './pengajar/modal/ubah-judul'
import PengajarSesiItemCard from './pengajar/sesi-item-card'

export default function PengajarSesiPembelajaranBody() {
  const { jwt, processApi } = useSessionJwt()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [showTambah, setShowTambah] = useState(false)
  const [idSesiMulai, setIdSesiMulai] = useState<string>()
  const [idSesiAkhiri, setIdSesiAkhiri] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()
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

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ pageParam: page }) => {
        const { data } = await listSesiPembelajaranApi({ jwt, page, idKelas })

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
  const adaBerlangsung = !!list.find(
    (item) => item.status === 'Sedang Berlangsung'
  )

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  const handleHapus = async () => {
    if (!idHapus) return

    await handleActionWithToast(processApi(hapusSesiApi, idKelas, idHapus), {
      loading: 'Menghapus...',
      onSuccess: () => {
        setIdHapus(undefined)

        queryClient.invalidateQueries({ queryKey })
      },
    })
  }

  const handleAkhiriSesi = async () => {
    if (!idSesiAkhiri) return

    await handleActionWithToast(
      processApi(akhiriSesiApi, idKelas, idSesiAkhiri),
      {
        loading: 'Mengakhiri sesi...',
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey })
        },
        onFinish: () => setIdSesiAkhiri(undefined),
      }
    )
  }

  return (
    <>
      <div className="flex flex-col gap-y-2 mt-8 lg:w-7/12">
        {list.map((sesi, idx) => (
          <PengajarSesiItemCard
            key={idx}
            sesi={sesi}
            bisaMulai={sesi.id === firstBelumMulai?.id && !adaBerlangsung}
            lastSesi={
              !isFetchingNextPage && sesi.id === list[list.length - 1].id
            }
            onUbahJudul={() => doShowUbahJudul(sesi.id)}
            onUbahAbsensi={() => doShowUbahAbsensi(sesi.id)}
            onHapus={() => setIdHapus(sesi.id)}
            onMulai={() => setIdSesiMulai(sesi.id)}
            onAkhiri={() => setIdSesiAkhiri(sesi.id)}
          />
        ))}
        {!isLoading &&
          (hasNextPage ? (
            <Loader ref={refSentry} size="sm" className="py-4" />
          ) : (
            <Button onClick={() => setShowTambah(true)}>Tambah Sesi</Button>
          ))}
      </div>

      <TambahSesiModal show={showTambah} onHide={() => setShowTambah(false)} />

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
        title="Hapus Sesi"
        desc="Apakah Anda yakin ingin menghapus sesi ini?"
        color="danger"
        isOpen={!!idHapus}
        onClose={() => setIdHapus(undefined)}
        onConfirm={handleHapus}
        headerIcon="warning"
        closeOnCancel
      />

      <ModalConfirm
        title="Mulai Sesi"
        isOpen={!!idSesiMulai}
        onClose={() => setIdSesiMulai(undefined)}
        desc="Apakah anda yakin ingin memulai sesi pembelajaran?"
        confirm="Ya, mulai"
        closeOnCancel
        onConfirm={() => {
          router.push(
            `${routes.pengguna.ruangKelas.dikelola.akademik}/${idKelas}/sesi-pembelajaran/${idSesiMulai}/mulai`
          )
        }}
      />

      <ModalConfirm
        title="Akhiri Sesi"
        isOpen={!!idSesiAkhiri}
        onClose={() => setIdSesiAkhiri(undefined)}
        desc="Apakah anda yakin ingin mengakhiri sesi pembelajaran?"
        confirm="Ya, akhiri"
        closeOnCancel
        onConfirm={handleAkhiriSesi}
      />
    </>
  )
}
