import { DataType as DataSesiType } from '@/actions/pengguna/ruang-kelas/sesi-pembelajaran/list'
import { ActionIcon, Badge, Button, Text, Time } from '@/components/ui'
import Card from '@/components/ui/card'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import { parseDate } from '@/utils/date'
import { switchCaseObject } from '@/utils/switch-case'
import Link from 'next/link'
import { ComponentType, Dispatch, SetStateAction } from 'react'
import {
  BsCardChecklist,
  BsClipboardPlus,
  BsFileRichtext,
  BsPencil,
  BsThreeDots,
  BsWebcam,
} from 'react-icons/bs'
import { IconBaseProps } from 'react-icons/lib'
import {
  LuBook,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
} from 'react-icons/lu'
import { Dropdown, Popover } from 'rizzui'

type SesiItemCardProps = {
  sesi: DataSesiType
  bisaMulai?: boolean
  onUbahJudul?: () => void
  onUbahAbsensi?: () => void
  onMulai?: () => void
  onAkhiri?: () => void
  className?: string
}

export default function SesiItemCard({
  sesi,
  bisaMulai,
  onUbahJudul,
  onUbahAbsensi,
  onMulai,
  onAkhiri,
  className,
}: SesiItemCardProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const realisasi = parseDate(sesi.tanggal_realisasi)
  if (realisasi) realisasi.setHours(0, 0, 0, 0)

  const danger =
    !!realisasi &&
    today.getUTCMilliseconds() === realisasi.getUTCMilliseconds() &&
    sesi.status === 'Telah Berakhir'

  return (
    <Card className={cn('flex flex-col gap-y-1', className)}>
      <div className="flex justify-between items-start gap-x-2">
        <div className="flex items-center gap-x-2">
          <Text weight="semibold">{sesi.judul}</Text>
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
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger>
            <ActionIcon as="span" size="sm" variant="text">
              <BsThreeDots className="size-4" />
            </ActionIcon>
          </Dropdown.Trigger>
          <Dropdown.Menu className="w-64 divide-y !py-0">
            <div className="py-2">
              <Dropdown.Item className="text-gray-dark" onClick={onUbahJudul}>
                <BsPencil className="text-warning size-4 mr-2" />
                Ubah Judul Sesi
              </Dropdown.Item>
              <Dropdown.Item className="text-gray-dark" onClick={onUbahAbsensi}>
                <BsPencil className="text-warning size-4 mr-2" />
                Ubah Jenis Presensi Peserta
              </Dropdown.Item>
            </div>
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
        {!!sesi.total_bahan_ajar && (
          <div className="flex items-center gap-x-1">
            <LuBook className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              {sesi.total_bahan_ajar} Bahan Ajar
            </Text>
          </div>
        )}
        <div className="flex items-center gap-x-1">
          <LuCalendar className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {sesi.tanggal_realisasi ? (
              <Time date={sesi.tanggal_realisasi} format="dateday" />
            ) : (
              sesi.hari || '-'
            )}
          </Text>
        </div>
        <div className="flex items-center gap-x-1">
          <LuClock className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {sesi.waktu_mulai} - {sesi.waktu_sampai}
          </Text>
        </div>
        <div className="flex items-center gap-x-1">
          <LuMapPin className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {sesi.lokasi_pertemuan}
          </Text>
        </div>
      </div>
      <div className="flex gap-x-2 mt-4">
        <Popover>
          <Popover.Trigger>
            <Button size="sm" variant="outline-colorful" className="flex-1">
              Tambah Bahan Ajar
            </Button>
          </Popover.Trigger>
          <Popover.Content className="flex flex-col px-0 py-1">
            {({ setOpen }) => (
              <>
                <PopoverItem
                  title="Materi"
                  color="green"
                  Icon={BsFileRichtext}
                  setOpen={setOpen}
                />
                <PopoverItem
                  title="Tugas"
                  color="violet"
                  Icon={BsClipboardPlus}
                  setOpen={setOpen}
                />
                <PopoverItem
                  title="Ujian"
                  color="blue"
                  Icon={BsCardChecklist}
                  setOpen={setOpen}
                />
                <PopoverItem
                  title="Conference"
                  color="red"
                  Icon={BsWebcam}
                  setOpen={setOpen}
                />
              </>
            )}
          </Popover.Content>
        </Popover>
        {sesi.status === 'Sedang Berlangsung' ? (
          <Button size="sm" className="flex-1" onClick={onAkhiri}>
            Akhiri Sesi
          </Button>
        ) : sesi.status === 'Telah Berakhir' ? (
          <Link
            href={`${routes.pengguna.ruangKelas.dikelola.akademik}/${sesi.id_kelas}/sesi-pembelajaran/${sesi.id}`}
            className="flex-1"
          >
            <Button as="span" size="sm" className="w-full">
              Lihat Detail
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            disabled={!bisaMulai}
            className="flex-1"
            onClick={onMulai}
          >
            Mulai Sesi
          </Button>
        )}
      </div>
    </Card>
  )
}

function PopoverItem({
  title,
  color,
  Icon,
  setOpen,
  onClick,
}: {
  title: string
  color: 'green' | 'violet' | 'blue' | 'red' | 'indigo'
  Icon: ComponentType<IconBaseProps>
  setOpen: Dispatch<SetStateAction<boolean>>
  onClick?: () => void
}) {
  return (
    <button
      className="flex gap-x-2 px-2 py-1 hover:bg-muted/40"
      onClick={() => {
        onClick && onClick()
        setOpen(false)
      }}
    >
      <div
        className={cn(
          'flex justify-center items-center size-[1.375rem] rounded-sm',
          `btn-item-${color}`
        )}
      >
        <Icon className="size-2.5" />
      </div>
      <Text size="sm" weight="semibold">
        {title}
      </Text>
    </button>
  )
}
