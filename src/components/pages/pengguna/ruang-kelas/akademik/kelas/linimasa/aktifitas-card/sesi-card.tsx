import {
  ActionIcon,
  Button,
  Card,
  CardSeparator,
  Text,
  Thumbnail,
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useShowModal } from '@/hooks/use-show-modal'
import { DataType } from '@/services/api/pengguna/ruang-kelas/aktifitas/list'
import { DataType as DataKelasType } from '@/services/api/pengguna/ruang-kelas/lihat'
import cn from '@/utils/class-names'
import { switchCaseObject } from '@/utils/switch-case'
import { hourMinute } from '@/utils/text'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BsPencil, BsThreeDots } from 'react-icons/bs'
import {
  LuBook,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
} from 'react-icons/lu'
import { Dropdown } from 'rizzui'
import UbahJenisAbsenSesiModal from '../../sesi-pembelajaran/pengajar/modal/ubah-jenis-absen'
import UbahJudulSesiModal from '../../sesi-pembelajaran/pengajar/modal/ubah-judul'

type SesiCardProps = {
  kelas: DataKelasType | undefined
  data: DataType
  className?: string
}

export default function SesiCard({ kelas, data, className }: SesiCardProps) {
  const {
    show: showUbahJudul,
    key: keyUbahJudul,
    doShow: doShowUbahJudul,
    doHide: doHideUbahJudul,
  } = useShowModal<string>()
  const {
    show: showUbahAbsensi,
    key: keyUbahAbsensi,
    doShow: doShowUbahAbsensi,
    doHide: doHideUbahAbsensi,
  } = useShowModal<string>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const jenisKelas = kelas?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = kelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  const disableAbsensi = kelas?.pengaturan_absensi_dosen_simpeg

  if (!data.pertemuan_kelas) return null

  return (
    <>
      <Card className={cn('flex flex-col px-0 py-0', className)}>
        <div className="flex justify-between items-start px-4 py-2">
          <div className="flex gap-x-3">
            <Thumbnail
              src={data.pembuat?.foto}
              alt="profil"
              size={48}
              rounded="lg"
              avatar={data.pembuat?.nama}
            />
            <div className="flex flex-col">
              <Text weight="semibold" variant="dark">
                {data.pembuat?.nama}{' '}
                <small>
                  {switchCaseObject(
                    data.pertemuan_kelas.status,
                    {
                      'Sedang Berlangsung': 'memulai sesi pembelajaran',
                      'Telah Berakhir': 'mengakhiri sesi pembelajaran',
                    },
                    ''
                  )}
                </small>
              </Text>
              <Text size="xs" weight="medium" variant="lighter">
                <Time date={data.pertemuan_kelas.tanggal_realisasi} fromNow />
              </Text>
            </div>
          </div>
          {kelas?.peran === 'Pengajar' && (
            <Dropdown placement="bottom-end">
              <Dropdown.Trigger>
                <ActionIcon as="span" size="sm" variant="text">
                  <BsThreeDots className="size-4" />
                </ActionIcon>
              </Dropdown.Trigger>
              <Dropdown.Menu className="w-auto divide-y !py-0">
                <div className="py-2">
                  <Dropdown.Item
                    className="text-gray-dark"
                    onClick={() =>
                      doShowUbahJudul(data.pertemuan_kelas?.id || '')
                    }
                  >
                    <BsPencil className="text-warning size-4 mr-2" />
                    Ubah Judul Sesi
                  </Dropdown.Item>
                  {data?.pertemuan_kelas.status !== 'Telah Berakhir' &&
                    !disableAbsensi && (
                      <Dropdown.Item
                        className="text-gray-dark"
                        onClick={() =>
                          doShowUbahAbsensi(data.pertemuan_kelas?.id || '')
                        }
                      >
                        <BsPencil className="text-warning size-4 mr-2" />
                        Ubah Jenis Presensi Peserta
                      </Dropdown.Item>
                    )}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
        <CardSeparator />
        <div className="flex flex-col px-4 py-2">
          <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
            {data.pertemuan_kelas.judul || '-'}
          </Title>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-x-1">
              <LuPackage className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                Sesi {data.pertemuan_kelas.pertemuan}
              </Text>
            </div>
            <div className="flex items-center gap-x-1">
              <LuBook className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                {data.pertemuan_kelas.total_bahan_ajar} Bahan Ajar
              </Text>
            </div>
            <div className="flex items-center gap-x-1">
              <LuCalendar className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                <Time date="2025-02-13" format="dateday" />
              </Text>
            </div>
            <div className="flex items-center gap-x-1">
              <LuClock className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                {hourMinute(data.pertemuan_kelas.waktu_mulai)} -{' '}
                {hourMinute(data.pertemuan_kelas.waktu_sampai)}
              </Text>
            </div>
            <div className="flex items-center gap-x-1">
              <LuMapPin className="size-4 text-gray-lighter" />
              <Text size="sm" weight="medium">
                {data.pertemuan_kelas.lokasi_pertemuan || '-'}
              </Text>
            </div>
          </div>
        </div>
        <CardSeparator />
        <div className="p-2">
          <Link
            href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/sesi-pembelajaran/${data.pertemuan_kelas.id}`}
          >
            <Button size="sm" variant="outline-colorful" className="w-full">
              Lihat Detail Sesi
            </Button>
          </Link>
        </div>
      </Card>

      <UbahJudulSesiModal
        id={keyUbahJudul}
        show={showUbahJudul}
        onHide={doHideUbahJudul}
      />

      <UbahJenisAbsenSesiModal
        id={keyUbahAbsensi}
        show={showUbahAbsensi}
        onHide={doHideUbahAbsensi}
      />
    </>
  )
}
