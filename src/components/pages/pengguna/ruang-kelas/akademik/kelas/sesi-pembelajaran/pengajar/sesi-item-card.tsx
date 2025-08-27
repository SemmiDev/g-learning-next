import { ActionIcon, Badge, Button, Text, Time } from '@/components/ui'
import Card from '@/components/ui/card'
import { routes } from '@/config/routes'
import { useShowModal } from '@/hooks/use-show-modal'
import { DataType as DataSesiType } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/list'
import cn from '@/utils/class-names'
import { parseDate } from '@/utils/date'
import { switchCaseObject } from '@/utils/switch-case'
import { hourMinute } from '@/utils/text'
import Link from 'next/link'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsPencil,
  BsThreeDots,
  BsTrash3,
  BsWebcam,
} from 'react-icons/bs'
import {
  LuBook,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
} from 'react-icons/lu'
import { Dropdown, Popover } from 'rizzui'
import TambahKonferensiSesiModal from '../sesi/pengajar/modal/tambah-konferensi'
import TambahMateriSesiModal from '../sesi/pengajar/modal/tambah-materi'
import TambahTugasSesiModal from '../sesi/pengajar/modal/tambah-tugas'
import TambahUjianSesiModal from '../sesi/pengajar/modal/tambah-ujian'
import TambahBahanPopoverItem from './popover-item'

type PengajarSesiItemCardProps = {
  sesi: DataSesiType
  bisaMulai?: boolean
  lastSesi?: boolean
  disableAbsensi?: boolean
  enableUbahSesi?: boolean
  enableHapusSesi?: boolean
  onUbahSesi?: () => void
  onUbahJudul?: () => void
  onUbahAbsensi?: () => void
  onHapus?: () => void
  onMulai?: () => void
  onAkhiri?: () => void
  className?: string
}

