'use client'

import { lihatKelasAction } from '@/services/actions/pengguna/ruang-kelas/lihat'
import { Button, Text } from '@/components/ui'
import { routes } from '@/config/routes'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from '@bprogress/next/app'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import BahanAjarCard from './bahan-ajar-card'
import PengajarPresensiCard from './pengajar/presensi-card'
import PesertaPresensiCard from './peserta/presensi-card'
import SesiCard from './sesi-card'

export default function LihatSesiBody() {
  const router = useRouter()

  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  if (!dataKelas) return null

  const jenisKelas = dataKelas?.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = dataKelas?.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

  return (
    <>
      <div className="mt-4 mb-4">
        <Link
          href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${idKelas}/sesi-pembelajaran`}
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
        <div className="flex flex-col gap-y-4 w-full col-span-12 lg:col-span-7">
          <SesiCard kelas={dataKelas} />
          <BahanAjarCard kelas={dataKelas} />
        </div>
        {dataKelas.peran === 'Pengajar' ? (
          <PengajarPresensiCard className="col-span-12 lg:col-span-5" />
        ) : (
          <PesertaPresensiCard className="col-span-12 lg:col-span-5" />
        )}
      </div>
    </>
  )
}
