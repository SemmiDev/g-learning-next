import {
  DataType as DataPresensiType,
  tablePresensiPesertaSesiAction,
} from '@/actions/pengguna/ruang-kelas/aktifitas/sesi/table-presensi-peserta'
import {
  ActionIcon,
  Badge,
  Card,
  CardSeparator,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useShowModal } from '@/hooks/use-show-modal'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { useParams } from 'next/navigation'
import { PiMagnifyingGlass } from 'react-icons/pi'
import DetailPresensiModal from '../modal/detail-presensi'
import PresensiCardShimmer from '../shimmer/presensi-card'

type PesertaPresensiCardProps = {
  className?: string
}

export default function PesertaPresensiCard({
  className,
}: PesertaPresensiCardProps) {
  const {
    show: showDetailPresensi,
    key: dataDetailPresensi,
    doShow: doShowDetailPresensi,
    doHide: doHideDetailPresensi,
  } = useShowModal<DataPresensiType>()

  const { kelas: idKelas, sesi: idSesi }: { kelas: string; sesi: string } =
    useParams()

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

  if (isLoading) return <PresensiCardShimmer className={className} />

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <Title as="h6" weight="semibold" className="leading-4 px-2 py-2">
          Presensi
        </Title>

        <div>
          {data.map((item) => {
            return (
              <div
                key={item.id_peserta}
                className="flex justify-between items-center gap-x-2 border-t-2 border-t-gray-100 px-2 py-4"
              >
                <div className="flex items-center gap-x-3">
                  <Thumbnail
                    src={item.foto || undefined}
                    alt="profil"
                    size={38}
                    rounded="md"
                    avatar={item.nama}
                    className="flex-shrink-0"
                  />
                  <div className="flex flex-col">
                    <Text size="sm" weight="semibold" variant="dark">
                      {item.nama}
                    </Text>
                    <Text size="2xs" weight="medium" variant="lighter">
                      {item.email}
                    </Text>
                  </div>
                </div>
                <div className="flex gap-x-4">
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

                  <ActionIcon
                    size="sm"
                    rounded="lg"
                    variant="outline-colorful"
                    className="rounded-lg"
                    onClick={() => doShowDetailPresensi(item)}
                  >
                    <PiMagnifyingGlass />
                  </ActionIcon>
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

      <DetailPresensiModal
        data={dataDetailPresensi}
        show={showDetailPresensi}
        onHide={doHideDetailPresensi}
      />
    </>
  )
}
