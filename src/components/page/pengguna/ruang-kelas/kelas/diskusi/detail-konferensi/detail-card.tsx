import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { DataType as KelasDataType } from '@/actions/pengguna/ruang-kelas/lihat'
import { Button, Card, CardSeparator, Komentar, Text } from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import cn from '@/utils/class-names'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import DetailCardShimmer from '../shimmer/detail-card'

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

  if (isLoading) return <DetailCardShimmer className={className} />

  if (data?.aktifitas.tipe !== 'Konferensi') return null

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="flex flex-col px-4 py-2">
        <Text size="lg" weight="semibold" variant="dark" className="mb-2">
          {data?.aktifitas.judul || '-'}
        </Text>
        <SanitizeHTML
          html={data?.aktifitas.deskripsi || '-'}
          className="text-sm"
        />
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
