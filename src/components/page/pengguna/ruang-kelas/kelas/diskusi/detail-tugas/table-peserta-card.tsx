import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { hapusNilaiTugasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/hapus-nilai-tugas'
import { tableTugasPesertaAction } from '@/actions/pengguna/ruang-kelas/aktifitas/pengajar/table-tugas-peserta'
import {
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
  BsThreeDots,
  BsTrash3,
} from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown, Tooltip } from 'rizzui'

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

export default function TableTugasPesertaCard() {
  const queryClient = useQueryClient()
  const [idHapusNilai, setIdHapusNilai] = useState<string>()

  const { kelas: idKelas, id: idAktifitas }: { kelas: string; id: string } =
    useParams()

  const { data: dataAktifitas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.tugas', idKelas, idAktifitas],
    queryFn: async () => {
      const { data } = await lihatAktifitasAction(idKelas, idAktifitas)
      return data
    },
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
      dataIndex: 'nama',
      render: (_: string, row) => (
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
            {/* TODO: data email */}
            <Text
              size="2xs"
              weight="medium"
              variant="lighter"
              className="mt-0.5"
            >
              -
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: <TableHeaderCell title="Waktu Pengumpulan" />,
      dataIndex: 'tanggal',
      render: (_: string, row) => {
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
      dataIndex: 'nilai',
      render: (_: string, row) => {
        if (!row.nilai) {
          return (
            <Link
              href={`${routes.pengguna.ruangKelas}/${idKelas}/tugas/${idAktifitas}/nilai/${row.id_peserta}`}
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
          )
        }

        return (
          <div className="flex justify-end">
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger>
                <Button as="span" size="sm" variant="outline">
                  <BsThreeDots size={18} />
                </Button>
              </Dropdown.Trigger>
              <Dropdown.Menu className="divide-y">
                <div className="mb-2">
                  <Link
                    href={`${routes.pengguna.ruangKelas}/${idKelas}/tugas/${idAktifitas}/nilai/${row.id_peserta}`}
                  >
                    <Dropdown.Item className="text-gray-dark">
                      <BsPencil className="text-warning mr-2 h-4 w-4" />
                      Ubah Nilai
                    </Dropdown.Item>
                  </Link>
                </div>
                <div className="mt-2 pt-2">
                  <Dropdown.Item
                    className="text-gray-dark"
                    onClick={() => setIdHapusNilai(row.id || undefined)}
                  >
                    <BsTrash3 className="text-danger mr-2 h-4 w-4" />
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
      hapusNilaiTugasAction(idKelas, idAktifitas, idHapusNilai),
      {
        loading: 'Menghapus berkas...',
        success: 'Berhasil menghapus nilai peserta',
        onSuccess: () => {
          setIdHapusNilai(undefined)

          queryClient.invalidateQueries({ queryKey })
        },
      }
    )
  }

  return (
    <>
      <Card className="flex flex-col flex-1 p-0">
        <Title as="h6" weight="semibold" className="px-2 py-3 leading-4">
          Pengumpulan Tugas Peserta
        </Title>
        <CardSeparator />
        <div className="flex justify-between p-2">
          <Input
            size="sm"
            type="search"
            placeholder="Cari Nama Peserta"
            clearable={true}
            prefix={
              <PiMagnifyingGlass size={20} className="text-gray-lighter" />
            }
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            onClear={() => onSearch('')}
          />
          <div className="flex space-x-2">
            <Dropdown>
              <Dropdown.Trigger>
                <Button as="span" size="sm" variant="outline">
                  {sorting && (
                    <>
                      {sorting.title} <BsChevronDown className="ml-2 w-5" />
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
                <Button as="span" size="sm" variant="outline">
                  <BiFilterAlt size={16} />
                </Button>
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
