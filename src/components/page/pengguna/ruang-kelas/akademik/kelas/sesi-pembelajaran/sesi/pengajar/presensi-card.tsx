import { cekPresensiSemuaPesertaSesiAction } from '@/actions/pengguna/ruang-kelas/aktifitas/sesi/pengajar/cek-presensi-semua-peserta'
import { simpanPresensiPesertaSesiAction } from '@/actions/pengguna/ruang-kelas/aktifitas/sesi/pengajar/simpan-presensi-peserta'
import {
  DataType as DataPresensiType,
  tablePresensiPesertaSesiAction,
} from '@/actions/pengguna/ruang-kelas/aktifitas/sesi/table-presensi-peserta'
import { lihatSesiPembelajaranAction } from '@/actions/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import {
  ActionIcon,
  ActionIconTooltip,
  Badge,
  Button,
  Card,
  CardSeparator,
  ModalConfirm,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { routes } from '@/config/routes'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { mustBe } from '@/utils/must-be'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import _ from 'lodash'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import {
  BsCheck2All,
  BsFloppy2,
  BsPencil,
  BsQrCode,
  BsThreeDots,
  BsXSquare,
} from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'
import UbahJenisAbsenSesiModal from '../../pengajar/modal/ubah-jenis-absen'
import DetailPresensiModal from '../modal/detail-presensi'
import PresensiCardShimmer from '../shimmer/presensi-card'

const absensiStatus = ['Hadir', 'Izin', 'Sakit', 'Alpha'] as const

type AbsensiType = Record<string, (typeof absensiStatus)[number]>

type PengajarPresensiCardProps = {
  className?: string
}

