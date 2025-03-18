import { hapusNilaiUjianAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/hapus-nilai-ujian'
import { tableUjianPesertaAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/table-ujian-peserta'
import { DataType as DataKelasType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  ActionIcon,
  ActionIconTooltip,
  Button,
  Card,
  CardSeparator,
  Input,
  ModalConfirm,
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
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ColumnsType } from 'rc-table'
import { useState } from 'react'
import { BiFilterAlt } from 'react-icons/bi'
import {
  BsCheck,
  BsChevronDown,
  BsPencilSquare,
  BsThreeDotsVertical,
  BsTrash3,
} from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'
import TablePesertaCardShimmer from '../shimmer/table-peserta-card'

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
      name: 'skor_akhir',
      order: 'desc',
    },
  },
  {
    title: 'Nilai Terendah',
    sort: {
      name: 'skor_akhir',
      order: 'asc',
    },
  },
]

const filterData = {
  ALL: 'Semua',
  SUDAH_MENGUMPULKAN: 'Sudah Ujian',
  BELUM_MENGUMPULKAN: 'Belum Ujian',
}

type FilterDataType = keyof typeof filterData

type TableUjianPesertaCardProps = {
  className?: string
}

export default function TableUjianPesertaCard({
  className,
}: TableUjianPesertaCardProps) {
  const queryClient = useQueryClient()
  const [idHapusNilai, setIdHapusNilai] = useState<string>()

  const { kelas: idKelas, id: idAktifitas }: { kelas: string; id: string } =
    useParams()

  const kelas = queryClient.getQueryData<DataKelasType>([
    'pengguna.ruang-kelas.lihat',
    idKelas,
  ])

  const tipeKelas = kelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  const queryKey = [
    'pengguna.ruang-kelas.detail.ujian.table-peserta',
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
    action: tableUjianPesertaAction,
    actionParams: {
      idKelas,
      idAktifitas,
    },
    initialPerPage: 10,
    initialSort: sortData[0].sort,
    initialFilter: {
      status: 'ALL',
    },
  })

  const tableColumns: ColumnsType<(typeof data)[number]> = [
    {
      title: <TableHeaderCell title="No" className="justify-center" />,
      render: (_, __, idx) => <TableCellNumber>{from + idx}</TableCellNumber>,
    },
    {
      title: <TableHeaderCell title="Nama Peserta" />,
      render: (_, row) => (
        <div className="flex gap-x-3">
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
      title: <TableHeaderCell title="Waktu Mulai Pengerjaan" />,
      dataIndex: 'waktu_mulai',
      render: (value: string) => {
        return (
          <TableCellText>
            <Time date={value} customFormat="DD MMM YY" empty="-" />
            <br />
            <Time date={value} format="time" empty="" />
          </TableCellText>
        )
      },
    },
    {
      title: (
        <TableHeaderCell
          title="Nilai Pilgan"
          align="center"
          className="justify-center"
        />
      ),
      dataIndex: 'skor_akhir_pilihan_ganda',
      render: (value: number) => (
        <TableCellText align="center">{value ?? '-'}</TableCellText>
      ),
    },
    {
      title: (
        <TableHeaderCell
          title="Nilai Esai"
          align="center"
          className="justify-center"
        />
      ),
      dataIndex: 'skor_akhir_essay',
      render: (value: number, row) => (
        <TableCellText align="center">
          {row.status_penilaian_essay === 1 ? value : '-'}
        </TableCellText>
      ),
    },
    {
      title: <TableHeaderCell title="" />,
      render: (_, row) => {
        if (!row.id) return

        return (
          <div className="flex justify-end">
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger>
                <ActionIcon as="span" size="sm" variant="outline">
                  <BsThreeDotsVertical size={14} />
                </ActionIcon>
              </Dropdown.Trigger>
              <Dropdown.Menu className="w-40 divide-y !py-0">
                {row.status_penilaian_essay !== null && (
                  <div className="py-2">
                    <Link
                      href={`${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/ujian/${idAktifitas}/nilai/${row.id_peserta}`}
                    >
                      <Dropdown.Item className="text-gray-dark">
                        <BsPencilSquare
                          className={cn(
                            'size-4 mr-2',
                            row.status_penilaian_essay === 1
                              ? 'text-warning'
                              : 'text-primary'
                          )}
                        />
                        Cek Jawaban
                      </Dropdown.Item>
                    </Link>
                  </div>
                )}
                <div className="py-2">
                  <Dropdown.Item
                    className="text-gray-dark"
                    onClick={() => setIdHapusNilai(row.id_peserta)}
                  >
                    <BsTrash3 className="text-danger size-4 mr-2" />
                    Hapus Nilai
                  </Dropdown.Item>
                </div>
              </Dropdown.Menu>
            </Dropdown>
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
      hapusNilaiUjianAction(idKelas, idAktifitas, idHapusNilai),
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
          Peserta yang Mengikuti Ujian
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
          <div className="flex items-center gap-x-2">
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
                  tooltip={`Filter: ${
                    filterData[filters.status as FilterDataType]
                  }`}
                  tooltipPosition="left"
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
          rowKey={(row) => row.id_peserta}
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
        desc="Apakah Anda yakin ingin menghapus pengerjaan ujian/nilai peserta ini?"
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
