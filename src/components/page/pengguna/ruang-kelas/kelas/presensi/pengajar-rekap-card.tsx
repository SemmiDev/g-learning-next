import {
  DataType as DataSesiType,
  tableSesiAbsensiAction,
} from '@/actions/pengguna/ruang-kelas/presensi/pengajar/table-sesi-absensi'
import { Button, Card, Input, Shimmer, Text, Title } from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { useTableAsync } from '@/hooks/use-table-async'
import { mustBe } from '@/utils/must-be'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { BsCheck, BsChevronDown } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'
import { Dropdown } from 'rizzui'
import PengajarRekapPresensiDetailSesiSection from './pengajar-rekap-detail-sesi-section'
import PengajarRekapPresensiItem from './pengajar-rekap-item'

const sortData = {
  terbaru: 'Terbaru',
  terlawas: 'Terlawas',
}

type SortDataType = keyof typeof sortData

type PengajarRekapPresensiCardProps = {
  className?: string
}

export default function PengajarRekapPresensiCard({
  className,
}: PengajarRekapPresensiCardProps) {
  const [sesiAktif, setSesiAktif] = useState<DataSesiType>()

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

  if (isLoading) return <ShimmerCard className={className} />

  return (
    <Card className={className}>
      <Title as="h4" size="1.5xl" weight="semibold">
        Rekap Presensi Peserta
      </Title>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between">
            <Input
              size="sm"
              type="search"
              placeholder="Cari sesi belajar"
              clearable={true}
              prefix={
                <PiMagnifyingGlass size={20} className="text-gray-lighter" />
              }
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
                  onClick={() => setSesiAktif(item)}
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
        {/* <PengajarRekapPresensiListSesiSection
          sesiAktif={sesiAktif}
          onSelectSesi={(sesi) => setSesiAktif(sesi)}
          className="w-full lg:w-5/12"
        /> */}
        {sesiAktif && (
          <PengajarRekapPresensiDetailSesiSection
            sesiAktif={sesiAktif}
            className="w-full lg:w-7/12"
          />
        )}
      </div>
    </Card>
  )
}

function ShimmerCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <div className="pt-1.5">
        <Shimmer className="h-7 w-1/4" />
      </div>
      <div className="flex flex-wrap gap-4 mt-4 lg:flex-nowrap">
        <div className="w-full lg:w-5/12">
          <div className="flex justify-between space-x-2 mb-4">
            <Shimmer className="h-7 w-5/12" />
            <Shimmer className="h-7 w-2/12" />
          </div>
          <Card className="p-0">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-2 [&:not(:last-child)]:border-b border-b-gray-100"
              >
                <div className="flex flex-col space-y-3.5 flex-1 py-1.5">
                  <Shimmer className="h-3 w-1/3" />
                  <Shimmer className="h-2.5 w-1/2" />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </Card>
  )
}
