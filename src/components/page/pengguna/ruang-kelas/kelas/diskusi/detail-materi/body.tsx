'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  FilePreviewType,
  ModalFilePreview,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import {
  makeSimpleQueryDataWithId,
  makeSimpleQueryDataWithParams,
} from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailCard from './detail-card'
import PengajarAbsensiCard from './pengajar/absensi-card'
import PesertaBerkasCard from './peserta/berkas-card'
import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import PesertaAbsensiCard from './peserta/absensi-card'

export default function DiskusiMateriBody() {
  const router = useRouter()
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.materi', idKelas, id],
    queryFn: makeSimpleQueryDataWithParams(lihatAktifitasAction, idKelas, id),
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

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.pengguna.ruangKelas}/${idKelas}`}
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
