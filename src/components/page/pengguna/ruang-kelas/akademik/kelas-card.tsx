import { DataType as DataListKelasType } from '@/actions/pengguna/ruang-kelas/list'
import { Button, Card, Text } from '@/components/ui'
import RandomCoverImage from '@/components/ui/random/cover-image'
import { routes } from '@/config/routes'
import Image from 'next/image'
import Link from 'next/link'
import { BsCheckCircleFill } from 'react-icons/bs'
import { Progressbar } from 'rizzui'

type KelasCardProps = {
  data: DataListKelasType
}

export default function KelasCard({ data }: KelasCardProps) {
  const pertemuan = data.total_pertemuan_terlaksana || 0
  const totalPertemuan = data.kelas.total_pertemuan || 0
  const persentasePertemuan =
    totalPertemuan > 0 ? Math.round((pertemuan / totalPertemuan) * 100) : 100

  const jenisKelas = data.peran === 'Pengajar' ? 'dikelola' : 'diikuti'
  const tipeKelas = data.kelas.tipe === 'Akademik' ? 'akademik' : 'umum'

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
            persistentKey={data.kelas.id}
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
        <div className="flex items-center space-x-1">
          <Text size="sm" weight="medium" variant="lighter">
            {data.kelas.nama_instansi || '-'}
          </Text>
          <BsCheckCircleFill size={10} className="text-primary mt-0.5" />
        </div>
        <Text size="sm" weight="medium" variant="lighter">
          {data.nama_pemilik}
        </Text>
      </div>
      <div className="flex">
        <table className="border-collapse border border-gray-100 w-full">
          <tbody>
            <tr>
              <td className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jadwal
                </Text>
                <Text size="sm" weight="medium">
                  {data.jadwal && data.jadwal.length > 0
                    ? `${
                        data.jadwal[0].hari
                      }, ${data.jadwal[0].waktu_mulai.substring(
                        0,
                        5
                      )} - ${data.jadwal[0].waktu_sampai.substring(0, 5)}`
                    : '-'}
                </Text>
              </td>
              <td className="border border-gray-100 p-1">
                <Text size="sm" weight="medium" variant="lighter">
                  Jumlah Siswa
                </Text>
                <Text size="sm" weight="medium">
                  {data.total_peserta} Orang
                </Text>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between gap-x-2">
          <Text size="sm" weight="semibold">
            Sesi Pembelajaran
          </Text>
          <Text size="sm" weight="semibold">
            {pertemuan}/{totalPertemuan}
          </Text>
        </div>
        <Progressbar
          variant="solid"
          color="success"
          rounded="none"
          className="gap-0"
          value={persentasePertemuan}
        />
      </div>
      <Link
        href={`${routes.pengguna.ruangKelas[jenisKelas][tipeKelas]}/${data.kelas.id}`}
      >
        <Button as="span" size="sm" className="w-full">
          Masuk Kelas
        </Button>
      </Link>
    </Card>
  )
}