export default function PengajarSesiItemCard({
  sesi,
  bisaMulai,
  lastSesi,
  disableAbsensi,
  enableUbahSesi,
  enableHapusSesi,
  onUbahSesi,
  onUbahJudul,
  onUbahAbsensi,
  onHapus,
  onMulai,
  onAkhiri,
  className,
}: PengajarSesiItemCardProps) {
  const {
    show: showTambahMateri,
    key: keyTambahMateri,
    doShow: doShowTambahMateri,
    doHide: doHideTambahMateri,
  } = useShowModal<string>()
  const {
    show: showTambahTugas,
    key: keyTambahTugas,
    doShow: doShowTambahTugas,
    doHide: doHideTambahTugas,
  } = useShowModal<string>()
  const {
    show: showTambahUjian,
    key: keyTambahUjian,
    doShow: doShowTambahUjian,
    doHide: doHideTambahUjian,
  } = useShowModal<string>()
  const {
    show: showTambahKonferensi,
    key: keyTambahKonferensi,
    doShow: doShowTambahKonferensi,
    doHide: doHideTambahKonferensi,
  } = useShowModal<string>()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const realisasi = parseDate(sesi.tanggal_realisasi)
  if (realisasi) realisasi.setHours(0, 0, 0, 0)

  const danger =
    today.getTime() === realisasi?.getTime() && sesi.status === 'Telah Berakhir'

  return (
    <>
      <Card className={cn('flex flex-col gap-y-2', className)}>
        <div className="flex justify-between items-start gap-x-2">
          <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
            <Text weight="semibold">{sesi.judul}</Text>
            <div className="flex gap-x-2 gap-y-1 flex-wrap">
              {sesi.status !== 'Belum Dibuka' && (
                <Badge size="sm" variant="outline" color="gray">
                  {sesi.nama_pengajar}
                </Badge>
              )}
              {(sesi.status !== 'Belum Dibuka' || bisaMulai) && (
                <Badge
                  size="sm"
                  variant="flat"
                  color={
                    sesi.status === 'Sedang Berlangsung'
                      ? 'success'
                      : danger
                      ? 'danger'
                      : 'gray'
                  }
                >
                  {switchCaseObject(
                    sesi.status,
                    {
                      'Sedang Berlangsung': 'Sesi sedang berlangsung',
                      'Belum Dibuka': 'Sesi belum dimulai',
                      'Telah Berakhir': 'Sesi telah selesai',
                    },
                    '-'
                  )}
                </Badge>
              )}
            </div>
          </div>
          <Dropdown placement="bottom-end">
            <Dropdown.Trigger>
              <ActionIcon as="span" size="sm" variant="text">
                <BsThreeDots className="size-4" />
              </ActionIcon>
            </Dropdown.Trigger>
            <Dropdown.Menu className="w-64 divide-y !py-0">
              <div className="py-2">
                {sesi.status === 'Belum Dibuka' && enableUbahSesi ? (
                  <Dropdown.Item
                    className="text-gray-dark"
                    onClick={onUbahSesi}
                  >
                    <BsPencil className="text-warning size-4 mr-2" />
                    Ubah Sesi
                  </Dropdown.Item>
                ) : (
                  <>
                    <Dropdown.Item
                      className="text-gray-dark"
                      onClick={onUbahJudul}
                    >
                      <BsPencil className="text-warning size-4 mr-2" />
                      Ubah Judul Sesi
                    </Dropdown.Item>

                    {sesi.status !== 'Telah Berakhir' && !disableAbsensi && (
                      <Dropdown.Item
                        className="text-gray-dark"
                        onClick={onUbahAbsensi}
                      >
                        <BsPencil className="text-warning size-4 mr-2" />
                        Ubah Jenis Presensi Peserta
                      </Dropdown.Item>
                    )}
                  </>
                )}
              </div>
              {lastSesi && enableHapusSesi && (
                <div className="py-2">
                  <Dropdown.Item className="text-gray-dark" onClick={onHapus}>
                    <BsTrash3 className="text-danger size-4 mr-2" />
                    Hapus Sesi
                  </Dropdown.Item>
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-x-1">
            <LuPackage className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              Sesi {sesi.pertemuan}
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuBook className="size-4 text-gray-lighter" />
            <Text
              size="sm"
              weight="medium"
              color={sesi.total_bahan_ajar ? 'gray' : 'danger'}
            >
              {sesi.total_bahan_ajar || '0'} Bahan Ajar
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuCalendar className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              <Time
                date={sesi.tanggal_realisasi}
                format="dateday"
                empty={sesi.hari || '-'}
              />
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuClock className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              {hourMinute(sesi.waktu_mulai)} - {hourMinute(sesi.waktu_sampai)}
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuMapPin className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              {sesi.lokasi_pertemuan || '-'}
            </Text>
          </div>
        </div>
        <div className="flex gap-x-2 mt-2">
          <div className="flex-1">
            <Popover>
              <Popover.Trigger>
                <Button size="sm" variant="outline-colorful" className="w-full">
                  Tambah Bahan Ajar
                </Button>
              </Popover.Trigger>
              <Popover.Content className="flex flex-col px-0 py-1">
                {({ setOpen }) => (
                  <>
                    <TambahBahanPopoverItem
                      title="Materi"
                      color="green"
                      Icon={BsFileRichtext}
                      setOpen={setOpen}
                      onClick={() => doShowTambahMateri(sesi.id)}
                    />
                    <TambahBahanPopoverItem
                      title="Tugas"
                      color="violet"
                      Icon={BsClipboardPlus}
                      setOpen={setOpen}
                      onClick={() => doShowTambahTugas(sesi.id)}
                    />
                    <TambahBahanPopoverItem
                      title="Ujian"
                      color="blue"
                      Icon={BsCardChecklist}
                      setOpen={setOpen}
                      onClick={() => doShowTambahUjian(sesi.id)}
                    />
                    <TambahBahanPopoverItem
                      title="Konferensi"
                      color="red"
                      Icon={BsWebcam}
                      setOpen={setOpen}
                      onClick={() => doShowTambahKonferensi(sesi.id)}
                    />
                  </>
                )}
              </Popover.Content>
            </Popover>
          </div>
          <div
            className={cn('flex flex-col gap-x-2 gap-y-1 flex-1', {
              'sm:flex-row sm:flex-2':
                sesi.status !== 'Telah Berakhir' && !disableAbsensi,
            })}
          >
            <Link
              href={`${routes.pengguna.ruangKelas.dikelola.akademik}/${sesi.id_kelas}/sesi-pembelajaran/${sesi.id}`}
              className="flex-1"
            >
              <Button
                as="span"
                size="sm"
                color={switchCaseObject(
                  sesi.status,
                  {
                    'Sedang Berlangsung': 'success',
                    'Telah Berakhir': 'primary',
                  } as const,
                  'info'
                )}
                className="w-full text-center"
              >
                Lihat Detail
              </Button>
            </Link>
            {sesi.status === 'Sedang Berlangsung' && !disableAbsensi ? (
              <Button size="sm" className="flex-1" onClick={onAkhiri}>
                Akhiri Sesi
              </Button>
            ) : (
              sesi.status === 'Belum Dibuka' && (
                <Button
                  size="sm"
                  disabled={!bisaMulai || disableAbsensi}
                  className="hidden flex-1 sm:block"
                  onClick={onMulai}
                >
                  Mulai Sesi
                </Button>
              )
            )}
          </div>
        </div>
      </Card>

      <TambahMateriSesiModal
        idSesi={keyTambahMateri}
        show={showTambahMateri}
        onHide={doHideTambahMateri}
      />

      <TambahTugasSesiModal
        idSesi={keyTambahTugas}
        show={showTambahTugas}
        onHide={doHideTambahTugas}
      />

      <TambahUjianSesiModal
        idSesi={keyTambahUjian}
        show={showTambahUjian}
        onHide={doHideTambahUjian}
      />

      <TambahKonferensiSesiModal
        idSesi={keyTambahKonferensi}
        show={showTambahKonferensi}
        onHide={doHideTambahKonferensi}
      />
    </>
  )
}
