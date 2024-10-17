'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  FilePreviewType,
  ModalFilePreview,
  PustakaMediaFileType,
  Text,
} from '@/components/ui'
import { routes } from '@/config/routes'
import { getFileType } from '@/utils/file-properties-from-api'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import AbsensiCard from './absensi-card'
import BerkasCard from './berkas-card'
import DetailCard from './detail-card'
import { useState } from 'react'

export default function DiskusiMateriBody() {
  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  return (
    <>
      <div className="mt-4 mb-4">
        <Link href={`${routes.pengguna.ruangKelas}/${idKelas}`}>
          <Button variant="text" color="primary" className="text-gray-dark">
            <RiArrowLeftLine size={18} className="" />{' '}
            <Text weight="medium" className="ml-2">
              Kembali
            </Text>
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap items-start gap-y-8 gap-x-4">
        <DetailCard
          kelas={dataKelas}
          setFilePreview={setFilePreview}
          className="w-full lg:w-8/12"
        />
        {dataKelas?.peran === 'Pengajar' ? (
          <AbsensiCard className="flex-1" />
        ) : (
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
