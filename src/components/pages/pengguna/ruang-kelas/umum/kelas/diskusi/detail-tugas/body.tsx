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
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithParams } from '@/utils/query-data'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailCard from './detail-card'
import KumpulkanTugasCard from './kumpulkan-card'
import TableTugasPesertaCard from './table-peserta-card'

export default function DetailTugasBody() {
  const { jwt } = useSessionJwt()
  const router = useRouter()

  const [filePreview, setFilePreview] = useState<FilePreviewType>()

  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithParams(lihatKelasApi, jwt, idKelas),
  })

  const { data: dataTugas, isLoading: isLoadingTugas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.detail.tugas', idKelas, id],
    queryFn: makeSimpleQueryDataWithParams(lihatAktifitasApi, jwt, idKelas, id),
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

      <div className="grid grid-cols-12 items-start gap-y-8 lg:gap-x-4 lg:gap-y-0">
        <DetailCard
          data={dataTugas || undefined}
          isLoading={isLoadingTugas}
          setFilePreview={setFilePreview}
          className={cn(
            'col-span-12',
            dataKelas?.peran === 'Pengajar' ? 'lg:col-span-6' : 'lg:col-span-7'
          )}
        />

        {dataKelas?.peran === 'Pengajar' ? (
          <TableTugasPesertaCard
            tipeKelas={
              dataKelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'
            }
            className="col-span-12 lg:col-span-6"
          />
        ) : (
          <KumpulkanTugasCard
            tugas={dataTugas || undefined}
            className="col-span-12 lg:col-span-5"
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
