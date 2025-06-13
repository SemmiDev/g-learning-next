import { Card, Circle, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { DataType as DataKelasType } from '@/services/api/instansi/akademik/list-kelas'
import { deskripsiSemester } from '@/utils/semester'
import { hourMinute } from '@/utils/text'
import Image from 'next/image'
import { Fragment } from 'react'
import { Progressbar } from 'rizzui'

type KelasCardProps = {
  data: DataKelasType
}

export default function KelasCard({ data }: KelasCardProps) {
  const pertemuan = data.ringkasan_kelas.total_pertemuan_terlaksana || 0
  const totalPertemuan = data.kelas.total_pertemuan || 0
  const persentasePertemuan =
    totalPertemuan > 0 ? Math.round((pertemuan / totalPertemuan) * 100) : 100

  return (
    <Card className="flex flex-col gap-y-2 h-fit">
      <div className="h-32 rounded overflow-clip">
        {!!data.kelas.thumbnail ? (
          <Image
            src={data.kelas.thumbnail}
            alt="kelas"
            width={640}
            height={128}
            className="h-full w-full object-cover"
          />
        ) : (
          <RandomCoverImage
            persistentKey={'123456'}
            alt="kelas"
            width={640}
            height={128}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col">
        <Text weight="semibold" variant="dark">
          {data.kelas.nama_kelas}
        </Text>
        <Text size="sm" weight="medium" variant="lighter">
          {data.kelas.sub_judul}
        </Text>
        <Text size="sm" weight="medium" variant="lighter">
          {deskripsiSemester(data.kelas.id_kelas_semester)}
        </Text>

        {data.pengajar.length === 1 ? (
          <Text size="sm" weight="medium" variant="lighter">
            {data.pengajar[0].nama}
          </Text>
        ) : (
          <ul className="text-sm font-medium text-gray-lighter">
            {data.pengajar.map((pengajar) => (
              <li key={pengajar.id} className="flex items-center gap-x-1">
                <Circle className="size-1" />
                {pengajar.nama}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex">
        <table className="border-collapse border border-gray-100 w-full">
          <tbody>
            <tr>
              <td valign="top" className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jadwal
                </Text>
                <Text size="sm" weight="medium">
                  {data.jadwal && data.jadwal.length > 0
                    ? data.jadwal.map((jadwal, idx) => (
                        <Fragment key={idx}>
                          {jadwal.hari}, {hourMinute(jadwal.waktu_mulai)} -{' '}
                          {hourMinute(jadwal.waktu_sampai)}
                          <br />
                        </Fragment>
                      ))
                    : '-'}
                </Text>
              </td>
              <td valign="top" className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jumlah Peserta
                </Text>
                <Text size="sm" weight="medium">
                  {data.total_peserta} Orang
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-2">
        <ProgressItem
          label="Sesi Pembelajaran"
          value={`${pertemuan}/${totalPertemuan}`}
          persen={persentasePertemuan}
        />
        <ProgressItem
          label="Kehadiran Peserta"
          value={`${data.ringkasan_kelas.persentase_kehadiran_peserta}%`}
          persen={data.ringkasan_kelas.persentase_kehadiran_peserta}
        />
        <ProgressItem
          label="Kehadiran Pengajar"
          value={`${data.ringkasan_kelas.persentase_kehadiran_pengajar}%`}
          persen={data.ringkasan_kelas.persentase_kehadiran_pengajar}
        />
      </div>
    </Card>
  )
}

function ProgressItem({
  label,
  value,
  persen,
}: {
  label: string
  value: string
  persen: number
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex justify-between gap-x-2">
        <Text size="sm" weight="semibold">
          {label}
        </Text>
        <Text size="sm" weight="semibold">
          {value}
        </Text>
      </div>
      <Progressbar
        variant="solid"
        color="success"
        rounded="none"
        className="gap-0"
        value={persen}
      />
    </div>
  )
}
