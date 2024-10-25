import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { simpanAbsensiAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/simpan-absen'
import { tableAbsensiPesertaAction } from '@/actions/pengguna/ruang-kelas/presensi/pengajar/table-absensi-peserta'
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
  TimeIndo,
} from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { routes } from '@/config/routes'
import { useTableAsync } from '@/hooks/use-table-async'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { mustBe } from '@/utils/must-be'
import { switchCaseObject } from '@/utils/switch-case'
import { stripHtml } from '@/utils/text'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  BsDoorOpen,
  BsFileEarmarkExcel,
  BsFloppy2,
  BsPencil,
  BsXSquare,
} from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { utils, writeFile } from 'xlsx'

const absensiStatus = ['Hadir', 'Izin', 'Sakit', 'Alpha'] as const

type PengajarRekapDetailSesiSectionProps = {
  className?: string
}

export default function PengajarRekapPresensiDetailSesiSection({
  className,
}: PengajarRekapDetailSesiSectionProps) {
  const searchParams = useSearchParams()
  const idAktifitas = searchParams.get('sesi') || undefined
  const [ubahData, setUbahData] = useState(false)

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: sesiAktif } = useQuery({
    queryKey: [
      'pengguna.ruang-kelas.presensi.sesi-aktif',
      'pengajar',
      idKelas,
      idAktifitas,
    ],
    queryFn: async () => {
      if (!idAktifitas) return null

      const { data } = await lihatAktifitasAction(idKelas, idAktifitas)

      return data ?? null
    },
    enabled: !!idAktifitas,
  })

  const strippedDesc = stripHtml(sesiAktif?.aktifitas.deskripsi ?? '')

  const linkTipe = switchCaseObject(
    sesiAktif?.aktifitas.tipe,
    {
      Materi: 'materi',
      Ujian: 'ujian',
      Konferensi: 'konferensi',
    },
    null
  )

  const handleExport = useCallback(async () => {
    if (!idAktifitas) return

    const toastId = toast.loading(<Text>Memuat data...</Text>)

    let page = 1
    let allData: {
      Nama: string
      Email: string
      Status: string
    }[] = []

    const run = async (page: number) => {
      const { data } = await tableAbsensiPesertaAction({
        page,
        perPage: 100,
        params: { idKelas, idAktifitas },
      })

      allData = [
        ...allData,
        ...(data?.list ?? []).map((item) => ({
          Nama: item.nama,
          Email: item.email,
          Status: item.status || '-',
        })),
      ]

      return data?.pagination?.hasNextPage ?? false
    }

    while (await run(page)) {
      page++
    }

    toast.dismiss(toastId)

    const ws = utils.json_to_sheet(allData)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Data')
    writeFile(wb, `Data Absensi - ${sesiAktif?.aktifitas.judul}.xlsx`)
  }, [idKelas, idAktifitas, sesiAktif])

  useEffect(() => {
    setUbahData(false)
  }, [sesiAktif])

  if (!idAktifitas) return null

  return (
    <div className={className}>
      <Card className="flex justify-between">
        <div>
          <Text weight="semibold" variant="dark">
            {sesiAktif?.aktifitas.judul}
          </Text>
          <Text
            size="sm"
            weight="medium"
            variant="lighter"
            className="line-clamp-2"
          >
            {strippedDesc.slice(0, 150)}
            {strippedDesc.length > 150 && '...'}
          </Text>
          <Text size="sm" weight="medium" variant="dark" className="mt-2">
            <TimeIndo
              date={sesiAktif?.aktifitas.created_at}
              format="datetimeday"
              empty="-"
            />
          </Text>
        </div>
        <div className="flex shrink-0">
          {linkTipe && (
            <Link
              href={`${routes.pengguna.ruangKelas}/${idKelas}/diskusi/${linkTipe}/${idAktifitas}`}
            >
              <Button as="span" size="sm" color="primary" variant="text">
                <BsDoorOpen className="mr-2" /> Lihat Sesi
              </Button>
            </Link>
          )}
          <Button
            size="sm"
            color="success"
            variant="text"
            onClick={handleExport}
          >
            <BsFileEarmarkExcel className="mr-2" /> Export
          </Button>
          {!ubahData && (
            <Button
              size="sm"
              color="warning"
              variant="text"
              onClick={() => setUbahData(true)}
            >
              <BsPencil className="mr-2" /> Ubah
            </Button>
          )}
        </div>
      </Card>

      <DaftarAbsensiCard
        idAktifitas={idAktifitas}
        ubahData={ubahData}
        hideUbahData={() => setUbahData(false)}
        className="mt-4"
      />
    </div>
  )
}

function DaftarAbsensiCard({
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
        loading: 'Menyimpan absensi...',
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

  if (isLoading) return <ShimmerDaftarAbsensiCard className={className} />

  return (
    <Card className={cn('p-0', className)}>
      <Text weight="semibold" variant="dark" className="p-2">
        Daftar Hadir Peserta Kelas
      </Text>
      <CardSeparator />
      <div className="flex justify-between space-x-2 p-2">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Nama"
          clearable
          className="w-80"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onClear={() => onSearch('')}
        />
        {ubahData && (
          <div className="flex gap-2">
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
              <div className="flex justify-between items-center space-x-2 px-3 py-2">
                <div className="flex space-x-3">
                  <Thumbnail
                    src={item.foto || undefined}
                    alt="profil"
                    size={40}
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
                  </div>
                </div>
                <div className="flex space-x-2">
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
                          {status.substring(0, 1).toUpperCase()}
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

function ShimmerDaftarAbsensiCard({ className }: { className?: string }) {
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
          <div className="flex justify-between items-center space-x-2 px-3 py-2">
            <div key={idx} className="flex items-center space-x-3 flex-1">
              <Shimmer className="size-10" />
              <div className="flex-1 space-y-2">
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
