import { dataPersentaseKehadiranAction } from '@/actions/pengguna/ruang-kelas/presensi/peserta/persentase-kehadiran'
import { Card, Shimmer, Text, Title } from '@/components/ui'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { PesertaChartPersentaseKehadiranData } from './chart-persentase-kehadiran'

const PesertaChartPresensi = dynamic(
  () => import('./chart-persentase-kehadiran'),
  {
    ssr: false,
  }
)

const COLORS = ['#33C50E', '#F6B63B', '#3B82F6', '#F63B3B']

const defaultData: PesertaChartPersentaseKehadiranData[] = [
  { name: 'Hadir', value: 0 },
  { name: 'Izin', value: 0 },
  { name: 'Sakit', value: 0 },
  { name: 'Alpha', value: 0 },
]

type PesertaChartPresensiCardProps = {
  className?: string
}

export default function PesertaChartPersentaseKehadiranCard({
  className,
}: PesertaChartPresensiCardProps) {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data = defaultData, isLoading } = useQuery<
    PesertaChartPersentaseKehadiranData[]
  >({
    queryKey: [
      'pengguna.ruang-kelas.presensi.persentase-kehadiran',
      'peserta',
      idKelas,
    ],
    queryFn: async () => {
      const { data } = await dataPersentaseKehadiranAction(idKelas)

      /* TODO: buang parsing dan slicing data ketika API nya sudah diupdate */
      return [
        {
          name: 'Hadir',
          value: parseFloat(data?.persentase_hadir?.slice(0, -1) ?? '0'),
        },
        {
          name: 'Izin',
          value: parseFloat(data?.persentase_izin?.slice(0, -1) ?? '0'),
        },
        {
          name: 'Sakit',
          value: parseFloat(data?.persentase_sakit?.slice(0, -1) ?? '0'),
        },
        {
          name: 'Alpha',
          value: parseFloat(data?.persentase_alpha?.slice(0, -1) ?? '0'),
        },
      ]
    },
  })

  if (isLoading) return <CardShimmer />

  return (
    <Card className={className}>
      <Title as="h4" size="1.5xl" weight="semibold">
        Persentase Tingkat Kehadiran
      </Title>
      <div className="flex flex-col items-center">
        <div className="w-[200px] h-[200px]">
          <PesertaChartPresensi data={data} colors={COLORS} />
        </div>
        <div className="grid grid-cols-4 gap-2 lg:gap-6">
          {data.map((val, idx) => {
            return (
              <div key={idx}>
                <div className="flex space-x-1 items-center mb-1">
                  <div
                    className="rounded-xl w-3 h-3"
                    style={{ backgroundColor: COLORS[idx] }}
                  ></div>
                  <Text size="sm" weight="semibold">
                    {val.name}
                  </Text>
                </div>
                <Text size="1.5xl" weight="semibold" variant="dark">
                  {val.value.toFixed(2)}%
                </Text>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}

function CardShimmer({ className }: { className?: string }) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <div className="py-1.5">
        <Shimmer className="h-6 w-8/12" />
        <div className="flex flex-col items-center">
          <div className="flex justify-center p-5">
            <Shimmer
              className="flex justify-center items-center size-40"
              rounded="full"
            >
              <div className="size-24 bg-white rounded-full"></div>
            </Shimmer>
          </div>
          <div className="grid grid-cols-4 gap-2 lg:gap-6">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="flex flex-col space-y-2.5 w-14">
                <div className="flex items-center space-x-1.5">
                  <Shimmer className="size-3" rounded="full" />
                  <Shimmer className="h-4 w-1/2" />
                </div>
                <Shimmer className="h-5 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
