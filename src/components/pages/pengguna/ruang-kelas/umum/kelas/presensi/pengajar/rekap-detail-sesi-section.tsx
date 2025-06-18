import { Button, Card, Shimmer, Text, TimeIndo } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { tableAbsensiPesertaApi } from '@/services/api/pengguna/ruang-kelas/presensi/umum/pengajar/table-absensi-peserta'
import { switchCaseObject } from '@/utils/switch-case'
import { stripHtmlAndEllipsis } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsDoorOpen, BsPencil } from 'react-icons/bs'
import { RiFileExcel2Line } from 'react-icons/ri'
import { utils, writeFile } from 'xlsx'
import PengajarRekapPresensiDaftarAbsensiCard from './rekap-detail-daftar-absensi-card'

type PengajarRekapDetailSesiSectionProps = {
  className?: string
}

export default function PengajarRekapPresensiDetailSesiSection({
  className,
}: PengajarRekapDetailSesiSectionProps) {
  const { jwt, makeSimpleApiQueryData } = useSessionJwt()
  const searchParams = useSearchParams()
  const idAktifitas = searchParams.get('sesi') || undefined

  const [ubahData, setUbahData] = useState(false)

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
  })

  const { data, isLoading } = useQuery({
    queryKey: [
      'pengguna.ruang-kelas.presensi.sesi-aktif',
      'pengajar',
      idKelas,
      idAktifitas,
    ],
    queryFn: makeSimpleApiQueryData(
      lihatAktifitasApi,
      idKelas,
      idAktifitas ?? null
    ),
    enabled: !!idAktifitas,
  })

  const linkTipe = switchCaseObject(
    data?.aktifitas.tipe,
    {
      Materi: 'materi',
      Ujian: 'ujian',
      Konferensi: 'konferensi',
    },
    null
  )

  const handleExport = useCallback(async () => {
    if (!idAktifitas) return

    const toastId = toast.loading(<Text>Memuat data...</Text>)

    let page = 1
    let allData: {
      Nama: string
      Email: string
      Status: string
    }[] = []

    const run = async (page: number) => {
      const { data } = await tableAbsensiPesertaApi({
        jwt,
        page,
        perPage: 100,
        params: { idKelas, idAktifitas },
      })

      allData = [
        ...allData,
        ...(data?.list ?? []).map((item) => ({
          Nama: item.nama,
          Email: item.email,
          Status: item.status || '-',
        })),
      ]

      return data?.pagination?.hasNextPage ?? false
    }

    while (await run(page)) {
      page++
    }

    toast.dismiss(toastId)

    const ws = utils.json_to_sheet(allData)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Data')
    writeFile(wb, `Data Presensi - ${data?.aktifitas.judul}.xlsx`)
  }, [idKelas, idAktifitas, data])

  useEffect(() => {
    setUbahData(false)
  }, [data])

  if (isLoading) return <SectionShimmer className={className} />

  if (!idAktifitas) return null

  const tipeKelas = dataKelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  return (
    <div className={className}>
      <Card className="flex justify-between gap-2 flex-wrap">
        <div className="flex flex-col">
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
          <Text size="sm" weight="medium" variant="dark" className="mt-2">
            <TimeIndo
              date={data?.aktifitas.created_at}
              format="datetimeday"
              empty="-"
            />
          </Text>
        </div>
        <div className="flex flex-wrap shrink-0">
          {linkTipe && (
            <Link
              href={`${routes.pengguna.ruangKelas.dikelola[tipeKelas]}/${idKelas}/diskusi/${linkTipe}/${idAktifitas}`}
            >
              <Button as="span" size="sm" color="primary" variant="text">
                <BsDoorOpen className="mr-2" /> Lihat Detail
              </Button>
            </Link>
          )}
          <Button
            size="sm"
            color="success"
            variant="text"
            onClick={handleExport}
          >
            <RiFileExcel2Line className="mr-2" /> Ekspor
          </Button>
          {!ubahData && (
            <Button
              size="sm"
              color="warning"
              variant="text"
              onClick={() => setUbahData(true)}
            >
              <BsPencil className="mr-2" /> Ubah
            </Button>
          )}
        </div>
      </Card>

      <PengajarRekapPresensiDaftarAbsensiCard
        idAktifitas={idAktifitas}
        ubahData={ubahData}
        hideUbahData={() => setUbahData(false)}
        className="mt-4"
      />
    </div>
  )
}

function SectionShimmer({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Card className="flex justify-between gap-x-6 py-4">
        <div className="flex flex-col flex-1 gap-y-2.5">
          <Shimmer className="h-3 w-5/12" />
          <Shimmer className="h-2.5 w-full" />
          <Shimmer className="h-2.5 w-2/3" />
          <Shimmer className="h-3 w-7/12 !mt-4" />
        </div>
        <div className="flex gap-x-6 p-2">
          <Shimmer className="h-2.5 w-12" />
          <Shimmer className="h-2.5 w-12" />
          <Shimmer className="h-2.5 w-12" />
        </div>
      </Card>
    </div>
  )
}
