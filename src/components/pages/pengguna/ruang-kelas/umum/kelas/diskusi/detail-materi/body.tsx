'use client'

import {
  Button,
  FilePreviewType,
  ModalFilePreview,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatAktifitasApi } from '@/services/api/pengguna/ruang-kelas/aktifitas/lihat'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailCard from './detail-card'
import PengajarAbsensiCard from './pengajar/absensi-card'
import PesertaAbsensiCard from './peserta/absensi-card'
import PesertaBerkasCard from './peserta/berkas-card'

export default function DetailMateriBody() {
  const { makeSimpleApiQueryData } = useSessionJwt()
  const router = useRouter()

  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.detail.materi', idKelas, id],
    queryFn: makeSimpleApiQueryData(lihatAktifitasApi, idKelas, id),
  })

  const isPengajar = useMemo(() => dataKelas?.peran === 'Pengajar', [dataKelas])
  const isPeserta = useMemo(() => dataKelas?.peran === 'Peserta', [dataKelas])

  const absenTanpaInteraksi = useMemo(
    () => ['Manual', 'Otomatis'].includes(data?.aktifitas.absen || ''),
    [data]
  )

  const absenDenganInteraksi = useMemo(
    () => ['GPS', 'GPS dan Swafoto'].includes(data?.aktifitas.absen || ''),
    [data]
  )

  const showFull =
    isPengajar ||
    (isPeserta &&
      (absenTanpaInteraksi || (absenDenganInteraksi && !!data?.absensi)))

  const jenisKelas = dataKelas?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = dataKelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}`}
          onClick={() => router.back()}
        >
          <Button
            as="span"
            variant="text"
            color="primary"
            className="text-gray-dark"
          >
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex flex-col gap-y-4 w-full lg:w-8/12">
          <DetailCard
            kelas={dataKelas || undefined}
            data={data || undefined}
            isLoading={isLoading}
            showFull={showFull}
            setFilePreview={setFilePreview}
          />

          {isPeserta && absenDenganInteraksi && !data?.absensi && (
            <PesertaAbsensiCard
              foto={data?.aktifitas.absen === 'GPS dan Swafoto'}
              className="flex-1"
            />
          )}
        </div>

        {isPengajar && <PengajarAbsensiCard className="flex-1" />}

        {isPeserta && showFull && (
          <PesertaBerkasCard
            setFilePreview={setFilePreview}
            className="flex-1"
          />
        )}
      </div>

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />
    </>
  )
}
