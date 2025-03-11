import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  Komentar,
  Shimmer,
  Text,
  TimeIndo,
} from '@/components/ui'
import { routes } from '@/config/routes'
import {
  makeSimpleQueryDataWithId,
  makeSimpleQueryDataWithParams,
} from '@/utils/query-data'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { BsDoorOpen } from 'react-icons/bs'
import PengajarRekapTugasDaftarPengumpulanCard from './rekap-daftar-pengumpulan-card'

type PengajarRekapTugasDetailSesiSectionProps = {
  className?: string
}

export default function PengajarRekapTugasDetailSesiSection({
  className,
}: PengajarRekapTugasDetailSesiSectionProps) {
  const searchParams = useSearchParams()
  const idAktifitas = searchParams.get('sesi') || undefined

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const queryKey = [
    'pengguna.ruang-kelas.tugas.sesi-aktif',
    'pengajar',
    idKelas,
    idAktifitas ?? null,
  ]

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: makeSimpleQueryDataWithParams(
      lihatAktifitasAction,
      idKelas,
      idAktifitas ?? null
    ),
    enabled: !!idAktifitas,
  })

  if (isLoading) return <ShimmerSection className={className} />

  if (!idAktifitas || !data) return null

  const tipeKelas = dataKelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  return (
    <div className={className}>
      <Card className="flex justify-between">
        <div>
          <Text weight="semibold" variant="dark">
            {data?.aktifitas.judul}
          </Text>
          <Text
            size="sm"
            weight="medium"
            variant="lighter"
            className="line-clamp-2"
          >
            {stripHtmlAndEllipsis(data?.aktifitas.deskripsi ?? '', 150)}
          </Text>
          <Text size="sm" weight="medium" variant="lighter" className="mt-2">
            Batas waktu pengumpulan
          </Text>
          <Text size="sm" weight="medium" variant="dark">
            <TimeIndo
              date={data?.aktifitas.batas_waktu}
              format="datetimeday"
              empty="-"
            />
          </Text>
        </div>
        <div className="flex flex-wrap justify-end">
          <Link
            href={`${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/diskusi/tugas/${idAktifitas}`}
          >
            <Button as="span" size="sm" color="primary" variant="text">
              <BsDoorOpen className="mr-2" /> Lihat Detail
            </Button>
          </Link>
        </div>
      </Card>

      <PengajarRekapTugasDaftarPengumpulanCard
        sesi={data}
        className="flex-1 mt-4"
      />

      <Card className="mt-4">
        <Komentar
          idKelas={idKelas}
          idAktifitas={idAktifitas}
          total={data.total_komentar}
          invalidateQueries={[queryKey]}
        />
      </Card>
    </div>
  )
}

function ShimmerSection({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Card className="flex justify-between space-x-6 py-4">
        <div className="flex flex-col flex-1 space-y-2.5">
          <Shimmer className="h-3 w-5/12" />
          <Shimmer className="h-2.5 w-10/12" />
          <Shimmer className="h-2.5 w-2/3" />
          <Shimmer className="h-2.5 w-4/12 !mt-4" />
          <Shimmer className="h-2.5 w-5/12" />
        </div>
        <div className="flex space-x-6 p-2">
          <Shimmer className="h-2.5 w-12" />
        </div>
      </Card>
    </div>
  )
}
