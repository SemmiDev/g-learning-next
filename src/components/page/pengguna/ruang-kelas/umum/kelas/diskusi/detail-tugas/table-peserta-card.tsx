import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { hapusNilaiTugasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/hapus-nilai-tugas'
import { tableTugasPesertaAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/table-tugas-peserta'
import {
  ActionIcon,
  ActionIconTooltip,
  Button,
  Card,
  CardSeparator,
  Input,
  ModalConfirm,
  Shimmer,
  TableCellNumber,
  TableCellText,
  TableHeaderCell,
  Text,
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import ControlledAsyncTable from '@/components/ui/controlled-async-table'
import { routes } from '@/config/routes'
import { useTableAsync } from '@/hooks/use-table-async'
import { handleActionWithToast } from '@/utils/action'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ColumnsType } from 'rc-table'
import { useState } from 'react'
import { BiFilterAlt } from 'react-icons/bi'
import {
  BsCheck,
  BsChevronDown,
  BsPencil,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'

type SortDataType = {
  title: string
  sort: {
    name: string
    order: 'asc' | 'desc'
  }
}

const sortData: SortDataType[] = [
  {
    title: 'Abjad Nama',
    sort: {
      name: 'nama',
      order: 'asc',
    },
  },
  {
    title: 'Nilai Tertinggi',
    sort: {
      name: 'nilai',
      order: 'desc',
    },
  },
  {
    title: 'Nilai Terendah',
    sort: {
      name: 'nilai',
      order: 'asc',
    },
  },
]

const filterData = {
  ALL: 'Semua',
  SUDAH_MENGUMPULKAN: 'Sudah Mengumpulkan',
  BELUM_MENGUMPULKAN: 'Belum Mengumpulkan',
}

type FilterDataType = keyof typeof filterData

type TableTugasPesertaCardProps = {
  tipeKelas: 'akademik' | 'umum'
  className?: string
}

export default function TableTugasPesertaCard({
  tipeKelas,
  className,
}: TableTugasPesertaCardProps) {
  const queryClient = useQueryClient()
  const [idHapusNilai, setIdHapusNilai] = useState<string>()

  const { kelas: idKelas, id: idAktifitas }: { kelas: string; id: string } =
    useParams()

  const { data: dataAktifitas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.tugas', idKelas, idAktifitas],
    queryFn: makeSimpleQueryDataWithParams(
      lihatAktifitasAction,
      idKelas,
      idAktifitas
    ),
  })

  const queryKey = [
    'pengguna.ruang-kelas.diskusi.tugas.table-peserta',
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
    from,
    totalData,
    filters,
    updateFilter,
    sort,
    onSort,
    search,
    onSearch,
  } = useTableAsync({
    queryKey,
    action: tableTugasPesertaAction,
    actionParams: {
      idKelas,
      idAktifitas,
    },
    initialPerPage: 5,
    initialSort: sortData[0].sort,
    initialFilter: {
      status: 'ALL',
    },
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="No" className="justify-center" />,
      dataIndex: 'no',
      render: (_, __, idx) => <TableCellNumber>{from + idx}</TableCellNumber>,
    },
    {
      title: <TableHeaderCell title="Nama Peserta" />,
      render: (_, row) => (
        <div className="flex space-x-3">
          <Thumbnail
            src={row.foto || undefined}
            alt="profil"
            size={40}
            rounded="md"
            avatar={row.nama}
          />
          <div className="flex flex-col justify-center">
            <Text size="sm" weight="semibold" variant="dark">
              {row.nama}
            </Text>
            <Text
              size="2xs"
              weight="medium"
              variant="lighter"
              className="mt-0.5"
            >
              {row.email || '-'}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Waktu Pengumpulan" />,
      render: (_, row) => {
        const terlambat =
          !!dataAktifitas?.aktifitas.batas_waktu &&
          row.waktu_pengumpulan &&
          dataAktifitas?.aktifitas.batas_waktu < row.waktu_pengumpulan

        return (
          <TableCellText color={terlambat ? 'danger' : 'gray'}>
            <Time
              date={row.waktu_pengumpulan}
              customFormat="DD MMM YY"
              empty="-"
            />
            <br />
            <Time date={row.waktu_pengumpulan} format="time" empty="" />
          </TableCellText>
        )
      },
    },
    {
      title: <TableHeaderCell title="Nilai" className="justify-center" />,
      dataIndex: 'nilai',
      render: (value: string) => (
        <TableCellText align="center">{value ?? '-'}</TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="" />,
      render: (_, row) => {
        return (
          <div className="flex justify-end">
            {row.nilai === null ? (
              <Link
                href={`${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/tugas/${idAktifitas}/nilai/${row.id_peserta}`}
              >
                <Button
                  as="span"
                  size="sm"
                  variant="solid"
                  className="whitespace-nowrap"
                >
                  Cek Tugas
                </Button>
              </Link>
            ) : (
              <Dropdown placement="bottom-end">
                <Dropdown.Trigger>
                  <ActionIcon as="span" size="sm" variant="outline">
                    <BsThreeDotsVertical size={14} />
                  </ActionIcon>
                </Dropdown.Trigger>
                <Dropdown.Menu className="divide-y">
                  <div className="mb-2">
                    <Link
                      href={`${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/tugas/${idAktifitas}/nilai/${row.id_peserta}`}
                    >
                      <Dropdown.Item className="text-gray-dark">
                        <BsPencil className="text-warning size-4 mr-2" />
                        Ubah Nilai
                      </Dropdown.Item>
                    </Link>
                  </div>
                  <div className="mt-2 pt-2">
                    <Dropdown.Item
                      className="text-gray-dark"
                      onClick={() => setIdHapusNilai(row.id || undefined)}
                    >
                      <BsTrash3 className="text-danger size-4 mr-2" />
                      Hapus Nilai
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        )
      },
    },
  ]

  const sorting = sortData.find(
    (item) => item.sort.name === sort?.name && item.sort.order === sort?.order
  )

  const handleHapusNilai = async () => {
    if (!idHapusNilai) return

    handleActionWithToast(
      hapusNilaiTugasAction(idKelas, idAktifitas, idHapusNilai),
      {
        loading: 'Menghapus nilai...',
        success: 'Berhasil menghapus nilai peserta',
        onSuccess: () => {
          setIdHapusNilai(undefined)

          queryClient.invalidateQueries({ queryKey })
        },
      }
    )
  }

  if (isLoading) return <TablePesertaCardShimmer className={className} />

  return (
    <>
      <Card className={cn('flex flex-col p-0', className)}>
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Pengumpulan Tugas Peserta
        </Title>
        <CardSeparator />
        <div className="flex justify-between p-2">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Nama Peserta"
            clearable
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onClear={() => onSearch('')}
          />
          <div className="flex items-center space-x-2">
            <Dropdown>
              <Dropdown.Trigger>
                <Button as="span" size="sm" variant="outline">
                  {sorting && (
                    <>
                      {sorting?.title} <BsChevronDown className="ml-2 w-5" />
                    </>
                  )}
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                {sortData.map((item) => (
                  <Dropdown.Item
                    key={item.title}
                    className="justify-between"
                    onClick={() => onSort(item.sort.name, item.sort.order)}
                  >
                    <Text size="sm" className="text-left">
                      {item.title}
                    </Text>{' '}
                    {sort?.name === item.sort.name &&
                      sort?.order === item.sort.order && <BsCheck size={18} />}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Trigger>
                <ActionIconTooltip
                  tooltip="Filter"
                  as="span"
                  size="sm"
                  variant="outline"
                >
                  <BiFilterAlt size={16} />
                </ActionIconTooltip>
              </Dropdown.Trigger>
              <Dropdown.Menu>
                {Object.keys(filterData).map((key) => (
                  <Dropdown.Item
                    key={key}
                    className="justify-between"
                    onClick={() =>
                      updateFilter('status', key !== 'All' ? key : undefined)
                    }
                  >
                    <Text size="sm" className="text-left">
                      {filterData[key as FilterDataType]}
                    </Text>
                    {filters.status === key && <BsCheck size={18} />}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <ControlledAsyncTable
          data={data}
          isLoading={isLoading}
          isFetching={isFetching}
          columns={tableColumns}
          rowKey={(row) => row.id_aktifitas + row.id_peserta}
          paginatorOptions={{
            current: page,
            pageSize: perPage,
            total: totalData,
            onChange: (page) => onPageChange(page),
          }}
          variant="elegant"
        />
      </Card>

      <ModalConfirm
        title="Hapus Nilai"
        desc="Apakah Anda yakin ingin menghapus nilai tugas peserta ini?"
        color="danger"
        isOpen={!!idHapusNilai}
        onClose={() => setIdHapusNilai(undefined)}
        onConfirm={handleHapusNilai}
        headerIcon="help"
        closeOnCancel
      />
    </>
  )
}

function TablePesertaCardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="px-2 py-3">
        <Shimmer className="h-3.5 w-1/2" />
      </div>
      <CardSeparator />
      <div className="flex justify-between p-2">
        <Shimmer className="h-8 w-1/3" />
        <Shimmer className="h-8 w-1/3" />
      </div>
      <CardSeparator />
      <table className="[&_td]:border-b [&_td]:border-b-muted">
        <tbody>
          <tr>
            <td className="p-2.5">
              <Shimmer className="h-2.5 w-2.5" />
            </td>
            <td className="p-2.5">
              <Shimmer className="h-2.5 w-24" />
            </td>
            <td className="p-2.5">
              <Shimmer className="h-2.5 w-48" />
            </td>
            <td className="p-2.5">
              <Shimmer className="h-2.5 w-8" />
            </td>
            <td></td>
          </tr>
          {[...Array(5)].map((_, idx) => (
            <tr key={idx}>
              <td className="p-2.5">
                <Shimmer className="h-2.5 w-2.5" />
              </td>
              <td className="p-2.5">
                <div key={idx} className="flex items-center space-x-2">
                  <Shimmer className="size-10" />
                  <div className="flex-1 space-y-2">
                    <Shimmer className="h-2.5 w-1/2" />
                    <Shimmer className="h-2.5 w-1/3" />
                  </div>
                </div>
              </td>
              <td className="p-2.5">
                <div className="flex-1 space-y-2">
                  <Shimmer className="h-2.5 w-1/3" />
                  <Shimmer className="h-2.5 w-1/4" />
                </div>
              </td>
              <td className="p-2.5">
                <Shimmer className="h-2.5 w-8" />
              </td>
              <td className="p-2.5">
                {idx % 2 === 0 && <Shimmer className="h-6 w-8" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}
