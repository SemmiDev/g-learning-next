import {
  Badge,
  Card,
  CardSeparator,
  Input,
  Shimmer,
  Text,
  Thumbnail,
} from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useTableAsync } from '@/hooks/use-table-async'
import { tableAbsensiPesertaApi } from '@/services/api/prodi-instansi/akademik/kelas/presensi/table-absensi-peserta'
import cn from '@/utils/class-names'
import { useParams } from 'next/navigation'
import { Fragment, useState } from 'react'
import { PiMagnifyingGlass } from 'react-icons/pi'

const absensiStatus = ['Hadir', 'Izin', 'Sakit', 'Alpha'] as const

export default function RekapPresensiDaftarAbsensiCard({
  idSesi,
  className,
}: {
  idSesi: string
  className?: string
}) {
  const [dataPerubahan, setDataPerubahan] = useState<Record<string, string>>({})
  const { kelas: idKelas }: { kelas: string } = useParams()

  const queryKey = [
    'prodi-instansi.akademik.kelas.presensi.table-absensi-peserta',
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
    search,
    onSearch,
  } = useTableAsync({
    queryKey,
    action: tableAbsensiPesertaApi,
    actionParams: { idKelas, idSesi },
    enabled: !!idKelas && !!idSesi,
  })

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
                <div>
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
