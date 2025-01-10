import {
  Badge,
  Button,
  Card,
  CardSeparator,
  Text,
  Time,
  Title,
} from '@/components/ui'
import cn from '@/utils/class-names'
import { useState } from 'react'
import { LuClock, LuMapPin, LuPackage } from 'react-icons/lu'
import { useWindowSize } from 'react-use'

type JadwalAkademikProps = {
  className?: string
}

export default function JadwalAkademik({ className }: JadwalAkademikProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <Card className={cn('p-0', className)}>
      <div className="flex flex-wrap justify-between items-center gap-x-2 p-2">
        <Title size="1.5xl" weight="semibold">
          Jadwal Minggu Ini
        </Title>
        <Text size="sm" weight="medium" variant="lighter">
          Tanggal hari ini: <Time date={today} />
        </Text>
      </div>
      <Tanggal />
      <CardSeparator />
      <div className="flex flex-col px-1">
        <JadwalItem
          kelas="Sistem Operasi"
          status="sedang"
          sesi={7}
          jamMulai="08:00"
          jamSelesai="10:00"
          ruangan="GB 202"
        />
        <CardSeparator />
        <JadwalItem
          kelas="Matematika Deskrit"
          status="selesai"
          sesi={6}
          jamMulai="08:00"
          jamSelesai="10:00"
          ruangan="GB 202"
        />
        <CardSeparator />
        <JadwalItem
          kelas="Basis Data"
          status="belum"
          sesi={9}
          jamMulai="08:00"
          jamSelesai="10:00"
          ruangan="GB 202"
        />
        <CardSeparator />
        <JadwalItem
          kelas="Jaringan Komputer"
          status="belum"
          sesi={6}
          jamMulai="08:00"
          jamSelesai="10:00"
          ruangan="GB 301"
        />
        <CardSeparator />
        <JadwalItem
          kelas="Rekayasa Perangkat Lunak"
          status="belum"
          sesi={7}
          jamMulai="10:00"
          jamSelesai="12:00"
          ruangan="AP 101"
        />
      </div>
    </Card>
  )
}

function JadwalItem({
  kelas,
  sesi,
  status,
  jamMulai,
  jamSelesai,
  ruangan,
  className,
}: {
  kelas: string
  sesi: number
  status: 'belum' | 'sedang' | 'selesai'
  jamMulai: string
  jamSelesai: string
  ruangan: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col px-1 py-2', className)}>
      <div className="flex gap-x-2">
        <Text weight="semibold">{kelas}</Text>
        {status !== 'belum' && (
          <Badge
            size="sm"
            variant="flat"
            color={status === 'sedang' ? 'success' : 'danger'}
          >
            {status === 'sedang'
              ? 'Sesi sedang berlangsung'
              : 'Sesi telah selesai'}
          </Badge>
        )}
      </div>
      <div className="flex gap-x-4 mt-1">
        <div className="flex items-center gap-x-1">
          <LuPackage className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            Sesi {sesi}
          </Text>
        </div>
        <div className="flex items-center gap-x-1">
          <LuClock className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {jamMulai} - {jamSelesai}
          </Text>
        </div>
        <div className="flex items-center gap-x-1">
          <LuMapPin className="size-4 text-gray-lighter" />
          <Text size="sm" weight="medium">
            {ruangan}
          </Text>
        </div>
      </div>
      <Button size="sm" variant="outline-colorful" className="w-full mt-3">
        Lihat Daftar Sesi
      </Button>
    </div>
  )
}

function Tanggal({ className }: { className?: string }) {
  const curr = new Date()
  curr.setHours(0, 0, 0, 0)

  const [currentDay, setCurrentDay] = useState(curr.getDay())

  const first = curr.getDate() - curr.getDay()

  return (
    <div className={cn('flex justify-between', className)}>
      {[...Array(7)].map((_, i) => {
        return (
          <TanggalItem
            key={i}
            date={new Date(curr.setDate(first + i))}
            active={currentDay == i}
          />
        )
      })}
    </div>
  )
}

function TanggalItem({ date, active }: { date: Date; active?: boolean }) {
  const size = useWindowSize()

  return (
    <button className="flex flex-col items-center gap-y-1 rounded w-full py-2 hover:bg-muted sm:px-2">
      <Text
        size="sm"
        weight="semibold"
        color={active ? 'primary' : 'gray'}
        variant={active ? 'dark' : 'default'}
      >
        <Time date={date} customFormat={size.width > 768 ? 'dddd' : 'ddd'} />
      </Text>
      <div
        className={cn(
          'flex justify-center items-center',
          size.width > 768 ? 'size-8' : 'size-6',
          active ? 'bg-primary rounded-full' : ''
        )}
      >
        <Text
          size="sm"
          weight="semibold"
          className={cn(active ? 'text-white' : 'text-gray')}
        >
          <Time date={date} customFormat="DD" />
        </Text>
      </div>
    </button>
  )
}
