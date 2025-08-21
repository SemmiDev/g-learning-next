import { Badge, Card, Text, Time, Title } from '@/components/ui'
import { DataType as DataSesiType } from '@/services/api/fakultas-instansi/akademik/list-linimasa-sesi'
import cn from '@/utils/class-names'
import { switchCaseObject } from '@/utils/switch-case'
import { hourMinute } from '@/utils/text'
import {
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
  LuUser,
} from 'react-icons/lu'

type SesiCardProps = {
  data: DataSesiType
  className?: string
}

export default function SesiCard({ data, className }: SesiCardProps) {
  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="flex justify-between items-center gap-x-2 gap-y-1 flex-wrap pt-2 px-2">
        <Title as="h6" weight="semibold">
          {data.nama_kelas}
        </Title>
        <Badge
          size="sm"
          variant="flat"
          color={data?.status === 'Sedang Berlangsung' ? 'success' : 'gray'}
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
        </Badge>
      </div>
      <div className="flex gap-x-3 gap-y-1.5 w-fit flex-wrap p-2">
        {data.id_pengajar && (
          <div className="flex items-center gap-x-1 min-w-32">
            <LuUser className="size-4 text-gray-lighter shrink-0" />
            <Text
              size="sm"
              weight="medium"
              title="Febrian Chandra, S.H.,M.H"
              className="min-w-16 truncate"
            >
              {data.nama_pengajar}
            </Text>
          </div>
        )}
        <div className="flex items-center gap-x-1 shrink-0">
          <LuPackage className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            Sesi {data.pertemuan}
          </Text>
        </div>
        <div className="flex items-center gap-x-1 shrink-0">
          <LuCalendar className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            <Time
              date={data?.tanggal_realisasi}
              format="dateday"
              empty={data?.hari || '-'}
            />
          </Text>
        </div>
        <div className="flex items-center gap-x-1 shrink-0">
          <LuClock className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {hourMinute(data.waktu_mulai)} - {hourMinute(data.waktu_sampai)}
          </Text>
        </div>
        <div className="flex items-center gap-x-1 shrink-0">
          <LuMapPin className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {data.lokasi_pertemuan || '-'}
          </Text>
        </div>
      </div>
    </Card>
  )
}
