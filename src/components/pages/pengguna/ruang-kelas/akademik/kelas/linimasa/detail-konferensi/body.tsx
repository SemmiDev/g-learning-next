'use client'

import { Button, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionJwt } from '@/hooks/use-session-jwt'
import { lihatKelasApi } from '@/services/api/pengguna/ruang-kelas/lihat'
import { makeSimpleQueryData } from '@/utils/query-data'
import { useRouter } from '@bprogress/next/app'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import DetailCard from './detail-card'

export default function DetailKonferensiBody() {
  const { jwt } = useSessionJwt()
  const router = useRouter()

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
          className="w-full lg:w-8/12"
        />
      </div>
    </>
  )
}
