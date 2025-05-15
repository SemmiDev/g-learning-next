import { Button, Card, CardSeparator, Komentar, Title } from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import { DataType as DataKelasType } from '@/services/api/pengguna/ruang-kelas/lihat'
import cn from '@/utils/class-names'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import DetailCardShimmer from '../shimmer/detail-card'

type DetailCardProps = {
  kelas?: DataKelasType
  className?: string
}

export default function DetailCard({ kelas, className }: DetailCardProps) {
  const { jwt } = useSessionJwt()

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const queryKey = ['pengguna.ruang-kelas.detail.konferensi', idKelas, id]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleQueryData(lihatAktifitasApi, jwt, idKelas, id),
  })

  if (isLoading) return <DetailCardShimmer className={className} />

  if (data?.aktifitas.tipe !== 'Konferensi') return null

  return (
    <Card className={cn('flex flex-col p-0', className)}>
      <div className="flex flex-col px-4 py-2">
        <Title size="1.5xl" weight="semibold" variant="dark" className="mb-2">
          {data?.aktifitas.judul || '-'}
        </Title>
        <SanitizeHTML
          html={data?.aktifitas.deskripsi || '-'}
          className="text-sm"
        />
      </div>
      <CardSeparator />
      <div className="p-2">
        <Link href={data.link_conference || '#'} target="_blank">
          <Button as="span" size="sm" color="primary" className="w-full">
            {kelas?.peran === 'Pengajar'
              ? 'Mulai Konferensi'
              : 'Gabung Konferensi'}
          </Button>
        </Link>
      </div>
      <Komentar
        idKelas={idKelas}
        idAktifitas={id}
        total={data.total_komentar}
        invalidateQueries={[queryKey]}
        firstShow={5}
        showPer={10}
        className="p-4"
      />
    </Card>
  )
}
