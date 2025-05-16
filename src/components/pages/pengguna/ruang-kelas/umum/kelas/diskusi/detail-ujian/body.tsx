'use client'

import { Button, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import cn from '@/utils/class-names'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailCard from './detail-card'
import HasilUjianCard from './hasil-ujian'
import TableUjianPesertaCard from './table-peserta-card'

export default function DetailUjianBody() {
  const { makeSimpleApiQueryData } = useSessionJwt()
  const router = useRouter()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleApiQueryData(lihatKelasApi, idKelas),
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
      <div className="grid grid-cols-12 items-start gap-y-8 gap-x-4">
        <DetailCard
          peran={dataKelas?.peran}
          className={cn(
            'w-full col-span-12',
            dataKelas?.peran === 'Pengajar' ? 'lg:col-span-6' : 'lg:col-span-7'
          )}
        />
        {dataKelas?.peran === 'Pengajar' ? (
          <TableUjianPesertaCard className="col-span-12 lg:col-span-6" />
        ) : (
          <HasilUjianCard
            tipeKelas={tipeKelas}
            className="col-span-12 lg:col-span-5"
          />
        )}
      </div>
    </>
  )
}
