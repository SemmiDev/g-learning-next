import {
  Badge,
  Button,
  Card,
  CardSeparator,
  ContentLoader,
  Text,
  Time,
  Title,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { listJadwalApi } from '@/services/api/pengguna/ruang-kelas/list-jadwal'
import cn from '@/utils/class-names'
import { switchCaseObject } from '@/utils/switch-case'
import { hourMinute } from '@/utils/text'
import { useInfiniteQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { LuClock, LuMapPin, LuPackage } from 'react-icons/lu'
import useInfiniteScroll from 'react-infinite-scroll-hook'

const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

type JadwalAkademikProps = {
  semester: string | null
  className?: string
}

export default function JadwalAkademik({
  semester,
  className,
}: JadwalAkademikProps) {
  const { jwt } = useSessionJwt()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [currentDay, setCurrentDay] = useState(today.getDay())

  const { jenis: jenisKelas }: { jenis: 'dikelola' | 'diikuti' } = useParams()

  const kategori = switchCaseObject(
    jenisKelas,
    {
      dikelola: 'Dikelola',
      diikuti: 'Diikuti',
    } as const,
    undefined
  )

  const queryKey = [
    'pengguna.ruang-kelas.list-jadwal',
    kategori,
    HARI[currentDay],
    semester,
  ]

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam: page }) => {
      const { data } = await listJadwalApi({
        jwt,
        page,
        kategori,
        hari: HARI[currentDay],
        semester: semester ?? undefined,
      })

      return {
        list: data?.list ?? [],
        pagination: data?.pagination,
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination?.hasNextPage
        ? (lastPage.pagination?.page ?? 1) + 1
        : undefined,
  })

  const list = data?.pages.flatMap((page) => page.list) ?? []

  const [refSentry] = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: fetchNextPage,
  })

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
      <Tanggal
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        className="mx-1 mb-1"
      />
      <CardSeparator />
      <div className="flex flex-col px-1">
        {isLoading ? (
          <ContentLoader className="py-4" />
        ) : list.length > 0 ? (
          <>
            {list.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-y-1 [&:not(:last-child)]:border-b border-b-muted px-1 py-3"
              >
                <div className="flex items-center flex-wrap gap-x-2">
                  <Text weight="semibold">
                    {item.nama_kelas} - {item.sub_judul}
                  </Text>
                  <div className="flex gap-x-2 gap-y-1 flex-wrap">
                    {item.status !== 'Belum Dibuka' && (
                      <Badge size="sm" variant="outline" color="gray">
                        {item.nama_pengajar}
                      </Badge>
                    )}
                    {item.status !== 'Belum Dibuka' && (
                      <Badge
                        size="sm"
                        variant="flat"
                        color={
                          item.status === 'Sedang Berlangsung'
                            ? 'success'
                            : 'danger'
                        }
                      >
                        {item.status === 'Sedang Berlangsung'
                          ? 'Sesi sedang berlangsung'
                          : 'Sesi telah selesai'}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  <div className="flex items-center gap-x-1">
                    <LuPackage className="size-4 text-gray-lighter" />
                    <Text size="sm" weight="medium">
                      Sesi {item.pertemuan}
                    </Text>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <LuClock className="size-4 text-gray-lighter" />
                    <Text size="sm" weight="medium">
                      {hourMinute(item.waktu_mulai)} -{' '}
                      {hourMinute(item.waktu_sampai)}
                    </Text>
                  </div>
                  <div className="flex items-center gap-x-1">
                    <LuMapPin className="size-4 text-gray-lighter" />
                    <Text size="sm" weight="medium">
                      {item.lokasi_pertemuan || '-'}
                    </Text>
                  </div>
                </div>
                <Link
                  href={`${routes.pengguna.ruangKelas[jenisKelas].akademik}/${item.id_kelas}/sesi-pembelajaran`}
                >
                  <Button
                    as="span"
                    size="sm"
                    variant="outline-colorful"
                    className="w-full mt-2"
                  >
                    Lihat Daftar Sesi
                  </Button>
                </Link>
              </div>
            ))}
            {!isLoading && hasNextPage && (
              <ContentLoader ref={refSentry} className="py-4" />
            )}
          </>
        ) : (
          <Text
            size="sm"
            weight="medium"
            variant="lighter"
            className="text-center my-4"
          >
            Belum ada jadwal
          </Text>
        )}
      </div>
    </Card>
  )
}

function Tanggal({
  currentDay,
  setCurrentDay,
  className,
}: {
  currentDay?: number
  setCurrentDay?: any
  className?: string
}) {
  const curr = new Date()
  curr.setHours(0, 0, 0, 0)

  const first = curr.getDate() - curr.getDay()

  return (
    <div className={cn('flex justify-between', className)}>
      {[...Array(7)].map((_, i) => {
        const date = new Date(curr)

        return (
          <TanggalItem
            key={i}
            date={new Date(date.setDate(first + i))}
            active={currentDay == i}
            onClick={() => setCurrentDay(i)}
          />
        )
      })}
    </div>
  )
}

function TanggalItem({
  date,
  active,
  onClick,
}: {
  date: Date
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      className="flex flex-col items-center gap-y-1 rounded w-full py-2 hover:bg-muted sm:px-2"
      onClick={onClick}
    >
      <Text
        size="sm"
        weight="semibold"
        color={active ? 'primary' : 'gray'}
        variant={active ? 'dark' : 'default'}
      >
        <span className="hidden sm:block">
          <Time date={date} customFormat="dddd" />
        </span>
        <span className="sm:hidden">
          <Time date={date} customFormat="ddd" />
        </span>
      </Text>
      <div
        className={cn(
          'flex justify-center items-center size-6 md:size-8',
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
