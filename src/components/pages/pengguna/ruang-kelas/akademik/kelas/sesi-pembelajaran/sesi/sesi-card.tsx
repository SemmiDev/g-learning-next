import {
  Badge,
  Button,
  Card,
  Shimmer,
  Text,
  Time,
  Title,
} from '@/components/ui'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { useShowModal } from '@/hooks/use-show-modal'
import { DataType as DataKelasType } from '@/services/api/pengguna/ruang-kelas/lihat'
import { lihatSesiPembelajaranApi } from '@/services/api/pengguna/ruang-kelas/sesi-pembelajaran/lihat'
import cn from '@/utils/class-names'
import { switchCaseObject } from '@/utils/switch-case'
import { hourMinute } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { BsPencilSquare } from 'react-icons/bs'
import {
  LuBook,
  LuCalendar,
  LuClock,
  LuMapPin,
  LuPackage,
} from 'react-icons/lu'
import UbahJudulSesiModal from '../pengajar/modal/ubah-judul'

type SesiCardProps = {
  kelas: DataKelasType
  className?: string
}

export default function SesiCard({ kelas, className }: SesiCardProps) {
  const { makeSimpleApiQueryData } = useSessionJwt()

  const {
    show: showUbahJudul,
    key: keyUbahJudul,
    doShow: doShowUbahJudul,
    doHide: doHideUbahJudul,
  } = useShowModal<string>()

  const { kelas: idKelas, sesi: idSesi }: { kelas: string; sesi: string } =
    useParams()

  const queryKey = [
    'pengguna.ruang-kelas.sesi-pembelajaran.lihat',
    'pengajar',
    idKelas,
    idSesi,
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleApiQueryData(lihatSesiPembelajaranApi, idKelas, idSesi),
  })

  if (isLoading) return <CardShimmer className={className} />

  return (
    <>
      <Card className={cn('flex flex-col gap-y-2', className)}>
        <div className="flex justify-between gap-x-2">
          <div className="flex flex-wrap items-center gap-x-2">
            <Title as="h6" weight="semibold">
              {data?.judul || '-'}
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
          {kelas.peran === 'Pengajar' && (
            <Button
              size="sm"
              variant="text"
              color="warning"
              className="min-h-0 p-0 mt-1"
              onClick={() => doShowUbahJudul(idSesi)}
            >
              <BsPencilSquare className="size-3 mr-1" />{' '}
              <span className="hidden xs:inline">Ubah Judul Sesi</span>
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <div className="flex items-center gap-x-1">
            <LuPackage className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              Sesi {data?.pertemuan}
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuBook className="size-4 text-gray-lighter" />
            <Text
              size="sm"
              weight="medium"
              color={data?.total_bahan_ajar ? 'gray' : 'danger'}
            >
              {data?.total_bahan_ajar || '0'} Bahan Ajar
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuCalendar className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              <Time
                date={data?.tanggal_realisasi}
                format="dateday"
                empty={data?.hari || '-'}
              />
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuClock className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              {hourMinute(data?.waktu_mulai ?? '')} -{' '}
              {hourMinute(data?.waktu_sampai ?? '')}
            </Text>
          </div>
          <div className="flex items-center gap-x-1">
            <LuMapPin className="size-4 text-gray-lighter" />
            <Text size="sm" weight="medium">
              {data?.lokasi_pertemuan}
            </Text>
          </div>
        </div>
      </Card>

      {kelas.peran === 'Pengajar' && (
        <UbahJudulSesiModal
          id={keyUbahJudul}
          show={showUbahJudul}
          onHide={doHideUbahJudul}
        />
      )}
    </>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col gap-y-3', className)}>
      <div className="flex justify-between items-center gap-x-2 py-1">
        <Shimmer className="h-3.5 w-4/12" />
        <Shimmer className="h-2.5 w-2/12" />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 py-1">
        <Shimmer className="h-2.5 w-1/12" />
        <Shimmer className="h-2.5 w-2/12" />
        <Shimmer className="h-2.5 w-3/12" />
        <Shimmer className="h-2.5 w-2/12" />
        <Shimmer className="h-2.5 w-2/12" />
      </div>
    </Card>
  )
}
