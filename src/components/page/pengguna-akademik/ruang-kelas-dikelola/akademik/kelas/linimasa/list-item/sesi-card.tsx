import {
  ActionIcon,
  Button,
  Card,
  CardSeparator,
  Text,
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import imagePhoto from '@public/images/photo.png'
import Image from 'next/image'
import Link from 'next/link'
import { BsPencil, BsThreeDots } from 'react-icons/bs'
import {
  LuBook,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
} from 'react-icons/lu'
import { Dropdown } from 'rizzui'

export default function SesiCard({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col px-0 py-0', className)}>
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex gap-x-3">
          <Image src={imagePhoto} alt="foto" className="size-12 rounded-lg" />
          <div className="flex flex-col">
            <Text weight="semibold" variant="dark">
              Prabroro Janggar mengakhiri sesi pembelajaran
            </Text>
            <Text size="xs" weight="medium" variant="lighter">
              30 Menit
            </Text>
          </div>
        </div>
        <Dropdown placement="bottom-end">
          <Dropdown.Trigger>
            <ActionIcon as="span" size="sm" variant="text">
              <BsThreeDots className="size-4" />
            </ActionIcon>
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
      <CardSeparator />
      <div className="flex flex-col px-4 py-2">
        <Title as="h4" size="1.5xl" weight="semibold" className="mb-1">
          Judul Sesi 1
        </Title>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-x-1">
            <LuPackage className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              Sesi 1
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuBook className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              4 Bahan Ajar
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
              13:00 - 15:00
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuMapPin className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              GB 202
            </Text>
          </div>
        </div>
      </div>
      <CardSeparator />
      <div className="p-2">
        <Link
          href={`${routes.penggunaAkademik.ruangKelasDikelola}/akademik/kelas/sesi-pembelajaran/detail`}
        >
          <Button size="sm" variant="outline-colorful" className="w-full">
            Lihat Detail Sesi
          </Button>
        </Link>
      </div>
    </Card>
  )
}
