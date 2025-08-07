import {
  Button,
  Card,
  CardSeparator,
  ContentLoader,
  ModalConfirm,
  Shimmer,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { keluarkanAnggotaKelasApi } from '@/services/api/pengguna/ruang-kelas/anggota-kelas/pengajar/keluarkan'
import { listPermintaanBergabungKelasApi } from '@/services/api/pengguna/ruang-kelas/anggota-kelas/pengajar/list-permintaan-bergabung'
import { terimaAnggotaKelasApi } from '@/services/api/pengguna/ruang-kelas/anggota-kelas/pengajar/terima'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Checkbox } from 'rizzui'

type PengajarPermintaanBergabungCardProps = {
  className?: string
}

export default function PengajarPermintaanBergabungCard({
  className,
}: PengajarPermintaanBergabungCardProps) {
  const { jwt, processApi } = useSessionJwt()
  const queryClient = useQueryClient()

  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({})
  const [terimaDitandai, setTerimaDitandai] = useState(false)
  const [idTerima, setIdTerima] = useState<string>()
  const [idTolak, setIdTolak] = useState<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.anggota-kelas.permintaan-bergabung',
    'pengajar',
    idKelas,
  ]

  const queryKeyDaftarPeserta = [
    'pengguna.ruang-kelas.anggota-kelas.daftar-peserta',
    'pengajar',
    idKelas,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listPermintaanBergabungKelasApi({
        jwt,
        page,
        idKelas,
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

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

  const allCheck = Object.values(checkedIds)
  const isAllChecked =
    list.length === allCheck.length && allCheck.every((v) => v)
  const isSomeChecked = allCheck.some((v) => v)

  const handleCentangSemua = (checked: boolean) => {
    setCheckedIds(
      list.reduce((o, item) => ({ ...o, [item.id_peserta]: checked }), {})
    )
  }

  const handleTerimaDitandai = () => {
    if (!isSomeChecked) return

    const ids = Object.keys(_.pickBy(checkedIds, (v) => v))
    processTerima(ids)
  }

  const handleTerima = () => {
    if (!idTerima) return

    processTerima([idTerima])
  }

  const processTerima = async (ids: string[]) => {
    await handleActionWithToast(
      processApi(terimaAnggotaKelasApi, idKelas, ids),
      {
        loading: 'Menerima anggota...',
        onStart: () => {
          setTerimaDitandai(false)
          setIdTerima(undefined)
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey })
          queryClient.invalidateQueries({ queryKey: queryKeyDaftarPeserta })
        },
      }
    )
  }

  const handleTolak = async () => {
    if (!idTolak) return

    await handleActionWithToast(
      processApi(keluarkanAnggotaKelasApi, idKelas, idTolak),
      {
        loading: 'Mengeluarkan anggota...',
        onStart: () => setIdTolak(undefined),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey })
          queryClient.invalidateQueries({ queryKey: queryKeyDaftarPeserta })
        },
      }
    )
  }

  if (isLoading) return <CardShimmer className={className} />

  return (
    <>
      <Card className={cn('p-0 lg:sticky lg:right-0 lg:top-24', className)}>
        <div className="flex flex-col p-2">
          <Title as="h6" weight="semibold" className="leading-4">
            Permintaan Bergabung
          </Title>
          {list.length > 0 && (
            <Checkbox
              size="sm"
              label="Centang semua permintaan"
              className="text-gray-lighter text-xs w-fit mt-2"
              iconClassName="h-3 top-1"
              checked={isAllChecked}
              onChange={(e) => handleCentangSemua(e.target.checked)}
            />
          )}
        </div>
        <CardSeparator />
        <div className="flex flex-col max-h-[calc(100dvh-250px)] overflow-y-auto">
          {list.length > 0 ? (
            list.map((item) => {
              return (
                <label
                  key={item.id}
                  className="flex gap-x-2 p-2 hover:bg-gray-50/70"
                >
                  <Checkbox
                    size="sm"
                    iconClassName="h-3 top-1"
                    checked={!!checkedIds[item.id_peserta]}
                    onChange={(e) =>
                      setCheckedIds((prev) => ({
                        ...prev,
                        [item.id_peserta]: e.target.checked,
                      }))
                    }
                  />
                  <Thumbnail
                    src={item.foto || undefined}
                    alt="profil"
                    size={38}
                    rounded="md"
                    avatar={item.nama}
                  />
                  <div className="flex flex-col">
                    <Text size="sm" weight="semibold" variant="dark">
                      {item.nama}
                    </Text>
                    <Text size="2xs" weight="medium" variant="lighter">
                      {item.email || '-'}
                    </Text>
                    <div className="flex gap-x-2 mt-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIdTerima(item.id_peserta)
                        }}
                      >
                        Terima
                      </Button>
                      <Button
                        size="sm"
                        color="danger"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIdTolak(item.id_peserta)
                        }}
                      >
                        Tolak
                      </Button>
                    </div>
                  </div>
                </label>
              )
            })
          ) : (
            <Text size="sm" align="center" weight="medium" className="py-4">
              Belum ada permintaan
            </Text>
          )}
          {!isLoading && hasNextPage && (
            <ContentLoader ref={refSentry} size="sm" className="py-4" />
          )}
        </div>
        {list.length > 0 && (
          <>
            <CardSeparator />
            <div className="flex gap-x-2 p-2">
              <Button
                size="sm"
                className="flex-1"
                disabled={!isSomeChecked}
                onClick={() => setTerimaDitandai(true)}
              >
                Terima Ditandai
              </Button>
            </div>
          </>
        )}
      </Card>

      <ModalConfirm
        title="Terima Permintaan Bergabung"
        desc="Apakah Anda yakin ingin menerima permintaan bergabung di kelas anda?"
        isOpen={!!idTerima}
        onClose={() => setIdTerima(undefined)}
        onConfirm={handleTerima}
        closeOnCancel
      />

      <ModalConfirm
        title="Terima Permintaan Bergabung Ditandai"
        desc="Apakah Anda yakin ingin menerima permintaan bergabung peserta ditandai ini di kelas anda?"
        isOpen={terimaDitandai}
        onClose={() => setTerimaDitandai(false)}
        onConfirm={handleTerimaDitandai}
        closeOnCancel
      />

      <ModalConfirm
        title="Tolak Permintaan Bergabung"
        desc="Apakah Anda yakin ingin menolak permintaan bergabung di kelas anda?"
        color="danger"
        isOpen={!!idTolak}
        onClose={() => setIdTolak(undefined)}
        onConfirm={handleTolak}
        closeOnCancel
      />
    </>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('p-0', className)}>
      <div className="flex flex-col gap-y-2 px-2 py-2.5">
        <Shimmer className="h-3 w-1/2" />
        <div className="flex items-center gap-x-2 w-1/2">
          <Shimmer className="size-5" />
          <Shimmer className="h-2.5 flex-1" />
        </div>
      </div>
      <CardSeparator />
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="flex gap-x-2 flex-1 p-2">
          <Shimmer className="size-5" />
          <Shimmer className="size-10" />
          <div className="flex flex-col flex-1 gap-y-2 py-1">
            <Shimmer className="h-2.5 w-2/3" />
            <Shimmer className="h-2.5 w-1/2" />
            <div className="flex gap-x-2">
              <Shimmer className="h-7 w-14" />
              <Shimmer className="h-7 w-14" />
            </div>
          </div>
        </div>
      ))}
      <CardSeparator />
      <div className="px-2 py-2.5">
        <Shimmer className="h-7 w-full" />
      </div>
    </Card>
  )
}