export default function PengajarPresensiCard({
  className,
}: PengajarPresensiCardProps) {
  const queryClient = useQueryClient()
  const [ubahData, setUbahData] = useState(false)
  const [hadirSemua, setHadirSemua] = useState(false)
  const [dataPerubahan, setDataPerubahan] = useState<AbsensiType>({})
  const {
    show: showUbahAbsensi,
    key: keyUbahAbsensi,
    doShow: doShowUbahAbsensi,
    doHide: doHideUbahAbsensi,
  } = useShowModal<string>()
  const {
    show: showDetailPresensi,
    key: dataDetailPresensi,
    doShow: doShowDetailPresensi,
    doHide: doHideDetailPresensi,
  } = useShowModal<DataPresensiType>()

  const { kelas: idKelas, sesi: idSesi }: { kelas: string; sesi: string } =
    useParams()

  const { data: dataSesi } = useQuery({
    queryKey: [
      'pengguna.ruang-kelas.sesi-pembelajaran.lihat',
      'pengajar',
      idKelas,
      idSesi,
    ],
    queryFn: makeSimpleQueryDataWithParams(
      lihatSesiPembelajaranAction,
      idKelas,
      idSesi
    ),
  })

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.presensi',
    'pengajar',
    idKelas,
    idSesi,
  ]

  const {
    data,
    isLoading,
    isFetching,
    page,
    perPage,
    onPageChange,
    totalData,
  } = useTableAsync({
    queryKey,
    action: tablePresensiPesertaSesiAction,
    actionParams: { idKelas, idSesi },
    enabled: !!idKelas && !!idSesi,
  })

  type TableDataType = Awaited<
    ReturnType<typeof tablePresensiPesertaSesiAction>
  >['data']

  const handleSimpan = async () => {
    const dataAbsen = Object.keys(dataPerubahan).map((id) => ({
      id_peserta: id,
      status: mustBe(dataPerubahan[id], absensiStatus, 'Hadir'),
    }))

    await handleActionWithToast(
      simpanPresensiPesertaSesiAction(idKelas, idSesi, dataAbsen),
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
          setUbahData(false)
          setDataPerubahan({})
        },
      }
    )
  }

  const handleHadirSemua = async () => {
    const { data } = await cekPresensiSemuaPesertaSesiAction(idKelas, idSesi)
    const dataHadirSemua = (data?.list ?? []).reduce(
      (o, item) => ({ ...o, [item.id_peserta]: 'Hadir' }),
      {}
    )

    setDataPerubahan(dataHadirSemua)
    setHadirSemua(false)
  }

  const handleBatal = () => {
    setUbahData(false)
    setDataPerubahan({})
  }

  const handleShowQrCode = () => {
    window.open(
      `${routes.pengguna.ruangKelas.dikelola.akademik}/${idKelas}/sesi-pembelajaran/${idSesi}/qrcode`,
      'windowName',
      'location=no,menubar=no,toolbar=no,status=no'
    )
  }

  if (isLoading) return <PresensiCardShimmer className={className} />

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <div className="flex justify-between items-center flex-wrap gap-2 px-2 py-2">
          <div className="flex flex-col">
            <Title
              as="h6"
              weight="semibold"
              className="inline-flex items-center leading-4"
            >
              Presensi
              {dataSesi?.jenis_absensi_peserta === 'QR Code' && (
                <ActionIconTooltip
                  tooltip="Tampilkan QR Code"
                  size="sm"
                  variant="text-colorful"
                  className="w-5 h-auto ml-1"
                  onClick={handleShowQrCode}
                >
                  <BsQrCode />
                </ActionIconTooltip>
              )}
            </Title>
            {(dataSesi?.jenis_absensi_peserta === 'Manual' || ubahData) && (
              <Button
                size="sm"
                color="primary"
                variant="text-colorful"
                className="p-0"
                onClick={() => setHadirSemua(true)}
              >
                <BsCheck2All className="mr-1" />
                Tandai Semua Hadir
              </Button>
            )}
          </div>

          <div className="flex gap-x-2">
            {(dataSesi?.jenis_absensi_peserta === 'Manual' || ubahData) && (
              <div className="flex justify-end gap-2">
                {(!_.isEmpty(dataPerubahan) || ubahData) && (
                  <>
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
                  </>
                )}
              </div>
            )}

            {!ubahData && (
              <Dropdown placement="bottom-end">
                <Dropdown.Trigger>
                  <ActionIcon as="span" size="sm" variant="text">
                    <BsThreeDots className="size-4" />
                  </ActionIcon>
                </Dropdown.Trigger>
                <Dropdown.Menu className="w-52 divide-y !py-0">
                  <div className="py-2">
                    <Dropdown.Item
                      className="text-gray-dark"
                      onClick={() => doShowUbahAbsensi(idSesi)}
                    >
                      <BsPencil className="text-warning size-4 mr-2" />
                      Ubah Jenis Presensi
                    </Dropdown.Item>
                    {dataSesi?.jenis_absensi_peserta !== 'Manual' && (
                      <Dropdown.Item
                        className="text-gray-dark"
                        onClick={() => setUbahData(true)}
                      >
                        <BsPencil className="text-warning size-4 mr-2" />
                        Ubah Data Presensi
                      </Dropdown.Item>
                    )}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>

        <div>
          {data.map((item) => {
            const statusPeserta = dataPerubahan[item.id_peserta] ?? item.status

            return (
              <div
                key={item.id_peserta}
                className="flex justify-between items-center gap-x-2 border-t-2 border-t-gray-100 px-2 py-4"
              >
                <div className="flex items-center gap-x-3 min-w-0">
                  <Thumbnail
                    src={item.foto || undefined}
                    alt="profil"
                    size={38}
                    rounded="md"
                    avatar={item.nama}
                    className="flex-shrink-0"
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
                      {item.email}
                    </Text>
                  </div>
                </div>
                <div className="flex gap-x-4">
                  <div
                    className={cn({
                      'grid grid-cols-2 gap-2 shrink-0 xs:grid-cols-4':
                        dataSesi?.jenis_absensi_peserta === 'Manual' ||
                        ubahData,
                    })}
                  >
                    {dataSesi?.jenis_absensi_peserta === 'Manual' ||
                    ubahData ? (
                      absensiStatus.map((status) => (
                        <ActionIconTooltip
                          key={status}
                          tooltip={status}
                          size="sm"
                          rounded="lg"
                          variant={
                            statusPeserta === status ? 'solid' : 'outline'
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

                  {!ubahData && (
                    <ActionIcon
                      size="sm"
                      rounded="lg"
                      variant="outline-colorful"
                      className="rounded-lg shrink-0"
                      onClick={() => doShowDetailPresensi(item)}
                    >
                      <PiMagnifyingGlass />
                    </ActionIcon>
                  )}
                </div>
              </div>
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

      <UbahJenisAbsenSesiModal
        id={keyUbahAbsensi}
        show={showUbahAbsensi}
        onHide={doHideUbahAbsensi}
      />

      <DetailPresensiModal
        data={dataDetailPresensi}
        show={showDetailPresensi}
        onHide={doHideDetailPresensi}
      />

      <ModalConfirm
        title="Tandai Semua Hadir"
        desc="Apakah Anda yakin ingin menandai semua peserta menjadi hadir?"
        confirmColor="primary"
        isOpen={hadirSemua}
        onConfirm={handleHadirSemua}
        confirmLoading={true}
        onClose={() => setHadirSemua(false)}
        closeOnCancel
      />
    </>
  )
}
