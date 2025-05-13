import { simpanAbsensiAktifitasAction } from '@/services/api/pengguna/ruang-kelas/aktifitas/pengajar/simpan-absen'
import { tableAbsensiPesertaAction } from '@/services/api/pengguna/ruang-kelas/presensi/umum/pengajar/table-absensi-peserta'
import {
  ActionIconTooltip,
  Badge,
  Button,
  Card,
  CardSeparator,
  Input,
  Shimmer,
  Text,
  Thumbnail,
} from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useTableAsync } from '@/hooks/use-table-async'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { mustBe } from '@/utils/must-be'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { BsFloppy2, BsXSquare } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'

const absensiStatus = ['Hadir', 'Izin', 'Sakit', 'Alpha'] as const

export default function PengajarRekapPresensiDaftarAbsensiCard({
  idAktifitas,
  ubahData,
  hideUbahData,
  className,
}: {
  idAktifitas: string
  ubahData: boolean
  hideUbahData: () => void
  className?: string
}) {
  const queryClient = useQueryClient()
  const [dataPerubahan, setDataPerubahan] = useState<Record<string, string>>({})
  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'pengguna.ruang-kelas.presensi.table-absensi-peserta',
    'pengajar',
    idKelas,
    idAktifitas,
  ]

  const {
    data,
    isLoading,
    isFetching,
    page,
    perPage,
    onPageChange,
    totalData,
    search,
    onSearch,
  } = useTableAsync({
    queryKey,
    action: tableAbsensiPesertaAction,
    actionParams: { idKelas, idAktifitas },
    enabled: !!idKelas && !!idAktifitas,
  })

  type TableDataType = Awaited<
    ReturnType<typeof tableAbsensiPesertaAction>
  >['data']

  useEffect(() => {
    setDataPerubahan({})
  }, [ubahData])

  const handleBatal = () => {
    hideUbahData()
    setDataPerubahan({})
  }

  const handleSimpan = async () => {
    const dataAbsen = Object.keys(dataPerubahan).map((id) => ({
      id_peserta: id,
      status: mustBe(dataPerubahan[id], absensiStatus, 'Hadir'),
    }))

    await handleActionWithToast(
      simpanAbsensiAktifitasAction(idKelas, idAktifitas, dataAbsen),
      {
        loading: 'Menyimpan presensi...',
        onSuccess: () => {
          queryClient.setQueryData(queryKey, (oldData: TableDataType) => ({
            ...oldData,
            list: (oldData?.list ?? []).map((item) => ({
              ...item,
              status: dataPerubahan[item.id_peserta] ?? item.status,
            })),
          }))
          queryClient.invalidateQueries({ queryKey })
          hideUbahData()
          setDataPerubahan({})
        },
      }
    )
  }

  if (isLoading) return <CardShimmer className={className} />

  return (
    <Card className={cn('p-0', className)}>
      <Text weight="semibold" variant="dark" className="p-2">
        Daftar Hadir Peserta Kelas
      </Text>
      <CardSeparator />
      <div className="flex flex-col justify-between gap-2 p-2 sm:flex-row">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Nama"
          className="max-w-80 flex-1"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          clearable
          onClear={() => onSearch('')}
        />
        {ubahData && (
          <div className="flex gap-2 place-self-end">
            <Button
              size="sm"
              color="gray"
              variant="outline"
              onClick={handleBatal}
            >
              <BsXSquare className="mr-2" /> Batal
            </Button>
            <Button size="sm" onClick={handleSimpan}>
              <BsFloppy2 className="mr-2" /> Simpan
            </Button>
          </div>
        )}
      </div>
      <div>
        {data.map((item) => {
          const statusPeserta = dataPerubahan[item.id_peserta] ?? item.status

          return (
            <Fragment key={item.id_peserta}>
              <CardSeparator />
              <div className="flex justify-between items-center gap-x-2 px-3 py-2">
                <div className="flex gap-x-3 min-w-0">
                  <Thumbnail
                    src={item.foto || undefined}
                    alt="profil"
                    size={40}
                    rounded="md"
                    avatar={item.nama}
                  />
                  <div className="flex flex-col min-w-0">
                    <Text
                      size="sm"
                      weight="semibold"
                      variant="dark"
                      className="truncate"
                    >
                      {item.nama}
                    </Text>
                    <Text
                      size="2xs"
                      weight="medium"
                      variant="lighter"
                      className="truncate"
                    >
                      {item.email || '-'}
                    </Text>
                  </div>
                </div>
                <div
                  className={cn({
                    'grid grid-cols-2 gap-2 shrink-0 xs:grid-cols-4': ubahData,
                  })}
                >
                  {ubahData ? (
                    absensiStatus.map((status) => (
                      <ActionIconTooltip
                        key={status}
                        tooltip={status}
                        size="sm"
                        rounded="lg"
                        variant={statusPeserta === status ? 'solid' : 'outline'}
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
                          if (statusPeserta === status) return

                          setDataPerubahan({
                            ...dataPerubahan,
                            [item.id_peserta]: status,
                          })
                        }}
                      >
                        <Text size="xs" weight="semibold">
                          {status.substring(0, 1)}
                        </Text>
                      </ActionIconTooltip>
                    ))
                  ) : (
                    <Badge
                      rounded="md"
                      variant="flat"
                      color={
                        item.status === 'Hadir'
                          ? 'primary'
                          : item.status === 'Izin'
                          ? 'success'
                          : item.status === 'Sakit'
                          ? 'warning'
                          : item.status === 'Alpha'
                          ? 'danger'
                          : 'gray'
                      }
                    >
                      {item.status || '-'}
                    </Badge>
                  )}
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>
      <CardSeparator />
      <TablePagination
        isLoading={isFetching}
        current={page}
        pageSize={perPage}
        total={totalData}
        onChange={(page) => onPageChange(page)}
      />
    </Card>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3.5 w-1/3" />
      </div>
      <CardSeparator />
      <div className="p-2">
        <Shimmer className="h-7 w-1/2" />
      </div>
      <CardSeparator />
      {[...Array(5)].map((_, idx) => (
        <Fragment key={idx}>
          <CardSeparator />
          <div className="flex justify-between items-center gap-x-2 px-3 py-2">
            <div key={idx} className="flex items-center gap-x-3 flex-1">
              <Shimmer className="size-10" />
              <div className="flex flex-col flex-1 gap-y-2">
                <Shimmer className="h-2.5 w-1/4" />
                <Shimmer className="h-2.5 w-1/5" />
              </div>
            </div>
            <Shimmer className="h-7 w-11" />
          </div>
        </Fragment>
      ))}
    </Card>
  )
}
