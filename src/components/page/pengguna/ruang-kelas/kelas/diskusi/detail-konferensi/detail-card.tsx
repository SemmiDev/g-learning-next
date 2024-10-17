import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { DataType as KelasDataType } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  Komentar,
  Shimmer,
  Text,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

type DetailCardProps = {
  kelas?: KelasDataType
  className?: string
}

export default function DetailCard({ kelas, className }: DetailCardProps) {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.konferensi', idKelas, id],
    queryFn: async () => {
      const { data } = await lihatAktifitasAction(idKelas, id)
      return data
    },
  })

  if (isLoading) return <LoaderSkeleton />

  if (data?.aktifitas.tipe !== 'Konferensi') return null

  return (
    <Card className={cn('flex flex-col p-0 w-full lg:w-8/12', className)}>
      <div className="flex justify-between items-start px-4 py-2">
        <div className="flex flex-col">
          <Text size="lg" weight="semibold" variant="dark" className="mb-2">
            {data?.aktifitas.judul || '-'}
          </Text>
          <SanitizeHTML
            html={data?.aktifitas.deskripsi || '-'}
            className="text-sm"
          />
        </div>
      </div>
      <CardSeparator />
      <div className="flex p-2">
        {/* TODO: tampilkan link dari data API */}
        <Button size="sm" color="primary" className="w-full">
          {kelas?.peran === 'Pengajar'
            ? 'Mulai Conference'
            : 'Gabung Conference'}
        </Button>
      </div>
      <Komentar
        idKelas={idKelas}
        idAktifitas={id}
        firstShow={5}
        showPer={10}
        className="p-4"
      />
    </Card>
  )
}

function LoaderSkeleton() {
  return (
    <Card className="flex flex-col w-full p-0 lg:w-8/12">
      <div className="flex flex-col space-y-2 p-4">
        <Shimmer className="h-3.5 w-1/2" />
        <div className="flex flex-col space-y-2">
          {[...Array(12)].map((_, idx) => (
            <Shimmer
              key={idx}
              className={cn(
                'h-2.5',
                (idx + 1) % 6 === 0 ? 'w-1/3' : 'w-full',
                idx % 6 === 0 && '!mt-4'
              )}
            />
          ))}
        </div>
      </div>
      <CardSeparator />
      <div className="px-4 p-2">
        <Shimmer className="h-8 w-full" />
      </div>
    </Card>
  )
}
