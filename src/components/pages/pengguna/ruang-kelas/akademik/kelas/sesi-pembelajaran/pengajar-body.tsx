import { Button, ModalConfirm, Title } from '@/components/ui'
import ContentLoader from '@/components/ui/loader/content'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { listSesiPembelajaranApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/list'
import { akhiriSesiApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/akhiri-sesi'
import { hapusSesiApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/pengajar/hapus-sesi'
import { handleActionWithToast } from '@/utils/action'
import { useRouter } from '@bprogress/next/app'
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import TambahSesiModal from './pengajar/modal/tambah-sesi'
import UbahJenisAbsenSesiModal from './pengajar/modal/ubah-jenis-absen'
import UbahJudulSesiModal from './pengajar/modal/ubah-judul'
import UbahSesiModal from './pengajar/modal/ubah-sesi'
import PengajarSesiItemCard from './pengajar/sesi-item-card'
import DuplikatBahanAjar from './pengajar/duplikat-bahan-ajar'

export default function PengajarSesiPembelajaranBody() {
  const { jwt, processApi, makeSimpleApiQueryData } = useSessionJwt()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [showTambah, setShowTambah] = useState(false)
  const [idSesiMulai, setIdSesiMulai] = useState<string>()
  const [idSesiAkhiri, setIdSesiAkhiri] = useState<string>()
  const [idHapus, setIdHapus] = useState<string>()
  const {
    show: showUbahSesi,
    key: keyUbahSesi,
    doShow: doShowUbahSesi,
    doHide: doHideUbahSesi,
  } = useShowModal<string>()
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

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
  })

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

  const disableAbsensi = dataKelas?.pengaturan_absensi_dosen_simpeg
  const aksesTambahSesi = dataKelas?.pengaturan_tambah_pertemuan || false
  const aksesUbahSesi = dataKelas?.pengaturan_edit_pertemuan || false
  const aksesHapusSesi = dataKelas?.pengaturan_hapus_pertemuan || false

  return (
    <>
      <div className="flex flex-col gap-6 mt-8">
        <div className="flex justify-between gap-2 flex-wrap">
          <Title as="h3" size="1.5xl" weight="semibold">
            Sesi Pembelajaran
          </Title>
          <DuplikatBahanAjar />
        </div>
        <div className="flex flex-col gap-y-2 lg:w-7/12">
          {list.map((sesi, idx) => (
            <PengajarSesiItemCard
              key={idx}
              sesi={sesi}
              bisaMulai={sesi.id === firstBelumMulai?.id && !adaBerlangsung}
              lastSesi={
                !isFetchingNextPage && sesi.id === list[list.length - 1].id
              }
              disableAbsensi={disableAbsensi}
              enableUbahSesi={aksesUbahSesi}
              enableHapusSesi={aksesHapusSesi}
              onUbahSesi={() => doShowUbahSesi(sesi.id)}
              onUbahJudul={() => doShowUbahJudul(sesi.id)}
              onUbahAbsensi={() => doShowUbahAbsensi(sesi.id)}
              onHapus={() => setIdHapus(sesi.id)}
              onMulai={() => setIdSesiMulai(sesi.id)}
              onAkhiri={() => setIdSesiAkhiri(sesi.id)}
            />
          ))}
          {!isLoading &&
            (hasNextPage ? (
              <ContentLoader ref={refSentry} size="sm" className="py-4" />
            ) : (
              aksesTambahSesi && (
                <Button onClick={() => setShowTambah(true)}>Tambah Sesi</Button>
              )
            ))}
        </div>
      </div>

      {aksesTambahSesi && (
        <TambahSesiModal
          show={showTambah}
          onHide={() => setShowTambah(false)}
          listJenisAbsen={dataKelas?.pengaturan_absensi_peserta}
        />
      )}

      {aksesUbahSesi && (
        <UbahSesiModal
          id={keyUbahSesi}
          show={showUbahSesi}
          onHide={doHideUbahSesi}
          listJenisAbsen={dataKelas?.pengaturan_absensi_peserta}
          disableAbsensi={dataKelas?.pengaturan_absensi_dosen_simpeg}
        />
      )}

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

      {aksesHapusSesi && (
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
      )}

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
