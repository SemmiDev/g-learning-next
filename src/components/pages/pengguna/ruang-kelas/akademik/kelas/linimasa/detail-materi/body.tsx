'use client'

import { lihatKelasAction } from '@/services/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  FilePreviewType,
  ModalFilePreview,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@bprogress/next/app'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailCard from './detail-card'
import PesertaBerkasCard from './peserta/berkas-card'

export default function DetailMateriBody() {
  const router = useRouter()
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const isPeserta = useMemo(() => dataKelas?.peran === 'Peserta', [dataKelas])

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
            setFilePreview={setFilePreview}
          />
        </div>

        {isPeserta && (
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
