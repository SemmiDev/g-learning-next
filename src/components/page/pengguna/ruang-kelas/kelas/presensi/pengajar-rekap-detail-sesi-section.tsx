import { tableAbsensiPesertaAction } from '@/actions/pengguna/ruang-kelas/presensi/pengajar/table-absensi-peserta'
import { DataType as DataSesiType } from '@/actions/pengguna/ruang-kelas/presensi/pengajar/table-sesi-absensi'
import {
  Badge,
  Button,
  Card,
  CardSeparator,
  Input,
  Text,
  Thumbnail,
  TimeIndo,
} from '@/components/ui'
import TablePagination from '@/components/ui/controlled-async-table/pagination'
import { routes } from '@/config/routes'
import { useTableAsync } from '@/hooks/use-table-async'
import { switchCaseObject } from '@/utils/switch-case'
import { stripHtml } from '@/utils/text'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Fragment } from 'react'
import { BsDoorOpen, BsFileEarmarkExcel } from 'react-icons/bs'
import { PiMagnifyingGlass } from 'react-icons/pi'

type PengajarRekapDetailSesiSectionProps = {
  sesiAktif: DataSesiType
  className?: string
}

export default function PengajarRekapPresensiDetailSesiSection({
  sesiAktif,
  className,
}: PengajarRekapDetailSesiSectionProps) {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const strippedDesc = stripHtml(sesiAktif?.deskripsi ?? '')

  const linkTipe = switchCaseObject(
    sesiAktif?.tipe,
    {
      Materi: 'materi',
      Ujian: 'ujian',
      Konferensi: 'konferensi',
    },
    null
  )

  return (
    <div className={className}>
      <Card className="flex justify-between">
        <div>
          <Text weight="semibold" variant="dark">
            {sesiAktif?.judul}
          </Text>
          <Text
            size="sm"
            weight="medium"
            variant="lighter"
            className="line-clamp-2"
          >
            {strippedDesc.slice(0, 150)}
            {strippedDesc.length > 150 && '...'}
          </Text>
          <Text size="sm" weight="medium" variant="dark" className="mt-2">
            <TimeIndo
              date={sesiAktif?.created_at}
              format="datetimeday"
              empty="-"
            />
          </Text>
        </div>
        <div className="flex shrink-0">
          {linkTipe && (
            <Link
              href={`${routes.pengguna.ruangKelas}/${idKelas}/diskusi/${linkTipe}/${sesiAktif.id}`}
            >
              <Button as="span" size="sm" color="primary" variant="text">
                <BsDoorOpen className="mr-2" /> Lihat Sesi
              </Button>
            </Link>
          )}
          <Button size="sm" color="success" variant="text">
            <BsFileEarmarkExcel className="mr-2" /> Export
          </Button>
        </div>
      </Card>

      <DaftarAbsensiCard idAktifitas={sesiAktif?.id} />
    </div>
  )
}

function DaftarAbsensiCard({
  idAktifitas,
}: {
  idAktifitas: string | undefined
}) {
  const { kelas: idKelas }: { kelas: string } = useParams()

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
    queryKey: [
      'pengguna.ruang-kelas.presensi.table-absensi-peserta',
      'pengajar',
      idKelas,
      idAktifitas,
    ],
    action: tableAbsensiPesertaAction,
    actionParams: { idKelas, idAktifitas },
    enabled: !!idKelas && !!idAktifitas,
  })

  return (
    <Card className="p-0 mt-4">
      <Text weight="semibold" variant="dark" className="p-2">
        Daftar Hadir Peserta Kelas
      </Text>
      <CardSeparator />
      <div className="flex p-2">
        <Input
          size="sm"
          type="search"
          placeholder="Cari Nama"
          clearable={true}
          className="w-80"
          prefix={<PiMagnifyingGlass size={20} className="text-gray-lighter" />}
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          onClear={() => onSearch('')}
        />
      </div>
      <div>
        {data.map((item) => {
          return (
            <Fragment key={item.id_peserta}>
              <CardSeparator />
              <div className="flex justify-between items-center px-3 py-2">
                <div className="flex space-x-3">
                  <Thumbnail
                    src={item.foto || undefined}
                    alt="profil"
                    size={40}
                    rounded="md"
                    avatar={item.nama}
                  />
                  <div className="flex flex-col">
                    <Text size="sm" weight="semibold" variant="dark">
                      {item.nama}
                    </Text>
                    <Text size="2xs" weight="medium" variant="lighter">
                      {item.email || '-'}
                    </Text>
                  </div>
                </div>
                <div className="flex space-x-2">
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
