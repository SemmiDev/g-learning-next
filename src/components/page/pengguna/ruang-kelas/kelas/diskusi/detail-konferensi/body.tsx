'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { Button, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import AbsensiCard from './absensi-card'
import DetailCard from './detail-card'

export default function DiskusiKonferensiBody() {
  const { kelas: idKelas }: { kelas: string } = useParams()

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
        <DetailCard kelas={dataKelas} />
        {dataKelas?.peran === 'Pengajar' && <AbsensiCard />}
      </div>
    </>
  )
}
