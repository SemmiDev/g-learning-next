import { Badge, Button, Text, Time } from '@/components/ui'
import Card from '@/components/ui/card'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import Link from 'next/link'
import { ComponentType } from 'react'
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

export type SesiItemType = {
  judul: string
  sesi: number
  status: 'belum' | 'sedang' | 'selesai'
  jumlahBahanAjar?: number | null
  tanggal?: string | null
  hari?: string | null
  jamMulai: string
  jamSelesai: string
  ruangan: string
}

type SesiItemCardProps = {
  sesi: SesiItemType
  onMulaiSesi?: () => void
  onAkhiriSesi?: () => void
  className?: string
}

export default function SesiItemCard({
  sesi,
  onMulaiSesi,
  onAkhiriSesi,
  className,
}: SesiItemCardProps) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <div className="flex justify-between items-start gap-x-2">
        <div className="flex items-center gap-x-2">
          <Text weight="semibold">{sesi.judul}</Text>
          {(sesi.status !== 'belum' || sesi.sesi === 3) && (
            <Badge
              size="sm"
              variant="flat"
              color={
                sesi.status === 'sedang'
                  ? 'success'
                  : sesi.status === 'belum' && sesi.sesi === 3
                  ? 'danger'
                  : 'gray'
              }
            >
              {sesi.status === 'sedang'
                ? 'Sesi sedang berlangsung'
                : sesi.status === 'belum' && sesi.sesi === 3
                ? 'Sesi belum dimulai'
                : 'Sesi telah selesai'}
            </Badge>
          )}
        </div>
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger>
            <Button as="span" size="sm" variant="text" className="px-1 py-0">
              <BsThreeDots className="size-4" />
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Menu className="w-52 divide-y !py-0">
            <div className="py-2">
              <Dropdown.Item className="text-gray-dark">
                <BsPencil className="text-warning size-4 mr-2" />
                Ubah Judul Sesi
              </Dropdown.Item>
              <Dropdown.Item className="text-gray-dark">
                <BsPencil className="text-warning size-4 mr-2" />
                Ubah Jenis Presensi
              </Dropdown.Item>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-x-1">
          <LuPackage className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            Sesi {sesi.sesi}
          </Text>
        </div>
        {!!sesi.jumlahBahanAjar && (
          <div className="flex items-center gap-x-1">
            <LuBook className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              {sesi.jumlahBahanAjar} Bahan Ajar
            </Text>
          </div>
        )}
        <div className="flex items-center gap-x-1">
          <LuCalendar className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {sesi.tanggal ? (
              <Time date={sesi.tanggal} format="dateday" />
            ) : (
              sesi.hari
            )}
          </Text>
        </div>
        <div className="flex items-center gap-x-1">
          <LuClock className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {sesi.jamMulai} - {sesi.jamSelesai}
          </Text>
        </div>
        <div className="flex items-center gap-x-1">
          <LuMapPin className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {sesi.ruangan}
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
            <PopoverItem title="Materi" color="green" Icon={BsFileRichtext} />
            <PopoverItem title="Tugas" color="violet" Icon={BsClipboardPlus} />
            <PopoverItem title="Ujian" color="blue" Icon={BsCardChecklist} />
            <PopoverItem title="Conference" color="red" Icon={BsWebcam} />
          </Popover.Content>
        </Popover>
        {sesi.status === 'sedang' ? (
          <Button size="sm" className="flex-1" onClick={onAkhiriSesi}>
            Akhiri Sesi
          </Button>
        ) : sesi.status === 'selesai' ? (
          <Link
            href={`${routes.penggunaAkademik.ruangKelasDikelola}/akademik/kelas/sesi-pembelajaran/detail`}
            className="flex-1"
          >
            <Button as="span" size="sm" className="w-full">
              Lihat Detail
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            disabled={sesi.sesi !== 3}
            className="flex-1"
            onClick={onMulaiSesi}
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
  onClick,
}: {
  title: string
  color: 'green' | 'violet' | 'blue' | 'red' | 'indigo'
  Icon: ComponentType<IconBaseProps>
  onClick?: () => void
}) {
  return (
    <button
      className="flex gap-x-2 px-2 py-1 hover:bg-muted/40"
      onClick={() => onClick && onClick()}
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
