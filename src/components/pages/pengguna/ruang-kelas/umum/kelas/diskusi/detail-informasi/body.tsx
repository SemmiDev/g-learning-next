'use client'

import {
  Button,
  FilePreviewType,
  ModalFilePreview,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import BerkasCard from './berkas-card'
import DetailCard from './detail-card'

export default function DetailInformasiBody() {
  const { jwt } = useSessionJwt()
  const router = useRouter()

  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryData(lihatKelasApi, jwt, idKelas),
  })

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
      <div className="flex flex-wrap items-start gap-y-8 gap-x-4">
        <DetailCard
          kelas={dataKelas || undefined}
          setFilePreview={setFilePreview}
          className="w-full lg:w-8/12"
        />
        {dataKelas?.peran !== 'Pengajar' && (
          <BerkasCard setFilePreview={setFilePreview} className="flex-1" />
        )}
      </div>

      <ModalFilePreview
        file={filePreview}
        onClose={() => setFilePreview(undefined)}
      />
    </>
  )
}
