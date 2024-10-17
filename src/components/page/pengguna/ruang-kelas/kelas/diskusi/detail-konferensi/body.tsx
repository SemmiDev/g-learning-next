'use client'

import { lihatAktifitasAction } from '@/actions/pengguna/ruang-kelas/aktifitas/lihat'
import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import {
  Button,
  Card,
  CardSeparator,
  Komentar,
  Loader,
  Text,
} from '@/components/ui'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { routes } from '@/config/routes'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { RiArrowLeftLine } from 'react-icons/ri'
import AbsensiCard from './absensi-card'
import { mustBe } from '@/utils/must-be'

export default function DiskusiKonferensiBody() {
  const { kelas: idKelas, id }: { kelas: string; id: string } = useParams()

  const { data: dataKelas } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['pengguna.ruang-kelas.diskusi.konferensi', idKelas, id],
    queryFn: async () => {
      const { data } = await lihatAktifitasAction(idKelas, id)
      return data
    },
  })

  if (data?.aktifitas.tipe !== 'Konferensi') return null

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
      {isLoading ? (
        <Loader height={400} />
      ) : (
        <div className="flex flex-wrap items-start gap-y-8 gap-x-4">
          <Card className="flex flex-col p-0 w-full lg:w-8/12">
            <div className="flex justify-between items-start px-4 py-2">
              <div className="flex flex-col">
                <Text
                  size="lg"
                  weight="semibold"
                  variant="dark"
                  className="mb-2"
                >
                  {data.aktifitas.judul || '-'}
                </Text>
                <SanitizeHTML
                  html={data.aktifitas.deskripsi || '-'}
                  className="text-sm"
                />
              </div>
            </div>
            <CardSeparator />
            <div className="flex p-2">
              {/* TODO: tampilkan link dari data API */}
              <Button size="sm" color="primary" className="w-full">
                {dataKelas?.peran === 'Pengajar'
                  ? 'Mulai Conference'
                  : 'Gabung Conference'}
              </Button>
            </div>
            <Komentar
              idKelas={idKelas}
              idAktifitas={id}
              firstShow={5}
              showPer={10}
              className="p-4"
            />
          </Card>
          {dataKelas?.peran === 'Pengajar' && (
            <AbsensiCard
              tipe={mustBe(data.aktifitas.absen, ['Manual', null], null)}
            />
          )}
        </div>
      )}
    </>
  )
}
