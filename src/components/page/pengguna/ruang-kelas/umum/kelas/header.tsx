'use client'

import { lihatKelasAction } from '@/actions/pengguna/ruang-kelas/lihat'
import { Badge, Text, Title } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { SanitizeHTML } from '@/components/ui/sanitize-html'
import { makeSimpleQueryDataWithId } from '@/utils/query-data'
import { deskripsiSemester } from '@/utils/semester'
import { hourMinute } from '@/utils/text'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import KelasHeaderAction from './header-action'

export default function KelasHeader() {
  const { kelas: idKelas }: { kelas: string } = useParams()

  const { data } = useQuery({
    queryKey: ['pengguna.ruang-kelas.lihat', idKelas],
    queryFn: makeSimpleQueryDataWithId(lihatKelasAction, idKelas),
  })

  const jadwal = data?.jadwal ?? []

  return (
    <div className="flex justify-between items-start space-x-2">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="rounded overflow-clip self-center">
          {data?.kelas.thumbnail ? (
            <Image
              src={data?.kelas.thumbnail}
              alt="kelas"
              width={640}
              height={128}
              className="w-56 h-32 object-cover"
            />
          ) : (
            <RandomCoverImage
              persistentKey={data?.kelas.id ?? ''}
              alt="kelas"
              width={640}
              height={128}
              className="w-56 h-32 object-cover"
            />
          )}
        </div>
        <div>
          <div className="flex space-x-2 items-center">
            <Title as="h5" weight="semibold">
              {data?.kelas.nama_kelas || '-'}
            </Title>
            <Badge
              size="sm"
              color={data?.kelas.tipe === 'Akademik' ? 'primary' : 'success'}
              variant="flat"
              className="text-[8px] leading-3 py-[.15rem]"
            >
              {data?.kelas.tipe || '-'}
            </Badge>
          </div>
          {data?.kelas.id_instansi && (
            <Text size="sm">
              {data?.kelas.nama_instansi || '-'}
              {!!data?.kelas.id_kelas_semester &&
                ` | Semester ${deskripsiSemester(
                  data?.kelas.id_kelas_semester
                )}`}
            </Text>
          )}
          <Text size="sm">
            {data?.kelas.sub_judul || '-'} | {data?.total_peserta || 0} Peserta
            {jadwal.length > 0 &&
              ` | ${jadwal
                .map(
                  (item) =>
                    `${item.hari}, ${hourMinute(item.waktu_mulai)}-${hourMinute(
                      item.waktu_sampai
                    )}`
                )
                .join(' | ')}`}
          </Text>
          <SanitizeHTML
            html={data?.kelas.deskripsi || ''}
            className="text-gray-dark text-sm mt-2"
          />
        </div>
      </div>
      {data?.kelas.tipe !== 'Akademik' && (
        <KelasHeaderAction
          tipe={data?.kelas.tipe}
          pemilik={data?.peran === 'Pengajar'}
        />
      )}
    </div>
  )
}
