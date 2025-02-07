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
import { stripHtml } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { BsDoorOpen } from 'react-icons/bs'
import PengajarRekapUjianDaftarMengikutiCard from './rekap-daftar-mengikuti-card'

type PengajarRekapUjianDetailSesiSectionProps = {
  className?: string
}

export default function PengajarRekapUjianDetailSesiSection({
  className,
}: PengajarRekapUjianDetailSesiSectionProps) {
  const searchParams = useSearchParams()
  const idAktifitas = searchParams.get('sesi') || undefined

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const tipeKelas = dataKelas?.kelas?.tipe === 'Akademik' ? 'akademik' : 'umum'

  const { data, isLoading } = useQuery({
    queryKey: [
      'pengguna.ruang-kelas.ujian.sesi-aktif',
      'pengajar',
      idKelas,
      idAktifitas,
    ],
    queryFn: makeSimpleQueryDataWithParams(
      lihatAktifitasAction,
      idKelas,
      idAktifitas ?? null
    ),
    enabled: !!idAktifitas,
  })

  const strippedDesc = stripHtml(data?.aktifitas.deskripsi ?? '')

  if (isLoading) return <ShimmerSection className={className} />

  if (!idAktifitas || !data) return null

  return (
    <div className={className}>
      <Card>
        <div className="flex justify-between">
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
              {strippedDesc.slice(0, 150)}
              {strippedDesc.length > 150 && '...'}
            </Text>
          </div>
          <div className="flex flex-wrap justify-end">
            <Link
              href={`${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/diskusi/ujian/${idAktifitas}`}
            >
              <Button as="span" size="sm" color="primary" variant="text">
                <BsDoorOpen className="mr-2" /> Lihat Sesi
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-8 mt-2">
          <div>
            <Text size="sm" weight="medium" variant="lighter">
              Durasi Ujian
            </Text>
            <Text size="sm" weight="medium" variant="dark">
              {data.aktifitas.durasi_ujian} Menit
            </Text>
          </div>
          <div>
            <Text size="sm" weight="medium" variant="lighter">
              Waktu Mulai
            </Text>
            <Text size="sm" weight="medium" variant="dark">
              <TimeIndo
                date={data.aktifitas.waktu_mulai_ujian}
                format="datetime"
                empty="-"
              />
            </Text>
          </div>
          <div>
            <Text size="sm" weight="medium" variant="lighter">
              Waktu Selesai
            </Text>
            <Text size="sm" weight="medium" variant="dark">
              <TimeIndo
                date={data.aktifitas.waktu_selesai_ujian}
                format="datetime"
                empty="-"
              />
            </Text>
          </div>
        </div>
      </Card>

      <PengajarRekapUjianDaftarMengikutiCard
        sesi={data}
        className="flex-1 mt-4"
      />

      <Card className="mt-4">
        <Komentar
          idKelas={idKelas}
          idAktifitas={idAktifitas}
          total={data.total_komentar}
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
