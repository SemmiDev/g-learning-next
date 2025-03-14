import { tableKehadiranTerendahAction } from '@/actions/pengguna/ruang-kelas/presensi/akademik/pengajar/table-kehadiran-terendah'
import {
  Card,
  CardSeparator,
  Shimmer,
  TableHeaderCell,
  Text,
  Thumbnail,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { useTableAsync } from '@/hooks/use-table-async'
import cn from '@/utils/class-names'
import { useParams } from 'next/navigation'
import { ColumnsType } from 'rc-table'

type PengajarKehadiranTerendahCardProps = {
  className?: string
}

export default function PengajarKehadiranTerendahCard({
  className,
}: PengajarKehadiranTerendahCardProps) {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const {
    data,
    isLoading,
    isFetching,
    page,
    perPage,
    onPageChange,
    totalData,
  } = useTableAsync({
    queryKey: [
      'pengguna.ruang-kelas.presensi.kehadiran-terendah',
      'pengajar',
      idKelas,
    ],
    action: tableKehadiranTerendahAction,
    actionParams: { idKelas },
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="Nama Peserta" />,
      dataIndex: 'nama',
      render: (_, row) => (
        <div className="flex gap-x-3">
          <Thumbnail
            src={row.foto_pengguna || undefined}
            alt="profil"
            size={40}
            rounded="md"
            avatar={row.nama_pengguna}
          />
          <div className="flex flex-col justify-center">
            <Text size="sm" weight="semibold" variant="dark">
              {row.nama_pengguna}
            </Text>
            <Text
              size="2xs"
              weight="medium"
              variant="lighter"
              className="mt-0.5"
            >
              {row.email_pengguna || '-'}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Hadir" className="justify-center" />,
      dataIndex: 'total_hadir',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Izin" className="justify-center" />,
      dataIndex: 'total_izin',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Sakit" className="justify-center" />,
      dataIndex: 'total_sakit',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Alpha" className="justify-center" />,
      dataIndex: 'total_alpha',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark" className="text-center">
          {value}
        </Text>
      ),
    },
  ]

  if (isLoading) return <ShimmerCard className={className} />

  return (
    <Card className={cn(className)}>
      <Title as="h4" size="1.5xl" weight="semibold" className="m-2">
        Anggota Kelas dengan Jumlah Kehadiran Terendah
      </Title>
      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        variant="elegant"
        columns={tableColumns}
        rowKey={(row) => row.id_pengguna}
        paginatorOptions={{
          current: page,
          pageSize: perPage,
          total: totalData,
          onChange: (page) => onPageChange(page),
        }}
      />
    </Card>
  )
}

function ShimmerCard({ className }: { className?: string }) {
  return (
    <Card className={cn(className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3.5 w-8/12" />
      </div>
      <CardSeparator />
      <table className="w-full [&_td]:border-b [&_td]:border-b-muted">
        <tbody>
          <tr>
            <td width="50%" className="px-2.5 py-3.5">
              <Shimmer className="h-3 w-24" />
            </td>
            {[...Array(4)].map((_, idx) => (
              <td key={idx} className="p-2.5">
                <center>
                  <Shimmer className="h-2.5 w-10" />
                </center>
              </td>
            ))}
          </tr>
          {[...Array(5)].map((_, idx) => (
            <tr key={idx}>
              <td className="p-2.5">
                <div key={idx} className="flex items-center gap-x-2">
                  <Shimmer className="size-10" />
                  <div className="flex flex-col flex-1 gap-y-2">
                    <Shimmer className="h-2.5 w-1/2" />
                    <Shimmer className="h-2.5 w-1/3" />
                  </div>
                </div>
              </td>
              {[...Array(4)].map((_, idx) => (
                <td key={idx} className="p-2.5">
                  <center>
                    <Shimmer className="h-2.5 w-8" />
                  </center>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
