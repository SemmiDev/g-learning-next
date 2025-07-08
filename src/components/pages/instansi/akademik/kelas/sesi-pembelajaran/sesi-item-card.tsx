import { Badge, Text, Time } from '@/components/ui'
import Card from '@/components/ui/card'
import { DataType as DataSesiType } from '@/services/api/instansi/akademik/kelas/sesi-pembelajaran/list'
import cn from '@/utils/class-names'
import { parseDate } from '@/utils/date'
import { switchCaseObject } from '@/utils/switch-case'
import { hourMinute } from '@/utils/text'
import {
  LuBook,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
} from 'react-icons/lu'

type PesertaSesiItemCardProps = {
  sesi: DataSesiType
  className?: string
}

export default function PesertaSesiItemCard({
  sesi,
  className,
}: PesertaSesiItemCardProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const realisasi = parseDate(sesi.tanggal_realisasi)
  if (realisasi) realisasi.setHours(0, 0, 0, 0)

  const danger =
    today.getTime() === realisasi?.getTime() && sesi.status === 'Telah Berakhir'

  return (
    <Card className={cn('flex flex-col gap-y-2', className)}>
      <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
        <Text weight="semibold">{sesi.judul}</Text>
        <div className="flex gap-x-2 gap-y-1 flex-wrap">
          {sesi.status !== 'Belum Dibuka' && (
            <Badge size="sm" variant="outline" color="gray">
              {sesi.nama_pengajar}
            </Badge>
          )}
          {sesi.status !== 'Belum Dibuka' && (
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
      <div className="flex flex-wrap gap-x-4 gap-y-1.5">
        <div className="flex items-center gap-x-1">
          <LuPackage className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            Sesi {sesi.pertemuan}
          </Text>
        </div>
        <div className="flex items-center gap-x-1">
          <LuBook className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium" color="gray">
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
    </Card>
  )
}
