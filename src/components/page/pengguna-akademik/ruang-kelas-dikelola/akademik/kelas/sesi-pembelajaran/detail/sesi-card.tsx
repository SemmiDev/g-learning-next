import { Badge, Button, Card, Text, Time } from '@/components/ui'
import cn from '@/utils/class-names'
import { BsPencilSquare } from 'react-icons/bs'
import {
  LuBook,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
} from 'react-icons/lu'

type SesiCardProps = {
  className?: string
}

export default function SesiCard({ className }: SesiCardProps) {
  return (
    <Card className={cn('flex flex-col gap-y-2', className)}>
      <div className="flex justify-between gap-x-2">
        <div className="flex items-center gap-x-2">
          <Text weight="semibold">Judul Sesi 1</Text>
          <Badge size="sm" variant="flat" color="gray">
            Sesi telah selesai
          </Badge>
        </div>
        <Button
          size="sm"
          variant="text"
          color="warning"
          className="min-h-0 p-0 mt-1"
        >
          <BsPencilSquare className="size-3 mr-1" /> Ubah Judul Sesi
        </Button>
      </div>
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
    </Card>
  )
}
