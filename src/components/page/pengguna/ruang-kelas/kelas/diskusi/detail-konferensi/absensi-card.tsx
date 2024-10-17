import { listAbsensiAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/list-absen'
import { simpanAbsensiAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/simpan-absen'
import {
  ActionIconTooltip,
  Badge,
  Button,
  Card,
  CardSeparator,
  Loader,
  ModalConfirm,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import { handleActionWithToast } from '@/utils/action'
import { mustBe } from '@/utils/must-be'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Checkbox } from 'rizzui'

const absensiStatus = ['Hadir', 'Izin', 'Sakit', 'Alpha'] as const

type AbsensiType = Record<string, (typeof absensiStatus)[number] | null>

type AbsensiCardProps = {
  tipe: 'Manual' | null
}

export default function AbsensiCard({ tipe }: AbsensiCardProps) {
  const [absensi, setAbsensi] = useState<AbsensiType>({})
  const [hadirSemua, setHadirSemua] = useState(false)

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.diskusi.absensi', idKelas, id]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listAbsensiAktifitasAction({
        page,
        idKelas,
        id,
      })

      const list = data?.list ?? []

      setAbsensi((absensi) => ({
        ...absensi,
        ...list
          .filter((item) => !!item.status)
          .reduce(
            (o, item) => ({ ...o, [item.id_peserta]: item.status || null }),
            {}
          ),
      }))

      return {
        list,
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

  const handleHadirSemua = (simpan: boolean) => {
    if (tipe !== 'Manual') return

    const newAbsensi = list.reduce(
      (o, item) => ({ ...o, [item.id_peserta]: 'Hadir' }),
      {}
    )

    setAbsensi(newAbsensi)
    setHadirSemua(false)

    if (simpan) processSimpan(newAbsensi)
  }

  const isHadirSemua = Object.values(absensi).every(
    (status) => status === 'Hadir'
  )

  const handleSimpan = () => {
    processSimpan(absensi)
  }

  const processSimpan = async (data: AbsensiType) => {
    if (tipe !== 'Manual') return

    const dataAbsen = Object.keys(data).map((id) => ({
      id_peserta: id,
      status: mustBe(data[id], absensiStatus, 'Hadir'),
    }))

    await handleActionWithToast(
      simpanAbsensiAktifitasAction(idKelas, id, dataAbsen),
      {
        loading: 'Menyimpan absensi...',
      }
    )
  }

  return (
    <>
      <Card className="flex flex-col flex-1 p-0 sticky top-[90px] right-0">
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Anggota Kelas
        </Title>
        {isLoading ? (
          <Loader height={100} />
        ) : (
          <>
            {tipe === 'Manual' && list.length > 0 && (
              <div className="flex px-2 mb-4">
                <Checkbox
                  size="sm"
                  label="Tandai Hadir Semua"
                  className="text-gray-lighter text-xs"
                  iconClassName="h-3 top-1"
                  checked={hadirSemua || isHadirSemua}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setHadirSemua(true)
                    }
                  }}
                />
              </div>
            )}
            <CardSeparator />
            <div className="flex flex-col divide-y max-h-[calc(100dvh-250px)] overflow-y-auto">
              {list.map((peserta) => {
                return (
                  <div
                    key={peserta.id_peserta}
                    className="flex justify-between items-center border-muted p-2"
                  >
                    <div className="flex space-x-3">
                      <Thumbnail
                        src={peserta.foto || undefined}
                        alt="profil"
                        size={40}
                        rounded="md"
                        avatar={peserta.nama}
                        className="flex-shrink-0"
                      />
                      <div className="flex flex-col">
                        <Text size="sm" weight="semibold" variant="dark">
                          {peserta.nama}
                        </Text>
                        <Text size="2xs" weight="medium" variant="lighter">
                          {peserta.email}
                        </Text>
                      </div>
                    </div>
                    {!!tipe && (
                      <div className="flex space-x-2">
                        {tipe === 'Manual' ? (
                          absensiStatus.map((status) => (
                            <ActionIconTooltip
                              key={status}
                              tooltip={status}
                              as={tipe === 'Manual' ? 'button' : 'span'}
                              size="sm"
                              rounded="lg"
                              variant={
                                absensi[peserta.id_peserta] === status
                                  ? 'solid'
                                  : 'outline'
                              }
                              color={
                                status === 'Hadir'
                                  ? 'primary'
                                  : status === 'Izin'
                                  ? 'success'
                                  : status === 'Sakit'
                                  ? 'warning'
                                  : status === 'Alpha'
                                  ? 'danger'
                                  : 'gray'
                              }
                              onClick={() => {
                                if (tipe !== 'Manual') return

                                setAbsensi({
                                  ...absensi,
                                  [peserta.id_peserta]: status,
                                })
                              }}
                            >
                              <Text size="xs" weight="semibold">
                                {status.substring(0, 1).toUpperCase()}
                              </Text>
                            </ActionIconTooltip>
                          ))
                        ) : (
                          <Badge
                            rounded="md"
                            variant="flat"
                            color={
                              peserta.status === 'Hadir'
                                ? 'primary'
                                : peserta.status === 'Izin'
                                ? 'success'
                                : peserta.status === 'Sakit'
                                ? 'warning'
                                : peserta.status === 'Alpha'
                                ? 'danger'
                                : 'gray'
                            }
                          >
                            {peserta.status || '-'}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
              {!isLoading && hasNextPage && (
                <Loader
                  ref={refSentry}
                  size="sm"
                  className="border-muted py-4"
                />
              )}
            </div>
            {tipe === 'Manual' && (
              <>
                <CardSeparator />
                <div className="flex justify-end p-2">
                  <Button size="sm" onClick={handleSimpan}>
                    Simpan Presensi
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Card>

      <ModalConfirm
        title="Tandai Hadir Semua"
        desc="Apakah Anda yakin ingin menandai semua peserta menjadi hadir?"
        size="md"
        color="primary"
        confirmColor="primary"
        confirm="Ya dan Simpan"
        isOpen={hadirSemua}
        onClose={() => setHadirSemua(false)}
        onConfirm={() => handleHadirSemua(true)}
        headerIcon="help"
        closeOnCancel
        footerButtons={
          <div className="flex-1">
            <Button
              variant="solid"
              className="w-full"
              color="info"
              onClick={() => handleHadirSemua(false)}
            >
              Ya
            </Button>
          </div>
        }
      />
    </>
  )
}
