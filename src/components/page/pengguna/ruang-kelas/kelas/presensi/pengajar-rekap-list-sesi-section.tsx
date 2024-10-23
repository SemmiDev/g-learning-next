import {
  DataType as DataSesiType,
  tableSesiAbsensiAction,
} from '@/actions/pengguna/ruang-kelas/presensi/pengajar/table-sesi-absensi'
import { Button, Card, Input, Text } from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useTableAsync } from '@/hooks/use-table-async'
import { mustBe } from '@/utils/must-be'
import { useParams } from 'next/navigation'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'
import PengajarRekapPresensiItem from './pengajar-rekap-item'

const sortData = {
  terbaru: 'Terbaru',
  terlawas: 'Terlawas',
}

type SortDataType = keyof typeof sortData

type PengajarRekapPresensiListSesiSectionProps = {
  sesiAktif: DataSesiType | undefined
  onSelectSesi: (sesi: DataSesiType) => void
  className?: string
}

export default function PengajarRekapPresensiListSesiSection({
  sesiAktif,
  onSelectSesi,
  className,
}: PengajarRekapPresensiListSesiSectionProps) {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const {
    data,
    isLoading,
    isFetching,
    page,
    perPage,
    onPageChange,
    totalData,
    sort,
    onSort,
    search,
    onSearch,
  } = useTableAsync({
    queryKey: [
      'pengguna.ruang-kelas.presensi.list-sesi-absensi',
      'pengajar',
      idKelas,
    ],
    action: tableSesiAbsensiAction,
    /* TODO: initial sorting jika API sudah fix */
    initialSort: {},
    actionParams: { idKelas },
  })

  return (
    <div className={className}>
      <div className="flex justify-between">
        <Input
          size="sm"
          type="search"
          placeholder="Cari sesi belajar"
          clearable={true}
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onClear={() => onSearch('')}
        />
        <Dropdown>
          <Dropdown.Trigger>
            <Button as="span" size="sm" variant="outline">
              {
                sortData[
                  mustBe(
                    sort?.name,
                    ['terbaru', 'terlawas'] as const,
                    'terbaru'
                  )
                ]
              }{' '}
              <BsChevronDown className="ml-2 w-5" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            {Object.keys(sortData).map((key) => (
              <Dropdown.Item
                key={key}
                className="justify-between"
                /* TODO: aksi sorting jika API sudah fix */
                onClick={() => {}}
              >
                <Text size="sm">{sortData[key as SortDataType]}</Text>{' '}
                {(sort?.name ?? 'terbaru') === key && <BsCheck size={18} />}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <Card className="p-0 mt-2">
        {data.map((item) => {
          return (
            <PengajarRekapPresensiItem
              key={item.id}
              sesi={{
                id: item.id,
                judul: item.judul,
                waktu: item.created_at,
              }}
              active={sesiAktif?.id === item.id}
              onClick={() => onSelectSesi(item)}
            />
          )
        })}
      </Card>

      <TablePagination
        isLoading={isFetching}
        current={page}
        pageSize={perPage}
        total={totalData}
        onChange={(page) => onPageChange(page)}
      />
    </div>
  )
}
