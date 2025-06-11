import { Badge, Card, Text, Time, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { hourMinute } from '@/utils/text'
import {
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
  LuUser,
} from 'react-icons/lu'
import { Tooltip } from 'rizzui'

type SesiCardProps = {
  className?: string
}

export default function SesiCard({ className }: SesiCardProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="flex justify-between gap-x-2 gap-y-1 flex-wrap pt-2 px-2">
        <Title as="h6" weight="semibold">
          Sistem Operasi
        </Title>
        <Badge size="sm" variant="flat" color="success">
          Sesi sedang berlangsung
        </Badge>
        {/* <Badge
              size="sm"
              variant="flat"
              color={
                data?.status === 'Sedang Berlangsung' ? 'success' : 'gray'
              }
            >
              {switchCaseObject(
                data?.status,
                {
                  'Sedang Berlangsung': 'Sesi sedang berlangsung',
                  'Belum Dibuka': 'Sesi belum dimulai',
                  'Telah Berakhir': 'Sesi telah selesai',
                },
                '-'
              )}
            </Badge> */}
      </div>
      <div className="overflow-x-scroll no-scrollbar m-2">
        <div className="flex gap-x-3 gap-y-1.5 min-w-0 w-fit">
          <div className="flex items-center gap-x-1 min-w-0">
            <LuUser className="size-4 text-gray-lighter shrink-0" />
            <Text
              size="sm"
              weight="medium"
              title="Febrian Chandra, S.H.,M.H"
              className="min-w-16 truncate"
            >
              Febrian Chandra, S.H.,M.H
            </Text>
          </div>
          <div className="flex items-center gap-x-1 shrink-0">
            <LuPackage className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              Sesi 6
            </Text>
          </div>
          <div className="flex items-center gap-x-1 shrink-0">
            <LuCalendar className="size-4 text-gray-lighter" />
            <Tooltip
              color="invert"
              content={
                <Time
                  date="2025-06-07T00:00:00.000Z"
                  format="dateday"
                  empty="-"
                />
              }
              placement="right"
            >
              <Text size="sm" weight="medium">
                <Time
                  date="2025-06-07T00:00:00.000Z"
                  customFormat="dddd"
                  empty="-"
                />
              </Text>
            </Tooltip>
          </div>
          <div className="flex items-center gap-x-1 shrink-0">
            <LuClock className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              {hourMinute('10:00:00')} - {hourMinute('13:00:00')}
            </Text>
          </div>
          <div className="flex items-center gap-x-1 shrink-0">
            <LuMapPin className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              GB202
            </Text>
          </div>
        </div>
      </div>
    </Card>
  )
}
