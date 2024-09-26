import { tableJadwalAkanDatangAction } from '@/actions/pengguna/dashboard/table-jadwal-akan-datang'
import {
  Button,
  Card,
  CardSeparator,
  TableHeaderCell,
  Text,
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import { getWaktuIndonesia } from '@/utils/client-timezone'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { ColumnsType } from 'rc-table'

type JadwalAkanDatangCardProps = {
  className?: string
}
export default function JadwalAkanDatangCard({
  className,
}: JadwalAkanDatangCardProps) {
  const {
    data = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['pengguna.dashboard.table-kelas-akan-datang'],
    queryFn: async () => {
      const { data } = await tableJadwalAkanDatangAction()

      return data?.sort(
        (a, b) => Date.parse(a.tanggal_mulai) - Date.parse(b.tanggal_mulai)
      )
    },
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="Nama Kelas" />,
      dataIndex: 'nama_kelas',
      render: (value: string, row) => (
        <div className="flex items-center space-x-2">
          <Thumbnail
            src={row.thumbnail}
            alt="kelas"
            size={40}
            defaultImage={
              <RandomCoverImage
                persistentKey={row.id_kelas}
                alt="kelas"
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            }
          />
          <Text size="sm" weight="semibold" variant="dark">
            {value}
          </Text>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Hari dan Tanggal" />,
      dataIndex: 'tanggal_mulai',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          <Time date={value} format="dateday" />
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Jam" />,
      dataIndex: 'tanggal_mulai',
      render: (value: string, row) => (
        <Text size="sm" weight="medium" variant="dark">
          <Time date={value} format="time" /> -{' '}
          <Time date={row.tanggal_sampai} format="time" /> {getWaktuIndonesia()}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Instansi" />,
      dataIndex: 'nama_instansi',
      render: (value: string) => (
        <Text size="sm" weight="medium" variant="dark">
          {value}
        </Text>
      ),
    },
    {
      title: <TableHeaderCell title="Aksi" align="center" />,
      render: (_: string, row) => {
        return (
          <Link
            href={`${routes.pengguna.ruangKelas}/${row.id_kelas}`}
            className="flex justify-center"
          >
            <Button variant="text-colorful">Masuk Kelas</Button>
          </Link>
        )
      },
    },
  ]

  return (
    <Card className={cn(className)}>
      <Title as="h4" weight="semibold" className="p-2">
        Jadwal Kelas Akan Datang
      </Title>

      <CardSeparator />

      <ControlledAsyncTable
        data={data}
        isLoading={isLoading}
        isFetching={isFetching}
        columns={tableColumns}
        rowKey={(row) => row.id_kelas}
        variant="elegant"
        className={cn({
          '[&_.rc-table-content]:min-h-[382px]': data.length > 0,
        })}
        emptyText={
          <div className="flex flex-col justify-center items-center h-[310px] py-5 lg:py-8">
            {!isLoading && (
              <Text size="sm" weight="medium">
                Jadwal Masih Kosong
              </Text>
            )}
          </div>
        }
      />
    </Card>
  )
}
