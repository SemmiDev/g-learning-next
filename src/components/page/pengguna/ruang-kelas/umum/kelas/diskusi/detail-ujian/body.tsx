'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { Button, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import cn from '@/utils/class-names'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailCard from './detail-card'
import HasilUjianCard from './hasil-ujian'
import TableUjianPesertaCard from './table-peserta-card'

export default function DiskusiUjianBody() {
  const router = useRouter()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
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
          peran={dataKelas?.peran}
          className={cn(
            'w-full',
            dataKelas?.peran === 'Pengajar' ? 'lg:w-6/12' : 'lg:w-7/12'
          )}
        />
        {dataKelas?.peran === 'Pengajar' ? (
          <TableUjianPesertaCard className="flex-1" />
        ) : (
          <HasilUjianCard tipeKelas={tipeKelas} className="flex-1" />
        )}
      </div>
    </>
  )
}
